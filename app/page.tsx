"use client";

// redeploy grounded 3D studio

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CREW_IMAGE, STUDIO_IMAGE, latestEpisode } from "@/lib/episodes";

const StudioScene = dynamic(() => import("@/components/StudioScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">WARMING UP THE STUDIO…</div>,
});

export default function Home() {
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setMotionEnabled(false);

    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = Math.max(window.innerHeight, 1);
      const scrollable = Math.max(document.documentElement.scrollHeight - vh, 1);
      root.style.setProperty("--hero-progress", Math.min(Math.max(y / vh, 0), 1).toFixed(4));
      root.style.setProperty("--page-progress", Math.min(Math.max(y / scrollable, 0), 1).toFixed(4));
      root.style.setProperty("--hero-shift", `${Math.min(y * 0.12, 110)}px`);
      root.style.setProperty("--hero-copy-shift", `${Math.min(y * 0.055, 52)}px`);
      document.body.classList.toggle("is-scrolled", y > 28);
    };

    const pointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      root.style.setProperty("--pointer-x", x.toFixed(4));
      root.style.setProperty("--pointer-y", y.toFixed(4));
      root.style.setProperty("--tilt-y", `${(x * 5.2).toFixed(2)}deg`);
      root.style.setProperty("--tilt-x", `${(-y * 4.2).toFixed(2)}deg`);
    };

    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", pointer);
      document.body.classList.remove("is-scrolled");
    };
  }, []);

  return (
    <main className={`site multipage-site${motionEnabled ? "" : " motion-off"}`}>
      <div className="noise" aria-hidden="true" />
      <div className="cinema-lights" aria-hidden="true" />
      <SiteHeader motionEnabled={motionEnabled} onToggleMotion={() => setMotionEnabled((v) => !v)} />

      <section className="hero" id="top">
        <div className="hero-scene" aria-label="Interactive 3D podcast studio scene">
          <StudioScene motionEnabled={motionEnabled} />
        </div>
        <div className="hero-overlay">
          <div className="hero-eyebrow">AN UNOFFICIAL FAN EXPERIENCE</div>
          <div className="hero-title">
            <div className="hero-host-line"><span>ZANE</span><i>+</i><span>HEATH</span></div>
            <h1>UNFILTERED</h1>
            <div className="hero-podcast-tag"><span>THE</span><b>PODCAST</b><i /></div>
          </div>
          <p className="hero-copy">A CINEMATIC, FAN-BUILT TRIBUTE TO THE STUDIO,<br />THE STORIES, AND THE CHAOS BETWEEN THEM.</p>
          <div className="hero-actions">
            <Link className="primary-btn" href="/episodes">EXPLORE EPISODES</Link>
            <Link className="text-btn" href="/studio">ENTER THE STUDIO ↘</Link>
          </div>
        </div>
        <div className="hero-reference-shot hero-reference-3d" aria-label="3D podcast studio preview">
          <div className="hero-reference-3d-scene" aria-hidden="true">
            <StudioScene motionEnabled={false} />
          </div>
          <span>STUDIO DNA</span><b>THE 3D SET, BUILT FROM THEIR STUDIO.</b>
        </div>
        <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
      </section>

      <section className="latest section-shell home-latest" id="latest">
        <div className="section-kicker">NOW ON DECK</div>
        <div className="latest-grid">
          <article
            className="latest-art real-art latest-youtube-art"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(9,8,7,.02), rgba(9,8,7,.58)), url("${latestEpisode.thumbnail}")` }}
            aria-label={`Episode ${latestEpisode.number} YouTube thumbnail`}
          >
            <div className="tape tape-a">NEW EPISODE</div><div className="tape tape-b">#{latestEpisode.number}</div>
          </article>
          <div className="latest-copy">
            <span className="episode-number">EPISODE {latestEpisode.number} · {latestEpisode.date.toUpperCase()}</span>
            <h2>{latestEpisode.title}</h2>
            <p>MrBeast’s million-dollar puzzle, Austin stories, retro tech, AI, and the usual detours. The newest episode now uses its actual video artwork instead of a generic host photo.</p>
            {latestEpisode.videoTitle && <div className="video-cut-label">VIDEO CUT · {latestEpisode.videoTitle}</div>}
            <div className="platform-actions">
              <Link href="/episodes">OPEN EPISODE WALL →</Link>
              {latestEpisode.youtubeId && <a href={`https://www.youtube.com/watch?v=${latestEpisode.youtubeId}`} target="_blank" rel="noreferrer">WATCH ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell explore-pages">
        <div className="section-kicker">EXPLORE THE EXPERIENCE</div>
        <div className="section-heading-row">
          <h2>Four pages.<br />One studio world.</h2>
          <p>The homepage is now the front door. Episodes, the crew, and the interactive studio each get room to breathe instead of competing for the same scroll.</p>
        </div>
        <div className="page-portal-grid">
          <Link className="page-portal portal-episodes" href="/episodes" style={{ backgroundImage: `url("${latestEpisode.thumbnail}")` }}>
            <span>01 / EPISODES</span><b>Pull a story off the wall.</b><i>→</i>
          </Link>
          <Link className="page-portal portal-crew" href="/crew" style={{ backgroundImage: `url("${CREW_IMAGE}")` }}>
            <span>02 / CREW</span><b>The familiar voices in the room.</b><i>→</i>
          </Link>
          <Link className="page-portal portal-studio" href="/studio" style={{ backgroundImage: `url("${STUDIO_IMAGE}")` }}>
            <span>03 / STUDIO</span><b>Walk into the set.</b><i>→</i>
          </Link>
        </div>
      </section>

      <section className="listen section-shell" id="listen">
        <div className="section-kicker">PLUG IN</div>
        <h2>Pick your platform.<br />Hit play there.</h2>
        <div className="platform-grid">
          <a href="https://open.spotify.com/show/6goGgtyzjWUzr9kgnWRDZi" target="_blank" rel="noreferrer"><span>01</span><b>SPOTIFY</b><i>↗</i></a>
          <a href="https://www.youtube.com/@ZaneAndHeath" target="_blank" rel="noreferrer"><span>02</span><b>YOUTUBE</b><i>↗</i></a>
          <a href="https://www.patreon.com/zaneandheath" target="_blank" rel="noreferrer"><span>03</span><b>PATREON</b><i>↗</i></a>
          <a href="https://www.instagram.com/zane" target="_blank" rel="noreferrer"><span>04</span><b>INSTAGRAM</b><i>↗</i></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

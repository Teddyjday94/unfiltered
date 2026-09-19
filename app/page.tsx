"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import EpisodeArchive from "@/components/EpisodeArchive";
import AudioBoard from "@/components/AudioBoard";

const StudioScene = dynamic(() => import("@/components/StudioScene"), { ssr: false, loading: () => <div className="scene-loading">WARMING UP THE STUDIO…</div> });

const CREW_IMAGE = "https://i.pinimg.com/736x/8d/c8/ba/8dc8baf8fb4c5cfd61d486f90e7494d1.jpg";
const HOSTS_IMAGE = "https://i.insider.com/5e0b7742855cc253b52e4552?format=jpeg&width=618";
const STUDIO_IMAGE = "https://i.pinimg.com/736x/d9/27/b4/d927b4dd9d336ef4e36bbd1bd7b9c28c.jpg";

const crew = [
  { name: "ZANE", handle: "@zane", href: "https://www.instagram.com/zane" },
  { name: "HEATH", handle: "@heathhussar", href: "https://www.instagram.com/heathhussar" },
  { name: "MARIAH", handle: "@mariahamato", href: "https://www.instagram.com/mariahamato" },
  { name: "MATT", handle: "@mattrking", href: "https://www.instagram.com/mattrking" },
];

export default function Home() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [recClicks, setRecClicks] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setMotionEnabled(false);
  }, []);

  const tapRec = () => {
    const next = recClicks + 1;
    setRecClicks(next);
    if (next >= 5) {
      setEasterEgg(true);
      setRecClicks(0);
      window.setTimeout(() => setEasterEgg(false), 3200);
    }
  };

  return (
    <main className={easterEgg ? "site egg-active" : "site"}>
      <div className="noise" aria-hidden="true" />
      {easterEgg && <div className="easter-toast" role="status">UNFILTERED MODE // SECRET TAPE FOUND</div>}

      <header className="topbar">
        <a className="mini-brand" href="#top" aria-label="Unfiltered Studio home"><span>Z + H</span><b>UNFILTERED</b></a>
        <nav aria-label="Primary navigation">
          <a href="#latest">LATEST</a><a href="#crew">CREW</a><a href="#archive">ARCHIVE</a><a href="#board">BOARD</a>
        </nav>
        <button type="button" className="motion-toggle" onClick={() => setMotionEnabled((v) => !v)} aria-pressed={motionEnabled}>
          <span className={motionEnabled ? "toggle-dot on" : "toggle-dot"} /> MOTION {motionEnabled ? "ON" : "OFF"}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-scene" aria-label="Interactive 3D podcast studio scene"><StudioScene motionEnabled={motionEnabled} /></div>
        <div className="hero-overlay">
          <div className="hero-eyebrow">AN UNOFFICIAL FAN EXPERIENCE</div>
          <div className="hero-title"><span className="script-line">ZANE + HEATH</span><h1>UNFILTERED</h1><div className="outline-word">PODCAST</div></div>
          <p className="hero-copy">A 3-D FAN-BUILT TRIBUTE TO THE CHAOS,<br />THE COFFEE, AND THE STORIES THAT GO OFF THE RAILS.</p>
          <div className="hero-actions"><a className="primary-btn" href="#latest">LATEST EPISODE</a><a className="text-btn" href="#archive">ENTER THE ARCHIVE ↘</a></div>
        </div>
        <div className="hero-reference-shot" style={{ backgroundImage: `url(${STUDIO_IMAGE})` }} aria-label="Podcast studio reference image"><span>STUDIO DNA</span><b>WOOD. WARM LIGHT. BIG CHAIRS.</b></div>
        <button type="button" className="rec-chip" onClick={tapRec} aria-label="Recording indicator easter egg"><i /> REC <span>00:42:17</span></button>
        <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
      </section>

      <section className="latest section-shell" id="latest">
        <div className="section-kicker">NOW ON DECK</div>
        <div className="latest-grid">
          <article className="latest-art real-art" style={{ backgroundImage: `linear-gradient(180deg, rgba(9,8,7,.02), rgba(9,8,7,.74)), url(${HOSTS_IMAGE})` }} aria-label="Zane and Heath podcast hosts photo">
            <div className="tape tape-a">NEW EPISODE</div><div className="tape tape-b">#350</div>
            <span className="episode-stamp">UNFILTERED</span>
          </article>
          <div className="latest-copy"><span className="episode-number">EPISODE 350 · SEPTEMBER 14, 2026</span><h2>He Won $1,000,000 Dollars?!?</h2><p>The homepage now tracks the current episode slot instead of stopping at #349. The platform buttons below go to the real show pages.</p><div className="fake-player"><div className="player-line"><i /></div><span>VISUAL SCRUBBER — NOT AUDIO PLAYBACK</span></div><div className="platform-actions"><a href="https://open.spotify.com/show/6goGgtyzjWUzr9kgnWRDZi" target="_blank" rel="noreferrer">SPOTIFY ↗</a><a href="https://www.youtube.com/@ZaneAndHeath" target="_blank" rel="noreferrer">YOUTUBE ↗</a></div></div>
        </div>
      </section>

      <section className="crew section-shell" id="crew">
        <div className="section-kicker">THE FAMILIAR CREW</div>
        <div className="crew-layout">
          <figure className="crew-photo-wrap"><img src={CREW_IMAGE} alt="A group photo from the Unfiltered podcast set" /><figcaption>Real podcast imagery replaces the generic silhouette treatment.</figcaption></figure>
          <div className="crew-copy">
            <h2>Less placeholder.<br />More personality.</h2>
            <p>The old four-card silhouette grid is gone. This section now uses a real group image and keeps the names as clean editorial credits instead of trying to fake individual portraits.</p>
            <div className="crew-credits">
              {crew.map((person, i) => <a href={person.href} target="_blank" rel="noreferrer" key={person.name}><span>0{i + 1}</span><b>{person.name}</b><small>{person.handle}</small><i>↗</i></a>)}
            </div>
          </div>
        </div>
      </section>

      <EpisodeArchive />

      <section className="moments section-shell">
        <div className="section-kicker">UNFILTERED MOMENTS</div>
        <div className="desk-board">
          <div className="memo memo-one"><span>CLIP 01</span><b>CLIP COMING SOON</b><i /></div>
          <div className="memo memo-two"><span>NOTE TO EDITOR</span><b>KEEP THAT IN.</b><small>probably.</small></div>
          <div className="photo-card real-photo-card"><img src={STUDIO_IMAGE} alt="Unfiltered podcast studio" /><span>THE SET IS PART OF THE PERSONALITY.</span></div>
          <div className="cue-card"><span>TOPIC CARD</span><b>WHO APPROVED THIS?</b></div>
          <button type="button" className="coffee-easter" onClick={() => setEasterEgg(true)} aria-label="Hidden coffee cup easter egg"><span /></button>
        </div>
      </section>

      <AudioBoard />

      <section className="listen section-shell" id="listen">
        <div className="section-kicker">PLUG IN</div><h2>Pick your platform.<br />Hit play there.</h2>
        <div className="platform-grid"><a href="https://open.spotify.com/show/6goGgtyzjWUzr9kgnWRDZi" target="_blank" rel="noreferrer"><span>01</span><b>SPOTIFY</b><i>↗</i></a><a href="https://www.youtube.com/@ZaneAndHeath" target="_blank" rel="noreferrer"><span>02</span><b>YOUTUBE</b><i>↗</i></a><a href="https://www.patreon.com/zaneandheath" target="_blank" rel="noreferrer"><span>03</span><b>PATREON</b><i>↗</i></a><a href="https://www.instagram.com/zane" target="_blank" rel="noreferrer"><span>04</span><b>INSTAGRAM</b><i>↗</i></a></div>
      </section>

      <footer><div className="footer-mark">Z + H <span>UNFILTERED</span></div><p>Unofficial fan-made concept. Not affiliated with Zane & Heath or their team.</p><p>Public editorial/podcast imagery is used for this noncommercial mockup; use owned or licensed media for a commercial release.</p></footer>
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import EpisodeArchive from "@/components/EpisodeArchive";
import AudioBoard from "@/components/AudioBoard";

const StudioScene = dynamic(() => import("@/components/StudioScene"), { ssr: false, loading: () => <div className="scene-loading">WARMING UP THE STUDIO…</div> });

const cast = [
  { name: "ZANE", role: "CHAOS DEPARTMENT", code: "01" },
  { name: "HEATH", role: "VOICE OF REASON—ISH", code: "02" },
  { name: "MARIAH", role: "STUDIO ENERGY", code: "03" },
  { name: "MATT", role: "CONTROLLED CHAOS", code: "04" },
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
          <a href="#latest">LATEST</a><a href="#cast">CAST</a><a href="#archive">ARCHIVE</a><a href="#board">BOARD</a>
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
          <p className="hero-copy">NO FILTER. NO PLAN.<br />PROBABLY A STORY THEY SHOULDN&apos;T BE TELLING.</p>
          <div className="hero-actions"><a className="primary-btn" href="#latest">LATEST EPISODE</a><a className="text-btn" href="#archive">ENTER THE ARCHIVE ↘</a></div>
        </div>
        <button type="button" className="rec-chip" onClick={tapRec} aria-label="Recording indicator easter egg"><i /> REC <span>00:42:17</span></button>
        <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
      </section>

      <section className="latest section-shell" id="latest">
        <div className="section-kicker">NOW ON DECK</div>
        <div className="latest-grid">
          <article className="latest-art" aria-label="Episode 349 fan art treatment">
            <div className="tape tape-a">NEW EPISODE</div><div className="tape tape-b">#349</div>
            <div className="portrait-silhouettes"><i /><i /></div>
            <span className="episode-stamp">UNFILTERED</span>
          </article>
          <div className="latest-copy"><span className="episode-number">EPISODE 349</span><h2>Revealing the Internet&apos;s Biggest Influencer Scammers</h2><p>A cinematic fan-site spotlight for the latest episode slot. Plug in official art and exact platform links when you&apos;re ready.</p><div className="fake-player"><div className="player-line"><i /></div><span>VISUAL SCRUBBER — NOT AUDIO PLAYBACK</span></div><div className="platform-actions"><a href="#listen">LISTEN OPTIONS</a><a href="#archive">MORE EPISODES</a></div></div>
        </div>
      </section>

      <section className="cast section-shell" id="cast">
        <div className="section-kicker">ON THE MICS</div>
        <div className="section-heading-row"><h2>Four seats.<br />Zero restraint.</h2><p>Editorial portrait slots are intentionally local placeholders so you can swap in approved photography without redesigning the section.</p></div>
        <div className="cast-grid">
          {cast.map((person, i) => <article className="cast-card" key={person.name}><div className={`cast-portrait portrait-${i + 1}`}><span>{person.code}</span><div className="silhouette-head" /><div className="silhouette-body" /></div><div className="cast-meta"><span>{person.role}</span><h3>{person.name}</h3></div></article>)}
        </div>
      </section>

      <EpisodeArchive />

      <section className="moments section-shell">
        <div className="section-kicker">UNFILTERED MOMENTS</div>
        <div className="desk-board">
          <div className="memo memo-one"><span>CLIP 01</span><b>CLIP COMING SOON</b><i /></div>
          <div className="memo memo-two"><span>NOTE TO EDITOR</span><b>KEEP THAT IN.</b><small>probably.</small></div>
          <div className="photo-card"><div className="photo-placeholder">STUDIO<br />FRAME</div><span>THE CAMERA WAS ROLLING.</span></div>
          <div className="cue-card"><span>TOPIC CARD</span><b>WHO APPROVED THIS?</b></div>
          <button type="button" className="coffee-easter" onClick={() => setEasterEgg(true)} aria-label="Hidden coffee cup easter egg"><span /></button>
        </div>
      </section>

      <AudioBoard />

      <section className="listen section-shell" id="listen">
        <div className="section-kicker">PLUG IN</div><h2>Pick your platform.<br />Hit play there.</h2>
        <div className="platform-grid"><a href="#" onClick={(e) => e.preventDefault()}><span>01</span><b>SPOTIFY</b><i>↗</i></a><a href="#" onClick={(e) => e.preventDefault()}><span>02</span><b>YOUTUBE</b><i>↗</i></a><a href="#" onClick={(e) => e.preventDefault()}><span>03</span><b>PATREON</b><i>↗</i></a><a href="#" onClick={(e) => e.preventDefault()}><span>04</span><b>INSTAGRAM</b><i>↗</i></a></div>
        <p className="link-note">Platform buttons are intentionally inactive until official destination URLs are supplied.</p>
      </section>

      <footer><div className="footer-mark">Z + H <span>UNFILTERED</span></div><p>Unofficial fan-made concept. Not affiliated with Zane & Heath or their team.</p><p>Built for the love of the podcast.</p></footer>
    </main>
  );
}

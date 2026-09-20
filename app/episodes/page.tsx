"use client";

import { useEffect, useState } from "react";
import EpisodeArchive from "@/components/EpisodeArchive";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { latestEpisode } from "@/lib/episodes";

export default function EpisodesPage() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionEnabled(false);
  }, []);

  return (
    <main className={`site multipage-site inner-page${motionEnabled ? "" : " motion-off"}`}>
      <div className="noise" aria-hidden="true" />
      <div className="cinema-lights" aria-hidden="true" />
      <SiteHeader motionEnabled={motionEnabled} onToggleMotion={() => setMotionEnabled((v) => !v)} />
      <section className="page-hero episodes-page-hero" style={{ "--page-hero-image": `url("${latestEpisode.thumbnail}")` } as React.CSSProperties}>
        <div><span>EPISODES / 346-350</span><h1>THE<br />ARCHIVE</h1><p>Real thumbnail artwork, search, filters, and a scroll-driven tape wall.</p></div>
      </section>
      <EpisodeArchive motionEnabled={motionEnabled} />
      <SiteFooter />
    </main>
  );
}

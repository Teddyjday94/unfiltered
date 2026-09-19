"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AudioBoard from "@/components/AudioBoard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { STUDIO_IMAGE } from "@/lib/episodes";

const StudioScene = dynamic(() => import("@/components/StudioScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">WARMING UP THE STUDIO…</div>,
});

export default function StudioPage() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionEnabled(false);
  }, []);

  return (
    <main className={`site multipage-site inner-page studio-page${motionEnabled ? "" : " motion-off"}`}>
      <div className="noise" aria-hidden="true" />
      <SiteHeader motionEnabled={motionEnabled} onToggleMotion={() => setMotionEnabled((v) => !v)} />
      <section className="studio-page-stage">
        <div className="studio-page-canvas"><StudioScene motionEnabled={motionEnabled} explore /></div>
        <div className="studio-look-hint" aria-hidden="true"><span>DRAG</span><b>LOOK AROUND</b><i>↔</i></div>
        <div className="studio-page-copy">
          <span>THE SET / REBUILT</span>
          <h1>STEP INTO<br />THE STUDIO.</h1>
          <p>Built from the real set layout: two cream tufted chairs, a translucent orange center table, boom mics, the dark wood slat wall, blue/orange light strips, floating decor shelves, side plants, and the soft rug underneath. Drag the scene to inspect it from different angles.</p>
        </div>
      </section>
      <section className="section-shell studio-reference-layout">
        <div>
          <div className="section-kicker">REFERENCE / REAL ROOM</div>
          <h2>Warm wood.<br />Bright practicals.</h2>
          <p>The 3-D version stays stylized for performance, but the proportions, furniture separation, and material contrast track the studio reference closely.</p>
        </div>
        <img src={STUDIO_IMAGE} alt="Unfiltered podcast studio reference" />
      </section>
      <AudioBoard />
      <SiteFooter />
    </main>
  );
}

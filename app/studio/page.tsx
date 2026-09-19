"use client";

import { useEffect, useState } from "react";
import AudioBoard from "@/components/AudioBoard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhotoStudioDiorama, { StudioPhoto } from "@/components/PhotoStudioDiorama";

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
        <div className="studio-page-canvas"><PhotoStudioDiorama interactive motionEnabled={motionEnabled} /></div>
        <div className="studio-look-hint" aria-hidden="true"><span>DRAG</span><b>LOOK AROUND</b><i>↔</i></div>
        <div className="studio-page-copy">
          <span>THE SET / REBUILT</span>
          <h1>STEP INTO<br />THE STUDIO.</h1>
          <p>The real studio photo is now the visual source. The chairs and center table are separated into depth layers over the photographed room, so a small camera move creates parallax and lets you peek around the furniture without turning the set into chunky 3-D geometry.</p>
        </div>
      </section>
      <section className="section-shell studio-reference-layout">
        <div>
          <div className="section-kicker">REFERENCE / REAL ROOM</div>
          <h2>Warm wood.<br />Bright practicals.</h2>
          <p>This is a 2.5-D photo diorama: the original room stays recognizable while the foreground furniture gets its own depth, shadow, and parallax.</p>
        </div>
        <StudioPhoto className="studio-reference-photo" alt="Unfiltered podcast studio reference" />
      </section>
      <AudioBoard />
      <SiteFooter />
    </main>
  );
}

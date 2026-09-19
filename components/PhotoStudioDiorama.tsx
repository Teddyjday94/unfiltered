"use client";

import { useEffect, useRef, useState } from "react";\nimport type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type DioramaProps = {
  interactive?: boolean;
  motionEnabled?: boolean;
  className?: string;
};

const SOURCE_CHUNKS = [0, 1, 2, 3].map((index) => `/studio-set.${index}.b64`);

function useStudioPhoto() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all(SOURCE_CHUNKS.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Studio photo failed to load");
      return (await response.text()).trim();
    }))
      .then((chunks) => {
        if (alive) setSrc(`data:image/webp;base64,${chunks.join("")}`);
      })
      .catch(() => {
        if (alive) setSrc("");
      });

    return () => { alive = false; };
  }, []);

  return src;
}

export function StudioPhoto({ className = "", alt = "Unfiltered podcast studio set" }: { className?: string; alt?: string }) {
  const src = useStudioPhoto();
  if (!src) return <div className={`studio-photo-loading ${className}`} aria-hidden="true" />;
  return <img className={className} src={src} alt={alt} />;
}

export default function PhotoStudioDiorama({
  interactive = false,
  motionEnabled = true,
  className = "",
}: DioramaProps) {
  const src = useStudioPhoto();
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const motionRef = useRef({ x: 0, y: 0 });

  const applyMotion = (x: number, y: number) => {
    const root = rootRef.current;
    if (!root) return;
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    motionRef.current = { x: clampedX, y: clampedY };
    root.style.setProperty("--frame-ry", `${(clampedX * 1.15).toFixed(3)}deg`);
    root.style.setProperty("--frame-rx", `${(-clampedY * 0.72).toFixed(3)}deg`);
    root.style.setProperty("--mid-x", `${(-clampedX * 4.8).toFixed(2)}px`);
    root.style.setProperty("--mid-y", `${(-clampedY * 2.8).toFixed(2)}px`);
    root.style.setProperty("--near-x", `${(-clampedX * 7.4).toFixed(2)}px`);
    root.style.setProperty("--near-y", `${(-clampedY * 4.2).toFixed(2)}px`);
    root.style.setProperty("--far-x", `${(clampedX * 1.5).toFixed(2)}px`);
    root.style.setProperty("--far-y", `${(clampedY * 0.9).toFixed(2)}px`);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!motionEnabled) return;

    if (interactive && dragRef.current.active) {
      const width = Math.max(rootRef.current?.clientWidth || 1, 1);
      const height = Math.max(rootRef.current?.clientHeight || 1, 1);
      const dx = (event.clientX - dragRef.current.startX) / width;
      const dy = (event.clientY - dragRef.current.startY) / height;
      applyMotion(dragRef.current.baseX + dx * 4.4, dragRef.current.baseY + dy * 4.1);
      return;
    }

    if (!interactive && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 1.25;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 1.05;
      applyMotion(x, y);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive || !motionEnabled) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: motionRef.current.x,
      baseY: motionRef.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const reset = () => {
    if (!interactive && motionEnabled) applyMotion(0, 0);
  };

  const photoStyle = src ? ({
    "--studio-photo": `url("${src}")`,
  } as CSSProperties) : undefined;

  return (
    <div
      ref={rootRef}
      className={`photo-diorama ${interactive ? "is-interactive" : "is-ambient"} ${motionEnabled ? "" : "is-static"} ${className}`}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={reset}
      aria-label="Photo-real layered view of the Unfiltered podcast studio"
    >
      {src ? (
        <div className="photo-diorama-frame" style={photoStyle}>
          <div className="diorama-photo diorama-backplate" />

          <div className="diorama-photo diorama-blur-patch blur-left-chair" aria-hidden="true" />
          <div className="diorama-photo diorama-blur-patch blur-right-chair" aria-hidden="true" />
          <div className="diorama-photo diorama-blur-patch blur-table" aria-hidden="true" />

          <div className="diorama-photo diorama-cutout cutout-left-chair" aria-hidden="true" />
          <div className="diorama-photo diorama-cutout cutout-right-chair" aria-hidden="true" />
          <div className="diorama-photo diorama-cutout cutout-table" aria-hidden="true" />

          <div className="diorama-depth-glow" aria-hidden="true" />
          <div className="diorama-vignette" aria-hidden="true" />
        </div>
      ) : (
        <div className="scene-loading">DEVELOPING THE STUDIO…</div>
      )}
    </div>
  );
}

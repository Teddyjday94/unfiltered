"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { episodes } from "@/lib/episodes";

const tags = ["All", "Challenge", "Stories", "Internet Chaos", "Life Updates", "Unhinged"];

type ArchiveProps = { motionEnabled: boolean };

export default function EpisodeArchive({ motionEnabled }: ArchiveProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [selected, setSelected] = useState<(typeof episodes)[number] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => episodes.filter((episode) => {
    const q = query.toLowerCase();
    const matchesQuery = episode.title.toLowerCase().includes(q) || episode.videoTitle?.toLowerCase().includes(q) || String(episode.number).includes(q);
    const matchesTag = tag === "All" || episode.tag === tag;
    return matchesQuery && matchesTag;
  }), [query, tag]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)");
    let frame = 0;

    const reset = () => {
      track.style.transform = "";
      section.style.setProperty("--archive-progress", "0");
    };

    const update = () => {
      frame = 0;
      if (!motionEnabled || reduced || mobile.matches) {
        reset();
        return;
      }
      const rect = section.getBoundingClientRect();
      const available = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max((-rect.top + 76) / available, 0), 1);
      const maxShift = Math.max(track.scrollWidth - sticky.clientWidth + 20, 0);
      section.style.setProperty("--archive-progress", progress.toFixed(4));
      track.style.transform = `translate3d(${(-progress * maxShift).toFixed(2)}px,0,0)`;
    };

    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobile.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobile.removeEventListener("change", requestUpdate);
      reset();
    };
  }, [motionEnabled, filtered.length]);

  return (
    <section ref={sectionRef} className="archive archive-cinematic section-shell" id="archive">
      <div ref={stickyRef} className="archive-sticky">
        <div className="archive-topline">
          <div className="section-kicker">THE ARCHIVE</div>
          <div className="archive-progress" aria-hidden="true"><span><i /></span><b>SCROLL THE TAPE</b></div>
        </div>

        <div className="section-heading-row archive-heading-row">
          <h2>Pull a story<br />off the wall.</h2>
          <p>Recent episodes with real video artwork where available. Search, filter, then move through the wall like a strip of studio tape.</p>
        </div>

        <div className="archive-tools">
          <label className="search-field">
            <span>Search episodes</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try 350 or influencer..." />
          </label>
          <div className="filter-row" aria-label="Episode categories">
            {tags.map((item) => (
              <button key={item} type="button" className={tag === item ? "filter active" : "filter"} onClick={() => setTag(item)}>{item}</button>
            ))}
          </div>
        </div>

        <div className="archive-track-viewport">
          <div ref={trackRef} className="episode-wall episode-wall-cinematic">
            {filtered.map((episode, index) => (
              <button
                type="button"
                key={episode.number}
                className="episode-poster episode-poster-media"
                style={{ "--tilt": `${index % 2 ? 1.3 : -1.6}deg` } as React.CSSProperties}
                onClick={() => setSelected(episode)}
              >
                <span className="episode-thumb" style={{ backgroundImage: `url("${episode.thumbnail}")` }} aria-hidden="true" />
                <span className="episode-thumb-shade" aria-hidden="true" />
                <span className="poster-index">0{index + 1}</span>
                <span className="poster-number">#{episode.number}</span>
                <span className="poster-tag">{episode.tag}</span>
                <strong>{episode.title}</strong>
                <span className="poster-meta">{episode.date} · {episode.duration}</span>
                <span className="poster-action">OPEN FILE →</span>
              </button>
            ))}
            {filtered.length === 0 && <div className="archive-empty">NO TAPES MATCH THAT SEARCH.</div>}
          </div>
        </div>
      </div>

      {selected && (
        <div className="episode-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <div className="episode-modal episode-modal-media" role="dialog" aria-modal="true" aria-label={`Episode ${selected.number}`} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelected(null)} aria-label="Close episode details">×</button>
            <div className="modal-thumb" style={{ backgroundImage: `url("${selected.thumbnail}")` }} />
            <div className="modal-number">EPISODE {selected.number}</div>
            <h3>{selected.title}</h3>
            {selected.videoTitle && <p className="modal-video-title">VIDEO: {selected.videoTitle}</p>}
            <p>{selected.tag} · {selected.date} · {selected.duration}</p>
            <div className="modal-actions">
              {selected.youtubeId && <a href={`https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noreferrer">WATCH ON YOUTUBE ↗</a>}
              <a href="/#listen">LISTEN OPTIONS</a>
              <button type="button" onClick={() => setSelected(null)}>BACK TO WALL</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

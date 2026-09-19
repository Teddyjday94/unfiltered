"use client";

import { useMemo, useState } from "react";

const episodes = [
  { number: 350, title: "He Won $1,000,000 Dollars?!?", tag: "Challenge" },
  { number: 349, title: "Revealing the Internet's Biggest Influencer Scammers", tag: "Internet Chaos" },
  { number: 348, title: "I'm In Love With A Serial Killer", tag: "Unhinged" },
  { number: 347, title: "Zane's Near Death Experience in South Africa", tag: "Stories" },
  { number: 346, title: "Zane Finally Opens Up About His Parents' Divorce", tag: "Life Updates" },
];

const tags = ["All", "Challenge", "Stories", "Internet Chaos", "Life Updates", "Unhinged"];

export default function EpisodeArchive() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [selected, setSelected] = useState<(typeof episodes)[number] | null>(null);

  const filtered = useMemo(() => episodes.filter((episode) => {
    const q = query.toLowerCase();
    const matchesQuery = episode.title.toLowerCase().includes(q) || String(episode.number).includes(q);
    const matchesTag = tag === "All" || episode.tag === tag;
    return matchesQuery && matchesTag;
  }), [query, tag]);

  return (
    <section className="archive section-shell" id="archive">
      <div className="section-kicker">THE ARCHIVE</div>
      <div className="section-heading-row">
        <h2>Pull a story<br />off the wall.</h2>
        <p>Fan-organized categories for exploring recent episodes. Search by title or episode number.</p>
      </div>

      <div className="archive-tools">
        <label className="search-field">
          <span>Search episodes</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try 350 or influencer…" />
        </label>
        <div className="filter-row" aria-label="Episode categories">
          {tags.map((item) => (
            <button key={item} type="button" className={tag === item ? "filter active" : "filter"} onClick={() => setTag(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="episode-wall">
        {filtered.map((episode, index) => (
          <button
            type="button"
            key={episode.number}
            className="episode-poster"
            style={{ "--tilt": `${index % 2 ? 1.3 : -1.6}deg` } as React.CSSProperties}
            onClick={() => setSelected(episode)}
          >
            <span className="poster-number">#{episode.number}</span>
            <span className="poster-tag">{episode.tag}</span>
            <strong>{episode.title}</strong>
            <span className="poster-action">OPEN FILE →</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="episode-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <div className="episode-modal" role="dialog" aria-modal="true" aria-label={`Episode ${selected.number}`} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelected(null)} aria-label="Close episode details">×</button>
            <div className="modal-number">EPISODE {selected.number}</div>
            <h3>{selected.title}</h3>
            <p>{selected.tag} · Fan archive category</p>
            <div className="modal-actions">
              <a href="#listen">LISTEN OPTIONS</a>
              <button type="button" onClick={() => setSelected(null)}>BACK TO WALL</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

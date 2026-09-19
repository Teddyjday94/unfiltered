import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CREW_IMAGE } from "@/lib/episodes";

const crew = [
  { name: "ZANE", handle: "@zane", href: "https://www.instagram.com/zane", note: "Host" },
  { name: "HEATH", handle: "@heathhussar", href: "https://www.instagram.com/heathhussar", note: "Host" },
  { name: "MARIAH", handle: "@mariahamato", href: "https://www.instagram.com/mariahamato", note: "Crew" },
  { name: "MATT", handle: "@mattrking", href: "https://www.instagram.com/mattrking", note: "Crew" },
];

export default function CrewPage() {
  return (
    <main className="site multipage-site inner-page">
      <div className="noise" aria-hidden="true" />
      <SiteHeader />
      <section className="page-hero crew-page-hero" style={{ "--page-hero-image": `url("${CREW_IMAGE}")` } as React.CSSProperties}>
        <div><span>THE FAMILIAR CREW</span><h1>IN THE<br />ROOM</h1><p>A cleaner editorial home for the people behind the conversations.</p></div>
      </section>
      <section className="crew section-shell crew-page-section">
        <div className="crew-layout">
          <figure className="crew-photo-wrap">
            <img src={CREW_IMAGE} alt="Group photo from the Unfiltered podcast set" />
            <figcaption>THE CREW // UNFILTERED</figcaption>
          </figure>
          <div className="crew-copy">
            <div className="section-kicker">ROLL CALL</div>
            <h2>Same room.<br />Different chaos.</h2>
            <p>Zane, Heath, Mariah, and Matt bring the stories, reactions, side comments, and energy that shape the show’s rhythm.</p>
            <div className="crew-credits">
              {crew.map((person, i) => (
                <a href={person.href} target="_blank" rel="noreferrer" key={person.name}>
                  <span>0{i + 1}</span><b>{person.name}</b><small>{person.note} · {person.handle}</small><i>↗</i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

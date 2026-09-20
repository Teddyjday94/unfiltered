import type { CSSProperties } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CREW_IMAGE } from "@/lib/episodes";

type StoryLink = {
  label: string;
  href: string;
};

type StoryBeat = {
  year: string;
  title: string;
  copy: string;
  links: StoryLink[];
};

type CrewStory = {
  name: string;
  role: string;
  handle: string;
  href: string;
  deck: string;
  intro: string;
  accent: string;
  position: string;
  beats: StoryBeat[];
};

const crewStories: CrewStory[] = [
  {
    name: "ZANE",
    role: "HOST",
    handle: "@zane",
    href: "https://www.instagram.com/zane",
    deck: "THE REINVENTION ARC",
    intro:
      "Zane has made the before-and-after part of the story. Two of his biggest public chapters — his hair-transplant vlog and his later Xeela fitness run — became long-form pieces of content instead of private footnotes.",
    accent: "Z",
    position: "22% center",
    beats: [
      {
        year: "2019",
        title: "THE HAIR TRANSPLANT",
        copy:
          "He documented the procedure himself in a YouTube video titled “My Hair Transplant Surgery Changed My Life,” turning a cosmetic procedure into one of the more personal uploads from that era.",
        links: [
          {
            label: "WATCH THE VIDEO",
            href: "https://www.youtube.com/watch?v=xlgUUp7lhgY",
          },
        ],
      },
      {
        year: "2024",
        title: "THE XEELA TRANSFORMATION",
        copy:
          "Zane later revisited the transformation idea through Xeela Fitness. Xeela says the seven-month run took him from 25.6% to 9.7% body fat, while Men’s Health profiled how the routine changed his day-to-day habits as well as his physique.",
        links: [
          {
            label: "MEN'S HEALTH",
            href: "https://www.menshealth.com/fitness/a60791690/zane-hijazi-weight-loss-transformation/",
          },
          {
            label: "XEELA STORY",
            href: "https://xeelafitness.com/pages/quiz-to-offer",
          },
        ],
      },
    ],
  },
  {
    name: "HEATH",
    role: "HOST",
    handle: "@heathhussar",
    href: "https://www.instagram.com/heathhussar",
    deck: "HUSBAND. DAD. STILL HEATH.",
    intro:
      "Heath’s biggest recent life updates have happened right alongside the show: planning a wedding with Mariah, getting married, and then introducing their son to the Unfiltered audience.",
    accent: "H",
    position: "44% center",
    beats: [
      {
        year: "2024–25",
        title: "THE WEDDING CHAPTER",
        copy:
          "Heath and Mariah used the podcast to talk through venue hunting and wedding planning before getting married on February 23, 2025. A post-wedding episode with Pretty Basic later unpacked what the day was actually like.",
        links: [
          {
            label: "WEDDING UPDATE",
            href: "https://www.youtube.com/watch?v=v5_U7BqLyY8",
          },
          {
            label: "NEWLYWED RECAP",
            href: "https://podcasts.apple.com/us/podcast/heath-and-mariahs-wedding-regrets/id1439655378?i=1000698847659",
          },
        ],
      },
      {
        year: "2026",
        title: "MEET BABY ANTONIO",
        copy:
          "In January 2026, Unfiltered introduced Heath and Mariah’s son Antonio — Tony — with an episode centered on the new family chapter and Heath’s first days as a dad.",
        links: [
          {
            label: "MEET ANTONIO",
            href: "https://podcasts.apple.com/us/podcast/meet-our-new-baby-antonio/id1478746415?i=1000743805996",
          },
        ],
      },
    ],
  },
  {
    name: "MARIAH",
    role: "CREW",
    handle: "@mariahamato",
    href: "https://www.instagram.com/mariahamato",
    deck: "FROM THE SIDE MIC TO A WHOLE NEW ERA",
    intro:
      "Mariah has always been more than the person chiming in from off camera. Her dance background, the wedding story with Heath, and her return after having Tony have all become part of the show’s ongoing lore.",
    accent: "M",
    position: "67% center",
    beats: [
      {
        year: "2025",
        title: "MR. + MRS. HUSSAR",
        copy:
          "After months of planning updates on the show, Mariah and Heath married in February 2025. Their newlywed recap covered the choices behind the day, the parts they skipped, and the moments that surprised them.",
        links: [
          {
            label: "HEAR THE RECAP",
            href: "https://podcasts.apple.com/us/podcast/heath-and-mariahs-wedding-regrets/id1439655378?i=1000698847659",
          },
        ],
      },
      {
        year: "2026",
        title: "MARIAH RETURNS",
        copy:
          "A week after the show introduced Antonio, Mariah came back for an episode focused on her pregnancy, the delivery-room story, and those first weeks figuring out life with a newborn.",
        links: [
          {
            label: "DELIVERY ROOM EPISODE",
            href: "https://podcasts.apple.com/us/podcast/mariah-is-back-delivery-room-drama/id1478746415?i=1000744804804",
          },
        ],
      },
    ],
  },
  {
    name: "MATT",
    role: "CREW",
    handle: "@mattrking",
    href: "https://www.instagram.com/mattrking",
    deck: "THE LOVE STORY GOT A PLOTLINE",
    intro:
      "Matt’s relationship with Patricia became one of the crew’s clearest real-life story arcs: a missed connection, an Instagram search, a proposal, and eventually a Birmingham wedding.",
    accent: "K",
    position: "84% center",
    beats: [
      {
        year: "2018–22",
        title: "FROM MISSED CONNECTION TO ENGAGEMENT",
        copy:
          "The Knot reported that Matt first met Patricia Flach at an SEC football championship-party weekend in 2018. They crossed paths again, began dating, and Matt proposed during a private picnic in October 2022.",
        links: [
          {
            label: "THE KNOT STORY",
            href: "https://www.theknot.com/content/patricia-flach-relationship",
          },
        ],
      },
      {
        year: "2023",
        title: "THE BIRMINGHAM WEDDING",
        copy:
          "Matt and Patricia married in Birmingham on October 14, 2023. Local coverage placed the ceremony at Holy Trinity Holy Cross Greek Orthodox Cathedral, followed by a reception at The Club.",
        links: [
          {
            label: "WEDDING COVERAGE",
            href: "https://bhamnow.com/2023/10/17/youtube-stars-spotted-in-the-magic-city-last-weekend/",
          },
        ],
      },
    ],
  },
];

export default function CrewPage() {
  return (
    <main className="site multipage-site inner-page crew-story-page">
      <div className="noise" aria-hidden="true" />
      <SiteHeader />

      <section
        className="page-hero crew-page-hero"
        style={{ "--page-hero-image": `url("${CREW_IMAGE}")` } as CSSProperties}
      >
        <div>
          <span>THE FAMILIAR CREW</span>
          <h1>THE<br />LORE</h1>
          <p>Not just bios. The weddings, transformations, big announcements, and life updates that became part of the show.</p>
        </div>
      </section>

      <section className="crew section-shell crew-page-section crew-story-intro">
        <div className="crew-layout">
          <figure className="crew-photo-wrap">
            <img src={CREW_IMAGE} alt="Group photo from the Unfiltered podcast set" />
            <figcaption>THE CREW // UNFILTERED</figcaption>
          </figure>
          <div className="crew-copy">
            <div className="section-kicker">MORE THAN A ROLL CALL</div>
            <h2>Everybody has<br />a running story.</h2>
            <p>
              The crew page now works like a living scrapbook. Each profile pulls together public moments they have shared themselves through videos, podcasts, interviews, and social posts — then points back to the original source so the story never feels invented.
            </p>
            <div className="crew-mini-index" aria-label="Crew index">
              {crewStories.map((person, index) => (
                <a href={`#crew-${person.name.toLowerCase()}`} key={person.name}>
                  <span>0{index + 1}</span>
                  <b>{person.name}</b>
                  <small>{person.deck}</small>
                  <i>↓</i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="crew-stories section-shell" aria-labelledby="crew-stories-title">
        <div className="crew-stories-heading">
          <div>
            <div className="section-kicker">PUBLIC STORY FILES</div>
            <h2 id="crew-stories-title">THE THINGS<br />THAT BECAME LORE.</h2>
          </div>
          <p>
            Built from public material only. Open a profile to see the chapter-by-chapter version, then jump to the original video, episode, interview, or post when you want the full story.
          </p>
        </div>

        <div className="crew-story-stack">
          {crewStories.map((person, index) => (
            <article className="crew-story-card" id={`crew-${person.name.toLowerCase()}`} key={person.name}>
              <div className="crew-story-visual" style={{ backgroundImage: `url("${CREW_IMAGE}")`, backgroundPosition: person.position }}>
                <span className="crew-story-number">0{index + 1}</span>
                <b className="crew-story-monogram">{person.accent}</b>
                <div className="crew-story-shade" />
                <div className="crew-story-id">
                  <small>{person.role}</small>
                  <strong>{person.name}</strong>
                  <a href={person.href} target="_blank" rel="noreferrer">{person.handle} ↗</a>
                </div>
              </div>

              <div className="crew-story-content">
                <div className="crew-story-deck">{person.deck}</div>
                <p className="crew-story-intro-copy">{person.intro}</p>

                <div className="crew-story-timeline">
                  {person.beats.map((beat) => (
                    <div className="crew-story-beat" key={`${person.name}-${beat.year}-${beat.title}`}>
                      <div className="crew-story-year">{beat.year}</div>
                      <div className="crew-story-beat-copy">
                        <h3>{beat.title}</h3>
                        <p>{beat.copy}</p>
                        <div className="crew-source-row">
                          {beat.links.map((link) => (
                            <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="crew-source-note">
          <span>SOURCE NOTE</span>
          <p>This is an unofficial fan experience. Story notes summarize publicly shared material and link back to the public source; they are not presented as private reporting or official biographies.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

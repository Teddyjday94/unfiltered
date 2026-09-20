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
  image: string;
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
      "Zane's public story has kept changing formats: Vine, YouTube, a weekly podcast, a coffee company, a filmed fitness transformation, and a second crossover show. The through-line is that the life update usually becomes the content.",
    accent: "Z",
    image: "/crew/zane.png",
    position: "center 42%",
    beats: [
      {
        year: "EARLY 2010s",
        title: "THE VINE YEARS",
        copy:
          "Long before the podcast table, Zane and Heath were part of the Vine era. In later interviews Zane has looked back on those early short-form years, the chaos around creator life, and the path that eventually led the duo toward longer conversations.",
        links: [
          {
            label: "EARLY VINE STORIES",
            href: "https://www.ivoox.com/zane-hijazi-audios-mp3_rf_75077224_1.html",
          },
        ],
      },
      {
        year: "2019",
        title: "UNFILTERED STARTS",
        copy:
          "On September 9, 2019, Zane and Heath released the first episode of Unfiltered, fittingly titled “Why We Hated Each Other.” What started as a loose conversation format became the long-running home base for the whole crew.",
        links: [
          {
            label: "EPISODE ONE",
            href: "https://audioboom.com/channel/zaneandheath?order=asc",
          },
        ],
      },
      {
        year: "2019",
        title: "THE HAIR TRANSPLANT",
        copy:
          "Zane documented his hair-transplant procedure in a video titled “My Hair Transplant Surgery Changed My Life,” turning something deeply personal into one of the more memorable self-transformation uploads from that era.",
        links: [
          {
            label: "WATCH THE VIDEO",
            href: "https://www.youtube.com/watch?v=xlgUUp7lhgY",
          },
        ],
      },
      {
        year: "2020",
        title: "KRAMODA GOES LIVE",
        copy:
          "Zane and Heath turned their recurring coffee-talk energy into Kramoda. Tubefilter reported that the pair had worked on the brand for about two years and that the first stock sold out within roughly seven hours of launch.",
        links: [
          {
            label: "KRAMODA LAUNCH",
            href: "https://www.tubefilter.com/2020/12/09/zane-hijazi-heath-hussar-kramoda-coffee/",
          },
        ],
      },
      {
        year: "2023–24",
        title: "THE XEELA TRANSFORMATION",
        copy:
          "After an earlier attempt did not stick, Zane returned to the Xeela process and made the full transformation part of his public story. Men’s Health later profiled how the months-long run changed not only his physique but also his everyday routines around food, drinking, going out, and training.",
        links: [
          {
            label: "MEN'S HEALTH",
            href: "https://www.menshealth.com/fitness/a60791690/zane-hijazi-weight-loss-transformation/",
          },
          {
            label: "ZANE ON THE PROCESS",
            href: "https://thesaricohen.com/zane-hijazi-how-the-vine-superstar-turned-his-penchant-for-comedy-into-unfiltered-success/",
          },
        ],
      },
      {
        year: "2024–NOW",
        title: "BASICALLY UNFILTERED",
        copy:
          "Zane and Heath added another weekly format with Basically Unfiltered, teaming with Pretty Basic hosts Remi Cruz and Alisha Marie. The crossover gave the duo a second podcast lane while the original Unfiltered continued.",
        links: [
          {
            label: "THE CROSSOVER SHOW",
            href: "https://podcasts.apple.com/us/podcast/basically-unfiltered-with-remi-alisha-zane-and-heath/id1737281584",
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
    deck: "FROM DUO PARTNER TO FAMILY MAN",
    intro:
      "Heath's timeline runs from the original Zane-and-Heath creator partnership into business, fitness, marriage, and fatherhood. Because so many of those chapters happened on-camera or on-mic, the podcast has become a record of his life changing in real time.",
    accent: "H",
    image: "/crew/heath.png",
    position: "center 42%",
    beats: [
      {
        year: "EARLY 2010s",
        title: "THE ZANE + HEATH ERA BEGINS",
        copy:
          "The friendship and creative partnership predates Unfiltered by years. In later interviews, Zane and Heath have revisited their Vine days, the early social-media landscape, and the friendship that carried from short-form sketches into longer creator projects.",
        links: [
          {
            label: "VINE + FRIENDSHIP TALK",
            href: "https://goodpods.com/podcasts/planbri-uncut-214731/in-the-ring-with-zane-and-heath-45151850",
          },
        ],
      },
      {
        year: "2019",
        title: "A WEEKLY HOME BASE",
        copy:
          "Unfiltered premiered in September 2019 and quickly became the place where Heath and Zane could tell the stories that did not fit inside short vlogs. Matt and Mariah were already part of the mix within the show's first few episodes.",
        links: [
          {
            label: "FIRST EPISODES",
            href: "https://audioboom.com/channel/zaneandheath?order=asc",
          },
        ],
      },
      {
        year: "2020",
        title: "FROM COFFEE TALK TO KRAMODA",
        copy:
          "The pair built Kramoda out of the coffee-talk identity surrounding their content. Coverage of the launch tied the brand directly back to the conversations that eventually became Unfiltered — making it one of the clearest examples of the show turning into a real-world business.",
        links: [
          {
            label: "READ THE LAUNCH STORY",
            href: "https://www.tubefilter.com/2020/12/09/zane-hijazi-heath-hussar-kramoda-coffee/",
          },
        ],
      },
      {
        year: "2022",
        title: "HEATH GOES THROUGH XEELA",
        copy:
          "Before Zane completed his later transformation, Heath became one of Xeela Fitness' featured transformation stories. Xeela still includes Heath in its public transformation lineup, making his fitness chapter part of the brand's own history.",
        links: [
          {
            label: "XEELA HALL OF FAME",
            href: "https://xeelafitness.com/pages/at-home-workout",
          },
        ],
      },
      {
        year: "2024",
        title: "A SECOND PODCAST TABLE",
        copy:
          "Basically Unfiltered paired Heath and Zane with Remi Cruz and Alisha Marie. The new show did not replace Unfiltered; it created a second space for Heath to talk about day-to-day life, relationships, and the next stages of adulthood.",
        links: [
          {
            label: "BASICALLY UNFILTERED",
            href: "https://podcasts.apple.com/us/podcast/basically-unfiltered-with-remi-alisha-zane-and-heath/id1737281584",
          },
        ],
      },
      {
        year: "2025",
        title: "HEATH + MARIAH GET MARRIED",
        copy:
          "After months of wedding-planning conversations, Heath and Mariah married in February 2025. Their newlywed appearance on Pretty Basic went behind the scenes on planning without a traditional wedding planner, family involvement, surprises from the day, and what they might have changed.",
        links: [
          {
            label: "NEWLYWED RECAP",
            href: "https://podcasts.apple.com/us/podcast/heath-and-mariahs-wedding-regrets/id1439655378?i=1000698847659",
          },
          {
            label: "WEDDING WEEKEND",
            href: "https://podcasts.apple.com/kh/podcast/50-heath-and-mariahs-wedding-weekend-recap/id1737281584?i=1000698142568",
          },
        ],
      },
      {
        year: "2026",
        title: "BECOMING TONY'S DAD",
        copy:
          "The family chapter became part of Unfiltered in January 2026 with “Meet Our New Baby Antonio.” A month later, Basically Unfiltered returned to the subject from the wider group's perspective as Heath adjusted to life as a new dad.",
        links: [
          {
            label: "MEET ANTONIO",
            href: "https://podcasts.apple.com/us/podcast/meet-our-new-baby-antonio/id1478746415?i=1000743805996",
          },
          {
            label: "BABY UPDATE",
            href: "https://podcasts.apple.com/us/podcast/94-heath-and-mariah-had-a-baby/id1737281584?i=1000748420449",
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
    deck: "THE STORY BEFORE — AND BEYOND — THE SIDE MIC",
    intro:
      "Mariah's story starts well before Unfiltered. Dance, teaching, moving into the Los Angeles creator world, the show, marriage, and motherhood all sit on the same timeline — which makes her profile much bigger than simply being 'Heath's wife.'",
    accent: "M",
    image: "/crew/mariah.png",
    position: "center 40%",
    beats: [
      {
        year: "BEFORE LA",
        title: "DANCE WAS THE FIRST CHAPTER",
        copy:
          "Mariah has spoken publicly about growing up in dance and building her identity around performance long before the podcast. Her Hoot & a Half conversation with Matt focused on her dance career, childhood, family, and the road that eventually connected her to Unfiltered.",
        links: [
          {
            label: "MARIAH ON HOOT & A HALF",
            href: "https://open.spotify.com/episode/4Sk0Q3yv4LyIq3aNrglDts",
          },
        ],
      },
      {
        year: "LA YEARS",
        title: "MAKING IT AS A DANCER",
        copy:
          "In a 2022 interview on Making Moves, Mariah discussed her beginnings, how she got started in Los Angeles, working as a dancer, and the way social media changed the direction of her career. That gives the crew story a real 'before the podcast' foundation.",
        links: [
          {
            label: "MAKING MOVES INTERVIEW",
            href: "https://podcasts.apple.com/us/podcast/mariah-amato-making-it-as-a-dancer-in-la-how-social/id1434230458?i=1000567524688",
          },
        ],
      },
      {
        year: "2019",
        title: "PART OF UNFILTERED FROM THE BEGINNING",
        copy:
          "Mariah was not a late addition to the show's personality. By episode three of Unfiltered, the episode description was already calling out a game moderated by Matt and Mariah — establishing the four-person chemistry almost immediately.",
        links: [
          {
            label: "EARLY EPISODE ARCHIVE",
            href: "https://audioboom.com/channel/zaneandheath?order=asc",
          },
        ],
      },
      {
        year: "2020–24",
        title: "THE CREW ROLE BECOMES ITS OWN THING",
        copy:
          "Across podcast appearances and interviews, Mariah increasingly became a voice in the conversation rather than background production. Her dance stories, family stories, opinions, and relationship updates gave the show a perspective that was distinctly hers.",
        links: [
          {
            label: "HER 2020 CREW INTERVIEW",
            href: "https://open.spotify.com/episode/4Sk0Q3yv4LyIq3aNrglDts",
          },
          {
            label: "HER 2022 CAREER INTERVIEW",
            href: "https://podcasts.apple.com/us/podcast/mariah-amato-making-it-as-a-dancer-in-la-how-social/id1434230458?i=1000567524688",
          },
        ],
      },
      {
        year: "2025",
        title: "MR. + MRS. HUSSAR",
        copy:
          "Mariah and Heath's wedding became a multi-episode story instead of a single announcement. Their post-wedding Pretty Basic conversation covered the meaning behind Mariah's dress, the family-led planning process, wedding-day surprises, and what newlywed life looked like right after the event.",
        links: [
          {
            label: "HEAR THE NEWLYWED RECAP",
            href: "https://podcasts.apple.com/us/podcast/heath-and-mariahs-wedding-regrets/id1439655378?i=1000698847659",
          },
        ],
      },
      {
        year: "2026",
        title: "MOTHERHOOD ENTERS THE STORY",
        copy:
          "The show introduced baby Antonio in early January. One week later, Mariah returned for an episode centered on her pregnancy, delivery-room experience, and the first stretch of parenthood — telling the family milestone in her own voice rather than only through Heath's perspective.",
        links: [
          {
            label: "MEET ANTONIO",
            href: "https://podcasts.apple.com/us/podcast/meet-our-new-baby-antonio/id1478746415?i=1000743805996",
          },
          {
            label: "MARIAH RETURNS",
            href: "https://podcasts.apple.com/mx/podcast/mariah-is-back-delivery-room-drama/id1478746415?i=1000744804804",
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
    deck: "FROM A SIX-SECOND VINE TO A FULL PODCAST ERA",
    intro:
      "Matt's path is almost a timeline of creator media itself: college, Vine virality, leaving a conventional job, becoming part of the Unfiltered table, launching his own interview show, building another group podcast, and turning his relationship with Patricia into a public life chapter.",
    accent: "K",
    image: "/crew/matt.png",
    position: "55% center",
    beats: [
      {
        year: "2014",
        title: "“LOVE ON TOP” CHANGES EVERYTHING",
        copy:
          "While studying advertising at the University of Texas at Austin, Matt posted a six-second Vine of himself lip-syncing Beyoncé's “Love on Top.” Daily Dot later reported that the clip became one of Vine's most-shared posts and rapidly pushed him into the platform's creator scene.",
        links: [
          {
            label: "THE DAILY DOT PROFILE",
            href: "https://dailydot.com/matt-king-vine-beyonce-love-on-top",
          },
        ],
      },
      {
        year: "2015",
        title: "LEAVING THE NORMAL JOB PATH",
        copy:
          "After college, Matt moved to Los Angeles for an advertising job while his online following kept growing. He eventually decided the two-track life was not sustainable and left the traditional role to pursue creator work more seriously.",
        links: [
          {
            label: "READ HIS EARLY CAREER STORY",
            href: "https://dailydot.com/matt-king-vine-beyonce-love-on-top",
          },
        ],
      },
      {
        year: "2019",
        title: "THE FOUR-PERSON UNFILTERED CHEMISTRY",
        copy:
          "Matt and Mariah were woven into Unfiltered almost immediately. The earliest episode archive shows both of them participating by episode three, which is why the show has always felt closer to a four-person hangout than a strict two-host interview format.",
        links: [
          {
            label: "EARLY UNFILTERED ARCHIVE",
            href: "https://audioboom.com/channel/zaneandheath?order=asc",
          },
        ],
      },
      {
        year: "2020–25",
        title: "HOOT & A HALF",
        copy:
          "Matt launched Hoot & a Half in 2020 and built it around longer conversations with friends, creators, musicians, and actors. Apple Podcasts lists 130 episodes through 2025, giving Matt a separate lane where he could be the primary interviewer and storyteller.",
        links: [
          {
            label: "HOOT & A HALF ARCHIVE",
            href: "https://podcasts.apple.com/us/podcast/hoot-a-half-with-matt-king/id1511834329",
          },
        ],
      },
      {
        year: "2022–25",
        title: "GOOD INFLUENCES",
        copy:
          "Hoot & a Half eventually helped spark another group show: Good Influences with Matt, Mike Sheffer, Carly Incontro, and Erin Gilfoy. The four later described the idea as growing naturally out of guest appearances, and the show wrapped with a final episode in September 2025.",
        links: [
          {
            label: "THE FINAL EPISODE",
            href: "https://podscan.fm/podcasts/good-influences/episodes/the-final-episode-of-good-influences-1",
          },
        ],
      },
      {
        year: "2018–23",
        title: "MATT + PATRICIA",
        copy:
          "The Knot traced Matt and Patricia Flach's story back to an SEC football championship-party weekend in 2018, followed by a missed connection, an Instagram search, and a later reunion. Matt proposed during a private Los Angeles picnic in October 2022.",
        links: [
          {
            label: "THEIR RELATIONSHIP STORY",
            href: "https://www.theknot.com/content/patricia-flach-relationship",
          },
        ],
      },
      {
        year: "2023",
        title: "THE BIRMINGHAM WEDDING",
        copy:
          "Matt and Patricia married in Birmingham on October 14, 2023. Local coverage reported a ceremony at Holy Trinity Holy Cross Greek Orthodox Cathedral followed by a reception at The Club, bringing the relationship arc that fans had watched for years into a major real-life milestone.",
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

const totalChapters = crewStories.reduce((total, person) => total + person.beats.length, 0);

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
          <p>Career pivots, transformations, side quests, weddings, new shows, and the life updates that became part of Unfiltered.</p>
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
              The crew page now works like a living scrapbook: {totalChapters} public chapters across four people. Each profile follows the career moves, projects, relationships, transformations, and family milestones they have chosen to share publicly — with the original source attached to every chapter.
            </p>
            <div className="crew-lore-stats" aria-label="Crew lore totals">
              <div><strong>{crewStories.length}</strong><span>CREW FILES</span></div>
              <div><strong>{totalChapters}</strong><span>STORY CHAPTERS</span></div>
              <div><strong>2014–26</strong><span>ERA COVERED</span></div>
            </div>
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
            Scroll each file like a mini documentary. The portrait stays with you while the timeline moves through the chapters — and every “watch” or “read” button leads back to public material instead of rumor.
          </p>
        </div>

        <div className="crew-story-stack">
          {crewStories.map((person, index) => (
            <article className="crew-story-card" id={`crew-${person.name.toLowerCase()}`} key={person.name}>
              <div className="crew-story-visual" style={{ backgroundImage: `url("${person.image}")`, backgroundPosition: person.position }}>
                <span className="crew-story-number">0{index + 1}</span>
                <b className="crew-story-monogram">{person.accent}</b>
                <div className="crew-story-shade" />
                <div className="crew-story-id">
                  <small>{person.role}</small>
                  <strong>{person.name}</strong>
                  <div className="crew-story-id-meta">
                    <span>{person.beats.length} CHAPTERS</span>
                    <a href={person.href} target="_blank" rel="noreferrer">{person.handle} ↗</a>
                  </div>
                </div>
              </div>

              <div className="crew-story-content">
                <div className="crew-story-deck">{person.deck}</div>
                <p className="crew-story-intro-copy">{person.intro}</p>

                <div className="crew-story-timeline">
                  {person.beats.map((beat, beatIndex) => (
                    <div className="crew-story-beat" key={`${person.name}-${beat.year}-${beat.title}`}>
                      <div className="crew-story-year">
                        <span>{String(beatIndex + 1).padStart(2, "0")}</span>
                        {beat.year}
                      </div>
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
          <p>This is an unofficial fan experience. Story notes summarize material the crew has discussed publicly through their own podcasts, videos, interviews, brands, or documented coverage. Rumors and private-life speculation are intentionally left out.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

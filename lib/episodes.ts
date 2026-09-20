export const STUDIO_IMAGE = "https://i.pinimg.com/736x/d9/27/b4/d927b4dd9d336ef4e36bbd1bd7b9c28c.jpg";
export const HERO_IMAGE = "/hero-studio-hq.png";
export const CREW_IMAGE = "https://i.pinimg.com/736x/8d/c8/ba/8dc8baf8fb4c5cfd61d486f90e7494d1.jpg";

export type Episode = {
  number: number;
  title: string;
  videoTitle?: string;
  tag: string;
  date: string;
  duration: string;
  youtubeId?: string;
  thumbnail: string;
};

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/hq720.jpg`;

export const episodes: Episode[] = [
  {
    number: 350,
    title: "He Won $1,000,000 Dollars?!?",
    videoTitle: "We Solved MrBeast's $1,000,000 Puzzle!",
    tag: "Challenge",
    date: "September 14, 2026",
    duration: "79 min",
    youtubeId: "tILC-A0pGb4",
    thumbnail: yt("tILC-A0pGb4"),
  },
  {
    number: 349,
    title: "Revealing the Internet's Biggest Influencer Scammers",
    videoTitle: "Revealing the Internet's Biggest Scammers",
    tag: "Internet Chaos",
    date: "September 7, 2026",
    duration: "83 min",
    youtubeId: "3JM0_1Flb5A",
    thumbnail: yt("3JM0_1Flb5A"),
  },
  {
    number: 348,
    title: "I'm In Love With A Serial Killer",
    videoTitle: "I'm In Love with a Serial Killer...",
    tag: "Unhinged",
    date: "August 31, 2026",
    duration: "73 min",
    youtubeId: "ZWkPeAzuSZI",
    thumbnail: yt("ZWkPeAzuSZI"),
  },
  {
    number: 347,
    title: "Zane's Near Death Experience in South Africa",
    videoTitle: "Zane Talks About His INSANE South African Safari Trip",
    tag: "Stories",
    date: "August 24, 2026",
    duration: "74 min",
    thumbnail: STUDIO_IMAGE,
  },
  {
    number: 346,
    title: "Zane Finally Opens Up About His Parents' Divorce",
    videoTitle: "Zane Finally Reveals a Dark Secret From His Childhood...",
    tag: "Life Updates",
    date: "August 17, 2026",
    duration: "68 min",
    youtubeId: "vxd4L5J61_c",
    thumbnail: yt("vxd4L5J61_c"),
  },
];

export const latestEpisode = episodes[0];

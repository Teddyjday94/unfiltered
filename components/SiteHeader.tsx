"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  motionEnabled?: boolean;
  onToggleMotion?: () => void;
};

const links = [
  { href: "/", label: "HOME" },
  { href: "/episodes", label: "EPISODES" },
  { href: "/crew", label: "CREW" },
  { href: "/studio", label: "STUDIO" },
];

export default function SiteHeader({ motionEnabled, onToggleMotion }: Props) {
  const pathname = usePathname();

  return (
    <header className="topbar multipage-topbar">
      <Link className="mini-brand" href="/" aria-label="Unfiltered Studio home">
        <span>Z + H</span><b>UNFILTERED</b>
      </Link>
      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            className={pathname === link.href ? "active" : ""}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {onToggleMotion ? (
        <button type="button" className="motion-toggle" onClick={onToggleMotion} aria-pressed={motionEnabled}>
          <span className={motionEnabled ? "toggle-dot on" : "toggle-dot"} /> MOTION {motionEnabled ? "ON" : "OFF"}
        </button>
      ) : <div className="topbar-tag">FAN CONCEPT</div>}
    </header>
  );
}

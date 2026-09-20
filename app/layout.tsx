import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unfiltered Studio | Fan Concept",
  description: "An unofficial interactive 3D fan concept inspired by Zane and Heath: Unfiltered.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shiplog-snowy.vercel.app"),
  title: {
    default: "shiplog — Summer Pilot 2026",
    template: "%s · shiplog",
  },
  description:
    "Proof of work, not a portfolio. Live deploys, GitHub-native Vote: up, partner intros, and PM pulse for the Hult Cohort Program Summer Pilot 2026.",
  openGraph: {
    title: "shiplog — Summer Pilot 2026",
    description:
      "Vibe marketing launchpad for Summer Pilot 2026. Real ships. GitHub reviews. Partner intros.",
    url: "https://shiplog-snowy.vercel.app",
    siteName: "shiplog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shiplog — Summer Pilot 2026",
    description: "Proof of work, not a portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col">
        <div className="grain" aria-hidden="true" />
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

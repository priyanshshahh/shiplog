import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ThemeScript } from "@/components/ThemeScript";
import { Providers } from "@/components/Providers";
import { hasAuthConfig } from "@/auth";
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
    default: "shiplog · Summer Pilot 2026",
    template: "%s · shiplog",
  },
  description:
    "Public vibe marketing roster for the Hult Cohort Summer Pilot 2026. Live deploys, profiles, and partner intros.",
  openGraph: {
    title: "shiplog · Summer Pilot 2026",
    description: "Proof of work, not a portfolio.",
    url: "https://shiplog-snowy.vercel.app",
    siteName: "shiplog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shiplog · Summer Pilot 2026",
    description: "Proof of work, not a portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authEnabled = hasAuthConfig();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          <div className="grain" aria-hidden="true" />
          <Nav authEnabled={authEnabled} />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

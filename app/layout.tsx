import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Agent Ignore - AI Coding Assistant Ignore Templates",
  description: "Curated ignore file templates for AI coding assistants like OpenClaw, Claude Code, Gemini, Claude, Cursor, Cline, Windsurf, GitHub Copilot, and more. Download or copy ignore configurations for your AI pair programming tools.",
  keywords: [
    "OpenClaw",
    "Claude Code",
    "Gemini",
    "AI coding assistant",
    "ignore files",
    "Claude",
    "Cursor",
    "Cline",
    "GitHub Copilot",
    "Windsurf",
    "Codeium",
    "Tabnine",
    "AI pair programming",
    ".openclawignore",
    ".claudeignore",
    ".cursorignore",
    "gitignore for AI",
  ],
  authors: [{ name: "Agent Ignore Contributors" }],
  creator: "Agent Ignore",
  publisher: "Agent Ignore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://agentignore.vercel.app",
    title: "Agent Ignore - AI Coding Assistant Ignore Templates",
    description: "Curated ignore file templates for AI coding assistants. Download configurations for OpenClaw, Claude Code, Gemini, Claude, Cursor, Cline, and more.",
    siteName: "Agent Ignore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Ignore - AI Coding Assistant Ignore Templates",
    description: "Curated ignore file templates for AI coding assistants",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://agentignore.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

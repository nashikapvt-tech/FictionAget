import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PageMind — AI Book Summaries in 60 Seconds",
  description: "Multi-agent AI that transforms any book into actionable wisdom. Deep analysis, chapter breakdowns, and key insights delivered in under a minute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
        {children}
      </body>
    </html>
  );
}

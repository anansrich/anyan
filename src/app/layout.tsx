import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mental Consultant Portfolio | Luxury Editorial Design",
  description: "A premium, minimalist portfolio for a luxury psychological consultant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased relative">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

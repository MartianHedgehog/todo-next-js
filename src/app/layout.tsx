import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just plan it",
  description: "Todo planner",
};

const rubik = Rubik({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className}  antialiased`}>{children}</body>
    </html>
  );
}

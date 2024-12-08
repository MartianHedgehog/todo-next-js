import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

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
    <StoreProvider>
      <html lang="en">
        <body className={`${rubik.className}  antialiased`}>{children}</body>
      </html>
    </StoreProvider>
  );
}

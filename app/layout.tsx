import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Persona Hub",
  description: "Your personal hub for connecting and sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans3.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSans3.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

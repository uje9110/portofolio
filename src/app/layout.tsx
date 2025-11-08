"use client";
import { GlobalContextProvider } from "@/lib/context/global";
import "./globals.css";
import { Michroma, Space_Grotesk } from "next/font/google";

export const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"], // Michroma has only one weight
  variable: "--font-michroma", // optional CSS variable name
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // you can pick whichever you need
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <html className={`${michroma.className}`}>
        <body className={`antialiased h-screen  `}>
          {children}
        </body>
      </html>
    </GlobalContextProvider>
  );
}

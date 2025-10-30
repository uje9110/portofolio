"use client";
import { GlobalContextProvider } from "@/lib/context/global";
import "./globals.css";
import { Michroma } from "next/font/google";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"], // Michroma has only one weight
  variable: "--font-michroma", // optional CSS variable name
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <html lang="en" className={michroma.variable}>
        <body className={`antialiased h-screen ${michroma.className} `}>
          {children}
        </body>
      </html>
    </GlobalContextProvider>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google"
import { twMerge } from "tailwind-merge";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const dm_Sans = DM_Sans({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Autopart",
  description: "Autopart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={twMerge(dm_Sans.className, "antialiased bg-white")}
      >
        {children}
      </body>
    </html>
  );
}

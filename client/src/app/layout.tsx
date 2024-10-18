import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryWrapper from "@/config/QueryWrapper";
import { Toaster } from "react-hot-toast";
import {Inter} from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AutoPart",
  description: "AutoPart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryWrapper>
        <body
          className={`${inter.className} antialiased bg-[#EAEEFE]`}
        >
          {children}
          <Toaster />
        </body>
      </QueryWrapper>
    </html>
  );
}

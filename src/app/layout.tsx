import type { Metadata } from "next";
import { Roboto_Slab, Cousine, Montserrat, Manrope } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthTokenVerify from "@/components/auth/AuthTokenVerify";
import Script from "next/script";

const robotoSlab = Roboto_Slab({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-robotoSlab",
});
const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const cousine = Cousine({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cousine",
});
const manrope = Manrope({
  display: "swap",
  style: "normal",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Msgbits",
  description:
    "Connect instantly with a secure, real-time messaging app built for today's world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${cousine.variable} ${montserrat.variable} ${manrope.variable}`}
    >
      <body className="mx-auto max-w-screen-xl" data-theme="blue">
        <StoreProvider>
          <AuthTokenVerify />
          {children}
        </StoreProvider>
        <Toaster theme="light" />

        <Script
          strategy="beforeInteractive"
          src="https://accounts.google.com/gsi/client"
        />
        <Script
          strategy="beforeInteractive"
          src="https://connect.facebook.net/en_US/all.js"
        />
      </body>
    </html>
  );
}

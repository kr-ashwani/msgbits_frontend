import type { Metadata } from "next";
import { Roboto_Slab, Cousine, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthTokenVerify from "@/components/auth/AuthTokenVerify";
import Script from "next/script";

const roboto_slab = Roboto_Slab({
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

export const metadata: Metadata = {
  title: "Msgbits",
  description: "A roboust messaging for mordern world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto_slab.variable} ${cousine.variable} ${montserrat.variable}`}
    >
      <body className="mx-auto max-w-screen-xl">
        <StoreProvider>
          <AuthTokenVerify />
          {children}
        </StoreProvider>
        <Toaster theme="light" />

        <Script
          strategy="beforeInteractive"
          src="https://accounts.google.com/gsi/client"
        />
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/all.js"
        />
      </body>
    </html>
  );
}

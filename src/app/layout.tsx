import type { Metadata } from "next";
import { Roboto_Slab, Cousine, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthTokenVerify from "@/components/auth/AuthTokenVerify";

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
      </body>
    </html>
  );
}

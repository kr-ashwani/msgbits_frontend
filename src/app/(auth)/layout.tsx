import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header nav={{ label: "Home", link: "/" }} />
      {children}
      <Footer />
    </>
  );
}

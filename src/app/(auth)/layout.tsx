import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthRoute from "@/components/auth/AuthRoute";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header nav={{ label: "Home", link: "/" }} />
      <AuthRoute>{children}</AuthRoute>
      <Footer />
    </>
  );
}

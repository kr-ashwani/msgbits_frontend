import Footer from "@/components/utility/Footer";
import Header from "@/components/utility/Header";
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

import ProtectedRoute from "@/components/auth/ProtectedRoutes";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { SocketProvider } from "@/context/SocketContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute>
        <SocketProvider>{children}</SocketProvider>
      </ProtectedRoute>
    </>
  );
}

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { CallManagerProvider } from "@/context/CallManagerContext";
import { SocketProvider } from "@/context/SocketContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute>
        <SocketProvider>
          <CallManagerProvider>{children}</CallManagerProvider>
        </SocketProvider>
      </ProtectedRoute>
    </>
  );
}

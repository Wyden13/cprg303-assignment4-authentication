import { router, Stack } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return; // wait until we know if a session exists
    if (!session) {
      router.replace("/login");
    } else {
      router.replace("/main");
    }
  }, [session, isLoading]);
  if (isLoading) return null;
  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthGuard>
    </AuthProvider>
  );
}

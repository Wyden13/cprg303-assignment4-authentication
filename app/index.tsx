import { ActivityIndicator, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return <Redirect href={session ? "/main" : "/login"} />;
}

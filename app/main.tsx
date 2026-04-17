import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { theme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
export default function Main() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Protected-Screen - User is authenticated</Text>

      <Pressable
        style={({ pressed }) => [
          styles.signOutButton,
          pressed && styles.signOutPressed,
        ]}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={20} color={theme.colors.card} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: theme.spacing.card,
    alignItems: "center",
    marginTop: 28,
    flexDirection: "row",
    gap: 8,
  },
  signOutPressed: { opacity: 0.7 },
  signOutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { theme } from "../styles/theme";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be less than 32 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "Password must contain at least one special character",
  });

const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters."),
    email: z.string().trim().email("Please enter a valid email address."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        },
      );

      if (signUpError) {
        Alert.alert("Sign Up Error", signUpError.message);
        return;
      }

      if (!authData.user) {
        Alert.alert("Error", "Failed to create account");
        return;
      }

      Alert.alert("Success!", "Account created. Please log in.", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="radio" size={36} color={theme.colors.primary} />
          </View>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create a new account</Text>
        </View>
        {/* Full Name input */}
        <Text style={styles.label}>
          Full Name {errors.fullName && `- ${errors.fullName.message}`}
        </Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="e.g. Jane"
              placeholderTextColor={theme.colors.muted}
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
              editable={!loading}
            />
          )}
        />

        {/* Email input */}
        <Text style={styles.label}>
          Email {errors.email && `- ${errors.email.message}`}
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="e.g. jane.doe@company.com"
              placeholderTextColor={theme.colors.muted}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          )}
        />

        {/* Password */}
        <Text style={styles.label}>
          Password {errors.password && `- ${errors.password.message}`}
        </Text>
        <View
          style={[
            styles.passwordContainer,
            errors.password && styles.passwordContainerError,
          ]}
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordField}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.muted}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
            )}
          />
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            hitSlop={8}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={theme.colors.muted}
            />
          </Pressable>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>
          Confirm Password{" "}
          {errors.confirmPassword && `- ${errors.confirmPassword.message}`}
        </Text>
        <View
          style={[
            styles.passwordContainer,
            errors.confirmPassword && styles.passwordContainerError,
          ]}
        >
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordField}
                placeholder="Confirm your password"
                placeholderTextColor={theme.colors.muted}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
              />
            )}
          />
          <Pressable
            onPress={() => setShowConfirmPassword((s) => !s)}
            hitSlop={8}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={theme.colors.muted}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </Pressable>

        <View style={styles.textRow}>
          <Text style={styles.text}>Already have an account? </Text>
          <Pressable
            onPress={() => router.replace("/login")}
            disabled={loading}
          >
            <Text style={styles.link}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen,
    paddingTop: 60,
    flexGrow: 1,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f0fd", // light primary tint
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  text: {
    fontSize: 16,
    color: theme.colors.muted,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: theme.colors.muted,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 12,
    fontSize: 15,
    color: theme.colors.text,
    backgroundColor: theme.colors.card,
    marginBottom: 12,
  },
  inputError: {
    borderColor: theme.colors.error,
    backgroundColor: "#fff5f5",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    backgroundColor: theme.colors.card,
    paddingRight: 12,
    marginBottom: 12,
  },
  passwordContainerError: {
    borderColor: theme.colors.error,
    backgroundColor: "#fff5f5",
  },
  passwordField: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  eyeBtn: {
    padding: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  link: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "600",
  },
});

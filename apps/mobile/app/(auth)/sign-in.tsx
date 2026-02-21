import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = useCallback(async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signIn, email, password, setActive, router]);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-warm-white">
        <ActivityIndicator size="large" color="#C4704B" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-warm-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-1 justify-center px-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-12">
            <Text className="font-serif text-4xl font-bold text-charcoal">
              HumanHomes
            </Text>
            <Text className="mt-2 text-base text-charcoal/60">
              Where home stories begin
            </Text>
          </View>

          {error ? (
            <View className="mb-4 rounded-xl bg-brick/10 px-4 py-3">
              <Text className="text-sm text-brick">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-charcoal">
              Email
            </Text>
            <TextInput
              className="rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base text-charcoal"
              placeholder="you@example.com"
              placeholderTextColor="#2D2D2D60"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-sm font-medium text-charcoal">
              Password
            </Text>
            <TextInput
              className="rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base text-charcoal"
              placeholder="Your password"
              placeholderTextColor="#2D2D2D60"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <Pressable
            className="w-full items-center rounded-xl bg-terracotta px-6 py-4"
            onPress={onSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">
                Sign In
              </Text>
            )}
          </Pressable>

          <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-sm text-charcoal/60">
              Don't have an account?{" "}
            </Text>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable>
                <Text className="text-sm font-semibold text-terracotta">
                  Sign Up
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUp = useCallback(async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, firstName, lastName, email, password]);

  const onVerify = useCallback(async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid verification code.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, code, setActive, router]);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-warm-white">
        <ActivityIndicator size="large" color="#C4704B" />
      </SafeAreaView>
    );
  }

  if (pendingVerification) {
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
            <View className="items-center mb-8">
              <Text className="font-serif text-3xl font-bold text-charcoal">
                Check Your Email
              </Text>
              <Text className="mt-3 text-center text-base text-charcoal/60">
                We sent a verification code to {email}
              </Text>
            </View>

            {error ? (
              <View className="mb-4 rounded-xl bg-brick/10 px-4 py-3">
                <Text className="text-sm text-brick">{error}</Text>
              </View>
            ) : null}

            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-charcoal">
                Verification Code
              </Text>
              <TextInput
                className="rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-center text-2xl tracking-widest text-charcoal"
                placeholder="000000"
                placeholderTextColor="#2D2D2D60"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoComplete="one-time-code"
              />
            </View>

            <Pressable
              className="w-full items-center rounded-xl bg-terracotta px-6 py-4"
              onPress={onVerify}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-base font-semibold text-white">
                  Verify Email
                </Text>
              )}
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
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
          <View className="items-center mb-10">
            <Text className="font-serif text-3xl font-bold text-charcoal">
              Join HumanHomes
            </Text>
            <Text className="mt-2 text-center text-base text-charcoal/60">
              Where communities find their homes
            </Text>
          </View>

          {error ? (
            <View className="mb-4 rounded-xl bg-brick/10 px-4 py-3">
              <Text className="text-sm text-brick">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-charcoal">
                First Name
              </Text>
              <TextInput
                className="rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base text-charcoal"
                placeholder="First"
                placeholderTextColor="#2D2D2D60"
                value={firstName}
                onChangeText={setFirstName}
                autoComplete="given-name"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-charcoal">
                Last Name
              </Text>
              <TextInput
                className="rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base text-charcoal"
                placeholder="Last"
                placeholderTextColor="#2D2D2D60"
                value={lastName}
                onChangeText={setLastName}
                autoComplete="family-name"
              />
            </View>
          </View>

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
              placeholder="Create a password"
              placeholderTextColor="#2D2D2D60"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          <Pressable
            className="w-full items-center rounded-xl bg-terracotta px-6 py-4"
            onPress={onSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">
                Create Account
              </Text>
            )}
          </Pressable>

          <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-sm text-charcoal/60">
              Already have an account?{" "}
            </Text>
            <Link href="/(auth)/sign-in" asChild>
              <Pressable>
                <Text className="text-sm font-semibold text-terracotta">
                  Sign In
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

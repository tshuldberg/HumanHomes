import "../src/styles/global.css";

import { Slot } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "../src/lib/auth";

const publishableKey = process.env["EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"];

if (!publishableKey) {
  throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is required");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <StatusBar style="dark" />
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

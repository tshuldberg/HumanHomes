"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface DevUser {
  id: string;
  fullName: string;
  firstName: string;
  primaryEmailAddress: { emailAddress: string };
  imageUrl: string | null;
}

interface DevAuthContext {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: DevUser | null;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
}

const DEV_USER: DevUser = {
  id: "dev_admin_001",
  fullName: "Admin User",
  firstName: "Admin",
  primaryEmailAddress: { emailAddress: "admin@humanhomes.dev" },
  imageUrl: null,
};

const SESSION_KEY = "humanhomes_dev_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function readSessionCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .some((part) => part === `${SESSION_KEY}=true`);
}

function writeSessionCookie(isSignedIn: boolean): void {
  if (typeof document === "undefined") return;
  if (isSignedIn) {
    document.cookie = `${SESSION_KEY}=true; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax`;
    return;
  }
  document.cookie = `${SESSION_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

const DevAuthCtx = createContext<DevAuthContext>({
  isLoaded: false,
  isSignedIn: false,
  user: null,
  signIn: () => false,
  signOut: () => {},
});

export function DevAuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasSessionStorage = sessionStorage.getItem(SESSION_KEY) === "true";
    const hasCookie = readSessionCookie();
    const nextSignedIn = hasSessionStorage || hasCookie;
    if (nextSignedIn) {
      sessionStorage.setItem(SESSION_KEY, "true");
      writeSessionCookie(true);
    }
    setIsSignedIn(nextSignedIn);
    setIsLoaded(true);
  }, []);

  const signIn = useCallback((username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem(SESSION_KEY, "true");
      writeSessionCookie(true);
      setIsSignedIn(true);
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    writeSessionCookie(false);
    setIsSignedIn(false);
  }, []);

  return (
    <DevAuthCtx.Provider
      value={{ isLoaded, isSignedIn, user: isSignedIn ? DEV_USER : null, signIn, signOut }}
    >
      {children}
    </DevAuthCtx.Provider>
  );
}

export function useDevAuth() {
  return useContext(DevAuthCtx);
}

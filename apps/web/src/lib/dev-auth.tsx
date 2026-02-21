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
    setIsSignedIn(sessionStorage.getItem(SESSION_KEY) === "true");
    setIsLoaded(true);
  }, []);

  const signIn = useCallback((username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsSignedIn(true);
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
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

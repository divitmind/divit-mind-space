"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  isNeuroFriendly: boolean;
  toggleNeuroFriendly: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isNeuroFriendly, setIsNeuroFriendly] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem("neuro-friendly");
    if (saved === "true") setIsNeuroFriendly(true);
  }, []);

  const toggleNeuroFriendly = () => {
    const nextState = !isNeuroFriendly;
    setIsNeuroFriendly(nextState);
    localStorage.setItem("neuro-friendly", String(nextState));
    
    // Apply/Remove class to html tag for global CSS targeting
    if (nextState) {
      document.documentElement.classList.add("neuro-friendly");
    } else {
      document.documentElement.classList.remove("neuro-friendly");
    }
  };

  return (
    <AccessibilityContext.Provider value={{ isNeuroFriendly, toggleNeuroFriendly }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}

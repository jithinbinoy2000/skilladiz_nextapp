"use client";

import { SessionProvider } from "next-auth/react";

// Client provider to access session info in the app.
export default function AuthSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

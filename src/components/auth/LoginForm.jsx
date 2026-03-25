"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthField from "./AuthField";
import AuthButton from "./AuthButton";

// Email/password login form.
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials.");
    } else {
      router.push("/admin");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5 border rounded-3xl border-white/10 bg-white/5">
      <h2 className="font-display text-2xl uppercase tracking-[0.12em]">Login</h2>
      <AuthField name="email" type="email" label="Email" placeholder="Email" required />
      <AuthField
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        required
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      <AuthButton type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </AuthButton>
      <AuthButton
        type="button"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
      >
        Continue with Google
      </AuthButton>
    </form>
  );
}

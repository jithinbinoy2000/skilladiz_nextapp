"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import AuthButton from "./AuthButton";

// Registration form for new users.
export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setStatus(data.error || "Registration failed.");
    } else {
      setStatus("Account created. You can sign in now.");
      event.currentTarget.reset();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="font-display text-2xl uppercase tracking-[0.12em]">Register</h2>
      <AuthField name="name" type="text" label="Full name" placeholder="Full name" required />
      <AuthField name="email" type="email" label="Email" placeholder="Email" required />
      <AuthField
        name="password"
        type="password"
        label="Create password"
        placeholder="Create password"
        minLength={8}
        required
      />
      {status ? <p className="text-xs text-white/70">{status}</p> : null}
      <AuthButton type="submit" disabled={loading} variant="outline">
        {loading ? "Creating..." : "Create Account"}
      </AuthButton>
    </form>
  );
}

import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import { createUserWithPassword, getUserByEmail } from "@/lib/auth/user-repo";

// Simple API to create a user with email + password.
export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "").trim();

  if (!name || !email || password.length < 8) {
    return NextResponse.json(
      { error: "Name, email, and password (8+ chars) are required." },
      { status: 400 }
    );
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already in use." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await createUserWithPassword({ name, email, passwordHash });

  return NextResponse.json({ user }, { status: 201 });
}

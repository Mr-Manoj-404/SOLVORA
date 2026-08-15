"use client";

import { useState } from "react";
import { signUp } from "@/services/auth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Account created successfully! Please check your email to verify your account."
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 sm:px-6">
      <Card className="w-full max-w-md border-slate-700 bg-slate-900 shadow-xl">
        <CardHeader className="px-5 pt-6 sm:px-8 sm:pt-8">
          <CardTitle className="text-center text-3xl font-bold text-cyan-400 sm:text-4xl">
            Create Account
          </CardTitle>

          <p className="mt-2 text-center text-sm text-slate-400 sm:text-base">
            Join SOLVORA and start solving puzzles
          </p>
        </CardHeader>

        <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
          <form onSubmit={handleSignup} className="space-y-5">

            {/* EMAIL */}
            <div>
              <Label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold text-white sm:text-base"
              >
                Email
              </Label>

              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                className="h-12 border-slate-600 bg-slate-800 px-4 text-base text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400 sm:text-lg"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold text-white sm:text-base"
              >
                Password
              </Label>

              <Input
                id="signup-password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
                className="h-12 border-slate-600 bg-slate-800 px-4 text-base text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400 sm:text-lg"
                required
              />
            </div>

            {/* SIGN UP BUTTON */}
            <Button
              type="submit"
              className="h-12 w-full bg-cyan-400 text-base font-bold text-black transition hover:bg-cyan-300 active:scale-[0.98] sm:text-lg"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}
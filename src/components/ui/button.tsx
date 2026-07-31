"use client";

import { useState } from "react";
import { signUp } from "@/services/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      localStorage.setItem("pendingDisplayName", name);

      alert(
        "Account created successfully! Please verify your email before logging in."
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <Card className="w-full max-w-md bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-cyan-400">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <Label className="mb-2 block text-base font-semibold text-white">
                Full Name
              </Label>

              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border-slate-600 bg-slate-800 text-lg text-white placeholder:text-slate-400 focus:border-cyan-400"
              />
            </div>

            <div>
              <Label className="mb-2 block text-base font-semibold text-white">
                Email
              </Label>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-slate-600 bg-slate-800 text-lg text-white placeholder:text-slate-400 focus:border-cyan-400"
              />
            </div>

            <div>
              <Label className="mb-2 block text-base font-semibold text-white">
                Password
              </Label>

              <Input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-slate-600 bg-slate-800 text-lg text-white placeholder:text-slate-400 focus:border-cyan-400"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-cyan-400 text-lg font-semibold text-black hover:bg-cyan-300"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}
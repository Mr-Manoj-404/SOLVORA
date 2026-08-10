"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { updateUserProfile } from "@/services/profile";

export default function SettingsPage() {
  const [displayName, setDisplayName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          return;
        }

        setEmail(user.email ?? "");

        const {
          data: profile,
        } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .maybeSingle();

        setDisplayName(
          profile?.display_name ?? ""
        );
      } catch (err) {
        console.error(
          "[SOLVORA] Settings loading failed:",
          err
        );

        setError(
          "Unable to load your settings."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSave(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!displayName.trim()) {
      setError(
        "Display name cannot be empty."
      );
      return;
    }

    try {
      setSaving(true);

      await updateUserProfile(
        displayName
      );

      setMessage(
        "Profile updated successfully."
      );
    } catch (err) {
      console.error(
        "[SOLVORA] Profile update failed:",
        err
      );

      setError(
        "Failed to update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center">
          <p className="text-cyan-400">
            Loading settings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            SOLVORA
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account and game preferences.
          </p>
        </div>

        {/* ACCOUNT */}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl sm:p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your SOLVORA profile information.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-6"
          >

            {/* DISPLAY NAME */}

            <div>
              <label
                htmlFor="displayName"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Display Name
              </label>

              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(event) =>
                  setDisplayName(
                    event.target.value
                  )
                }
                maxLength={50}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                placeholder="Enter your display name"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-slate-500"
              />

              <p className="mt-2 text-xs text-slate-600">
                Your login email cannot be changed
                from this page.
              </p>
            </div>

            {/* MESSAGE */}

            {message && (
              <div className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-400">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* SAVE */}

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </form>
        </section>

        {/* GAME PREFERENCES */}

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl sm:p-8">

          <h2 className="text-2xl font-bold">
            Game Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your current SOLVORA game configuration.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <PreferenceCard
              title="Easy"
              value="3 × 3"
              description="9 puzzle pieces"
            />

            <PreferenceCard
              title="Medium"
              value="4 × 4"
              description="16 puzzle pieces"
            />

            <PreferenceCard
              title="Hard"
              value="5 × 5"
              description="25 puzzle pieces"
            />

          </div>
        </section>

        {/* SECURITY */}

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl sm:p-8">

          <h2 className="text-2xl font-bold">
            Security
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your current session.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            🚪 Sign Out
          </button>
        </section>

        {/* DANGER ZONE */}

        <section className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-6 shadow-xl sm:p-8">

          <h2 className="text-2xl font-bold text-red-400">
            Danger Zone
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Account deletion is intentionally not
            enabled yet. We will implement secure
            account deletion later using a server-side
            operation.
          </p>

        </section>

      </div>
    </main>
  );
}

function PreferenceCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-cyan-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}
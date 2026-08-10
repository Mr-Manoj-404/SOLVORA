"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Play",
    href: "/game",
    icon: "🎮",
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: "🏆",
  },
  {
    name: "History",
    href: "/history",
    icon: "📜",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [userEmail, setUserEmail] =
    useState<string | null>(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(
        user?.email ?? null
      );
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  return (
    <nav className="sticky top-0 z-[500] border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}

        <Link
          href="/dashboard"
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-lg ring-1 ring-cyan-400/30 transition group-hover:bg-cyan-400/20">
            🧩
          </div>

          <span className="text-xl font-black tracking-wide text-cyan-400">
            SOLVORA
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map(
            (item) => {
              const active =
                pathname ===
                  item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            }
          )}
        </div>

        {/* USER MENU */}

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (previous) =>
                  !previous
              )
            }
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 transition hover:border-cyan-400/30"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/10 text-sm text-cyan-400">
              👤
            </div>

            <span className="hidden max-w-[140px] truncate text-sm text-slate-300 sm:block">
              {userEmail ??
                "Account"}
            </span>

            <span className="text-xs text-slate-500">
              ▼
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

              {/* MOBILE NAV */}

              <div className="border-b border-slate-800 p-2 md:hidden">
                {navigation.map(
                  (item) => {
                    const active =
                      pathname ===
                        item.href ||
                      pathname.startsWith(
                        `${item.href}/`
                      );

                    return (
                      <Link
                        key={
                          item.href
                        }
                        href={
                          item.href
                        }
                        onClick={() =>
                          setMenuOpen(
                            false
                          )
                        }
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                          active
                            ? "bg-cyan-400/10 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span>
                          {
                            item.icon
                          }
                        </span>

                        {
                          item.name
                        }
                      </Link>
                    );
                  }
                )}
              </div>

              {/* PROFILE */}

              <Link
                href="/profile"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
              >
                👤 My Profile
              </Link>

              {/* SETTINGS */}

              <Link
                href="/settings"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
              >
                ⚙️ Settings
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="w-full border-t border-slate-800 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >
                🚪 Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
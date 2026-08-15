"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
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

      setUserEmail(user?.email ?? null);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(
          session?.user?.email ?? null
        );
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setUserEmail(null);
    setMenuOpen(false);

    window.location.href = "/login";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-[500] border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-lg ring-1 ring-cyan-400/30 transition group-hover:bg-cyan-400/20">
            🧩
          </div>

          <span className="text-lg font-black tracking-wide text-cyan-400 sm:text-xl">
            SOLVORA
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        {userEmail && (
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
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
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* RIGHT SIDE */}

        {!userEmail ? (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/login"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white sm:px-4"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:px-4"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative">

            {/* ACCOUNT BUTTON */}

            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen(
                  (previous) => !previous
                )
              }
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 transition hover:border-cyan-400/30 sm:px-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm text-cyan-400">
                👤
              </div>

              <span className="hidden max-w-[140px] truncate text-sm text-slate-300 sm:block">
                {userEmail}
              </span>

              <span
                className={`text-xs text-slate-500 transition-transform ${
                  menuOpen
                    ? "rotate-180"
                    : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* ACCOUNT MENU */}

            {menuOpen && (
              <>
                {/* MOBILE BACKDROP */}

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="fixed inset-0 z-[-1] h-screen w-screen cursor-default md:hidden"
                />

                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl sm:w-64">

                  {/* MOBILE NAVIGATION */}

                  <div className="border-b border-slate-800 p-2 md:hidden">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Navigation
                    </p>

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
                            onClick={
                              closeMenu
                            }
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                              active
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            <span className="text-base">
                              {
                                item.icon
                              }
                            </span>

                            <span>
                              {
                                item.name
                              }
                            </span>
                          </Link>
                        );
                      }
                    )}
                  </div>

                  {/* ACCOUNT */}

                  <div className="p-2">

                    <Link
                      href="/profile"
                      onClick={
                        closeMenu
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <span>
                        👤
                      </span>

                      <span>
                        My Profile
                      </span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={
                        closeMenu
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <span>
                        ⚙️
                      </span>

                      <span>
                        Settings
                      </span>
                    </Link>

                  </div>

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="flex w-full items-center gap-3 border-t border-slate-800 px-5 py-3.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    <span>
                      🚪
                    </span>

                    <span>
                      Sign out
                    </span>
                  </button>

                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
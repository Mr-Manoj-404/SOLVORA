import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400">
        SOLVORA
      </h1>

      <div className="hidden gap-8 text-lg font-medium md:flex">
        <a href="#" className="hover:text-cyan-400 transition">
          Home
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          About
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          Leaderboard
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          Contact
        </a>
      </div>

     <div className="flex gap-4">
  <Link
    href="/login"
    className="rounded-xl border border-cyan-400 px-5 py-2 transition hover:bg-cyan-400 hover:text-black"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-black transition hover:bg-cyan-300"
  >
    Sign Up
  </Link>
</div>
    </nav>
  );
}
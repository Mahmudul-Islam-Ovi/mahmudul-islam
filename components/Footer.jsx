import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neon/15 bg-void/80 px-5 py-8 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-slate-500 sm:flex-row">
        <p>
          <span className="text-neon">&copy; {new Date().getFullYear()}</span>{" "}
          {profile.name} — all systems secure.
        </p>
        {/* <p>
          built with <span className="text-neon">Next.js</span> ·{" "}
          <span className="text-cyan">Tailwind</span> ·{" "}
          <span className="text-pink">Framer Motion</span>
        </p> */}
      </div>
    </footer>
  );
}

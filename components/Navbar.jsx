"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import { DownloadIcon } from "@/components/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-neon/15 bg-void/70 py-3 backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-mono text-lg font-bold tracking-tight">
          <span className="text-neon">&lt;</span>
          <span className="rgb-text">MI</span>
          <span className="text-neon">/&gt;</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`group relative rounded-lg px-3.5 py-2 font-mono text-sm transition-colors ${
                    active === l.id ? "text-neon" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon to-transparent transition-opacity ${
                      active === l.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={profile.resume || "/resume.pdf"}
            download="Md_Mahmudul_Islam_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="group ml-2 flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-neon transition-all hover:bg-neon hover:text-void hover:shadow-[0_0_20px_rgba(0,255,156,0.5)]"
          >
            <DownloadIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>RESUME</span>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-neon transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neon/15 bg-void/90 px-5 pb-4 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-slate-300 hover:text-neon"
                >
                  <span className="text-neon">$ </span>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={profile.resume || "/resume.pdf"}
                download="Md_Mahmudul_Islam_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-rgb flex w-full items-center justify-center gap-2 py-2.5 text-xs"
              >
                <DownloadIcon className="h-4 w-4" />
                <span>DOWNLOAD RESUME (.PDF)</span>
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

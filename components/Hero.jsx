"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

function useTypewriter(words, speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

const bootLines = [
  "> initializing secure session...",
  "> firewall ............ [ ACTIVE ]",
  "> encryption .......... [ AES-256 ]",
  "> access granted: welcome.",
];

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pb-16 pt-28">
      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]"
      >
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 font-mono text-xs text-neon"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-3 font-mono text-neon"
          >
            &gt; whoami
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="glitch block" data-text="MD MAHMUDUL">
              MD MAHMUDUL
            </span>
            <span className="rgb-text block">ISLAM</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 h-9 font-mono text-xl text-slate-300 sm:text-2xl"
          >
            <span className="text-neon">[</span> {role}
            <span className="ml-0.5 inline-block w-2.5 animate-blink bg-neon">&nbsp;</span>{" "}
            <span className="text-neon">]</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            I build fast, secure and scalable web applications — and I think like an
            attacker so my systems don't get breached.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <a href="#projects" className="btn-rgb">
              VIEW PROJECTS <span>→</span>
            </a>
            <a
              href={profile.resume || "/resume.pdf"}
              download="Md_Mahmudul_Islam_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost group flex items-center gap-2 border-cyan/40 bg-cyan/5 text-cyan hover:border-cyan hover:bg-cyan/15 hover:shadow-[0_0_25px_rgba(0,229,255,0.35)]"
            >
              <DownloadIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              <span>DOWNLOAD CV</span>
            </a>
            <a href="#contact" className="btn-ghost">
              $ contact --me
            </a>
          </motion.div>

          {/* Social Quick Links with SVG Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-5 flex items-center gap-3 font-mono text-xs text-slate-400"
          >
            <span className="text-slate-500">// links:</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-panel/80 text-slate-300 transition-all hover:border-neon hover:text-neon hover:shadow-[0_0_15px_rgba(0,255,156,0.3)] hover:-translate-y-0.5"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-panel/80 text-slate-300 transition-all hover:border-violet hover:text-violet hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:-translate-y-0.5"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-panel/80 text-slate-300 transition-all hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:-translate-y-0.5"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </motion.div>

          {/* terminal boot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10 max-w-md rounded-xl border border-neon/20 bg-black/50 p-4 font-mono text-xs leading-6 text-neon/80 backdrop-blur"
          >
            {bootLines.map((l, idx) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + idx * 0.45 }}
              >
                {l}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="animate-float">
            {/* rotating RGB ring */}
            <div className="relative aspect-square">
              <div className="rgb-bg absolute -inset-1.5 animate-spinSlow rounded-full blur-md" />
              <div className="rgb-bg absolute -inset-1 animate-spinSlow rounded-full" />
              <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-void bg-panel">
                {imgOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/profile.jpg"
                    alt="Md Mahmudul Islam"
                    className="h-full w-full object-cover"
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <div className="rgb-text flex h-full w-full items-center justify-center font-mono text-7xl font-bold">
                    MI
                  </div>
                )}
                <div className="scanlines absolute inset-0" />
              </div>
            </div>
          </div>

          {/* <div className="absolute -left-4 top-6 rounded-lg border border-cyan/40 bg-black/70 px-3 py-1.5 font-mono text-xs text-cyan backdrop-blur">
            🛡 CyberSec
          </div>
          <div className="absolute -right-3 bottom-16 rounded-lg border border-pink/40 bg-black/70 px-3 py-1.5 font-mono text-xs text-pink backdrop-blur">
            ⚡ MERN
          </div>
          <div className="absolute bottom-0 left-4 rounded-lg border border-neon/40 bg-black/70 px-3 py-1.5 font-mono text-xs text-neon backdrop-blur">
            🤖 n8n AI
          </div> */}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-slate-500 md:flex">
        SCROLL
        <div className="h-10 w-px bg-gradient-to-b from-neon to-transparent" />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { profile, stats } from "@/lib/data";

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    const dur = 1400;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="about.me" title="Who is behind the terminal" />

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="rgb-card overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-slate-500">
                ~/about/mahmudul.sh
              </span>
            </div>
            <div className="space-y-4 p-6 font-mono text-sm leading-7">
              <p>
                <span className="text-neon">$</span> cat summary.txt
              </p>
              <p className="text-slate-300">{profile.summary}</p>
              <p>
                <span className="text-neon">$</span> cat objective.txt
              </p>
              <p className="text-slate-400">{profile.objective}</p>
              <p>
                <span className="text-neon">$</span> pwd
              </p>
              <p className="text-cyan">{profile.location}</p>
              <p>
                <span className="text-neon">$</span>
                <span className="ml-2 inline-block h-4 w-2 animate-blink bg-neon align-middle" />
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="rgb-card flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="rgb-text font-mono text-5xl font-extrabold">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 font-mono text-xs uppercase tracking-widest text-slate-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

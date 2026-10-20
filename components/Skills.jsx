"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { skillGroups, skillBars } from "@/lib/data";

function TiltCard({ children, color, delay }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6 }}
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="rgb-card h-full p-6 !transition-[transform,box-shadow] duration-200"
        style={{
          backgroundImage: `radial-gradient(circle at var(--mx,50%) var(--my,0%), ${color}22, transparent 55%)`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="skills.exe" title="Arsenal & tech stack" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <TiltCard key={g.title} color={g.color} delay={i * 0.1}>
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-lg font-bold"
                style={{
                  color: g.color,
                  borderColor: g.color + "66",
                  background: g.color + "14",
                  boxShadow: `0 0 24px ${g.color}33`,
                }}
              >
                {g.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-md border px-2.5 py-1 font-mono text-xs transition hover:scale-105"
                    style={{
                      color: g.color,
                      borderColor: g.color + "40",
                      background: g.color + "0d",
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rgb-card mt-12 p-8"
        >
          <p className="section-tag mb-6">// proficiency.log</p>
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
            {skillBars.map((s, i) => (
              <div key={s.name}>
                <div className="mb-2 flex justify-between font-mono text-sm">
                  <span className="text-slate-200">{s.name}</span>
                  <span className="text-neon">{s.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.08, ease: "easeOut" }}
                    className="rgb-bg h-full rounded-full shadow-[0_0_14px_rgba(0,255,156,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

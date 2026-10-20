"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { projects, profile } from "@/lib/data";
import { ExternalLinkIcon } from "@/components/Icons";

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="projects/" title="Things I've built" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link || profile.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.7 }}
              className="rgb-card group relative block overflow-hidden p-7"
            >
              {/* hover sweep */}
              <div
                className="pointer-events-none absolute -inset-px translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to top, ${p.color}22, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="font-mono text-4xl font-black opacity-30 transition group-hover:opacity-100"
                    style={{ color: p.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: p.color }}
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">{p.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">{p.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border px-2 py-0.5 font-mono text-[11px]"
                      style={{
                        color: p.color,
                        borderColor: p.color + "44",
                        background: p.color + "10",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-slate-500">// project</span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300 group-hover:scale-105"
                    style={{
                      color: p.color,
                      borderColor: p.color + "55",
                      background: p.color + "15",
                      boxShadow: `0 0 16px ${p.color}22`,
                    }}
                  >
                    <span>Show Project</span>
                    <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
            $ git clone --all <span>→ GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

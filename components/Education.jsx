"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="education.db" title="Academic background" />

        <div className="grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="rgb-card p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet/40 bg-violet/10 text-2xl">
                🎓
              </div>
              <h3 className="text-lg font-bold leading-snug text-white">{e.degree}</h3>
              <p className="mt-3 text-sm text-slate-400">{e.school}</p>
              <p className="rgb-text mt-4 inline-block font-mono text-sm font-semibold">
                {e.meta}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

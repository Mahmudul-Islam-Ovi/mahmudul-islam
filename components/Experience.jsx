"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { experience, certifications } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="experience.log" title="Work history" />

        <div ref={ref} className="relative mx-auto max-w-3xl pl-10 md:pl-14">
          {/* track */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 md:left-[19px]" />
          {/* animated fill */}
          <motion.div
            style={{ scaleY: h }}
            className="rgb-bg absolute bottom-0 left-[10px] top-0 w-[3px] origin-top rounded-full shadow-[0_0_16px_rgba(0,255,156,0.7)] md:left-[18px]"
          />

          <div className="space-y-10">
            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[38px] top-7 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neon bg-void md:-left-[46px]">
                  <span
                    className={`h-2 w-2 rounded-full bg-neon ${e.current ? "animate-ping" : ""}`}
                  />
                </span>

                <div className="rgb-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{e.role}</h3>
                    {e.current && (
                      <span className="rounded-full border border-neon/40 bg-neon/10 px-3 py-0.5 font-mono text-xs text-neon">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="rgb-text mt-1 inline-block font-mono text-lg font-semibold">
                    @ {e.company}
                  </p>
                  <p className="mt-2 font-mono text-sm text-slate-400">
                    🗓 {e.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* certifications */}
        <div className="mt-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-8"
          >
            // trainings &amp; certifications
          </motion.p>
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rgb-card p-6"
              >
                <div className="mb-4 font-mono text-2xl text-neon">✔</div>
                <h4 className="font-semibold leading-snug text-white">{c.title}</h4>
                <p className="mt-3 font-mono text-xs text-cyan">{c.by}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

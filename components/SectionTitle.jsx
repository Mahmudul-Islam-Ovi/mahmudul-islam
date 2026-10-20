"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ tag, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-14"
    >
      <p className="section-tag mb-3">// {tag}</p>
      <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <div className="rgb-bg mt-5 h-1 w-24 rounded-full" />
    </motion.div>
  );
}

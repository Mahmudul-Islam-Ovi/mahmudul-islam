"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      style={{ scaleX }}
      className="rgb-bg fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left shadow-[0_0_14px_rgba(0,255,156,0.8)]"
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated cyber background:
 *  1. Optional looping video  -> put your file at /public/videos/bg.mp4
 *  2. Matrix "code rain" canvas (always on, works without any video)
 *  3. Perspective grid, RGB aurora blobs, scanlines, vignette
 */
export default function Background() {
  const canvasRef = useRef(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0;
    let h = 0;
    let drops = [];
    const fontSize = 16;
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\=+*#$%&;:ABCDEF0123456789";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hue = 140;
    let last = 0;

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 45) return; // ~22fps for a classic matrix feel + low CPU
      last = t;

      ctx.fillStyle = "rgba(5, 6, 10, 0.14)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;

      hue = (hue + 0.6) % 360;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // head of the stream is bright white-green, trail shifts through RGB
        ctx.fillStyle = "#d8ffee";
        ctx.fillText(text, x, y);
        ctx.fillStyle = `hsla(${(hue + i * 3) % 360}, 100%, 60%, 0.75)`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6 + (i % 5) * 0.12;
      }
    };

    if (!reduce) raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-void" aria-hidden="true">
      {videoOk && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoOk(false)}
        >
          <source src="/videos/bg.mp4" type="video/mp4" onError={() => setVideoOk(false)} />
        </video>
      )}

      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.28]" />

      {/* RGB aurora blobs */}
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] animate-float rounded-full bg-pink/20 blur-[130px]" />
      <div className="absolute -right-40 top-1/3 h-[560px] w-[560px] animate-float rounded-full bg-cyan/15 blur-[140px] [animation-delay:2s]" />
      <div className="absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] animate-float rounded-full bg-violet/20 blur-[140px] [animation-delay:4s]" />

      <div className="grid-bg absolute inset-0" />
      <div className="scanlines absolute inset-0" />

      {/* moving scan beam */}
      <div className="absolute inset-x-0 top-0 h-32 animate-scan bg-gradient-to-b from-transparent via-neon/10 to-transparent" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.92)_100%)]" />
    </div>
  );
}

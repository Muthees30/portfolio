import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/content";

/* ─────────────────────────────────────────
   Canvas Code Rain (Matrix-style, theme-aware)
───────────────────────────────────────── */
const CODE_CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/\\|=+*#@$%&!?;:.,_~`^";

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const FONT_SIZE = 13;
    let cols = Math.floor(canvas.width / FONT_SIZE);
    let drops: number[] = Array(cols).fill(1).map(() => Math.random() * -50);
    let frame = 0;

    const draw = () => {
      frame++;
      // Only update every 2nd frame for snowdrop-slow effect
      if (frame % 2 !== 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      cols = Math.floor(canvas.width / FONT_SIZE);
      // Re-sync drops array length
      while (drops.length < cols) drops.push(Math.random() * -50);
      drops = drops.slice(0, cols);

      const dark = isDark();

      // Fade trail
      ctx.fillStyle = dark
        ? "rgba(10, 14, 23, 0.18)"
        : "rgba(240, 245, 255, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        const y = drops[i] * FONT_SIZE;
        const x = i * FONT_SIZE;

        // Head glyph — brightest
        if (drops[i] > 0) {
          ctx.fillStyle = dark
            ? "rgba(99, 179, 237, 0.95)"   // sky-300
            : "rgba(37, 99, 235, 0.7)";    // blue-600
          ctx.fillText(char, x, y);
        }

        // Body fading glyph (random secondary)
        const bodyChar =
          CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        if (drops[i] > 2) {
          ctx.fillStyle = dark
            ? "rgba(99, 179, 237, 0.25)"
            : "rgba(37, 99, 235, 0.18)";
          ctx.fillText(bodyChar, x, y - FONT_SIZE * 2);
        }

        // Reset randomly
        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += 0.07;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
};

/* ─────────────────────────────────────────
   Typewriter roles
───────────────────────────────────────── */
const roles = [
  "Software Developer",
  "Full Stack Developer",
  "Flutter Developer",
  "ML Enthusiast",
];

const useTypewriter = (words: string[], speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
};

/* ─────────────────────────────────────────
   Stat chip
───────────────────────────────────────── */
const Stat = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center rounded-xl border border-primary/20 bg-background/60 px-5 py-3 backdrop-blur-md"
  >
    <span className="font-display text-xl font-bold gradient-text sm:text-2xl">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </motion.div>
);

/* ─────────────────────────────────────────
   Main Hero
───────────────────────────────────────── */
const Hero = () => {
  const typedRole = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-24"
    >
      {/* ── Code Rain Canvas ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <CodeRain />
        {/* Central radial vignette to keep content readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,transparent_0%,hsl(var(--background)/0.82)_70%,hsl(var(--background))_100%)]" />
      </div>

      {/* ── Center Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for Opportunities
          <Sparkles size={12} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="gradient-text">{siteConfig.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center justify-center gap-2 font-mono text-sm sm:text-xl"
        >
          <span className="text-primary/60">&gt;_</span>
          <span className="font-semibold text-foreground">
            {typedRole}
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
          </span>
        </motion.div>



        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {siteConfig.summary}
        </motion.p>

        {/* Stat chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Stat value="3+" label="Projects Built" delay={0.65} />
          <Stat value="2" label="Internships" delay={0.72} />
          <Stat value="3" label="Certifications" delay={0.79} />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl gradient-bg px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:text-base"
          >
            <FolderOpen size={17} className="transition-transform group-hover:-rotate-6" />
            View My Work
          </a>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;

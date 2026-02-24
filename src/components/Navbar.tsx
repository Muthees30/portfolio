import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/content";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [wordIdx, setWordIdx] = useState(0);
  const welcomeWords = ["Welcome", "Bienvenue", "Willkommen", "Benvenuto", "வணக்கம்"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % welcomeWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [welcomeWords.length]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="font-display text-base font-bold inline-flex items-center gap-1.5 min-w-[180px]">
          <span className="gradient-text">MA.</span>
          <span className="relative flex-1 overflow-visible h-6 flex items-center text-foreground/80 font-medium text-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 5, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -5, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 whitespace-nowrap tracking-wide"
              >
                {welcomeWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.resumeUrl}
            download="Mutheeswari_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            aria-label="Download resume"
          >
            <Download size={14} /> Resume
          </a>
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Header Icons */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={siteConfig.resumeUrl}
            download="Mutheeswari_Resume.pdf"
            className="flex items-center justify-center rounded-lg gradient-bg p-2 text-primary-foreground"
            aria-label="Download resume"
          >
            <Download size={16} />
          </a>
          <button onClick={() => setDark(!dark)} className="rounded-lg border border-border p-2 text-muted-foreground" aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(!open)} className="rounded-lg border border-border p-2 text-muted-foreground" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass border-t border-border px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.resumeUrl}
            download="Mutheeswari_Resume.pdf"
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

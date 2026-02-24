import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Sparkles, ChevronRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { projects } from "@/lib/content";

type Project = (typeof projects)[number];

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects" alt>
      <SectionTitle title="Projects" subtitle="Things I've built" />

      {/* ── Project Cards Grid ── */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            onClick={() => setSelected(p)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm hover-card-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* "View Details" chip on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
                  <Sparkles size={14} />
                  View Details
                </span>
              </div>

              {/* Title at bottom of image */}
              <h3 className="absolute bottom-3 left-4 right-4 font-display text-lg font-bold leading-tight text-white drop-shadow-md">
                {p.title}
              </h3>
            </div>

            {/* Card body */}
            <div className="p-5">
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
                {p.tags.length > 3 && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    +{p.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Popup Dialog ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Centered wrapper: overlay + dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              />

              {/* Dialog */}
              <motion.div
                className="relative z-10 flex w-[90vw] max-w-2xl max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto">
                  {/* Hero image */}
                  <div className="relative h-64 shrink-0 overflow-hidden sm:h-72">
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="space-y-6 px-6 pb-8 pt-2 sm:px-8">
                    {/* Title */}
                    <motion.h2
                      className="font-display text-2xl font-bold text-foreground sm:text-3xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selected.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {selected.description}
                    </motion.p>

                    {/* Highlights */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                        <Sparkles size={14} />
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selected.highlights.map((h, i) => (
                          <motion.li
                            key={h}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.06 }}
                          >
                            <ChevronRight
                              size={14}
                              className="mt-0.5 shrink-0 text-primary"
                            />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selected.tags.map((t, i) => (
                        <motion.span
                          key={t}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + i * 0.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action Links */}
                    <motion.div
                      className="flex gap-3 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <a
                        href={selected.github}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        Source Code
                      </a>
                      <a
                        href={selected.demo}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default Projects;

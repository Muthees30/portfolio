import { motion } from "framer-motion";
import { Clock, MapPin, Tag } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { experiences } from "@/lib/content";

const meta: Record<string, { duration: string; location: string; period: string; type: string }> = {
  "Learnlike": { duration: "6 Months", location: "Remote", period: "2025", type: "Training" },
  "Quantanics Techserv": { duration: "1 Month", location: "On-site", period: "2024", type: "Internship" },
};

const Experience = () => (
  <SectionWrapper id="experience">
    <SectionTitle title="Experience" subtitle="Work & Training" />

    <div className="mx-auto max-w-3xl divide-y divide-border">
      {experiences.map((exp, i) => {
        const m = meta[exp.company] ?? { duration: "–", location: "–", period: "–", type: "–" };

        return (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative py-10 first:pt-0"
          >
            {/* Top row: index + type badge + period */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* Giant index */}
                <span className="font-mono text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold text-primary">
                  <Tag size={10} /> {m.type}
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{m.period}</span>
            </div>

            {/* Company name — display headline */}
            <h3 className="font-display text-3xl font-black leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-4xl md:text-5xl">
              {exp.company}
            </h3>

            {/* Role */}
            <p className="mt-2 font-display text-base font-semibold text-muted-foreground sm:text-lg">
              {exp.role}
            </p>

            {/* Meta strip */}
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                <Clock size={11} className="text-primary" /> {m.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin size={11} className="text-primary" /> {m.location}
              </span>
            </div>

            {/* Points as horizontal chip strip */}
            <div className="mt-5 flex flex-wrap gap-2">
              {exp.points.map((pt, j) => (
                <motion.span
                  key={pt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + j * 0.07 }}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground
                    transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                >
                  {pt}
                </motion.span>
              ))}
            </div>

            {/* Animated underline on hover */}
            <div className="mt-6 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </motion.div>
        );
      })}
    </div>
  </SectionWrapper>
);

export default Experience;

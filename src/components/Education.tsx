import { motion } from "framer-motion";
import { GraduationCap, Calendar, Hash } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { education } from "@/lib/content";

const Education = () => (
    <SectionWrapper id="education">
        <SectionTitle title="Education" subtitle="Academic Background" />

        <div className="mx-auto max-w-2xl">
            {education.map((edu, i) => (
                <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.14, duration: 0.5 }}
                    className="relative flex gap-4 pb-10 last:pb-0 sm:gap-6"
                >
                    {/* Left: timeline stem + icon */}
                    <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300
              ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}>
                            <GraduationCap size={17} />
                        </div>
                        {/* Stem — hidden after last item */}
                        {i < education.length - 1 && (
                            <div className="mt-2 w-px flex-1 bg-border" />
                        )}
                    </div>

                    {/* Right: card */}
                    <div className={`group mb-2 flex-1 overflow-hidden rounded-2xl border bg-card transition-all duration-300
            hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8
            ${i === 0 ? "border-primary/30" : "border-border"}`}>
                        <div className="p-5 sm:p-6">
                            {/* Badge for most recent */}
                            {i === 0 && (
                                <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/8 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                    Latest
                                </span>
                            )}

                            <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:text-base">
                                {edu.degree}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-primary">{edu.institution}</p>

                            {/* Meta chips */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:text-foreground">
                                    <Calendar size={11} className="text-primary" /> {edu.year}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:text-foreground">
                                    <Hash size={11} className="text-primary" /> {edu.score}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </SectionWrapper>
);

export default Education;

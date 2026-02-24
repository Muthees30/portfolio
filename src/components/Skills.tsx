import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
    Code2, Wrench, Database, ShieldCheck, Users,
    Coffee, Globe, LayoutTemplate, Terminal, Smartphone,
    Server, GitBranch, PieChart, Palette, Brain,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { skillCategories } from "@/lib/content";

/* ── Icon map ── */
const skillIcon: Record<string, React.ReactNode> = {
    Java: <Coffee size={16} />, HTML: <Globe size={16} />, CSS: <LayoutTemplate size={16} />,
    JavaScript: <Terminal size={16} />, React: <Code2 size={16} />, Flutter: <Smartphone size={16} />,
    SpringBoot: <Server size={16} />, Tableau: <PieChart size={16} />, XAMPP: <Server size={16} />,
    Portswigger: <ShieldCheck size={16} />, Git: <GitBranch size={16} />, "MS Office": <Wrench size={16} />,
    Figma: <Palette size={16} />, Canva: <Palette size={16} />, MySQL: <Database size={16} />,
    "Web Security Testing": <ShieldCheck size={16} />,
    Teamwork: <Users size={16} />, "Time Management": <Brain size={16} />, "Critical Thinking": <Brain size={16} />,
};

/* ── Flat list of all skills ── */
const allSkills = skillCategories.flatMap(c =>
    c.skills.map(s => ({ name: s, cat: c.title }))
);

/* ── Split into two tracks ── */
const track1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const track2 = allSkills.slice(Math.ceil(allSkills.length / 2));

/* ── Skill Pill ── */
const Pill = ({ name, active }: { name: string; active: boolean }) => (
    <div className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium
    transition-all duration-300 whitespace-nowrap select-none
    ${active
            ? "border-primary bg-primary/10 text-primary shadow-[0_0_18px_-4px_hsl(var(--primary)/0.5)]"
            : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
        }`}>
        <span className={`transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
            {skillIcon[name] ?? <Code2 size={16} />}
        </span>
        {name}
    </div>
);

/* ── Infinite Marquee Track ── */
const Marquee = ({ items, reverse = false, activeCategory }: {
    items: { name: string; cat: string }[];
    reverse?: boolean;
    activeCategory: string | null;
}) => {
    const controls = useAnimationControls();
    const doubled = [...items, ...items];
    const from = reverse ? "-50%" : "0%";
    const to = reverse ? "0%" : "-50%";

    return (
        <div
            className="overflow-hidden py-1"
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => controls.start({ x: [from, to], transition: { duration: 22, ease: "linear", repeat: Infinity } })}
        >
            <motion.div
                className="flex gap-3 w-max"
                initial={{ x: from }}
                animate={controls}
                onViewportEnter={() =>
                    controls.start({ x: [from, to], transition: { duration: 22, ease: "linear", repeat: Infinity } })
                }
            >
                {doubled.map((s, i) => (
                    <Pill
                        key={`${s.name}-${i}`}
                        name={s.name}
                        active={activeCategory ? s.cat === activeCategory : false}
                    />
                ))}
            </motion.div>
        </div>
    );
};

/* ── Category filter chip ── */
const catIconMap: Record<string, React.ReactNode> = {
    "Technical Skills": <Code2 size={14} />,
    "Tools & Frameworks": <Wrench size={14} />,
    "Database": <Database size={14} />,
    "Testing": <ShieldCheck size={14} />,
    "Soft Skills": <Users size={14} />,
};

const Skills = () => {
    const [activeCat, setActiveCat] = useState<string | null>(null);

    return (
        <SectionWrapper id="skills">
            <SectionTitle title="Skills" subtitle="Technologies & Tools" />

            {/* ── Category filter ── */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setActiveCat(null)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200
            ${activeCat === null
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_-4px_hsl(var(--primary)/0.6)]"
                            : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                >
                    All
                </button>
                {skillCategories.map(cat => (
                    <button
                        key={cat.title}
                        onClick={() => setActiveCat(activeCat === cat.title ? null : cat.title)}
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200
              ${activeCat === cat.title
                                ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_-4px_hsl(var(--primary)/0.6)]"
                                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                    >
                        <span className={activeCat === cat.title ? "text-primary-foreground" : "text-muted-foreground"}>
                            {catIconMap[cat.title]}
                        </span>
                        <span className="hidden sm:inline">{cat.title}</span>
                        <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold
              ${activeCat === cat.title ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                            {cat.skills.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* ── Marquee tracks — left and right fade masks ── */}
            <div className="relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

                <div className="space-y-3">
                    <Marquee items={track1} activeCategory={activeCat} />
                    <Marquee items={track2} reverse activeCategory={activeCat} />
                </div>
            </div>


        </SectionWrapper>
    );
};

export default Skills;

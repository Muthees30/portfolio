import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { certifications } from "@/lib/content";

const Certifications = () => (
  <SectionWrapper id="certifications">
    <SectionTitle title="Certifications" subtitle="Courses & credentials" />

    {/* Cert pills — wrap on mobile */}
    <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
      {certifications.map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        >
          <Award size={15} className="shrink-0 text-primary" />
          {c}
        </motion.div>
      ))}
    </div>


  </SectionWrapper>
);

export default Certifications;

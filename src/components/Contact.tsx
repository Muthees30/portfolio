import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Linkedin, Github } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { siteConfig } from "@/lib/content";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let result = {};
      try {
        result = await response.json();
      } catch { }

      if (response.ok && (result as any).success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        alert((result as any).error || "Failed to send message");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Cannot connect to email server.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SectionWrapper id="contact">
      <SectionTitle title="Contact" subtitle="Get in touch" />
      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
        {/* Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 text-primary" size={20} />
            <div>
              <p className="text-sm font-semibold text-foreground">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 text-primary" size={20} />
            <div>
              <p className="text-sm font-semibold text-foreground">Phone</p>
              <a href={`tel:${siteConfig.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Your name"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Your email"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            aria-label="Your message"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg gradient-bg px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
          >
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-primary"
            >
              Message sent successfully! ✓
            </motion.p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;

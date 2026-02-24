import { Heart, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/lib/content";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. Built with{" "}
        <Heart size={12} className="inline text-primary" /> and code.
      </p>
      <div className="flex items-center gap-3">
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

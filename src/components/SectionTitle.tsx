const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="font-display text-3xl font-bold sm:text-4xl">
      <span className="gradient-text">{title}</span>
    </h2>
    {subtitle && (
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    )}
    <div className="mx-auto mt-4 h-1 w-16 rounded-full gradient-bg" />
  </div>
);

export default SectionTitle;

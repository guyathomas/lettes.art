export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-6xl px-5 sm:px-6 pb-20"
    >
      <div className="h-px bg-gradient-to-r from-border to-transparent mb-8" />
      <h2 id="contact-title" className="font-serif text-2xl text-foreground mb-4">
        Get in Touch
      </h2>
      <p className="text-muted-foreground mb-4">
        For inquiries about available works or commissions:
      </p>
      <a
        href="mailto:lette@example.com"
        className="inline-flex items-center gap-2 min-h-11 text-accent hover:text-accent/80 active:scale-[0.98] transition-all duration-200 font-medium"
      >
        lette@example.com
        <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  );
}

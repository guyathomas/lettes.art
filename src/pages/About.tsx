export function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
        <div>
          <h1 className="font-serif text-5xl lg:text-6xl tracking-tight text-foreground leading-none text-balance">
            About
            <br />
            <span className="text-accent italic">Lette</span>
          </h1>
        </div>

        <div className="space-y-12">
          <div className="space-y-6 text-muted-foreground leading-relaxed max-w-[65ch] text-pretty">
            <p>
              Lette is a fine artist working primarily in acrylic, graphite, and
              watercolour. Based on the Mornington Peninsula in Australia, their work
              explores the intersection of color, light, and texture through both
              abstract and representational forms.
            </p>
            <p>
              With a background in traditional drawing and painting techniques,
              Lette has developed a distinctive style that emphasizes atmosphere
              and emotional resonance. Each piece is carefully crafted to invite
              contemplation and create a sense of calm.
            </p>
            <p>
              Their work has been featured in regional galleries and private
              collections. Lette continues to explore new approaches to familiar
              mediums, always seeking to capture fleeting moments of beauty and
              stillness.
            </p>
          </div>

          <div>
            <div className="h-px bg-gradient-to-r from-border to-transparent mb-8" />
            <h2 className="font-serif text-2xl text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              For inquiries about available works or commissions:
            </p>
            <a
              href="mailto:lette@example.com"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 active:scale-[0.98] transition-all duration-200 font-medium"
            >
              lette@example.com
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

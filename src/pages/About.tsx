export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-6xl px-5 sm:px-6 pt-20 pb-16 lg:pt-30 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-24"
    >
      <h2
        id="about-title"
        className="font-serif font-normal text-[clamp(2.75rem,6vw,3.75rem)] leading-none tracking-tight text-foreground text-balance"
      >
        About
        <br />
        <em className="text-accent">Lette</em>
      </h2>

      <div className="space-y-6 text-muted-foreground leading-relaxed max-w-[65ch] text-pretty">
        <p>
          Lette is a fine artist working primarily in acrylic, graphite, and
          watercolour. Based on the Mornington Peninsula in Australia, their work
          explores the intersection of color, light, and texture through both
          abstract and representational forms.
        </p>
        <p>
          With a background in traditional drawing and painting techniques, Lette
          has developed a distinctive style that emphasizes atmosphere and
          emotional resonance. Each piece is carefully crafted to invite
          contemplation and create a sense of calm.
        </p>
        <p>
          Their work has been featured in regional galleries and private
          collections. Lette continues to explore new approaches to familiar
          mediums, always seeking to capture fleeting moments of beauty and
          stillness.
        </p>
      </div>
    </section>
  );
}

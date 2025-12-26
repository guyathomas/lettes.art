export function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl text-neutral-900 mb-6">About Lette</h1>
          <div className="prose prose-neutral">
            <p className="text-neutral-700 leading-relaxed mb-4">
              Lette is a fine artist working primarily in acrylic, graphite, and
              watercolour. Based in the Pacific Northwest, their work explores
              the intersection of color, light, and texture through both abstract
              and representational forms.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              With a background in traditional drawing and painting techniques,
              Lette has developed a distinctive style that emphasizes atmosphere
              and emotional resonance. Each piece is carefully crafted to invite
              contemplation and create a sense of calm.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Their work has been featured in regional galleries and private
              collections. Lette continues to explore new approaches to familiar
              mediums, always seeking to capture fleeting moments of beauty and
              stillness.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-xl text-neutral-900 mb-4">Contact</h2>
          <p className="text-neutral-700">
            For inquiries about available works or commissions, please reach out
            via email.
          </p>
          <p className="mt-2">
            <a
              href="mailto:lette@example.com"
              className="text-neutral-900 hover:text-neutral-600 transition-colors underline decoration-neutral-300 underline-offset-2"
            >
              lette@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

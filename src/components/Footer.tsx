export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="hairline" />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base">Mornington Peninsula, Australia</span>
          </div>
          <a
            href="mailto:lette@example.com"
            className="hover:text-accent active:scale-(--press-scale) transition-all duration-200"
          >
            lette@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-serif text-base">Mornington Peninsula, Australia</p>
          <a
            href="mailto:lette@example.com"
            className="hover:text-accent transition-colors"
          >
            lette@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}

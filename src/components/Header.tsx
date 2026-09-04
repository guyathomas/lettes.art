import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Marks the section the visitor is reading: the last one whose start has passed
 * a line just above the middle of the viewport. Picking the last match rather
 * than testing a band means exactly one section is always active, including the
 * short final one that the page cannot scroll far enough to centre.
 */
function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const update = () => {
      const atPageEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atPageEnd) {
        setActive(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      const line = window.innerHeight * 0.45;
      const reached = SECTIONS.filter((section) => {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        return top !== undefined && top <= line;
      });
      setActive((reached[reached.length - 1] ?? SECTIONS[0]).id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}

export function Header() {
  const active = useActiveSection();

  return (
    <header className="bg-background/80 backdrop-blur-header sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[18px] sm:py-6">
        <div className="flex items-center justify-between">
          <a href="#gallery" className="flex items-center gap-3 group" aria-label="Lette's Art home">
            <img
              src="/logo/logo-dark.svg"
              alt="Lette's Art"
              className="h-8 sm:h-10 transition-opacity duration-300 group-hover:opacity-(--hover-opacity)"
            />
          </a>

          <nav className="flex gap-5 sm:gap-8 font-serif text-[17px] sm:text-lg">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={`relative py-1 transition-colors duration-300 ${
                  active === section.id
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="hairline" />
    </header>
  );
}

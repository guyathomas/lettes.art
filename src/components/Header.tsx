import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo/logo-dark.svg"
              alt="Lette's Art"
              className="h-10 transition-opacity duration-300 group-hover:opacity-70"
            />
          </Link>

          <nav className="flex gap-8 font-serif text-lg">
            <Link
              to="/"
              className={`relative py-1 transition-colors duration-300 ${
                location.pathname === "/"
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`relative py-1 transition-colors duration-300 ${
                location.pathname === "/about"
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}

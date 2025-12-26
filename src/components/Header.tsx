import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Lette's Art
          </Link>

          <nav className="flex gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                location.pathname === "/about"
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

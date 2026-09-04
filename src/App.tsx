import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Contact } from "./components/Contact";
import { Gallery } from "./pages/Gallery";
import { About } from "./pages/About";

/**
 * Client-side navigation does not scroll to a hash on its own, so anyone
 * arriving via the /about redirect (or a shared /#contact link) needs a nudge.
 * The wall grows as artwork loads in and pushes the later sections down, so
 * hold the target in view until the layout settles or the visitor takes over.
 */
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (!target) return;

    target.scrollIntoView();

    const observer = new ResizeObserver(() => target.scrollIntoView());
    observer.observe(document.body);

    const release = () => observer.disconnect();
    const events = ["wheel", "touchmove", "keydown"] as const;
    for (const event of events) window.addEventListener(event, release);
    const timer = setTimeout(release, 2000);

    return () => {
      clearTimeout(timer);
      release();
      for (const event of events) window.removeEventListener(event, release);
    };
  }, [hash]);

  return null;
}

function Home() {
  return (
    <>
      <Gallery />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col bg-background grain">
        <a href="#gallery" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:text-sm">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* The About page folded into the single-page layout. */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

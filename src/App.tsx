import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Gallery } from "./pages/Gallery";
import { About } from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background grain">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:text-sm">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

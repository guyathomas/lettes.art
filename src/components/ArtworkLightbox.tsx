import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import type { ArtItem } from "../types";
import { formatDimensions, formatMeta, getAspectRatio } from "../lib/artwork";

interface ArtworkLightboxProps {
  artworks: ArtItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 60;

export function ArtworkLightbox({
  artworks,
  index,
  onIndexChange,
  onClose,
}: ArtworkLightboxProps) {
  const open = index !== null && index >= 0 && index < artworks.length;
  const artwork = open ? artworks[index] : null;
  const touchStartX = useRef(0);

  const step = (delta: number) => {
    if (index === null || artworks.length === 0) return;
    onIndexChange((index + delta + artworks.length) % artworks.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, artworks.length]);

  const modalUrl = artwork?.imagesCollection?.items[0]?.url;
  const meta = artwork
    ? [formatMeta(artwork), formatDimensions(artwork)].filter(Boolean).join(" · ")
    : "";

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        className="w-full h-full max-w-none max-h-none sm:w-auto sm:h-auto sm:max-w-[92vw] md:max-w-4xl p-0 overflow-y-auto bg-background border-none rounded-none sm:rounded-lg shadow-none sm:shadow-[0_25px_60px_-12px_rgba(20,15,10,0.3)] flex flex-col"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const dx = event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1);
        }}
      >
        <DialogTitle className="sr-only">{artwork?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {artwork?.title} - {artwork?.mediumPaint?.join(", ")}
        </DialogDescription>

        {modalUrl && (
          <div className="flex-1 flex items-center justify-center bg-secondary/30 min-h-0">
            <img
              src={modalUrl + "?w=1800&fm=webp"}
              className="object-contain w-full max-h-[70vh] sm:max-h-[76vh]"
              style={{ aspectRatio: artwork ? getAspectRatio(artwork) : undefined }}
              alt={artwork?.title || "artwork"}
            />
          </div>
        )}

        <div className="shrink-0 px-6 sm:px-8 py-5">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            {artwork?.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">{meta}</p>
          {artwork?.forSale ? (
            <p className="text-xs font-medium tracking-wide uppercase text-accent mt-3">
              Available for purchase
            </p>
          ) : (
            <p className="text-xs tracking-wide uppercase text-muted-foreground/60 mt-3">
              Sold
            </p>
          )}
        </div>

        {artworks.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous artwork"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 bg-background/90 text-foreground/70 shadow-sm transition-all duration-200 hover:bg-background hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next artwork"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 bg-background/90 text-foreground/70 shadow-sm transition-all duration-200 hover:bg-background hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

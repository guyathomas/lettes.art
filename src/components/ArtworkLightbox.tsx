import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import type { ArtItem } from "../types";

interface ArtworkLightboxProps {
  artwork: ArtItem | null;
  onClose: () => void;
}

export function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
  const modalUrl = artwork?.imagesCollection?.items[0]?.url;
  const year = artwork?.dateCompleted
    ? new Date(artwork.dateCompleted).getFullYear()
    : undefined;

  return (
    <Dialog open={!!artwork} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full h-full max-w-none max-h-none sm:w-auto sm:h-auto sm:max-w-[92vw] md:max-w-4xl p-0 overflow-y-auto bg-background border-none rounded-none sm:rounded-lg shadow-none sm:shadow-[0_25px_60px_-12px_rgba(20,15,10,0.3)] flex flex-col">
        <DialogTitle className="sr-only">{artwork?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {artwork?.title} - {artwork?.mediumPaint?.join(", ")}
        </DialogDescription>
        {modalUrl && (
          <div className="flex-1 flex items-center bg-secondary/30 min-h-0">
            <img
              src={modalUrl + "?w=1800&fm=webp"}
              className="object-contain w-full max-h-full sm:max-h-[80vh]"
              alt={artwork?.title || "artwork"}
            />
          </div>
        )}
        <div className="shrink-0 px-6 sm:px-8 py-5">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            {artwork?.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            {[artwork?.mediumPaint?.filter(Boolean).join(", "), year].filter(Boolean).join(" \u00b7 ")}
          </p>
          {artwork?.forSale && (
            <p className="text-xs font-medium tracking-wide uppercase text-accent mt-3">
              Available for purchase
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

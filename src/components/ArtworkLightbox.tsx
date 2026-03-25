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
      <DialogContent className="max-w-[90vw] md:max-w-4xl p-0 overflow-hidden bg-background border-none shadow-2xl">
        <DialogTitle className="sr-only">{artwork?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {artwork?.title} - {artwork?.mediumPaint?.join(", ")}
        </DialogDescription>
        {modalUrl && (
          <img
            src={modalUrl + "?w=1800&fm=webp"}
            className="object-contain max-h-[80vh] w-full"
            alt={artwork?.title || "artwork"}
          />
        )}
        <div className="px-6 py-4 border-t border-border">
          <h2 className="font-serif text-2xl text-foreground">{artwork?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {[artwork?.mediumPaint?.filter(Boolean).join(", "), year, artwork?.dimensions].filter(Boolean).join(" · ")}
          </p>
          {artwork?.forSale && (
            <p className="text-sm text-accent mt-2 font-medium">Available for purchase</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import type { ArtItem } from "../types";

interface ArtworkLightboxProps {
  artwork: ArtItem | null;
  onClose: () => void;
}

export function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
  const modalUrl = artwork?.imagesCollection?.items[0]?.url;

  return (
    <Dialog open={!!artwork} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] md:max-w-[85vw]">
        <DialogTitle>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {artwork?.title}
          </h2>
        </DialogTitle>
        {modalUrl && (
          <img
            src={modalUrl + "?w=1800&fm=webp"}
            className="object-cover object-center max-h-[75vh] max-w-full"
            alt={artwork?.title || "artwork"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

import type { ArtItem } from "../types";

interface ArtworkCardProps {
  artwork: ArtItem;
  index: number;
  onClick: () => void;
}

export function ArtworkCard({ artwork, index, onClick }: ArtworkCardProps) {
  if (!artwork) return null;

  const imageUrl = artwork.imagesCollection?.items[0]?.url;
  const year = artwork.dateCompleted
    ? new Date(artwork.dateCompleted).getFullYear()
    : undefined;

  return (
    <button
      onClick={onClick}
      className="group text-left w-full animate-fade-up active:scale-[0.98] transition-transform duration-150"
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="bg-secondary/30 overflow-hidden shadow-[0_2px_8px_-2px_rgba(20,15,10,0.08)] group-hover:shadow-[0_8px_24px_-4px_rgba(20,15,10,0.12)] transition-shadow duration-500">
        {imageUrl && (
          <img
            src={imageUrl + "?w=800&fm=webp"}
            alt={artwork.title || "artwork"}
            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors duration-300">
          {artwork.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {[artwork.mediumPaint?.filter(Boolean).join(", "), year].filter(Boolean).join(" \u00b7 ")}
        </p>
        {artwork.forSale ? (
          <p className="text-xs font-medium tracking-wide uppercase text-accent">
            Available
          </p>
        ) : (
          <p className="text-xs tracking-wide uppercase text-muted-foreground/60">
            Sold
          </p>
        )}
      </div>
    </button>
  );
}

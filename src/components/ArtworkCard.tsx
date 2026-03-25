import type { ArtItem } from "../types";

interface ArtworkCardProps {
  artwork: ArtItem;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  if (!artwork) return null;

  const imageUrl = artwork.imagesCollection?.items[0]?.url;
  const year = artwork.dateCompleted
    ? new Date(artwork.dateCompleted).getFullYear()
    : undefined;

  return (
    <button
      onClick={onClick}
      className="group text-left w-full"
    >
      <div className="aspect-[3/4] bg-secondary/50 mb-5 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-500">
        {imageUrl && (
          <img
            src={imageUrl + "?w=800&fm=webp"}
            alt={artwork.title || "artwork"}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
          {artwork.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {[artwork.mediumPaint?.filter(Boolean).join(", "), year].filter(Boolean).join(" · ")}
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

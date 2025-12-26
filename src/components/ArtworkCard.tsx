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
      className="group text-left w-full transition-opacity hover:opacity-80"
    >
      <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl + "?w=800&fm=webp"}
            alt={artwork.title || "artwork"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg text-neutral-900">{artwork.title}</h3>
        {year && <p className="text-sm text-neutral-500">{year}</p>}
        {artwork.mediumPaint && (
          <p className="text-sm text-neutral-600">{artwork.mediumPaint}</p>
        )}
        {artwork.forSale && (
          <p className="text-sm text-neutral-900">For Sale</p>
        )}
        {!artwork.forSale && (
          <p className="text-sm text-neutral-400 italic">Sold</p>
        )}
      </div>
    </button>
  );
}

import type { ArtItem } from "../types";

export function getYear(artwork: ArtItem): number | undefined {
  return artwork?.dateCompleted
    ? new Date(artwork.dateCompleted).getFullYear()
    : undefined;
}

/** "Acrylic, Graphite · 2024" — medium(s) and year, joined by a middle dot. */
export function formatMeta(artwork: ArtItem): string {
  return [artwork?.mediumPaint?.filter(Boolean).join(", "), getYear(artwork)]
    .filter(Boolean)
    .join(" · ");
}

/** "60 × 75 cm" — Contentful stores the artwork's size in centimetres. */
export function formatDimensions(artwork: ArtItem): string | undefined {
  if (!artwork?.artWidth || !artwork?.artHeight) return undefined;
  return `${artwork.artWidth} × ${artwork.artHeight} cm`;
}

/** Natural proportions of the primary image, used to reserve tile space. */
export function getAspectRatio(artwork: ArtItem): string | undefined {
  const image = artwork?.imagesCollection?.items[0];
  if (!image?.width || !image?.height) return undefined;
  return `${image.width} / ${image.height}`;
}

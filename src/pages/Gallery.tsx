import { useState, useMemo, useEffect } from "react";
import { Filters } from "../components/Filters";
import { ArtworkCard } from "../components/ArtworkCard";
import { ArtworkLightbox } from "../components/ArtworkLightbox";
import { contentfulClient } from "../models/contentful/controller";
import type { ArtItem } from "../types";

type Medium = "Acrylic" | "Graphite" | "Watercolour";
type Status = "For Sale" | "Sold";

export function Gallery() {
  const [artwork, setArtwork] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<Medium | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [selectedArtwork, setSelectedArtwork] = useState<ArtItem | null>(null);

  useEffect(() => {
    contentfulClient
      .getArtCollection()
      .then((items) => {
        const sorted = [...(items || [])].sort((a, b) =>
          (a?.dateCompleted || 0) > (b?.dateCompleted || 0) ? -1 : 1
        );
        setArtwork(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredArtworks = useMemo(() => {
    return artwork.filter((art) => {
      const mediumMatch =
        selectedMedium === "All" || art?.mediumPaint?.includes(selectedMedium);
      const statusMatch =
        selectedStatus === "All" ||
        (selectedStatus === "For Sale" && art?.forSale === true) ||
        (selectedStatus === "Sold" && art?.forSale === false);
      return mediumMatch && statusMatch;
    });
  }, [artwork, selectedMedium, selectedStatus]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="flex flex-col sm:flex-row gap-8 mb-14">
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton h-5 w-32 rounded sm:ml-auto" />
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 masonry">
          {[280, 360, 300, 400, 320, 280].map((h, i) => (
            <div key={i} className="mb-6">
              <div className="skeleton rounded-sm" style={{ height: h }} />
              <div className="mt-4 space-y-2">
                <div className="skeleton h-5 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-sm">
          <p className="font-serif text-2xl text-foreground mb-2 text-balance">
            Something went wrong
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <Filters
          selectedMedium={selectedMedium}
          selectedStatus={selectedStatus}
          onMediumChange={setSelectedMedium}
          onStatusChange={setSelectedStatus}
        />

        {filteredArtworks.length === 0 ? (
          <div className="py-24 max-w-sm">
            <p className="font-serif text-2xl text-foreground mb-2 text-balance">
              Nothing here yet
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              No artworks match your current filters. Try adjusting your selection above.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 masonry">
            {filteredArtworks.map((art, index) => {
              if (!art?.imagesCollection?.items.length) {
                return null;
              }
              return (
                <ArtworkCard
                  key={art._id}
                  artwork={art}
                  index={index}
                  onClick={() => setSelectedArtwork(art)}
                />
              );
            })}
          </div>
        )}
      </div>

      <ArtworkLightbox
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  );
}

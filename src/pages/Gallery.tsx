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
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Filters
          selectedMedium={selectedMedium}
          selectedStatus={selectedStatus}
          onMediumChange={setSelectedMedium}
          onStatusChange={setSelectedStatus}
        />

        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">No artworks match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredArtworks.map((art) => {
              if (!art?.imagesCollection?.items.length) {
                return null;
              }
              return (
                <ArtworkCard
                  key={art._id}
                  artwork={art}
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

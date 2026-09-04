import { useState, useMemo, useEffect } from "react";
import { Filters } from "../components/Filters";
import { ArtworkCard } from "../components/ArtworkCard";
import { ArtworkLightbox } from "../components/ArtworkLightbox";
import { contentfulClient } from "../models/contentful/controller";
import type { ArtItem, Medium, Status } from "../types";

const SKELETON_HEIGHTS = [220, 160, 280, 200, 240, 180, 260, 200, 150, 300, 190, 230];

export function Gallery() {
  const [artwork, setArtwork] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<Medium | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [showLabels, setShowLabels] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      if (!art?.imagesCollection?.items.length) return false;
      const mediumMatch =
        selectedMedium === "All" || art?.mediumPaint?.includes(selectedMedium);
      const statusMatch =
        selectedStatus === "All" ||
        (selectedStatus === "For Sale" && art?.forSale === true) ||
        (selectedStatus === "Sold" && art?.forSale === false);
      return mediumMatch && statusMatch;
    });
  }, [artwork, selectedMedium, selectedStatus]);

  // The lightbox indexes into the filtered list, so changing a filter while it
  // is open would point at a different piece — close it instead.
  useEffect(() => {
    setOpenIndex(null);
  }, [selectedMedium, selectedStatus]);

  if (loading) {
    return (
      <section id="gallery" className="mx-auto max-w-6xl px-5 sm:px-6 pt-8 sm:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-6 sm:mb-7">
          <div className="skeleton h-9 w-48 rounded" />
          <div className="skeleton h-12 w-72 rounded" />
        </div>
        <div className="wall">
          {SKELETON_HEIGHTS.map((h, i) => (
            <div key={i} className="skeleton" style={{ height: h }} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="mx-auto max-w-6xl px-5 sm:px-6 py-20">
        <div className="max-w-sm">
          <p className="font-serif text-2xl text-foreground mb-2 text-balance">
            Something went wrong
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="wall-title"
        className="mx-auto max-w-6xl px-5 sm:px-6 pt-8 sm:pt-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-6 sm:mb-7">
          <h1
            id="wall-title"
            className="font-serif font-normal text-[clamp(1.875rem,4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            The wall
            <small className="inline-block ml-2.5 align-middle font-serif text-xs tracking-widest uppercase text-muted-foreground">
              {filteredArtworks.length} works
            </small>
          </h1>

          <Filters
            selectedMedium={selectedMedium}
            selectedStatus={selectedStatus}
            showLabels={showLabels}
            onMediumChange={setSelectedMedium}
            onStatusChange={setSelectedStatus}
            onShowLabelsChange={setShowLabels}
          />
        </div>

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
          <div className={`wall${showLabels ? " labels" : ""}`}>
            {filteredArtworks.map((art, index) => (
              <ArtworkCard
                key={art?._id}
                artwork={art}
                index={index}
                showLabel={showLabels}
                onClick={() => setOpenIndex(index)}
              />
            ))}
          </div>
        )}
      </section>

      <ArtworkLightbox
        artworks={filteredArtworks}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}

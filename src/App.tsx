import React, { useState, useEffect, useMemo } from "react";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { Card, CardHeader, CardTitle } from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Toggle } from "./components/ui/toggle";
import { ModeToggle } from "./components/ui/mode-toggle";
import { contentfulClient } from "./models/contentful/controller";
import type { GetArtCollectionQuery } from "./models/contentful/__generated__/graphql";

type ArtItem = NonNullable<
  NonNullable<GetArtCollectionQuery["artCollection"]>["items"]
>[number];

const MAX_IMAGE_WIDTH = "1179";

enum FILTERS {
  MEDIUM = "medium",
  SOLD_STATUS = "soldStatus",
  CATEGORY = "category",
}

function App() {
  const [artwork, setArtwork] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeArtwork, setActiveArtwork] = useState<ArtItem | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

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

  const filteredArtwork = useMemo(
    () =>
      artwork
        .filter((art) => {
          const medium = filters[FILTERS.MEDIUM];
          if (!medium) return true;
          return art?.mediumPaint?.includes(medium);
        })
        .filter((art) => {
          const soldStatus = filters[FILTERS.SOLD_STATUS];
          if (!soldStatus) return true;
          if (soldStatus === "For Sale") return art?.forSale === true;
          if (soldStatus === "Sold") return art?.forSale === false;
          return true;
        })
        .filter((art) => {
          const category = filters[FILTERS.CATEGORY];
          if (!category) return true;
          return art?.category === category;
        }),
    [artwork, filters]
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      if (prev[key] === value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-primary">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-destructive">Error: {error}</h2>
      </div>
    );
  }

  if (!artwork?.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-primary">No Images Found</h2>
      </div>
    );
  }

  const modalUrl = activeArtwork?.imagesCollection?.items[0]?.url;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Dialog>
        <DialogContent>
          <DialogTitle>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {activeArtwork?.title}
            </h2>
          </DialogTitle>
          <img
            src={modalUrl ? modalUrl + `?w=1800&fm=webp` : ""}
            className="object-cover object-center max-h-[75vh] max-w-[85vw] md:max-w-[75vw]"
            alt={activeArtwork?.title || "artwork"}
          />
        </DialogContent>
        <div>
          <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-2">
            <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl uppercase my-4">
              {`Lette's Art`}
            </h1>
            <ModeToggle />
          </div>
          <div className="flex mb-4 gap-x-8 gap-y-2 flex-wrap">
            <ToggleGroup
              type="single"
              variant="outline"
              value={filters[FILTERS.MEDIUM] || ""}
              onValueChange={(value) =>
                handleFilterChange(FILTERS.MEDIUM, value)
              }
            >
              <ToggleGroupItem
                value="Acrylic"
                aria-label="Toggle Acrylic"
                className="text-primary"
              >
                Acrylic
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Graphite"
                aria-label="Toggle Graphite"
                className="text-primary"
              >
                Graphite
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Watercolour"
                aria-label="Toggle Watercolour"
                className="text-primary"
              >
                Watercolour
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              type="single"
              variant="outline"
              value={filters[FILTERS.SOLD_STATUS] || ""}
              onValueChange={(value) =>
                handleFilterChange(FILTERS.SOLD_STATUS, value)
              }
            >
              <ToggleGroupItem
                value="For Sale"
                aria-label="Toggle For Sale"
                className="text-primary"
              >
                For Sale
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Sold"
                aria-label="Toggle Sold"
                className="text-primary"
              >
                Sold
              </ToggleGroupItem>
            </ToggleGroup>
            <Toggle
              variant="outline"
              pressed={filters[FILTERS.CATEGORY] === "Pet Portrait"}
              onPressedChange={(pressed) =>
                handleFilterChange(
                  FILTERS.CATEGORY,
                  pressed ? "Pet Portrait" : ""
                )
              }
              aria-label="Toggle Pet Portrait"
              className="text-primary"
            >
              Pet Portrait
            </Toggle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {filteredArtwork.map((art) => {
              if (!art?.imagesCollection?.items.length) {
                return null;
              }
              const file = art.imagesCollection.items[0];
              return (
                <DialogTrigger asChild key={art._id}>
                  <button
                    onClick={() => setActiveArtwork(art)}
                    className="transform hover:scale-[1.02] transition duration-300 w-full"
                  >
                    <Card className="text-primary h-full flex flex-col bg-primary-foreground">
                      <CardHeader>
                        <CardTitle>{art.title}</CardTitle>
                      </CardHeader>
                      <img
                        src={
                          file?.url
                            ? file.url + `?w=${MAX_IMAGE_WIDTH}&fm=webp`
                            : ""
                        }
                        alt={art.title || "artwork image"}
                        loading="lazy"
                        width={`${MAX_IMAGE_WIDTH}px`}
                        className="rounded-b-sm h-full object-cover"
                      />
                    </Card>
                  </button>
                </DialogTrigger>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;

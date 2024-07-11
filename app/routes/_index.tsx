import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { useLoaderData } from "@remix-run/react";

import { contentfulClient } from "../models/contentful/controller";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: `Lette's Art` },
    {
      name: "description",
      content: "Artwork from the Mornington Peninsula, Australia",
    },
    { name: "og:title", content: "Lette's Art" },
    {
      name: "og:image",
      content:
        "https://images.ctfassets.net/2y9b3o528x1d/6w7gZ9Y8k7h5ZJHf3zgZ3e/1d1f5e1e6",
    },
  ];
};

const MAX_IMAGE_WIDTH = 410;
const MAX_IMAGE_HEIGHT = 510;

export async function loader() {
  const entries = await contentfulClient.getArtCollection();

  return {
    artwork: entries.sort((a, b) =>
      (a.dateCompleted || 0) > (b.dateCompleted || 0) ? -1 : 1
    ),
  };
}


const Index: React.FC = () => {
  const { artwork } = useLoaderData<typeof loader>();
  const hasArtwork = artwork?.length;

  if (!hasArtwork) {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        No Images Found 😢
      </h2>
    );
  }
  const filteredArtwork = [...artwork];
  // const filteredArtwork = React.useMemo(
  //   () =>
  //     artwork
  //       .filter((art) => {
  //         if (activeFilters.mediumPaint === null) return true;
  //         return art.fields.mediumPaint.includes(activeFilters.mediumPaint);
  //       })
  //       .filter((art) => {
  //         if (activeFilters.forSale === null) return true;
  //         const forSale = (art.fields.forSale?.toString() ||
  //           "false") as BooleanString;
  //         const artMatchesActiveFilter =
  //           activeFilters.forSale.includes(forSale);
  //         return artMatchesActiveFilter;
  //       })
  //       .filter((art) => {
  //         if (
  //           activeFilters.category === null ||
  //           activeFilters.category === "all"
  //         ) {
  //           return true;
  //         }
  //         return art.fields.category === activeFilters.category;
  //       }),
  //   [artwork, activeFilters]
  // );
  return (
    <div>
      <div>
        <ToggleGroup type="single">
          <ToggleGroupItem value="bold" aria-label="Toggle Acrylic">
            Acrylic
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle Graphite">
            Graphite
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle Watercolour"
          >
            Watercolour
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            For Sale
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            Sold
          </ToggleGroupItem>
        </ToggleGroup>
        <Toggle aria-label="Toggle italic">Pet Portrait</Toggle>
      </div>

      <div className="p-20">
        {filteredArtwork.map((artwork) => {

          if (!artwork?.imagesCollection?.items?.length) {
            console.warn(`Artwork: ${artwork?.title || "?"} has no images`);
            return null;
          }

          const file = artwork?.imagesCollection.items[0]

          return (
            <img
              src={file?.url + `?w=${MAX_IMAGE_WIDTH}&fm=webp`}
              alt={artwork?.title || "artwork image"}
              loading="lazy"
              width={`${MAX_IMAGE_WIDTH}px`}
              height={`${MAX_IMAGE_HEIGHT}px`}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Index;

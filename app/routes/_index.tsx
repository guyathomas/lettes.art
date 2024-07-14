import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Form, useSearchParams, useLoaderData } from '@remix-run/react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';

import { contentfulClient } from '../models/contentful/controller';

import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: `Lette's Art` },
    {
      name: 'description',
      content: 'Artwork from the Mornington Peninsula, Australia',
    },
    { name: 'og:title', content: "Lette's Art" },
    {
      name: 'og:image',
      content:
        'https://images.ctfassets.net/2y9b3o528x1d/6w7gZ9Y8k7h5ZJHf3zgZ3e/1d1f5e1e6',
    },
  ];
};

const MAX_IMAGE_WIDTH = '1179';

export async function loader() {
  const entries = await contentfulClient.getArtCollection();

  return {
    artwork: entries?.sort((a, b) =>
      (a?.dateCompleted || 0) > (b?.dateCompleted || 0) ? -1 : 1,
    ),
  };
}

enum QUERY_PARAMS {
  ACTIVE_IMAGE_ID = 'activeImageId',
  MEDIUM = 'medium',
  SOLD_STATUS = 'soldStatus',
  CATEGORY = 'category',
}

const Index: React.FC = () => {
  const { artwork } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const activeImageId =
    searchParams.get(QUERY_PARAMS.ACTIVE_IMAGE_ID) || undefined;

  if (!artwork?.length) {
    return <h2 className="text-primary">No Images Found 😢</h2>;
  }
  console.log(searchParams.get(QUERY_PARAMS.MEDIUM));
  const filteredArtwork = React.useMemo(
    () =>
      artwork
        .filter((art) => {
          const medium = searchParams.get(QUERY_PARAMS.MEDIUM);
          if (!medium) return true;
          return art?.mediumPaint?.includes(medium);
        })
        .filter((art) => {
          const soldStatus = searchParams.get(QUERY_PARAMS.SOLD_STATUS);
          if (!soldStatus) return true;
          return soldStatus === art?.forSale?.toString();
        })
        .filter((art) => {
          const cateogry = searchParams.get(QUERY_PARAMS.CATEGORY);
          if (!cateogry) return true;
          return art?.category === cateogry;
        }),
    [artwork, searchParams],
  );
  const activeArtwork = artwork.find((art) => art?._id === activeImageId);
  const modalUrl = activeArtwork?.imagesCollection?.items[0]?.url;
  return (
    <>
      <Dialog>
        <DialogContent className="">
          <DialogTitle>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {activeArtwork?.title}
            </h2>
          </DialogTitle>
          <img
            src={modalUrl ? modalUrl + `?w=1800&fm=webp` : ''}
            className="object-cover object-center max-h-[75vh] max-w-[85vw] md:max-w-[75vw]"
          />
        </DialogContent>
        <div>
          <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl uppercase my-4 sticky top-0 bg-background z-10 py-2">
            {`Lette's Art`}
          </h1>
          <Form className="flex mb-4 gap-x-8 gap-y-2 flex-wrap">
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem
                value="Acrylic"
                name={QUERY_PARAMS.MEDIUM}
                aria-label="Toggle Acrylic"
                className="text-primary"
              >
                Acrylic
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Graphite"
                name={QUERY_PARAMS.MEDIUM}
                aria-label="Toggle Graphite"
                className="text-primary"
              >
                Graphite
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Watercolour"
                name={QUERY_PARAMS.MEDIUM}
                aria-label="Toggle Watercolour"
                className="text-primary"
              >
                Watercolour
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem
                value="For Sale"
                name={QUERY_PARAMS.SOLD_STATUS}
                aria-label="Toggle For Sale"
                className="text-primary"
              >
                For Sale
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Sold"
                name={QUERY_PARAMS.SOLD_STATUS}
                aria-label="Toggle Sold"
                className="text-primary"
              >
                Sold
              </ToggleGroupItem>
            </ToggleGroup>
            <Toggle
              variant="outline"
              value="Pet Portrait"
              name={QUERY_PARAMS.CATEGORY}
              aria-label="Toggle Pet Portrait"
              className="text-primary"
            >
              Pet Portrait
            </Toggle>
          </Form>
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {filteredArtwork.map((artwork) => {
                if (!artwork?.imagesCollection?.items.length) {
                  console.warn(
                    `Artwork: ${artwork?.title || '?'} has no images`,
                  );
                  return null;
                }
                const file = artwork.imagesCollection.items[0];
                return (
                  <button
                    name={QUERY_PARAMS.ACTIVE_IMAGE_ID}
                    value={artwork._id}
                    className="transform hover:scale-[1.02] transition duration-300"
                    key={artwork._id}
                  >
                    <DialogTrigger asChild>
                      <Card className="text-primary h-full flex flex-col bg-primary-foreground">
                        <CardHeader>
                          <CardTitle>{artwork.title}</CardTitle>
                        </CardHeader>
                        <img
                          src={
                            file?.url
                              ? file.url + `?w=${MAX_IMAGE_WIDTH}&fm=webp`
                              : ''
                          }
                          alt={artwork.title || 'artwork image'}
                          loading="lazy"
                          width={`${MAX_IMAGE_WIDTH}px`}
                          className="rounded-b-sm h-full object-cover"
                        />
                      </Card>
                    </DialogTrigger>
                  </button>
                );
              })}
            </div>
          </Form>
        </div>
      </Dialog>
    </>
  );
};
export default Index;

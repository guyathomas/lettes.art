import type { GetArtCollectionQuery } from "./models/contentful/__generated__/graphql";

export type ArtItem = NonNullable<
  NonNullable<GetArtCollectionQuery["artCollection"]>["items"]
>[number];

export type Medium = "Acrylic" | "Graphite" | "Watercolour";
export type Status = "For Sale" | "Sold";

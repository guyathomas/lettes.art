import { EntryCollection, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export type ImageEntry = {
  title: string;
  description: string;
  file: {
    url: string; // '// images.ctfassets.net/k5e511oz03s5/1ULDuPw0eP4zrNZO7I2ErY/4dadd86da3e0c00db45aa0a5fd9f2d69/IMG_6195.jpg',
    details: { size: number; image: { width: number; height: number } };
    fileName: string; // 'IMG_6195.jpg',
    contentType: string; // 'image/jpeg'
  };
};
export type MediumSurface =
  | "Canvas"
  | "Sketch Paper"
  | "Watercolor Paper ( 300gsm )";
export type MediumPaint = "Acrylic" | "Graphite" | "Watercolour";
export type Category = "pet-portrait" | "wildlife" | "abstract" | "portrait";
export interface ArtEntry {
  title: string;
  images: EntryCollection<ImageEntry>["items"];
  previewImage?: Entry<ImageEntry>;
  isFramed: boolean;
  mediumSurface: MediumSurface[];
  mediumPaint: MediumPaint[];
  category?: Category;
  forSale?: boolean;
  dateCompleted: string; // ISO-8601
  artHeight: number;
  artWidth: number;
  description: Document;
  price?: number;
}
export type ArtItem = EntryCollection<ArtEntry>["items"][0];

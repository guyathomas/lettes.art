import { EntryCollection, RichTextContent } from "contentful";

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

export interface ArtEntry {
  title: string;
  forSale: boolean;
  images: EntryCollection<ImageEntry>["items"];
  slug: string;
  description: RichTextContent;
}
export type ArtItem = EntryCollection<ArtEntry>["items"][0];

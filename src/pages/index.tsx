import * as contentful from "contentful";
import { EntryCollection, RichTextContent } from "contentful";

const ONE_DAY = 60 * 60 * 24;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
});

type ImageEntry = {
  title: string;
  description: string;
  file: {
    url: string; // '// images.ctfassets.net/k5e511oz03s5/1ULDuPw0eP4zrNZO7I2ErY/4dadd86da3e0c00db45aa0a5fd9f2d69/IMG_6195.jpg',
    details: { size: number; image: { width: number; height: number } };
    fileName: string; // 'IMG_6195.jpg',
    contentType: string; // 'image/jpeg'
  };
};

interface ArtEntry {
  title: string;
  caption: RichTextContent
  forSale: boolean;
  images: EntryCollection<ImageEntry>[];
}
export const getStaticProps = async () => {
  const entries = await client.getEntries<ArtEntry>();
  return {
    props: {
      artwork: entries.items,
    },
    revalidate: ONE_DAY,
  };
};
interface IndexProps {
  artwork: EntryCollection<ArtEntry>["items"];
}
const Index: React.FC<IndexProps> = ({ artwork }) => {
  // console.log('zzz',artwork[0].fields.caption)
  return <div>Hello, world!</div>;
};
export default Index;

import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Container,
  ImageListItemBar,
} from "@material-ui/core";
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
  forSale: boolean;
  images: EntryCollection<ImageEntry>["items"];
  slug: string;
  description: RichTextContent;
}
export const getStaticProps = async () => {
  const entries = await client.getEntries<ArtEntry>();
  return {
    props: {
      artwork: entries,
    },
    revalidate: ONE_DAY,
  };
};
interface IndexProps {
  artwork: EntryCollection<ArtEntry>;
}
const Index: React.FC<IndexProps> = ({ artwork }) => {
  return (
    <>
      <Typography variant="h1" textAlign="center" marginTop={5}>
        I'm Collette!
      </Typography>
      {artwork?.items?.length ? (
        <ImageList>
          {artwork.items.map((item) => {
            const { title, file } = item.fields.images[0].fields;
            return (
              <ImageListItem key={item.sys.id}>
                <img src={file.url} alt={title} loading="lazy" />
                <ImageListItemBar title={title} />
              </ImageListItem>
            );
          })}
        </ImageList>
      ) : (
        <Typography variant="h2" textAlign="center" marginTop={5}>
          No Images Found 😢
        </Typography>
      )}
    </>
  );
};
export default Index;

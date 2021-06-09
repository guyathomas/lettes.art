import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@material-ui/core";
import * as contentful from "contentful";
import { EntryCollection, RichTextContent } from "contentful";
import styled from "@emotion/styled";
const ONE_DAY = 60 * 60 * 24;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
});

const EnlargeableImageListItem = styled(ImageListItem)`
  transition: transform 100ms ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    z-index: 2;
    opacity: 0.8;
  }
`;

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
  const hasArtwork = artwork?.items?.length;
  if (!hasArtwork) {
    return (
      <Typography variant="h2" textAlign="center" marginTop={5}>
        No Images Found 😢
      </Typography>
    );
  }
  return (
    <ImageList cols={3} gap={20}>
      {artwork.items.map((item) => {
        const { title, file } = item.fields.images[0].fields;
        return (
          <EnlargeableImageListItem key={item.sys.id}>
            <img src={file.url} alt={title} loading="lazy" />
            <Box marginBottom={2.5} marginTop={0.5}>
              <Typography
                textAlign="center"
                variant="h6"
                sx={{ textTransform: "uppercase" }}
              >
                {title}
              </Typography>
            </Box>
          </EnlargeableImageListItem>
        );
      })}
    </ImageList>
  );
};
export default Index;

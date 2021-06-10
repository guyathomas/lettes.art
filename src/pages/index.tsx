import React from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as contentful from "contentful";
import { EntryCollection } from "contentful";
import { ArtItem, ArtEntry } from "types";
import ImageModal from "components/ImageModal";
const ONE_DAY = 60 * 60 * 24;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
});

const useImageListStyles = makeStyles((theme: Theme) => ({
  imageList: {
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr) !important",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr) !important",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr) !important",
    },
  },
  imageListItem: {
    'transition': 'transform 100ms ease-in-out',
    'cursor': 'pointer',
    '&:hover': {
      transform: 'scale(1.01)',
      zIndex: 2
    }
  }
}));

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
  const [activeArtItem, setActiveArtItem] = React.useState<ArtItem>();
  const classes = useImageListStyles();
  if (!hasArtwork) {
    return (
      <Typography variant="h2" textAlign="center" marginTop={5}>
        No Images Found 😢
      </Typography>
    );
  }
  return (
    <>
      <ImageModal
        artItem={activeArtItem}
        onClose={() => {
          setActiveArtItem(undefined);
        }}
      />
      <ImageList gap={20} className={classes.imageList}>
        {artwork.items.map((item) => {
          const { title, file } = item.fields.images[0].fields;
          return (
            <ImageListItem
              key={item.sys.id}
              onClick={() => {
                setActiveArtItem(item);
              }}
              className={classes.imageListItem}
            >
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
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
};
export default Index;

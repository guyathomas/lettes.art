import React from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as contentful from "contentful";
import { EntryCollection } from "contentful";
import { ArtItem, ArtEntry, MediumPaint } from "types";
import ImageModal from "components/ImageModal";
import intersection from "lodash/intersection";
import { useRouter } from "next/router";
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
    transition: "transform 100ms ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.01)",
      zIndex: 2,
    },
  },
  toggleButton: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
}));

export const getStaticProps = async () => {
  const entries = await client.getEntries<ArtEntry>();
  return {
    props: {
      artwork: entries.items.sort((a, b) =>
        a.fields.dateCompleted > b.fields.dateCompleted ? -1 : 1
      ),
    },
    revalidate: ONE_DAY,
  };
};
interface IndexProps {
  artwork: EntryCollection<ArtEntry>["items"];
  initialSelectedArtwork?: string;
}
type BooleanString = "false" | "true";
interface Filters {
  mediumPaint: MediumPaint[];
  forSale: BooleanString[];
}

const initialFilterState: Filters = {
  mediumPaint: [],
  forSale: [],
};

const Index: React.FC<IndexProps> = ({ artwork }) => {
  const hasArtwork = artwork?.length;
  const classes = useImageListStyles();
  const router = useRouter();
  const {
    query: { artworkId },
  } = router;
  const [activeFilters, setActiveFilters] =
    React.useState<Filters>(initialFilterState);

  const activeArtItem: ArtItem | undefined = React.useMemo(
    () => artworkId && artwork.find((a) => a.sys.id === artworkId),
    [artworkId]
  );
  const setActiveArtItem = (artworkId?: string) => {
    router.replace(
      {
        pathname: "/",
        query: artworkId ? { artworkId } : {},
      },
      undefined,
      { shallow: true }
    );
  };
  if (!hasArtwork) {
    return (
      <Typography variant="h2" textAlign="center" marginTop={5}>
        No Images Found 😢
      </Typography>
    );
  }
  const filteredArtwork = artwork
    .filter((art) => {
      const isFilterApplied = activeFilters.mediumPaint.length;
      const artMatchesActiveFilter = intersection(
        activeFilters.mediumPaint,
        art.fields.mediumPaint
      );
      return !isFilterApplied || artMatchesActiveFilter.length;
    })
    .filter((art) => {
      const neitherSelected = activeFilters.forSale.length === 0;
      const bothSelected = activeFilters.forSale.length === 2;
      const applyNoFiler = neitherSelected || bothSelected;
      if (applyNoFiler) return true;

      const forSale = (art.fields.forSale?.toString() ||
        "false") as BooleanString;
      const artMatchesActiveFilter = activeFilters.forSale.includes(forSale);
      return artMatchesActiveFilter;
    });
  return (
    <>
      <ImageModal
        artItem={activeArtItem}
        onClose={() => {
          setActiveArtItem();
        }}
      />
      <Grid container gap={2}>
        <Grid item>
          <ToggleButtonGroup
            value={activeFilters.mediumPaint}
            onChange={(_, mediumPaint) => {
              setActiveFilters((currentFilters) => ({
                ...currentFilters,
                mediumPaint,
              }));
            }}
          >
            <ToggleButton className={classes.toggleButton} value="Acrylic">
              Acrylic
            </ToggleButton>
            <ToggleButton className={classes.toggleButton} value="Graphite">
              Graphite
            </ToggleButton>
            <ToggleButton className={classes.toggleButton} value="Watercolour">
              Watercolour
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={activeFilters.forSale}
            onChange={(_, forSale) => {
              setActiveFilters((currentFilters) => ({
                ...currentFilters,
                forSale,
              }));
            }}
          >
            <ToggleButton className={classes.toggleButton} value="true">
              For Sale
            </ToggleButton>
            <ToggleButton className={classes.toggleButton} value="false">
              Sold
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {activeFilters !== initialFilterState && (
        <Typography mt={2} variant="body1">
          {`Showing ${filteredArtwork.length} of ${artwork.length} results`}
        </Typography>
      )}

      <ImageList gap={20} className={classes.imageList}>
        {filteredArtwork.map((item) => {
          if (!item.fields.images.length) {
            console.warn(`Artwork: ${item.fields.title} has no images`);
            return null;
          } else if (!item.fields.images[0].fields) {
            console.warn(`Artwork: ${item.fields.title} has no image fields`);
            return null;
          }
          const { file } = item.fields.images[0].fields;
          return (
            <ImageListItem
              key={item.sys.id}
              onClick={() => {
                setActiveArtItem(item.sys.id);
              }}
              className={classes.imageListItem}
            >
              <img
                src={file.url + `?w=850&fm=webp`}
                width={file.details.image.width}
                height={file.details.image.height}
                alt={item.fields.title}
                loading="lazy"
              />
              <Box marginBottom={2.5} marginTop={0.5}>
                <Typography
                  textAlign="center"
                  variant="h6"
                  sx={{ textTransform: "uppercase" }}
                >
                  {item.fields.title}
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

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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as contentful from "contentful";
import { EntryCollection } from "contentful";
import { ArtItem, ArtEntry, MediumPaint, Category } from "types";
import ImageModal from "components/ImageModal";
import { useRouter } from "next/router";
const ONE_DAY = 60 * 60 * 24;

const SIMPLE_PET_PORTRAIT = true;
const MAX_IMAGE_WIDTH = 410;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
});

const useImageListStyles = makeStyles((theme: Theme) => ({
  imageList: {
    padding: 10,
    margin: -10,
    paddingTop: 20,
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
    maxWidth: MAX_IMAGE_WIDTH,
    margin: "0 auto",
    "&:hover": {
      transform: "scale(1.01)",
      zIndex: 2,
    },
  },
  resultSummary: {
    marginTop: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: MAX_IMAGE_WIDTH,
      margin: "1rem auto",
      marginBottom: "0.5rem",
    },
  },
  toggleButton: {
    [theme.breakpoints.down("lg")]: {
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
  mediumPaint: MediumPaint | null;
  category: MaybeCategory | null;
  forSale: BooleanString | null;
}

type MaybeCategory = Category | "all";

const initialFilterState: Filters = {
  mediumPaint: null,
  forSale: null,
  category: null,
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
      if (activeFilters.mediumPaint === null) return true;
      return art.fields.mediumPaint.includes(activeFilters.mediumPaint);
    })
    .filter((art) => {
      if (activeFilters.forSale === null) return true;
      const forSale = (art.fields.forSale?.toString() ||
        "false") as BooleanString;
      const artMatchesActiveFilter = activeFilters.forSale.includes(forSale);
      return artMatchesActiveFilter;
    })
    .filter((art) => {
      if (activeFilters.category === null || activeFilters.category === "all") {
        return true;
      }
      return art.fields.category === activeFilters.category;
    });
  return (
    <>
      <ImageModal
        artItem={activeArtItem}
        onClose={() => {
          setActiveArtItem();
        }}
      />
      <Grid container gap={2} mb={1} alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            value={activeFilters.mediumPaint}
            exclusive
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
            exclusive
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

        <Grid item>
          {SIMPLE_PET_PORTRAIT ? (
            <ToggleButtonGroup
              value={activeFilters.category}
              exclusive
              onChange={(_, category) => {
                setActiveFilters((currentFilters) => ({
                  ...currentFilters,
                  category,
                }));
              }}
            >
              <ToggleButton
                className={classes.toggleButton}
                value="pet-portrait"
              >
                Pet Portrait
              </ToggleButton>
            </ToggleButtonGroup>
          ) : (
            <FormControl size="small">
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                labelId="category-select"
                value={activeFilters.category}
                label="Category"
                sx={{ minWidth: 120 }}
                onChange={(event) => {
                  setActiveFilters((currentFilters) => ({
                    ...currentFilters,
                    category: (event.target.value as MaybeCategory) || null,
                  }));
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pet-portrait">Pet Portrait</MenuItem>
                <MenuItem value="portrait">Portrait</MenuItem>
                <MenuItem value="abstract">Abstract</MenuItem>
                <MenuItem value="wildlife">Wildlife</MenuItem>
              </Select>
            </FormControl>
          )}
        </Grid>
      </Grid>
      {activeFilters !== initialFilterState && (
        <Typography mt={2} variant="body1" className={classes.resultSummary}>
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
          const file =
            item.fields?.previewImage?.fields?.file ||
            item.fields.images[0].fields.file;
          if (!file?.url) {
            console.warn(`Artwork: ${item.fields.title} has no URL`);
            return null;
          }

          const aspectRatio =
            file.details?.image?.width / file.details?.image?.height;
          const isLandscape = aspectRatio > 1.1;
          return (
            <ImageListItem
              key={item.sys.id}
              onClick={() => {
                setActiveArtItem(item.sys.id);
              }}
              className={classes.imageListItem}
            >
              <img
                src={file.url + `?w=${MAX_IMAGE_WIDTH}&fm=webp`}
                width={`${MAX_IMAGE_WIDTH}px`}
                alt={item.fields?.title}
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

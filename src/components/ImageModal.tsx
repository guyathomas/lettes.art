import React from "react";
import {
  Box,
  Typography,
  Theme,
  Modal,
  Grid,
  Button,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableBody,
  Paper,
  Link,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { ArtItem } from "types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface ImageModalProps {
  onClose: () => void;
  artItem?: ArtItem;
}

const useImageModalStyles = makeStyles((theme: Theme) => ({
  box: {
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
    maxHeight: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
  },
  boxContent: {
    [theme.breakpoints.down('lg')]: {
      height: "100vh",
      overflowY: "scroll",
    },
  },
  imageContent: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down('lg')]: {
      paddingBottom: theme.spacing(14),
    },
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  gridColumn: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "100vh",
      overflowY: "scroll",
    },
  },
  fallbackImage: {
    objectFit: "contain",
    maxWidth: "100%",
  },
  video: {
    maxWidth: "100%",
  },
  imageItem: {
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
    },
  },
}));

const ImageModal: React.FC<ImageModalProps> = ({ onClose, artItem }) => {
  const classes = useImageModalStyles();

  if (!artItem) return null;
  const {
    fields: {
      title,
      images,
      isFramed,
      mediumSurface,
      mediumPaint,
      forSale,
      artHeight,
      artWidth,
      description,
      price,
    },
  } = artItem;
  return (
    <Modal open={Boolean(artItem)} onClose={onClose}>
      <Box className={classes.box}>
        <Button size="large" onClick={onClose} className={classes.closeButton}>
          <CloseIcon fontSize="large" />
        </Button>
        <Box className={classes.boxContent}>
          <Grid container>
            <Grid item className={classes.gridColumn} xs={12} md={6} p={2}>
              <Typography variant="h4" marginRight={1} marginBottom={2}>
                {title}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {mediumPaint && mediumSurface && (
                      <TableRow>
                        <TableCell>Medium</TableCell>
                        <TableCell component="th" scope="row">
                          {`${mediumPaint.join(", ")} on ${mediumSurface.join(
                            ", "
                          )}`}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        For Sale
                      </TableCell>
                      <TableCell>{forSale ? "Yes" : "No"}</TableCell>
                    </TableRow>
                    {forSale && price && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Price
                        </TableCell>
                        <TableCell>
                          ${price}
                          {" - Inquire "}
                          <Link
                            href={`mailto:barlow.collette@gmail.com?&subject=Purchase Inquiry: ${title}&body=I'm interested in this artwork%0A%0A${images[0].fields.file.url.replace(
                              "//",
                              "https://"
                            )}%0A%0A`}
                          >
                            barlow.collette@gmail.com
                          </Link>
                        </TableCell>
                      </TableRow>
                    )}
                    {typeof isFramed === "boolean" && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Is Framed
                        </TableCell>
                        <TableCell>{isFramed ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    )}
                    {artHeight && artWidth && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Dimensions
                        </TableCell>
                        <TableCell>{`${artWidth}cm x ${artHeight}cm`}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {documentToReactComponents(description)}
            </Grid>
            <Grid
              item
              className={[classes.gridColumn, classes.imageContent].join(" ")}
              xs={12}
              md={6}
            >
              {images.map(({ fields: { file, title: imageTitle } }) => {
                const src = file.url.replace("//", "https://") + `?w=850`;
                const hasImageMeta =
                  file.details?.image?.width && file.details?.image?.height;
                const isVideo = file.contentType.startsWith("video/");

                if (isVideo)
                  return (
                    <video autoPlay loop className={classes.video}>
                      <source src={src} />
                    </video>
                  );
                const imageSrc = src + `&fm=webp`;
                if (!hasImageMeta) {
                  console.warn(`Artwork: ${title} is missing image dimensions`);
                  return (
                    <img
                      className={[
                        classes.fallbackImage,
                        classes.imageItem,
                      ].join(" ")}
                      alt={imageTitle}
                      src={imageSrc}
                    />
                  );
                }
                return (
                  <Box className={classes.imageItem}>
                    <Image
                      src={imageSrc}
                      width={file.details?.image?.width}
                      height={file.details?.image?.height}
                      alt={imageTitle}
                    />
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;

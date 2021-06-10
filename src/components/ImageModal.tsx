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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
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
    maxWidth: theme.breakpoints.values.md,
    maxHeight: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      maxHeight: "100vh",
      overflowY: "scroll",
    },
  },
  gridColumn: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "100vh",
      overflowY: "scroll",
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
    },
  } = artItem;
  return (
    <Modal open={Boolean(artItem)} onClose={onClose}>
      <Box
        className={classes.box}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
        }}
      >
        <Button size="large" onClick={onClose} className={classes.closeButton}>
          <CloseIcon fontSize="large" />
        </Button>
        <Grid container className={classes.gridContainer}>
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
                  {typeof isFramed === "boolean" && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Is Framed
                      </TableCell>
                      <TableCell>{forSale ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  )}
                  {artHeight && artWidth && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Dimensions
                      </TableCell>
                      <TableCell>{`${artWidth} x ${artHeight}`}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {documentToReactComponents(description)}
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} md={6}>
            {images.map(({ fields: { file, title } }) => (
              <Image
                src={file.url.replace("//", "https://") + `?w=600&fm=webp`}
                width={file.details.image.width}
                height={file.details.image.height}
                alt={title}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ImageModal;

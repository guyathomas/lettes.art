import React from "react";
import { Box, Typography, Theme, Modal, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import Image from "next/image";
import { ArtItem } from "types";

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
}));

const ImageModal: React.FC<ImageModalProps> = ({ onClose, artItem }) => {
  const classes = useImageModalStyles();

  if (!artItem) return null;
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
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            p={2}
            sx={{
              maxHeight: "100vh",
              overflowY: "scroll",
            }}
          >
            <Typography variant="h4" marginRight={1}>
              {artItem.fields.title}
            </Typography>
            <Typography>{artItem.fields.description}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              maxHeight: "100vh",
              overflowY: "scroll",
            }}
          >
            {artItem.fields.images.map(({ fields: { file, title } }) => (
              <Image
                src={file.url.replace("//", "https://")}
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

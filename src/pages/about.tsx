import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Link } from "@mui/material";
import Image from "next/image";

const bioParts = [
  `I have loved art, drawing and creating from an early age. I find as the years have gone by I like to push to better myself and am learning everyday. Exploring new techniques and mediums.
Working using acrylics, watercolour and pencil gives me a range of subjects to draw and also allows me to be creative.`,

  `I find it relaxing and calming to lose myself in the subject I am working on. I love nature, birds, animals and landscapes. These being the focus and inspiration of my latest works. I love seeing the drawings and paintings come alive giving them a personality of their own.`,

  `I love being challenged and will always strive and push myself to keep creating and mastering.`,
];

const picture = {
  width: 1125,
  height: 1765,
};

const About: React.FC = () => (
  <Box>
    <Typography variant="h5">About me</Typography>
    <Grid container spacing={2} mt={2}>
      <Grid item md={6} xs={12}>
        {bioParts.map((part) => (
          <Typography variant="body1" mb={4}>
            {part}
          </Typography>
        ))}
        <Link href={`mailto:barlow.collette@gmail.com`}>
          barlow.collette@gmail.com
        </Link>
      </Grid>
      <Grid item md={6} xs={12}>
        <Image
          width={picture.width * 0.8}
          height={picture.height * 0.8}
          src={`https://res.cloudinary.com/dqvlfpaev/image/upload/v1624578929/197472447_320757756265540_8200265514722458335_n_wjnutc.jpg`}
        />
      </Grid>
    </Grid>
  </Box>
);
export default About;

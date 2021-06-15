import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import styled from "@emotion/styled";
import { Link } from "@material-ui/core";
import Image from "next/image";

const About: React.FC = () => (
  <Box>
    <Typography variant="h5">About me</Typography>
    <Grid container spacing={2} mt={2}>
      <Grid item md={6} xs={12}>
        <Typography variant="body1">
          I'm a self taught artist based on the Mornington Peninsula, Melbourne
          Victoria. The mediums I like to use are Graphite, Watercolour and
          Acrylic.
        </Typography>
        <Typography marginTop={2} marginBottom={2} variant="body1">
          My work has been displayed in cafe's, stores and local markets. I also
          create customised pieces for clients and more than happy to discuss
          creating the perfect piece for you.
        </Typography>
        <Link href={`mailto:barlow.collette@gmail.com`}>
          barlow.collette@gmail.com
        </Link>
      </Grid>
      <Grid item md={6} xs={12}>
        <Image
          width={900}
          height={500}
          src={`https://res.cloudinary.com/dqvlfpaev/image/upload/v1623735757/131973728_3778949128834041_4617868599977320925_n_nslcyc.jpg`}
        />
      </Grid>
    </Grid>
  </Box>
);
export default About;

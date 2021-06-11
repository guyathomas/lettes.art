import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import styled from "@emotion/styled";

const AboutImage = styled.img`
  width: 100%;
`;
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
        <Typography marginTop={2} variant="body1">
          My work has been displayed in cafe's, stores and local markets. I also
          create customised pieces for clients and more than happy to discuss
          creating the perfect piece for you.
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <AboutImage
          src={`https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/132825345_10224144733789170_4843583989557150274_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=19026a&_nc_ohc=VjKsWLDNJO4AX8m7lX0&_nc_ht=scontent-sjc3-1.xx&oh=bb406ebf8fc6079f2d020754bee79ad2&oe=60C7E7E6`}
        />
      </Grid>
    </Grid>
  </Box>
);
export default About;

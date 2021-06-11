import React from "react";
import { Box, Typography } from "@material-ui/core";
import styled from '@emotion/styled';

const AboutImage = styled.img`
    width: 100%;
    margin-top: 1rem;
`
const About: React.FC = () => (
  <Box>
    <Typography variant="h5">About me</Typography>
    <Typography variant="body1">
      I'm a artist based in Mt. Martha, Victoria, Australia. The mediums I love
      are acrylic, graphite and watercolour. I love creating portraits, animals
      and abstract art.
    </Typography>
    <AboutImage
      
      src={`https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/132825345_10224144733789170_4843583989557150274_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=19026a&_nc_ohc=VjKsWLDNJO4AX8m7lX0&_nc_ht=scontent-sjc3-1.xx&oh=bb406ebf8fc6079f2d020754bee79ad2&oe=60C7E7E6`}
    />
  </Box>
);
export default About;

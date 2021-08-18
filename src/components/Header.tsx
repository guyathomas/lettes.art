import { FC } from "react";
import { Toolbar, Typography, Theme } from "@material-ui/core";
import Link from "next/link";

import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/styles";
import FaceIcon from "@material-ui/icons/Face";
import Box from "@material-ui/core/Box";

const useHeaderStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
    },
  },
}));

const HomeLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    text-decoration: none;
    color: lightblue;
  }
  &:active {
    text-decoration: none;
  }
`;

const Header: FC = () => {
  const classes = useHeaderStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
        }}
      >
        <Link href="/">
          <HomeLink>Lettes.art</HomeLink>
        </Link>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginLeft: "auto",
          textTransform: "uppercase",
        }}
      >
        <Box>
          {/* <HomeLink href="https://store.lettes.art">Store</HomeLink>| */}
          <Link href="/about">
            <HomeLink>
              <FaceIcon style={{ position: "relative", top: "4px" }} />
            </HomeLink>
          </Link>
        </Box>
      </Typography>
    </Toolbar>
  );
};

export default Header;

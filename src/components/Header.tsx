import { FC } from "react";
import { Toolbar, Typography, Theme } from "@material-ui/core";
import Link from "next/link";

import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/styles";

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
  &:hover {
    text-decoration: none;
    color: palette.primary.light;
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
          ":hover": {
            color: "primary.main",
          },
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
          ":hover": {
            color: "primary.main",
          },
        }}
      >
        <Link href="/about">
          <HomeLink>About</HomeLink>
        </Link>
      </Typography>
    </Toolbar>
  );
};

export default Header;

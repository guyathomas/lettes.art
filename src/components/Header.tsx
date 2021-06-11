import { FC } from "react";
import { Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";

import styled from "@emotion/styled";

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
  return (
    <Toolbar
      sx={{
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
      }}
    >
      <Typography
        variant="h4"

        sx={{
          textTransform: 'uppercase',
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
          marginLeft: 'auto',
          textTransform: 'uppercase',
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

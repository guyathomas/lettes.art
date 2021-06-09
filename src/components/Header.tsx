import { FC } from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@material-ui/core";
import ButtonLink from "components/ButtonLink";

const Header: FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "background.paper" }}>
      <Toolbar>
        <Button component={ButtonLink} href="/" color="inherit">
          <Typography variant="h6" color="inherit" marginLeft={1}>
            Lettes.art
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

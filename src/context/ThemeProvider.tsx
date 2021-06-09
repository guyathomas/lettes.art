import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme } from "@material-ui/core";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const ThemeProvider: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;

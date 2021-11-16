import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, adaptV4Theme } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const ThemeProvider: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme(adaptV4Theme({
        palette: {
          mode: "dark",
          // mode: prefersDarkMode ? "dark" : "light",
        },
      })),
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

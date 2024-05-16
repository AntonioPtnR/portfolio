import { ThemeProvider, createTheme} from "@mui/material";
import { useMemo, useState } from "react";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { ModeStatePropsType } from "../../types";
import {ToggleColor, Presentation, Main} from "..";
import { StyledBoxApp } from "../../styles/App.styles";
import { StyledFirstBox } from "./styles";


function App() {
  const [mode, setMode] = useState<ModeStatePropsType>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {fontFamily: 'Poppins'}
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StyledBoxApp>
          <ToggleColor />
          {/*<Presentation />*/}
            <Main />
        </StyledBoxApp>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

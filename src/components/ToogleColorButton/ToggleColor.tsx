import { useTheme } from "@mui/material";
import { ColorModeContext } from "../../contexts";
import { useContext } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { StyledThemeModeBox, StyledThemeModeIconButton } from "./styles";

const ToggleColor = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <StyledThemeModeBox
        >
          <StyledThemeModeIconButton
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </StyledThemeModeIconButton>
        </StyledThemeModeBox>
      );
};



export default ToggleColor;
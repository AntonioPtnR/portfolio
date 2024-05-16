import { Box, styled } from "@mui/material";

const StyledMainBox = styled(Box) (() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly'
}));

const StyledSectionBox = styled(Box) (() => ({
    display: 'flex',
    justifyContent: 'center'
}));

export {StyledMainBox, StyledSectionBox}
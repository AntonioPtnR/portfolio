import { Box, styled } from "@mui/material";

const StyledBoxApp = styled(Box) (({theme}) => ({
    minHeight: "100vh",
    minWidth: '100vw',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
}));

export {StyledBoxApp}
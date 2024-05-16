import { Box, IconButton, styled, IconButtonProps } from "@mui/material";

const StyledThemeModeBox = styled(Box)(()=>({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 3,
}));

const SetThemeIconButton = (props:IconButtonProps) => (<IconButton color="inherit" {...props} />)

const StyledThemeModeIconButton = styled(SetThemeIconButton)(() => ({
    marginLeft: 1
}));

export {
    StyledThemeModeBox,
    StyledThemeModeIconButton
}
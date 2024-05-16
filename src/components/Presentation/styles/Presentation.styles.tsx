import { Avatar, Box, Typography, styled} from "@mui/material";

const StyledPresentationBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
}));

const StyledInfoBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems:'center'
}));

const StyledProfileAvatar = styled(Avatar) (() => ({
    height: 'auto',
    width: '35vh',
    marginTop: '2rem',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center'
}));

const StyledTypographyName = styled(Typography) (() => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize:'20px'
}));

const StyledTypographyDescription= styled(Typography) (() => ({
    whiteSpace: 'nowrap',
    fontFamily: ' MesloLGS NF Regular',
    overflow: 'hidden',
    borderRight: '.15em solid transparent',
    animation: 'typing 3s steps(20, end) forwards',
}));

const StyledPersonalInfoBox = styled(Box) (() => ({
    display: 'inline-block'
}));

const StyledButtonsBox = styled(Box) (() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem'

}));

export {
    StyledPresentationBox,
    StyledInfoBox,
    StyledProfileAvatar,
    StyledTypographyName,
    StyledTypographyDescription,
    StyledPersonalInfoBox,
    StyledButtonsBox
}
import { memo } from "react"
import { StyledButtonsBox, StyledInfoBox, StyledPersonalInfoBox, StyledPresentationBox, StyledProfileAvatar, StyledTypographyDescription, StyledTypographyName} from "./styles";
import aprProfile from "../../assets/aprProfile-1.png"
import { Box, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Presentation = memo(() => {
    const personalInfo = {
        name: '{ "name": "Antonio"',
        work: '"work": Software Development',
        mail: '"mail": antoniopr009@gmail.com}',
    };

    const openLink = (link: string) => window.open(link, "_blank");
    
    return <StyledPresentationBox>
        <StyledInfoBox>
            <StyledTypographyName>
                Antonio Patón Rico
            </StyledTypographyName>
            <StyledTypographyName>
                Software Development Junior
            </StyledTypographyName>
            <StyledProfileAvatar alt="Antonio Patón Rico" src={aprProfile} />
            <StyledPersonalInfoBox>
                <StyledTypographyDescription >
                    {personalInfo.name}
                </StyledTypographyDescription>
                <StyledTypographyDescription >
                    {personalInfo.work}
                </StyledTypographyDescription>
                <StyledTypographyDescription >
                    {personalInfo.mail}
                </StyledTypographyDescription>
            </StyledPersonalInfoBox>
            <StyledButtonsBox>
                <IconButton onClick={() => openLink('https://github.com/AntonioPtnR')}>
                    <FileDownloadIcon fontSize="large"/>
                </IconButton>
                <IconButton onClick={() => openLink('https://github.com/AntonioPtnR/AntonioPtnR.github.io/blob/main/curriculumAntonioPatonRico.pdf')}>
                    <GitHubIcon fontSize="large"/>
                </IconButton>
                <IconButton onClick={() => openLink('https://www.linkedin.com/in/antoniopatonrico/')}>
                    <LinkedInIcon fontSize="large"/>
                </IconButton>
            </StyledButtonsBox>
        </StyledInfoBox>
        <Box width={'30rem'}>
        {/*<p>
        ¡Hola! Mi nombre es Antonio, y soy un programador con dos años de experiencia en el campo del desarrollo de software. A lo largo de mi carrera, he trabajado en diversos proyectos que me han permitido adquirir habilidades sólidas en [lenguajes o tecnologías principales, como Java, Python, JavaScript, etc.], así como en el uso de herramientas y frameworks modernos como [nombre de frameworks o herramientas, como React, Django, Spring, etc.].

Me especializo en [área de especialización, como desarrollo web, desarrollo de aplicaciones móviles, backend, frontend, etc.], y he tenido la oportunidad de trabajar tanto de forma independiente como en equipos colaborativos. Mi enfoque siempre está en escribir código limpio, eficiente y escalable, asegurando la calidad y la robustez del producto final.

Además de mi experiencia técnica, me considero un aprendiz constante, siempre buscando nuevas tecnologías y tendencias en el mundo del desarrollo de software para mantenerme actualizado y mejorar mis habilidades. Me apasiona resolver problemas complejos y encontrar soluciones creativas que impulsen la innovación.

En resumen, soy un programador comprometido, con habilidades técnicas sólidas y una mentalidad de crecimiento. Estoy emocionado de seguir creciendo y contribuir con mi experiencia y conocimientos a proyectos y equipos dinámicos. Si estás buscando un programador con un enfoque proactivo y una actitud positiva, estaría encantado de conectar y explorar oportunidades juntos.
</p>*/}
        </Box>
        
    </StyledPresentationBox>
});

export default Presentation;
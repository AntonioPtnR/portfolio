import { BottomNavigation, BottomNavigationAction} from '@mui/material';
import aprLogo from "../../assets/logoAPR.png";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import SourceIcon from '@mui/icons-material/Source';
import { StyledLogoButton, StyledNavigatorBox } from './styles/Navigator.styles';
type NavigatorProps = {
    value: number;
    setValue: (value: number) => void;
  };
  
export const Navigator = ({value, setValue}: NavigatorProps) => {
  return (
    <>
      <StyledNavigatorBox>
        <StyledLogoButton>
              <img 
              src={aprLogo}
              alt="Logo APR Icon"
              width={'55px'}
              />
        </StyledLogoButton>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
            if (value !== newValue) {
                setValue(newValue);
            }
            }}
        >
            <BottomNavigationAction label="Presentación" icon={<InfoIcon />} />
            <BottomNavigationAction label="Formación" icon={<MenuBookIcon />} />
            <BottomNavigationAction label="Experiencia" icon={<CodeIcon />} />
            <BottomNavigationAction label="Proyectos" icon={<SourceIcon />} />
        </BottomNavigation>
      </StyledNavigatorBox>
    </>
  )
}

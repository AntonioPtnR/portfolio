import { useState } from "react";
//import { Description } from "../App/Description/Description";
import { StyledMainBox, StyledSectionBox } from "./styles/Main.styles";
import { Navigator } from "../Navigator/Navigator";
import { Presentation } from "..";

const Main = () => {
    const [value, setValue] = useState(0);
    const mapOptions = [<Presentation />]
    
    return (
        <StyledMainBox>
            <Navigator value={value} setValue={setValue}/>
            {mapOptions[value]}
        </StyledMainBox>
    );
}

export default Main;
import { BlankContainer, PrimaryButton, Title } from "./components";
import { useContext, useEffect } from "react";
import InfoContext from "../../context";
import { useParams } from "react-router";

const FigmaFinish = function ({props}) {
    const context = useContext(InfoContext);
    const urlParams = useParams();
    useEffect(()=>{
        context.setToken(urlParams.token);
    },[urlParams])
    return (
        <BlankContainer >
            <Title>
                ¡Tu evaluación a 
                {` ${context.leader.name}  ${context.leader.middlename} ${context.leader.lastname} `} 
                se ha realizado con éxito!
                <span>Gracias por haber realizado la evaluación</span>
                <PrimaryButton onClick={()=> window.close()}>Salir</PrimaryButton>
            </Title>
            
        </BlankContainer>
        
    )
}
export default FigmaFinish;
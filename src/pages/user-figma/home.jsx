import { useContext, useEffect } from "react";
import InfoContext from "../../context";
import { Navigate, useNavigate, useParams } from "react-router";
import { Container, PrimaryButton, TextInfo, Title } from "./components";
import  { Logos} from "../../assets/logos";

const FigmaHome = function ({props}) {
    const context = useContext(InfoContext);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        context.setToken(urlParams.token)
    },[])
    function handleNavigate(){
        navigate("info");
    }
    return (
        <Container >
            <Title>
                <Logos/>
                ¡Te damos la bienvenida a la Evaluación de liderazgo!
                <div>
                    <PrimaryButton onClick={handleNavigate} >Empezar</PrimaryButton>
                </div>
            </Title>
            <TextInfo>Realizado por Bienestar y Talento - Universidad Continental 2023</TextInfo>
        </Container>
        
    )
}
export default FigmaHome;
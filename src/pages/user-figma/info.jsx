import { useContext, useEffect } from "react";
import InfoContext from "../../context";
import {  useNavigate, useParams } from "react-router";
import { BackLink, BlankContainer, Container, Important, LeftAlign, LeftNav, NavCard, Paragraph, PrimaryButton, RightPanel, Strong, TextInfo, Title, VerticalCenter } from "./components";
import  { Logos, LogosMini} from "../../assets/logos";
import { Link } from "react-router-dom";

const FigmaInfo = function ({props}) {
    const context = useContext(InfoContext);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        context.setToken(urlParams.token);
    },[])
    function handleNavigate(){
        navigate("test");
    }
    return (
        <BlankContainer >
            <LeftNav>
                <NavCard>
                    <LogosMini />
                    <div>
                        Estas evaluando a:
                    </div>
                    <h3>
                        {`${context.leader.name} ${context.leader.middlename} ${context.leader.lastname}`}
                    </h3>
                    <span>
                        {`${context.leader.email}`}
                    </span>
                    <p>
                        Bienestar y talento
                    </p>
                </NavCard>
                
                <BackLink href={"/request/"+urlParams.token}>{"< Salir"}</BackLink>
            </LeftNav>
            <RightPanel>
                <Title>
                    <LeftAlign>
                        {`${context.user.name} ${context.user.middlename} ${context.user.lastname}`} 
                        <p>te damos la bienvenida</p>
                        <Paragraph>
                            Esta plataforma nos ayudará a poder evaluar a nuestros líderes de toda la organización, ahora explicaremos los sencillos pasos para poder realizar la evaluación satisfactoriamente
                        </Paragraph>
                        <Paragraph>
                            <Important>Paso 1:</Important> Se te mostrará las preguntas a evaluar a tu líder. 
                        </Paragraph>
                        <Paragraph>
                            <Important>Paso 2:</Important> Responder a las preguntas solicitadas. Puedes salir de la plataforma y responder luego si es necesario, se auto guardará tus respuestas, también puedes regresar a las preguntas anteriores por si consideras cambiar tu respuesta.
                        </Paragraph>

                        <Strong>!Ves lo fácil que es! Ahora empecemos.</Strong>
                    </LeftAlign> 
                    <PrimaryButton onClick={handleNavigate}>Empezar</PrimaryButton>
                </Title>
            </RightPanel>
        </BlankContainer>
        
    )
}
export default FigmaInfo;
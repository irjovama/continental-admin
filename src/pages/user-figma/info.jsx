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
                
                <BackLink href={"/invitations/"+urlParams.token}>{"< Salir"}</BackLink>
            </LeftNav>
            <RightPanel>
                <Title>
                    <LeftAlign>
                        Hola {`${context.user.name} ${context.user.middlename} ${context.user.lastname}`} 
                        <p>te damos la bienvenida</p>
                        <Paragraph>
            

                            <p>Recordemos nuestros propósito y mantras culturales:</p>

                            <Important>Propósito:</Important>  Existimos porque creemos que lo imposible es posible cuando las personas confiamos en nuestro potencial para crear mejores versiones de futuro.
                        </Paragraph>
                        <Paragraph>
                            <p>Nuestros mantras culturales: </p>

                            <p>Vivimos nuestro propósito en cada acción que emprendemos;  nos esforzamos al máximo para alcanzar lo que nos proponemos.
                            Vivimos con empatía, ponemos al usuario al centro de todas nuestras decisiones.
                            Siempre aprendemos.</p>

                            <p>
                            Hemos desarrollado esta evaluación de liderazgo con el objetivo de impulsar mejoras a nivel personal y en el funcionamiento de los equipos, y así poder seguir creciendo como organización.

                            </p>
                            <p>La Evaluación de Liderazgo que efectuarás a continuación se basa en las dimensiones de nuestro Modelo de Liderazgo UC: 
</p>
                        </Paragraph>
                        <Paragraph>
                            <Important>Entrega resultados:</Important> Esta dimensión está centrada en impulsar el logro de resultados, poniendo foco tanto a la ejecución efectiva, como a la conexión de los logros con el propósito. Para cada estadio del modelo se esperan comportamientos que reflejan ambas cualidades.
                        </Paragraph>
                        <Paragraph>
                            <Important>Crea vínculos genuinos:</Important> Esta dimensión hace referencia al bienestar y la seguridad psicológica. Queremos que el colaborador sienta libertad y confianza para expresar sus ideas, no estar de acuerdo y argumentar sus posiciones; el bienestar y la confianza se construyen en las relaciones, y según cada estadio de liderazgo se espera diferentes comportamientos y habilidades
                        </Paragraph>
                        <Paragraph>

                            <Important>Construye y cuestiona el futuro:</Important> En la organización necesitamos retar constantemente el status quo y tener una actitud emprendedora. Cuestionar, proponer mejoras, reflexionar y aprender, son solo algunas de las características esperadas. De acuerdo a los estadios del modelo de liderazgo las habilidades y comportamientos esperados se van complejizando
                        </Paragraph>
                        <Paragraph>
                            Para que las personas en la organización puedan seguir creciendo profesionalmente y desarrollándose como líderes, es clave evaluar con honestidad y responsabilidad, de tal manera que los resultados reflejen real y objetivamente las oportunidades de mejora y las fortalezas de cada líder, con el objetivo de contar con personas cada vez mejor preparados en la organización. 

                            La información que obtengamos va a ser clave para potenciar a las personas y equipos de la organización.
                            Finalmente, la medición es anónima y confidencial y ningún líder tendrá información de respuestas individuales.
                            Apelamos a tu responsabilidad y compromiso para evaluar con sinceridad, recuerda que en la organización estamos todos en un proceso de aprendizaje continuo.
                        </Paragraph>
                        <Paragraph>
                            <Important>Puedes completarla en dos sencillos paso:</Important>
                           <ul>
                            <li> 1.  Se te mostraran las preguntas para evaluar a tu líder.</li>
                            <li>
                            2. Responde las preguntas. A medida que vayas completando, se autoguardará tu respuesta.</li>
                           </ul>

                            <Important>¿Viste que sencillo es? Ahora empecemos!</Important>

                        </Paragraph>
                        <Paragraph>
                        <p>
                                
                                Muchas gracias
                                </p>
                                <p>
    
    Área de Bienestar y Talento</p>
                        </Paragraph>
                        
                    </LeftAlign> 
                    <PrimaryButton onClick={handleNavigate}>Empezar</PrimaryButton>
                </Title>
            </RightPanel>
        </BlankContainer>
        
    )
}
export default FigmaInfo;
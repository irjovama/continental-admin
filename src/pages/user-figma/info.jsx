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
                        <p>Te damos la bienvenida</p>
                        <Paragraph>

                            Para que todos podamos seguir creciendo profesional y personalmente, es clave que evaluemos con honestidad y responsabilidad, de tal manera que los resultados reflejen real y objetivamente las oportunidades de mejora y las fortalezas de cada líder con el objetivo de contar con personas cada vez mejor preparadas en la organización. La información que obtengamos va a ser clave para potenciar a las personas y equipos de la organización. 
                        </Paragraph>
                        <Paragraph>
                            La medición es anónima y confidencial y ningún líder tendrá información de respuestas individuales. Apelamos a tu responsabilidad y compromiso para evaluar con sinceridad, recuerda que en la organización estamos todos en un proceso de aprendizaje continuo.
                        </Paragraph>
                        <Paragraph>
                            Nos parece importante recordar los elementos centrales de la cultura que queremos impulsar:
                        </Paragraph>
                        <Paragraph>
                            <Important>Propósito:</Important> Existimos porque creemos que lo imposible es posible cuando las personas confiamos en nuestro potencial para crear mejores versiones de futuro.
                        </Paragraph>
                        <Paragraph>
                            <Important>Nuestros mantras culturales:</Important>
                        </Paragraph>
                        <Paragraph>
                            - Vivimos nuestro propósito en cada acción que emprendemos; nos esforzamos al máximo para alcanzar lo que nos proponemos. 
                        </Paragraph>
                        <Paragraph>
                            - Vivimos con empatía, ponemos al usuario al centro de todas nuestras decisiones. 
                        </Paragraph>
                        <Paragraph>
                            - Siempre aprendemos.
                        </Paragraph>
                        <Paragraph>
                            El Modelo de Liderazgo que estamos impulsando busca que los líderes tengan y desarrollen comportamientos en base a las siguientes dimensiones:
                        </Paragraph>
                        <Paragraph>

                        <Important>Entrega resultados:</Important> dimensión centrada en impulsar el logro de resultados poniendo foco tanto a la ejecución efectiva, como a la conexión de los logros con el propósito. Para cada estadio del modelo se esperan comportamientos que reflejan ambas cualidades.
                            </Paragraph>
                        <Paragraph>
                        <Important>Crea vínculos genuinos:</Important> dimensión que hace referencia al desarrollo de talento, bienestar y seguridad psicológica. Queremos que el colaborador crezca profesionalmente y alcance sus objetivos; además es clave que sienta libertad y confianza para expresar sus ideas, no estar de acuerdo y argumentar sus posiciones; el bienestar y la confianza se construyen en las relaciones, y según cada estadio de liderazgo se espera diferentes comportamientos y habilidades
                            </Paragraph>
                        <Paragraph>
                        <Important>Construye y cuestiona el futuro:</Important> En la organización necesitamos retar constantemente el status quo y tener una actitud emprendedora. Cuestionar, proponer mejoras, reflexionar y aprender, son solo algunas de las características esperadas. De acuerdo a los estadios del modelo de liderazgo las habilidades y comportamientos esperados se van complejizando

                            </Paragraph>
                        <Paragraph>

                            Es momento de iniciar la evaluación. Ten en cuenta que a medida que vayas respondiendo se auto guardará tu avance de la evaluación.
                            </Paragraph>
                        <Paragraph>
                            Muchas gracias
                            </Paragraph>
                        <Paragraph>
                            Área de Bienestar y Talento
                        </Paragraph>
                        
                    </LeftAlign> 
                    <PrimaryButton onClick={handleNavigate}>Empezar</PrimaryButton>
                </Title>
            </RightPanel>
        </BlankContainer>
        
    )
}
export default FigmaInfo;
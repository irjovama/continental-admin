import { useContext, useEffect, useState } from "react";
import InfoContext from "../../context";
import { Navigate, useNavigate, useParams } from "react-router";
import { Container, PrimaryButton, TextInfo, Title } from "./components";
import  { Logos} from "../../assets/logos";
import styled from "styled-components";
import Loader from "../../components/loading";
import { find, show , send } from "../../fetch";
import { Link } from "react-router-dom";
const MailContainer = styled.div`
padding: 10px;
    & > p {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 120%;
        margin: auto;
        text-align: center;
    }
    & > input{
        border: 1px solid;
        border-radius: 5px;
    }

    & > div {
        padding: 20px;
    }

    & > div > a {
       background-color: white; 
       padding: 10px;
       border-radius: 10px;
       text-decoration: none;
    }
`

const FigmaHome2 = function ({props}) {
    const context = useContext(InfoContext);
    const urlParams = useParams();
    const [email, setEmail] = useState("");
    const [state, setState] = useState("pending");
    const [invitations, setInvitations] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        
        if(email !=""){
            setState("loading");
            show("users", {limit: 100000, filterBy: `email=${email}`})
            .then( u => {
                
                if(u.data[0]?.id){
                    
                    show("user_tests", {limit: 100000, filterBy: `users_id=${u.data[0].id}`}).then( async test => {
                        const rows = [];
                        const object = [];
                        const dataFilter = test.data.filter(t1=>{ return t1.status == 0});
                        console.log(dataFilter);
                        for(let t of dataFilter){
                            const leader = await find("users/"+t.leaders_id); 
                            rows.push({leader, test: t});
                            object.push({token: t.id, leader: `${leader.name} ${leader.middlename} ${leader.lastname}`});
                        }
                        setInvitations(rows);
                        if(object.length>0){
                            await send(u.data[0], test.title, object);
                            setState("complete")
                        } else {
                            setState("finished");
                        }
                        
                        
                    })
                } else {
                    setState("failed");
                }
            })
        } else {
            setState("pending");
        }
        
    }, [email])
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
                    <MailContainer>
                        <p>Ingresa tu email:</p>
                        <input 
                            type="email" 
                            onInput={(e)=> {
                                setTimeout(
                                ()=>{
                                    setEmail(e.target.value)
                                }
                                , 2000);
                            }} 
                        />
                        {
                       state == 'pending' ? "" :
                       state == 'loading' ? <Loader /> : 
                       state == 'complete' ? 
                       <div>
                        Se envío un correo con las invitaciones
                       </div> 
                       : 
                       state == "finished" ? 
                       <div>Ya contestaste todas tus encuestas</div> 
                       : <div>No hay se encuentra el correo</div>
                    }
                    </MailContainer>
                    
                    
                </div>
            </Title>
            <TextInfo>Realizado por Bienestar y Talento - Universidad Continental 2023</TextInfo>
        </Container>
        
    )
}
export default FigmaHome2;
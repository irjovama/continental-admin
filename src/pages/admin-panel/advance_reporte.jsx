import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { show } from "../../fetch";
import styled from "styled-components";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const Card = styled.div`
    border: solid thin;
    max-width: 600px;
    min-width: 500px;
    border-radius: 5px;
    margin: 1rem;
`;
const CardHeader = styled.div`
   background: #3181cd;
   color: white;    
   font-size: large;
   padding: 5px;
`;
const CardItem = styled.div`
padding: 2px;
text-align: center;
`;
const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    color: white;
`;
const AdvanceReport = function ({}){
    const urlParams = useParams();
    const [users, setUsers] = useState([]);
    const [user_tests, setUserTests] = useState([]);
    const [copied, setCopied] = useState("copiar link");
    useEffect(()=>{
        const filter = {
            limit: 10000000,
            filterBy: `tests_id=${urlParams.tests_id}`,
        };
        show("user_tests", filter).then((t) => setUserTests(t.data));
        show("users", filter).then((t) => setUsers(t.data));
    },[]);
    const handleCopy = function (){
        navigator.clipboard.writeText(window.location.href).then( () => setCopied("link copiado"));
    }
    return(
        <div>
            <Banner>
               <h1>Reporte de Avance </h1> 
               <button onClick={handleCopy}>{copied}</button>
            </Banner>
            
            <Container>
                {users.filter(u=> u?.type && u.type !="" ).map(u => {
                    return ( <Card key={u.id}>
                                <CardHeader>{u.name} {u.middlename} {u.lastname}</CardHeader>
                                {users.filter(u2 => u2?.leaders && u2.leaders.includes(u.id)).map(u3=> {
                                    const invitation = user_tests.find( ut => ut.users_id == u3.id && ut.leaders_id == u.id);
                                    return <CardItem 
                                                key={u3.id}
                                                style={invitation?.status && invitation.status == 1 ? {background: "green"} : {}}
                                            >
                                                {u3.name} {u3.middlename} {u3.lastname}
                                            </CardItem>
                                })}
                            </Card>)
                })}
            </Container>
        </div>
    )
}
export default AdvanceReport;
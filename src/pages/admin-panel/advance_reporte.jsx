import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { show, update } from "../../fetch";
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
   background: #7A00C6;
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
    background-color: #7A00C6;
    color: white;
`;
const AdvanceReport = function ({}){
    const urlParams = useParams();
    const [users, setUsers] = useState([]);
    const [user_tests, setUserTests] = useState([]);
    const [filter, setFilter] = useState("");
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
               <input type="search" placeholder="Buscar Lider" onInput={(e)=> {
                setTimeout(()=>setFilter(e.target.value), 1000)
               }}  />
               <button onClick={handleCopy}>{copied}</button>
            </Banner>
            
            <Container>
                {users
                .filter(u=> u?.type && u.type !="" )
                .filter(u => 
                    filter=="" || [u.name, u.middlename, u.lastname].join(" ").toLowerCase().includes(filter.toLowerCase()) 
                )
                .map(u => {
                    const selfInvitation = user_tests.find( ut => ut.users_id == u.id && ut.leaders_id == u.id);
                   
                    return ( <Card key={u.id}>
                                <CardHeader> {u.name} {u.middlename} {u.lastname} {selfInvitation.status == 0 ? "Autoevaluacion Pendiente" : ""}</CardHeader>
                                {filter!="" ? 
                                <>
                                    Selecciona un usuario:
                                    <select required onChange={(e)=>{
                                        const confirmar = confirm("Realmente deseas agregar al usuario "+e.target.value);
                                        if(confirmar){
                                            const newUsers = Object.assign([],users);
                                            const updated = newUsers.map( (user) => {
                                                if(user.id == e.target.value){
                                                    const nl = user.leaders.split(",");
                                                    nl.push(u.id)
                                                    user.leaders = nl.join(",")
                                                    update(e.target.value, "users", {leaders: user.leaders});
                                                    e.target.value == ""
                                                    return user 
                                                } else {
                                                    return user;
                                                }
                                                
                                            })
                                            setUsers(updated)
                                        }
                                    }}>
                                        <option></option>
                                        {users.map((u) => <option value={u.id}>{u.name}</option>)}
                                    </select> 
                                </>
                                
                                : <></>}
                                {users.filter(u2 => u2?.leaders && u2.leaders.includes(u.id)).map(u3=> {
                                    const invitation = user_tests.find( ut => ut.users_id == u3.id && ut.leaders_id == u.id);
                                    
                                    return <CardItem 
                                                key={u3.id}
                                                style={invitation?.status && invitation.status == 1 ? {background: "lightgreen"} : { }}
                                            >
                                                {u3.name} {u3.middlename} {u3.lastname} 
                                                {filter!="" ? <button
                                                    onClick={()=> {
                                                       const conf = confirm('Realmente quieres eliminar al usuario?');
                                                       if(conf){
                                                            const newUsers = Object.assign([],users);
                                                            newUsers.map((user)=> {
                                                                return user.id == u3.id ? {...user, ...user["leaders"]=u3.leaders.split(",").filter(r => r != u.id).join(",") }  : user
                                                            }  )
                                                            update(u3.id, "users", {leaders: u3.leaders.split(",").filter(r => r != u.id).join(",") })
                                                            .then(()=>{
                                                                //console.log(newUsers)
                                                                setUsers(newUsers);
                                                            })
                                                       }
                                                    }}
                                                >Eliminar</button> : <></>}
                                            </CardItem>
                                })}
                            </Card>)
                })}
            </Container>
        </div>
    )
}
export default AdvanceReport;
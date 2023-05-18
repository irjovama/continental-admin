import { useEffect, useState } from "react";
import styled from "styled-components"
import { show } from "../../fetch";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const Card = styled.div`
    background: #3181cd;
    color: white;
    border-radius: 5px;
    padding: 1rem;
    width: 300px;
    height: 50px;
    text-align: center;
    margin: 1rem;
   
   
`
const Home = function () {
    const [tests,setTests] = useState([]);
    useEffect(()=>{
        show("tests", { limit: 10000000 }).then((t) => setTests(t.data));
    },[])
    return(
        <>
            <h1>Encuestas disponibles</h1>
            <Container>
                {tests.map(test => 
                    <Link 
                        to={"admin-panel/"+test.id}
                        style={{textDecoration: "none"}}
                    >
                        <Card>{test.title}</Card>
                    </Link>
                )}
            </Container>
        </>
    );
}

export default Home;
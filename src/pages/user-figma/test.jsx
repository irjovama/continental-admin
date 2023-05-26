import { useContext, useEffect, useState } from "react";
import InfoContext from "../../context";
import {  useNavigate, useParams } from "react-router";
import { 
    BackLink, 
    BlankContainer, 
    LeftNav, 
    NavCard, 
    PrimaryButton, 
    ProgresCard, 
    ProgresCardContainer, 
    ProgresFoot, 
    Progress, 
    ProgressInfo, 
    ProressWrapper, 
    Question, 
    QuestionContainer, 
    RightPanel 
} from "./components";
import  {  LogosMini} from "../../assets/logos";
import { create, update } from "../../fetch";

const FigmaTest = function ({props}) {
    const context = useContext(InfoContext);
    const urlParams = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    let total = 0;
    useEffect(()=>{
        context.setToken(urlParams.token);
    },[])
    async function handleSave(){
        context.setIsLoading(true);
        for(let i in result){
            await create("user_questions", result[i]);
        }
        const f = await update(urlParams.token, "user_tests", {status: 1});
     
        navigate("/finish/"+urlParams.token);
        context.setIsLoading(false);
    }
    const lists = {
        false: [1,2,3,4,5,6,7,8,9,10],
        true: [10,9,8,7,6,5,4,3,2,1]
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
                <QuestionContainer>
                
                    {context.questions.length > 0 && context.questions.map((q)=>{
                        total++;
                        return <Question key={q.id} shadow={q.shadow}>
                                    <div>{total} {q.title}</div>
                                    <fieldset>
                                        <div>{q.reverse ? q.upper_option : q.lower_option}</div>
                                        <fieldset>
                                            {lists[q.reverse].map((v, i)=>{
                                                const newResult = Object.assign([],result);
                                                const index = newResult.findIndex((r)=> r.id === q.id);
                                                return (<button 
                                                            key={i} 
                                                            onClick={() => {
                                                                q.value = v;
                                                                q.user_types = context.leader.type;
                                                                q.categories_id = context.subCategories.find(sc => sc.id == q.sub_categories_id).categories_id;
                                                                q.randSort = q.reverse ? 1 : 0;
                                                                q.users_id = context.user.id;
                                                                q.leaders_id = context.leader.id;
                                                                if(index >= 0 ){
                                                                    newResult[index] = q;
                                                                } else {
                                                                    newResult.push(q);
                                                                }
                                                                console.log(newResult);
                                                                setResult(newResult);
                                                            }}
                                                            style={{
                                                                    background: (newResult[index]?.value === v) ? "#6802C1": "",
                                                                    color: (newResult[index]?.value === v) ? "white": "black",
                                                                }}
                                                        >
                                                            {i + 1}
                                                        </button>)
                                            })}
                                        </fieldset>
                                        <div>{q.reverse ? q.lower_option : q.upper_option}</div>
                                    </fieldset>
                                </Question>
                    })}
                </QuestionContainer>
                <ProressWrapper>
                    <ProgressInfo>
                        <div>
                            <div>
                                <span>{
                                (result.length < 6) 
                                ? "¡Vamos empezando!" 
                                : (result.length < 12) 
                                ? "¡Seguimos!" 
                                : (result.length < 18) 
                                ? "¡Ya estamos por la mitad!" 
                                : (result.length < 21) 
                                ? "¡Un poco más!" 
                                : "¡Ya falta poco!"}
                                </span>
                                <span>{result.length}/{context.questions.length}</span>
                            </div>
                            <Progress
                                value={((result.length / context.questions.length) * 100) || 0}
                                max="100"
                            />
                        </div>
                        <PrimaryButton
                            disabled={(((result.length / context.questions.length) * 100) || 0) == 100 ? false : true}
                            onClick={handleSave}
                        >
                            Guardar
                        </PrimaryButton>
                       
                    </ProgressInfo>
                    <ProgresFoot>
                        Parámetros a tener en cuenta
                    </ProgresFoot>
                    <ProgresCardContainer>
                        <ProgresCard>
                            <button>1</button>
                            Comportamiento muy arraigado en el líder
                        </ProgresCard>
                        <ProgresCard>
                            <button>5</button>
                            El líder tiene de ambos comportamientos y varía dependiendo la situación
                        </ProgresCard>
                        <ProgresCard>
                            <button>10</button>
                            Comportamiento muy arraigado en el líder
                        </ProgresCard>
                    </ProgresCardContainer>
                </ProressWrapper>
            </RightPanel>
        </BlankContainer>
        
    )
}
export default FigmaTest;
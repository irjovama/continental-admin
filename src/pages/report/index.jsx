import React, { useEffect, useState } from "react";
import { Answers, ArrowUp, Arrows, LogosReport, Loved, Persons, Point, Points, Roquet } from "../../assets/logos";
import { Container, Header, HeaderCard, LeaderCard, P2Card, P2Info, P3Card, P3Field, P3Info, P3Wrapper, Section, Wrapper, WrapperGraph, WrapperHeaderCard } from "./components";
import { getPDF } from "../../fetch";
import { useParams } from "react-router";
import Loader from "../../components/loading";
import html2pdf from 'html2pdf.js';

const Report = function () {
  const urlParams = useParams();
  const [report, setReport] = useState({});

  const generatePDF = (e) => {
   
    const element = document.getElementById('root');
    html2pdf().set({ html2canvas: { scale: 2 } }).from(element).save();
   
  };

  useEffect(() => {
    getPDF(urlParams.test_id, urlParams.leader_id)
      .then((pdf) => {
        setReport(pdf);
        
      })
      .catch(console.log);
  }, []);

  const icons = {
    "Crea vínculos genuinos": <Loved />,
    "Construye y cuestiona el futuro": <ArrowUp />,
    "Entrega resultados": <Roquet />,
  };
  
  return (
    <div style={{ transform: "scale(1)", transformOrigin: "top left" }}>
      {report?.title ? (
        <Wrapper key={report.title}>
           
          <Container>
            <Header>
              <span onClick={generatePDF}>
                Reporte de encuesta de {report.title}
              </span>
              <LogosReport />
            </Header>
            <Section>
              <LeaderCard>
                <h1>{report.pages.page1.name}</h1>
                <span>{report.leader.email}</span>
                <div>
                  <Arrows />
                </div>
              </LeaderCard>
              <WrapperHeaderCard>
                <HeaderCard>
                  <h1>{report.pages.page1.members}</h1>
                  <div><Persons /></div>
                  <span>Personas a Cargo</span>
                </HeaderCard>
                <HeaderCard>
                  <h1>{report.pages.page1.success}</h1>
                  <div><Answers /></div>
                  <span>Respuestas</span>
                </HeaderCard>
                <HeaderCard>
                  <h1>{report.pages.page1.points}%</h1>
                  <div><Points /></div>
                  <span>Puntaje general</span>
                </HeaderCard>
              </WrapperHeaderCard>
            </Section>
            <Section>
              <WrapperGraph>
                <h1>¿Qué significa haber llegado a este puntaje?</h1>
                <p>{report.pages.page1.result[0]}</p>
                <h1>Agunas recomendaciones</h1>
                {report.pages.page1.result[1].split(/\d\.\s/).filter(s => s!="").map((s, i)=><p key={s}>{i+1}. {s}</p>)}
              </WrapperGraph>
            </Section>
            <Section>
              <WrapperGraph>
                <h1>Puntaje por dimensión</h1>
                <div>
                  <img src={report.pages.page1.graph1.chart} alt="Gráfico"/>
                </div>
              </WrapperGraph>
            </Section>
            <Section>
              <WrapperGraph>
                <h1>Autoevaluación vs. Evaluación del equipo</h1>
                <fieldset>
                  {report.pages.page1.vsGraphs.map((g) => (
                    <div key={g.chart}>
                      <img src={g.chart} alt="Gráfico"/>
                    </div>
                  ))}
                </fieldset>
              </WrapperGraph>
            </Section>
          </Container>
          <Container>
            <Header>
              <span>
                Reporte de encuesta de {report.title}
              </span>
              <LogosReport />
            </Header>
            <Section>
              <LeaderCard>
                <h1>{report.pages.page1.name}</h1>
                <span>{report.leader.email}</span>
              </LeaderCard>
            </Section>
            {report.pages.page2.categories.map((category) => (
              <Section key={category.name}>
                <P2Card>
                  <h1>{category.result}%</h1>
                  <div>{icons[category.name]}</div>
                  <span>{category.name}</span>
                </P2Card>
                <P2Info>
                  <p>{category.body}</p>
                  {category.subCategories.map((sc) => (
                    <div key={sc.name}>
                      <h1>{sc.name}</h1>
                      <p>{sc.body}</p>
                 
                      
                    </div>
                  ))}
                </P2Info>
              </Section>
            ))}
          </Container>
          {report.pages.resumes.map((resume) => (
            <Container key={resume.category}>
              <Header>
                <span>
                  Reporte de encuesta de {report.title}
                </span>
                <LogosReport />
              </Header>
              <Section>
                <LeaderCard>
                  <h1>{report.pages.page1.name}</h1>
                  <span>{report.leader.email}</span>
                </LeaderCard>
              </Section>
              <Section>
                <P3Wrapper>
                  <P3Card>
                    <h1>{resume.category}</h1>
                    {icons[resume.category]}
                    <Point />
                    <div>
                      {resume.result}%
                    </div>
                  </P3Card>
                  <P3Info>
                    <h1>¿Qué significa haber llegado a este puntaje?</h1>
                    <p>{resume.comments}</p>
                  </P3Info>
                  <WrapperGraph>
                    <h1>Puntaje por dimensión</h1>
                    <fieldset>
                      <div>
                        <img src={resume.char1} alt="Gráfico" />
                      </div>
                      <div>
                        <img src={resume.char2} alt="Gráfico" />
                      </div>
                    </fieldset>
                  </WrapperGraph>
                  <P3Field>
                    <h1>Recomendaciones</h1>
                    {resume.recomendations.map(reco => {
                      return(
                        <>
                          <h1>{reco.subCategory}</h1>
                          {reco.data.map(data => data.split('·').map(data2=> data2!="" && <p>·{data2}</p>))}
                        </>
                      )
                    })}
                  </P3Field>
                </P3Wrapper>
              </Section>
            </Container>
          ))}
        </Wrapper>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Report;

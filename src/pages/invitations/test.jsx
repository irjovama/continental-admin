import styled from "styled-components";
import { MiniLogo } from "../../img/logo";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { create, find, show } from "../../fetch";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  width: 124px;
  height: 50px;

  color: white;
  background: #7a00c6;
  border-radius: 8px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
`;

const Table = styled.table`
  width: 500px;
`;
const Progress = styled.progress`
  width: 500px;
  height: 8px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
const Header2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8rem;
`;
const Circle = styled.div`
  cursor: pointer;
  border: solid 1px;
  padding: 5px;
  width: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  background-color: ${(props) => (props.selected ? "#7A00C6" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
`;
const Invisible = styled.input`
  display: none;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-bottom: solid 1px;
`;
const Sides = styled.div`
  width: 200px;
`;

const Question = function ({ ...props }) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {props.question.title}
      <ListContainer>
        <Sides>{props.question.lower_option}</Sides>
        {items.map((i) => {
          return (
            <label key={i}>
              <Invisible
                type="radio"
                name={props.question.id}
                value={i}
                onChange={(e) => {
                  const val = props.results.find(
                    (r) => r.question_id == e.target.name
                  );
                  if (val) {
                    const newR = props.results.map((r) =>
                      r.question_id == e.target.name
                        ? {
                            ...{
                              question_id: e.target.name,
                              value: e.target.value,
                            },
                            ...props.question,
                          }
                        : r
                    );
                    props.setResults(newR);
                  } else {
                    props.setResults([
                      ...props.results,
                      ...[
                        {
                          ...{
                            question_id: e.target.name,
                            value: e.target.value,
                          },
                          ...props.question,
                        },
                      ],
                    ]);
                  }
                }}
              />
              <Circle
                selected={
                  props.results.find((r) => {
                    return r.question_id == props.question.id;
                  })?.value == i
                }
                value={i}
              >
                {i}
              </Circle>
            </label>
          );
        })}
        <Sides>{props.question.upper_option}</Sides>
      </ListContainer>
    </>
  );
};

async function handleQ(newQ, urlParams) {
  const r = await find(`user_tests/${urlParams.token}`);
  const u = await find(`users/${r.leaders_id}`);
  const type = u.type[0];
  const t = await show(`categories`, {
    limit: 100000,
    filterBy: `user_types_id=${type}`,
  });
  const categories = t.data;
  for (let c of categories) {
    const subCats = await show("sub_categories", {
      limit: 100000,
      filterBy: `categories_id=${c.id}`,
    });
    for (let sc of subCats.data) {
      const qs = await show("questions", {
        limit: 100000,
        filterBy: `sub_categories_id=${sc.id}`,
      });
      qs.data.forEach((q) => {
        if (!newQ.find((nq) => nq.id == q.id)) {
          newQ.push({ ...q, ...{ users_type: type, categories_id: c.id } });
        }
      });
    }
  }

  return newQ;
}
const TestInvitation = function () {
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [success, setSuccess] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    handleQ(questions, urlParams).then((r) => {
      setQuestions(r);
    });
  }, [questions]);

  async function handleSave() {
    for (let r of results) {
      const user = sessionStorage.getItem("users_id");
      const leader = sessionStorage.getItem("leaders_id");
      const result = { ...r, ...{ users_id: user, leaders_id: leader } };
      const s = await create("user_questions", result);
    }
    
    await update(urlParams.token, "user_tests", {status: 1})
  }
  return (
    <>
      {" "}
      <MiniLogo />
      <Container>
        <Center
          style={{
            position: "absolute",
            top: "120px",
            width: "800px",
          }}
        >
          {questions.length > 0 ? (
            questions.map((q) => {
              return (
                <Question
                  key={q.id}
                  question={q}
                  results={results}
                  setResults={setResults}
                  urlParams={urlParams}
                  progress={progress}
                  setProgress={setProgress}
                />
              );
            })
          ) : (
            <Button onClick={() => setProgress(0.01)}>Comenzar</Button>
          )}
        </Center>
      </Container>
      <Center>
        <div
          style={{
            position: "fixed",
            background: "white",
            top: "0",
            padding: " 0 200px ",
          }}
        >
          <Header>
            <Progress
              value={(results.length / questions.length) * 100}
              max="100"
            />
            <Button
              onClick={() => handleSave(questions)}
              disabled={results.length / questions.length >= 1 ? false : true}
            >
              Guardar
            </Button>
          </Header>
          <Header2>
            <span>(1) opcion mínima</span>
            <span>(5) Comportamiento intermedio</span>
            <span>(10) Opcion máxima</span>
          </Header2>
        </div>
      </Center>
    </>
  );
};
export default TestInvitation;

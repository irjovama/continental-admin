import styled from "styled-components";
import { MiniLogo } from "../../img/logo";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { create, find, show, update } from "../../fetch";

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 72px;
  & > :nth-child(2n) {
    background-color: rgb(250, 250, 250);
  }
`;

const Button = styled.button`
  color: white;
  background: #7a00c6;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  cursor: pointer;

  font-weight: 500;
  font-size: 18px;
  line-height: 120%;

  &:disabled {
    opacity: 0.6;
  }
`;

const Progress = styled.progress`
  width: 500px;
  height: 16px;
  accent-color: #7a00c6;
`;

const Header = styled.header`
  padding: 12px 16px;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  padding: 8px 32px;
  background-color: white;
  margin-bottom: 32px;
`;

const Circle = styled.div`
  cursor: pointer;
  border: 1px solid #7a00c6;
  min-width: 36px;
  min-height: 36px;
  border-radius: 36px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#7A00C6" : "white")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
`;
const Invisible = styled.input`
  display: none;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  /* border-bottom: solid 1px; */
`;
const Sides = styled.div`
  min-width: 100px;
  font-size: 14px;
  text-align: center;
  flex-basis: 0;
  flex-grow: 1;
`;
const ProressWrapper = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const LevelHints = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span{
    width: 200px
  }
`;

const Prompt = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

const Question = function ({ ...props }) {
  const randSort = props.randSort;
  const arrItems = [
    [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
    ],
    [
      { label: 1, value: 10 },
      { label: 2, value: 9 },
      { label: 3, value: 8 },
      { label: 4, value: 7 },
      { label: 5, value: 6 },
      { label: 6, value: 5 },
      { label: 7, value: 4 },
      { label: 8, value: 3 },
      { label: 9, value: 2 },
      { label: 10, value: 1 },
    ]
  ]
  const items = arrItems[randSort];
  return (
    <div style={{ padding: "0.25rem", width: "100%" }}>
      <Prompt>
        {props.index + 1}. {props.question.title}:
      </Prompt>
      <ListContainer>
        <Sides>{randSort == 0 ? props.question.lower_option : props.question.upper_option}</Sides>
        {items.map((i) => {
          return (
            <label key={i.value}>
              <Invisible
                type="radio"
                name={props.question.id}
                value={i.value}
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
                  })?.value == i.value
                }
                value={i.value}
              >
                {i.label}
              </Circle>
            </label>
          );
        })}
        <Sides>{randSort==0 ? props.question.upper_option : props.question.lower_option}</Sides>
      </ListContainer>
    </div>
  );
};

async function handleQ(urlParams, newQ = []) {
  const r = await find(`user_tests/${urlParams.token}`);
  const u = await find(`users/${r.leaders_id}`);
  const type = u.type;
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
          newQ.push({ ...q, ...{ users_type: type, categories_id: c.id, randSort: Math.floor(Math.random() * 2 ) } });
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
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoad(urlParams).then((r) => {
      if(r){
        navigate("/thanks", { replace: true });
      }
    })
    handleQ(urlParams).then((r) => {
      setQuestions(r);
    });
  }, [urlParams]);
  async function handleLoad(urlParams) {
    const ut = await find("user_tests/"+urlParams.token);
    return ut.status == 1 ? true : false;
  }
  async function handleSave() {
    for (let r of results) {
      const user = sessionStorage.getItem("users_id");
      const leader = sessionStorage.getItem("leaders_id");
      const result = { ...r, ...{ users_id: user, leaders_id: leader } };
      const s = await create("user_questions", result);
    }

    await update(urlParams.token, "user_tests", { status: 1 });
    navigate("/thanks", { replace: true });
  }
  return (
    <Container>
      <Header>
        <MiniLogo />
      </Header>

      <StickyHeader>
        <ProressWrapper>
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
        </ProressWrapper>

        <LevelHints>
          <span>(1) Comportamiento muy arraigado en el lider</span>
          <span>(5) El lider tiene de ambos comportamientos y varia dependiendo la situaciòn</span>
          <span>(10) Comportamiento muy arraigado en el lider</span>
        </LevelHints>
      </StickyHeader>

      <Wrapper>
        {questions.length > 0 &&
          questions.map((q, index) => {
            return (
              <Question
                key={q.id}
                index={index}
                question={q}
                randSort={q.randSort}
                results={results}
                setResults={setResults}
                urlParams={urlParams}
                progress={progress}
                setProgress={setProgress}
              />
            );
          })}
      </Wrapper>
    </Container>
  );
};
export default TestInvitation;

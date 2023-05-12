import { useEffect, useState } from "react";
import styled from "styled-components";
import { show } from "../../fetch";
import colors from "../../styles/colors";
import { useParams } from "react-router";
const Ul = styled.ul`
  padding-inline-start: 1rem;
  background-color: ${colors.white};
  margin: 0.2rem;
`;
const Li = styled.li`
  list-style: circle;
  padding-inline-start: 0px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border-bottom: ${(props) => (props.border ? "solid" : "none")};
  align-items: center;
  & a {
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 0.5rem;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
  }
  & a:hover {
    background-color: ${colors.secondary};
  }
`;
const Container = styled.div`
  max-width: 600px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  height: 600px;
`;
const Link = styled.a``;
const SideBar = function ({  setParams, params }) {
  const [tests, setTests] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [navigation, setNavigation] = useState("");
  const [userTests, setUserTests] = useState("");
  const [users, setUsers] = useState("");
  const urlParams = useParams();
  useEffect(() => {
    const filter = {
      limit: 10000000,
      filterBy: `tests_id=${urlParams.tests_id}`,
    };
    show("tests", {
      limit: 10000000,
      filterBy: `id=${urlParams.tests_id}`,
    }).then((t) => setTests(t.data));
    show("user_types", filter).then((t) => setUserTypes(t.data));
    show("user_tests", filter).then((t) => setUserTests(t.data));
    show("users", filter).then((t) => setUsers(t.data));
    show("categories", filter).then((t) => setCategories(t.data));
    show("sub_categories", filter).then((t) => setSubCategories(t.data));
    show("questions", filter).then((t) => setQuestions(t.data));
    show("results", filter).then((t) => setResults(t.data));
  }, []);

  return (
    <Container>
      <Ul>
        {tests.map((t) => {
          return (
            <div key={t.title}>
              <Li border={true}>
                <h2
                  style={
                    navigation == t.id ? { background: colors.selected } : {}
                  }
                  onClick={() => {
                    setNavigation(t.id);
                    setParams({
                      file: "user_types",
                      title: "Tipos de usuarios",
                      tests_id: t.id,
                      parent: { tests_id: t.id },
                      items: userTypes,
                      setItems: setUserTypes,
                    });
                  }}
                >
                  {t.title}{" "}
                </h2>
                <Link
                  style={
                    navigation == t.id + "r"
                      ? { background: colors.selected }
                      : {}
                  }
                  onClick={() => {
                    setNavigation(t.id + "r");
                    setParams({
                      file: "results",
                      title: "Resultados",
                      tests_id: t.id,
                      parent: { tests_id: t.id },
                      items: results.filter(
                        (r) => !r.categories_id && !r.sub_categories_id
                      ),
                      setItems: setResults,
                    });
                  }}
                >
                  Results{" "}
                  {`(${
                    results.filter(
                      (r) => !r.categories_id && !r.sub_categories_id
                    ).length
                  })`}
                </Link>{" "}
                <Link
                  style={
                    navigation == t.id + "u"
                      ? { background: colors.selected }
                      : {}
                  }
                  onClick={() => {
                    setNavigation(t.id + "u");
                    setParams({
                      file: "users",
                      title: "Alta de usuarios",
                      tests_id: t.id,
                      parent: { tests_id: t.id },
                      items: users,
                      setItems: setUsers,
                    });
                  }}
                >
                  Alta de usuarios
                </Link>
                <Link
                  style={
                    navigation == t.id + "ut"
                      ? { background: colors.selected }
                      : {}
                  }
                  onClick={() => {
                    setNavigation(t.id + "ut");
                    setParams({
                      file: "user_tests",
                      title: "Invitar usuarios",
                      tests_id: t.id,
                      parent: { tests_id: t.id },
                      items: userTests,
                      setItems: setUserTests,
                    });
                  }}
                >
                  Asignar usuarios
                </Link>
              </Li>
              <Ul>
                <Ul>
                  {userTypes
                    .filter((ut) => {
                      return ut.tests_id == t.id;
                    })
                    .map((fut) => {
                      return (
                        <div key={fut.name}>
                          <Li
                            style={
                              navigation == fut.id
                                ? {
                                    background: colors.selected,
                                    color: colors.white,
                                    padding: "1rem",
                                    borderRadius: "5px",
                                    fontSize: "larger",
                                  }
                                : {
                                    background: colors.secondary,
                                    color: colors.white,
                                    padding: "1rem",
                                    borderRadius: "5px",
                                    fontSize: "larger",
                                  }
                            }
                            onClick={() => {
                              setNavigation(fut.id);
                              setParams({
                                file: "categories",
                                title: "Categorias",
                                tests_id: t.id,
                                parent: { user_types_id: fut.id },
                                items: categories,
                                setItems: setCategories,
                              });
                            }}
                          >
                            {fut.name}
                          </Li>
                          <Ul>
                            <Ul>
                              {categories
                                .filter((c) => {
                                  return c.user_types_id == fut.id;
                                })
                                .map((fc) => {
                                  return (
                                    <div key={fc.name}>
                                      <Li>
                                        <span
                                          style={
                                            navigation == fc.id
                                              ? { background: colors.selected }
                                              : {}
                                          }
                                          onClick={() => {
                                            setNavigation(fc.id);
                                            setParams({
                                              file: "sub_categories",
                                              title: "Sub Categorías",
                                              tests_id: t.id,
                                              parent: { categories_id: fc.id },
                                              items: subCategories,
                                              setItems: setSubCategories,
                                            });
                                          }}
                                        >
                                          {fc.name}
                                        </span>
                                        <Link
                                          style={
                                            navigation == fc.id + "r"
                                              ? { background: colors.selected }
                                              : {}
                                          }
                                          onClick={() => {
                                            setNavigation(fc.id + "r");
                                            setParams({
                                              file: "results",
                                              title: "Resultados",
                                              tests_id: t.id,
                                              parent: { categories_id: fc.id },
                                              items: results,
                                              setItems: setResults,
                                            });
                                          }}
                                        >
                                          Results{" "}
                                          {`(${
                                            results.filter(
                                              (r) => r.categories_id == fc.id
                                            ).length
                                          })`}
                                        </Link>
                                      </Li>
                                      <Ul>
                                        <Ul>
                                          {subCategories
                                            .filter((sc) => {
                                              return sc.categories_id == fc.id;
                                            })
                                            .map((fsc) => {
                                              return (
                                                <div key={fsc.name}>
                                                  <Li>
                                                    <span
                                                      style={
                                                        navigation == fsc.id
                                                          ? {
                                                              background:
                                                                colors.selected,
                                                            }
                                                          : {}
                                                      }
                                                      onClick={() => {
                                                        setNavigation(fsc.id);
                                                        setParams({
                                                          file: "questions",
                                                          title: "Preguntas",
                                                          tests_id: t.id,
                                                          parent: {
                                                            sub_categories_id:
                                                              fsc.id,
                                                          },
                                                          items: questions,
                                                          setItems:
                                                            setQuestions,
                                                        });
                                                      }}
                                                    >
                                                      {fsc.name}
                                                    </span>{" "}
                                                    <Link
                                                      style={
                                                        navigation ==
                                                        fsc.id + "r"
                                                          ? {
                                                              background:
                                                                colors.selected,
                                                            }
                                                          : {}
                                                      }
                                                      onClick={() => {
                                                        setNavigation(
                                                          fsc.id + "r"
                                                        );
                                                        setParams({
                                                          file: "results",
                                                          title: "Resultados",
                                                          tests_id: t.id,
                                                          parent: {
                                                            sub_categories_id:
                                                              fsc.id,
                                                          },
                                                          items: results,
                                                          setItems: setResults,
                                                        });
                                                      }}
                                                    >
                                                      Results{" "}
                                                      {`(${
                                                        results.filter(
                                                          (r) =>
                                                            r.sub_categories_id ==
                                                            fsc.id
                                                        ).length
                                                      })`}
                                                    </Link>
                                                  </Li>
                                                </div>
                                              );
                                            })}
                                        </Ul>
                                      </Ul>
                                    </div>
                                  );
                                })}
                            </Ul>
                          </Ul>
                        </div>
                      );
                    })}
                </Ul>
              </Ul>
            </div>
          );
        })}
      </Ul>
    </Container>
  );
};
export default SideBar;

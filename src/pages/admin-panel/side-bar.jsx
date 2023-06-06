import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { show } from "../../fetch";
import colors from "../../styles/colors";
import { useNavigate, useParams } from "react-router";
import * as XLSX from 'xlsx';
import InfoContext from "../../context";
import Loader from "../../components/loading";
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
function saveAsExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE 10+
    window.navigator.msSaveBlob(data, fileName);
  } else {
    // Otros navegadores
    const link = document.createElement('a');
    const url = URL.createObjectURL(data);
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }
}
const SideBar = function ({  setParams, params }) {

  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [navigation, setNavigation] = useState("");
  const [userTests, setUserTests] = useState("");
  const [users, setUsers] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const urlParams = useParams();
  useEffect(() => {
    handleLoad().then(() =>{
      setLoading(false);
    })
  }, []);

  const handleLoad = async function () {
    let t;
    const filter = {
      limit: 10000000,
      filterBy: `tests_id=${urlParams.tests_id}`,
    };
    t = await show("tests", {
      limit: 10000000,
      filterBy: `id=${urlParams.tests_id}`,
    })
    setTests(t.data);
    t = await show("user_types", filter);
    setUserTypes(t.data);
    t = await show("user_tests", filter)
    setUserTests(t.data);
    t = await show("users", filter)
    setUsers(t.data);
    t = await show("categories", filter);
    setCategories(t.data);
    t = await show("sub_categories", filter);
    setSubCategories(t.data);
    t = await show("questions", filter)
    setQuestions(t.data);
    t = await show("results", filter);
    setResults(t.data);
    t = await show("user_questions", filter);

    setUserQuestions(t.data);

  }
  const handleExport = function (){
    const workbook = XLSX.utils.book_new();

    // Hoja de cálculo 1
    const worksheet1 = XLSX.utils.json_to_sheet(users.map(user=> {
      const userType = userTypes.find(c => c.id === user.type) ;
      return {
        id: user.id,
        nombre: user.name,
        paterno: user.middlename,
        materno: user.lastname,
        correo: user.email,
        tipo: userType?.name  ? userType.name : "",
        lideres: user?.leaders && user.leaders.split(",").map(l=> {
          const leader = users.find(u => u.id === l);
          return leader?.name ?  [leader.name, leader.middlename ,leader.lastname].join(" ") : "";
        }).join(", ")
      }
    }));
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Usuarios');

    // Hoja de cálculo 2
 
    const worksheet2 = XLSX.utils.json_to_sheet(userTests.length > 0 ? userTests.filter(uts=> uts.leaders_id != 0).map(ut=> {
      const user = users.find( u => {
        return u.id == ut.users_id
      });
      
      const leader = users.find(u => u.id == ut.leaders_id);
      if(!leader) {console.log(ut.leaders_id, user)};
        return {
                id: ut.id,
                usuario: [user.name || "", user.middlename || "", user.lastname || ""].join(" "),
                lider: [leader.name || "", leader.middlename || "", leader.lastname || ""].join(" "),
                status: ut.status,
                mail: user.email || "",
              }
        
    }): []);
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Invitaciones');
    
    // Hoja de cálculo 3
    console.log("userQuestions", userQuestions);
    const worksheet3 = XLSX.utils.json_to_sheet(userQuestions.map(uq=> {
      const userType = userTypes.find(c => c.id === uq.users_type);
      const subCategory = subCategories.find(c => c.id === uq.sub_categories_id);
      const Category = categories.find(c => c.id === uq.categories_id);
      const user = users.find( u => u.id == uq.users_id);
      const leader = users.find(u => u.id == uq.leaders_id);
      return {
        "id": uq.id,
        "respuesta": Number(uq.value),
        "pregunta": uq.title,
        "opción min": uq.lower_option,
        "opcion max": uq.upper_option,
        "sub Categoria": subCategory?.name && subCategory.name,
        "tipo de lider": userType?.name && userType.name  ,
        "Categoria": Category?.name && Category.name,
        "usuario": user?.name && user.name ,
        "lider": leader?.name && leader.name,
      }
    }));
    XLSX.utils.book_append_sheet(workbook, worksheet3, 'Respuestas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFile(excelBuffer, 'Reporte.xlsx');
  }
  
  return (
    <>
    {loading ?  <Loader />  :
    <Container>
      <Ul>
        {tests.map((t) => {
          return (
            <div key={t.title}>
              
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
                <Li>
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
                          (r) => r.categories_id==0 && r.sub_categories_id==0
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
                  <Link
                    style={
                      navigation == t.id + "re"
                        ? { background: colors.selected }
                        : {}
                    }
                    onClick={() => {
                      navigate("/advance-report/"+urlParams.tests_id);
                    }}
                  >
                    Reporte de avance
                  </Link>
                  <Link
                    style={
                      navigation == t.id + "re"
                        ? { background: colors.selected }
                        : {}
                    }
                    onClick={handleExport}
                  >
                    Exportar Excel
                  </Link>
                </Li>
              
                
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
            
             
            </div>
          );
        })}
      </Ul>
    </Container>
}
    </>
  )
    
};
export default SideBar;

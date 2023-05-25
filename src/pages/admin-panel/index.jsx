import { useEffect, useState } from "react";

import { show } from "../../fetch";
import TestCard from "./cards";
import PrimaryButton from "../../components/primary-button";
import {
  PageContainer,
  PageTitle,
  CardsContainer,
  CardTitle,
} from "../../components/Pages";
import styled from "styled-components";
import SideBar from "./side-bar";
import aviableForms from "../../forms/aviables-forms";
import UserTests from "./user_tests";
import { useParams } from "react-router";
function searchInJSON(data, searchText) {
  const allValues = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      allValues.push(data[key]);
    }
  }
  if (allValues.join(" ").toString().toLowerCase().includes(searchText.toLowerCase()) ) {
    return true;
  }
  return false;
}
const Page = function ({
  file,
  title,
  parent,
  tests_id,
  items = [],
  setItems,
}) {
  const [enable, setEnable] = useState(false);
  const [userTypes, setUserTypes] = useState();
  const [limit, setLimit] = useState([0,9]);
  const [filter, setFilter] = useState("");
  useEffect(()=>{
    show("user_types", { limit: 1000, filterBy: `tests_id=${tests_id}`}).then((r)=>{
      const ut = r.data.map((r)=>{return {value: r.id, label: r.name}});
      setUserTypes(ut);
    })
  },[])
  switch (file) {
    case "user_tests":
      return (
        <UserTests
          items={items}
          tests_id={tests_id}
        />
      );
      break;

    default:
      if (!aviableForms[file]) {
        return <>Selecciona un catálogo válido</>;
      }
      let defaultValues = aviableForms[file].reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});
      return (
        <>
          <PageContainer>
            <PageTitle>{title}</PageTitle>
            {enable ? (
              <>
                <CardTitle>Nuevo elemento</CardTitle>
                <TestCard
                  userTypes={userTypes}
                  setUserTypes={setUserTypes}
                  enableEdit={true}
                  setItems={setItems}
                  formEnable={setEnable}
                  file={file}
                  items={items}
                  parent={parent}
                  tests_id={tests_id}
                  aviableForm={aviableForms[file]}
                  defaultValues={defaultValues}
                />
              </>
            ) : (
              <PrimaryButton onClick={() => setEnable(!enable)}>
                Crear {file}
              </PrimaryButton>
            )}
            Buscar:
            <input 
              type="search" 
              placeholder="Search"
              value={filter}
              onInput={(e)=> setFilter(e.target.value)}  
            />
            Mostrar: 
            <select onChange={(e)=>{
              setLimit([0 ,e.target.value - 1])
            }}>
              <option>10</option>
              <option>100</option>
              <option>1000</option>
              <option>10000</option>
            </select>
            <CardsContainer>
              {items.length > 0
                ? items
                    .filter((i) => {
                      if (!parent) {
                        return true;
                      }
                      const key = Object.keys(parent)[0];
                      return i[key] == parent[key];
                    })
                    .filter((o) => {
                      return searchInJSON(o, filter);
                    })
                    .filter((v, i)=>{
                      return i >= limit[0] && i <= limit[1] 
                    })
                    .map((t) => {
                      return (
                        <TestCard
                          userTypes={userTypes}
                          setUserTypes={setUserTypes}
                          parent={parent}
                          key={t.id+Math.random()}
                          enableEdit={false}
                          setItems={setItems} 
                          file={file}
                          items={items}
                          tests_id={tests_id}
                          aviableForm={aviableForms[file]}
                          defaultValues={t}
                          id={t.id}
                        />
                      );
                    })
                : "No hay elementos para mostrar"}
            </CardsContainer>
          </PageContainer>
        </>
      );
      break;
  }


  
};
const HomeContainer = styled.div`
  display: flex;
  direction: row;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;
const AdminPanel = function () {
  const [params, setParams] = useState({});
  const urlParams = useParams();
  return (
    <HomeContainer>
      <SideBar params={params} setParams={setParams}  />
      <Page {...params} tests_id={urlParams.tests_id}  />
    </HomeContainer>
  );
};
export default AdminPanel;

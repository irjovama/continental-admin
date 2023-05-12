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

const Page = function ({
  file,
  title,
  parent,
  tests_id,
  items = [],
  setItems,
}) {
  const [enable, setEnable] = useState(false);

  if (file == "user_tests") {
    return (
      <UserTests
        enableEdit={true}
        setItems={setItems}
        formEnable={setEnable}
        file={file}
        items={items}
        parent={parent}
        tests_id={tests_id}
      />
    );
  }

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
                .map((t) => {
                  return (
                    <TestCard
         
                      parent={parent}
                      key={t.id}
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
  return (
    <HomeContainer>
      <SideBar params={params} setParams={setParams}  />
      <Page {...params}  />
    </HomeContainer>
  );
};
export default AdminPanel;

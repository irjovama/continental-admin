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
import { useParams } from "react-router-dom";
import aviableForms from "../../forms/aviables-forms";

const Users = function () {
  const [items, setItems] = useState([]);
  const [enable, setEnable] = useState(false);
  const params = useParams();
  const file = "users";
  let defaultValues = aviableForms[file].reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});

  useEffect(() => {
    show(file, { limit: 10000000 }).then((r) => {
      setItems(r.data);
    });
  }, []);

  return (
    <>
      <PageContainer>
        <PageTitle>Users</PageTitle>
        {enable ? (
          <>
            <CardTitle>Nuevo usuario</CardTitle>
            <TestCard
              parent={parent}
              enableEdit={true}
              setItems={setItems}
              formEnable={setEnable}
              file={file}
              items={items}
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
            ? items.map((t) => {
                return (
                  <TestCard
                    parent={parent}
                    key={t.id}
                    enableEdit={false}
                    setItems={setItems}
                    file={file}
                    items={items}
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

export default Users;

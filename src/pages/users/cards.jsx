import { useEffect, useState } from "react";
import PrimaryButton from "../../components/primary-button";
import Input from "../../components/input";
import { create, destroy, show, update } from "../../fetch";
import SecondaryButton from "../../components/secondary-button";

import {
  CardContainer,
  CardTitle,
  CardBody,
  CardFooter,
} from "../../components/Pages";
import { useParams } from "react-router-dom";

//////////////
const TestCard = function ({
  enableEdit,
  setItems,
  items,
  formEnable,
  file,
  defaultValues,
  aviableForm,
  parent,
  childrens,
  id,
}) {
  const [enable, setEnable] = useState(enableEdit);
  const [formVal, setFormVal] = useState(defaultValues);
  const params = useParams();

  const message =
    "¿Realmente deseas eliminar " +
    file +
    "? Se perderán todos los datos internos";

  function handleContent(children) {
    window.location.href = window.location.href + "/" + id + "/" + children;
  }
  function handleEdit() {
    setEnable(!enable);
  }
  function handleDelete() {
    const conf = confirm(message);
    if (conf) {
      destroy(id, file).then((d) => {
        const filter = parent
          ? { filterBy: `${parent}=${params[parent]}` }
          : { filterBy: null };
        show(file, filter).then((r) => {
          setItems(r.data);
        });
      });
    }
  }
  function handleSave() {
    if (enableEdit) {
      formVal[`${parent}`] = `${params[parent]}`;
      create(file, formVal).then((d) => {
        const filter = parent
          ? { filterBy: `${parent}=${params[parent]}` }
          : { filterBy: null };
        show(file, filter).then((r) => {
          formEnable(false);
          setItems(r.data);
        });
      });
    } else {
      update(id, file, formVal)
        .then((r) => {
          setEnable(false);
        })
        .catch(console.error);
    }
  }
  return (
    <CardContainer>
      <CardBody>
        {aviableForm.map((d) => {
          let result = [];
          for (let i in d) {
            result.push(
              enable ? (
                <Input key={i} name={i} value={formVal} setValue={setFormVal} />
              ) : i == "name" || i == "title" ? (
                <CardTitle key={i}>{formVal[i]}</CardTitle>
              ) : (
                <div key={i}>
                  {i}: {formVal[i]}
                </div>
              )
            );
          }
          return result;
        })}
        {enable ? (
          <>
            <p>Leaders:</p>
            <select
              multiple
              name="leaders"
              value={formVal["leaders"]}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                );
                setFormVal({ ...formVal, ["leaders"]: values });
              }}
            >
              {items
                .filter((i) => {
                  return i.type && i.type != "";
                })
                .map((u) => {
                  return (
                    <option value={u.id} key={u.id}>
                      {u.name} {u.middlename} {u.lastname}
                    </option>
                  );
                })}
            </select>
            <p>Type:</p>
            <select
              name="type"
              value={formVal["type"]}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                );
                setFormVal({ ...formVal, ["type"]: values });
              }}
            >
              <option></option>
              <option>Lider organizacional</option>
              <option>Liderar a otros</option>
            </select>
          </>
        ) : (
          <></>
        )}

        <CardFooter>
          {enable ? (
            <PrimaryButton onClick={handleSave}>Guardar</PrimaryButton>
          ) : (
            <>
              <PrimaryButton onClick={handleEdit}>Editar</PrimaryButton>
              <SecondaryButton onClick={handleDelete}>Borrar</SecondaryButton>
              {childrens && childrens.length > 0
                ? childrens.map((children) => {
                    return (
                      <PrimaryButton
                        key={children}
                        onClick={() => handleContent(children)}
                      >
                        {children}
                      </PrimaryButton>
                    );
                  })
                : ""}
            </>
          )}
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};
export default TestCard;

import { useState } from "react";
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
import Select from "../../components/Select";

//////////////
const TestCard = function ({
  enableEdit,
  setItems,
  formEnable,
  items,
  tests_id,
  file,
  defaultValues,
  aviableForm,
  parent,
  id,
}) {
  const [enable, setEnable] = useState(enableEdit);
  const [formVal, setFormVal] = useState(defaultValues);
  const [visible, setVisible] = useState(true);

  const message =
    "¿Realmente deseas eliminar " +
    file +
    "? Se perderán todos los datos internos";

  function handleEdit() {
    setEnable(!enable);
  }
  function handleDelete() {
    const conf = confirm(message);
    if (conf) {
      destroy(id, file).then((d) => {
        const newItems = items;
        const mapped = newItems.filter((i) => i.id != id);
        setItems(mapped);
        setVisible(false);
      });
    }
  }
  function handleSave() {
    if (enableEdit) {
      const key = Object.keys(parent)[0];
      formVal[key] = `${parent[key]}`;
      formVal["tests_id"] = tests_id;

      create(file, formVal).then((d) => {
        console.log(d);
        const newItems = items;
        newItems.push(d);
        setItems(newItems);
        setFormVal(defaultValues);
        formEnable(false);
      });
    } else {
      update(id, file, formVal)
        .then((r) => {
          const newItems = items;
          const mapped = newItems.map((i) => (i.id == id ? r : i));
          setItems(mapped);
          setEnable(false);
        })
        .catch(console.error);
    }
  }
  return (
    <CardContainer style={{ display: visible ? "block" : "none" }}>
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
        {file == "users" ? (
          enable ? (
            <>
              <Select
                multiple={true}
                name={"leaders"}
                value={formVal}
                setValue={setFormVal}
                options={items
                  .filter((fi) => fi?.type)
                  .map((i) => {
                    return { value: i.id, label: `${i.name}` };
                  })}
              />
              <Select
                multiple={false}
                name={"type"}
                value={formVal}
                setValue={setFormVal}
                options={[
                  {
                    value: "735eefc4-3990-40d7-a47d-958f50f2b725",
                    label: "Liderar a otros",
                  },
                  {
                    value: "09aebc68-65c9-44e8-8183-1d90fcd68905",
                    label: "Lidera organizacional",
                  },
                ]}
              />
            </>
          ) : (
            <>
              <div>
                leaders:{" "}
                {formVal?.leaders &&
                  formVal.leaders.map((l) => {
                    return l + ", ";
                  })}
              </div>
              <div>Type: {formVal?.type && formVal.type}</div>
            </>
          )
        ) : (
          ""
        )}
        <CardFooter>
          {enable ? (
            <PrimaryButton onClick={handleSave}>Guardar</PrimaryButton>
          ) : (
            <>
              <PrimaryButton onClick={handleEdit}>Editar</PrimaryButton>
              <SecondaryButton onClick={handleDelete}>Borrar</SecondaryButton>
            </>
          )}
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};
export default TestCard;

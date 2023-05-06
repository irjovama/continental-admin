import { useEffect, useState } from "react";
import { show } from "../../fetch";

const UserTests = function ({
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    show("users", {
      limit: 1000000,
    }).then((t) => setUsers(t.data));
  }, []);
  return <>hola desde user tests{console.log(users)}</>;
};
export default UserTests;

import { useEffect, useState } from "react";
import { create, show, send } from "../../fetch";
import styled from "styled-components";
import PrimaryButton from "../../components/primary-button";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Card = styled.div`
  border-bottom: solid;
`;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    show("users", {
      limit: 1000000,
    }).then((t) => setUsers(t.data));
  }, []);

  async function createUT(user, leaders_id) {
    const result = await create("user_tests", {
      users_id: user.id,
      leaders_id,
      tests_id,
      status: 0,
    });
    await send(user.email, result.id, tests_id);
  }

  async function sendOne(u) {
    //si tiene lideres
    if (u?.leaders) {
      for (const l of u.leaders) {
        const item = items.find(
          (it) => it.users_id == u.id && it.leaders_id == l
        );
        if (!item) {
          await createUT(u, l);
        } else {
          if (item.status == 0) {
            await send(u.email, item.id, tests_id);
          }
        }
      }
    }
    //si es lider
    if (u?.type) {
      const item = items.find(
        (it) => it.users_id == u.id && it.leaders_id == u.id
      );
      if (!item) {
        await createUT(u, u.id);
      } else {
        if (item.status == 0) {
          await send(u.email, item.id, tests_id);
        }
      }
    }
  }
  async function sendForUser(u) {
    setLoading(true);

    await sendOne(u);

    setLoading(false);
    alert("Correos enviados");
  }

  async function sendReport(u) {
    setLoading(true);

    const r = await fetch("http://localhost:3000/pdf/tests/73e647e1-cfa3-4ade-9985-c44e4527a0d4/users/73f7e170-b1ce-4bcb-be09-491df9eef50e")
    const data = await r.json();
    setLoading(false);
    alert(data.result)
  }

  async function sendAll() {
    setLoading(true);
    for (const u of users) {
      await sendOne(u);
    }
    setLoading(false);
    alert("Correos enviados");
  }

  return (
    <Container>
      {loading ? (
        <>Sending...</>
      ) : (
        <PrimaryButton
          onClick={() => {
            sendAll();
          }}
        >
          Enviar Todas las Invitaciones
        </PrimaryButton>
      )}
      {users.map((u) => (
        <Card key={u.id}>
          {loading ? (
            <>Sending...</>
          ) : (
            <PrimaryButton
              onClick={() => {
                sendForUser(u);
              }}
            >
              Enviar Invitaciones {" "}
            </PrimaryButton>
          )}{" "}
          {loading ? (
            <>Sending...</>
          ) : (
            <PrimaryButton
              onClick={() => {
                sendReport(u);
              }}
            >
              Enviar Reporte {" "}
            </PrimaryButton>
          )}{" "}
          <span>
            {u.name} {u.middlename} {u.lastname}
          </span>
          <ul>
            <li>Lideres:</li>
            <ul>
              {u.leaders &&
                u.leaders.map((l) => {
                  const leader = users.find((us) => us.id == l);
                  if (leader?.name) {
                    return (
                      <li key={leader.id}>
                        {`${leader.name} ${leader.middlename} ${leader.lastname}`}
                      </li>
                    );
                  }
                })}
            </ul>
          </ul>
        </Card>
      ))}
    </Container>
  );
};
export default UserTests;

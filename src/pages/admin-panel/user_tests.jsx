import { useEffect, useState } from "react";
import { create, show, send, find, sendPDF, update } from "../../fetch";
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
  items,
  tests_id,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    show("users", {
      limit: 1000000,
      filterBy: `tests_id=${tests_id}`
    }).then((t) => {
      const uf = t.data
      .filter(user => user.email != "")
      .filter(user => {
        const it = items.filter(it=> it.send=="0000-00-00 00:00:00" && it.status==0).map( i => i.users_id);
        console.log(it)
        const id = user.id;
        return it.includes(id);
      });
      console.log(uf)
      setUsers(uf )
    });
  }, []);

  async function createUT(user, leader) {
    if(leader.id >0 ){
      const result = await create("user_tests", {
        users_id: user.id,
        leaders_id: leader.id,
        tests_id,
        status: 0,
      });
      return result;
    } else {
      return false;
    }
  }

  async function sendOne(u) {
    const object = [];
    const test = await find("tests/"+tests_id)

    //si tiene lideres
    if (u?.leaders ) {
      const splitedLeaders = u.leaders.split(",");
      for (const l of splitedLeaders ) {
        if(l!=""){
          const leader = await find("users/"+l) //despues lo movemosr
          const item = items.find(
            (it) => it.users_id == u.id && it.leaders_id == l
          );
          if (!item) {
            const result = await createUT(u, leader);
            object.push({token: result.id, leader: `${leader.name} ${leader.middlename} ${leader.lastname}`});
          } else {
            if (item.status == 0) {
              object.push({token: item.id, leader: `${leader.name} ${leader.middlename} ${leader.lastname}`});
            }
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
        const result = await createUT(u, u);
        object.push({token: result.id, leader: `${u.name} ${u.middlename} ${u.lastname}`});
      } else {
        if (item.status == 0) {
          object.push({token: item.id, leader: `${u.name} ${u.middlename} ${u.lastname}`});      
        }
      }
    }
   
    if(object.length>0){
      if(u.email !=""){
        const send_state = await send(u, test.title, object);
        console.log(send_state);
        if(!send_state){
          return false;
        } else {
          for(let myo of object){
            await updateSendDate(myo.token);
          }
          return true;
        }
      } else {
        return true;
      }
      
    } else {
      console.log("no se manda para "+u.email);
      return true;
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
    const data = await sendPDF(tests_id, u)
    setLoading(false);
    console.log(data.result)
  }


  async function updateSendDate(token){
    const date = (new Date()).getFullYear() + "-" +
                  (new Date()).getMonth() + "-" +
                  (new Date()).getDay();
    const upd = await update(token, "user_tests", { send: date});
    console.log(upd);
  }


  async function sendAll() {
    setLoading(true);
    for (const u of users
      ) {
      const state = await sendOne(u);
      if(!state) {
        console.log("break", state)
        break;
      } 
    }
    setLoading(false);
    console.log("Correos enviados");
  }

  return (
    <Container>
       {console.log()}
        <>
          <PrimaryButton
            onClick={() => {
              console.log("empezar")
              sendAll();
            }}
          >
            Enviar Todas las Invitaciones
          </PrimaryButton>

          {users
          // .filter( (u) => items.map( i => i.users_id).includes(u.id) )
          .map((u) => (
            <Card key={u.id}>
                <PrimaryButton
                  onClick={() => {
                    sendForUser(u);
                  }}
                >
                  Enviar Invitaciones {" "}
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => {
                    sendReport(u);
                  }}
                >
                  Enviar Reporte {" "}
                </PrimaryButton>
              <span>
                {u.name} {u.middlename} {u.lastname}
              </span>
              <ul>
                <li>Lideres:</li>
                <ul>
                  {u.leaders &&
                    u.leaders.split(",").map((l) => {
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
        </>
      
    </Container>
      
  );
};
export default UserTests;

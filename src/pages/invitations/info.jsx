import styled from "styled-components";
import { MiniLogo } from "../../img/logo";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { find } from "../../fetch";

const Header = styled.header`
  padding: 12px 16px;
`;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
  max-width: 680px;
  margin-inline: auto;
`;

const Button = styled.button`
  color: white;
  background: #7a00c6;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  cursor: pointer;

  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  /* or 27px */

  color: #1c1c1a;
`;

const SubTitle = styled.h2``;

const InfoInvitations = function () {
  const urlParams = useParams();
  const [user, setUser] = useState("");
  const [leader, setLeader] = useState("");
  useEffect(() => {
    find(`user_tests/${urlParams.token}`).then((r) => {
      find(`users/${r.users_id}`).then((u) => {
        setUser(`${u.name} ${u.middlename} ${u.lastname}`);
        sessionStorage.setItem("users_id", u.id);
      });
      find(`users/${r.leaders_id}`).then((u) => {
        setLeader(u?.name ? `${u.name} ${u.middlename} ${u.lastname}` : "");
        sessionStorage.setItem("leaders_id", u.id);
      });
    });
  }, [urlParams.token]);

  return (
    <Container>
      <Header>
        <MiniLogo />
      </Header>

      <Center>
        <Paragraph>
          Bienvenid@ <strong>{user}</strong>!
        </Paragraph>
        {leader === user ? (
          <SubTitle>Autoevaluación</SubTitle>
        ) : (
          <SubTitle>Evaluarás a {leader}</SubTitle>
        )}

        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi autem
          quam in quos vero aliquid, alias, veniam laborum error explicabo sint
          voluptas nihil quia unde incidunt aspernatur ab illum maxime! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ullam ut ipsum
          earum beatae deleniti perspiciatis soluta nostrum. Magnam fugit
          pariatur dolorem error distinctio illo, libero laboriosam voluptas
          aperiam consequuntur autem dignissimos cum veritatis voluptatem
          suscipit culpa earum dicta! Officia, veritatis laboriosam. Itaque
          autem voluptatem culpa dolor esse ipsum quos
        </Paragraph>

        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi autem
          quam in quos vero aliquid, alias, veniam laborum error explicabo sint
          voluptas nihil quia unde incidunt aspernatur ab illum maxime! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ullam ut ipsum
          earum beatae deleniti perspiciatis soluta nostrum. Magnam fugit
          pariatur dolorem error distinctio illo, libero laboriosam voluptas
          aperiam consequuntur autem dignissimos cum
        </Paragraph>
        <Link to="test">
          <Button>Comenzar</Button>
        </Link>
      </Center>
    </Container>
  );
};
export default InfoInvitations;

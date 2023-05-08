import styled from "styled-components";
import { Logo } from "../../img/logo";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { find } from "../../fetch";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  /* or 58px */

  text-align: center;

  color: #7a00c6;
`;
const Button = styled.button`
  width: 124px;
  height: 50px;

  color: white;
  background: #7a00c6;
  border-radius: 8px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
`;
const HomeInvitations = function () {
  const urlParams = useParams();
  const [title, setTitle] = useState("");
  useEffect(() => {
    find(`user_tests/${urlParams.token}`).then((r) => {
      find(`tests/${r.tests_id}`).then((t) => {
        setTitle(t.title);
      });
    });
  }, []);
  return (
    <Container>
      <Center>
        <Logo />
        <Title>{title}</Title>

        <Link to="info">
          {" "}
          <Button>Comenzar</Button>
        </Link>
      </Center>
    </Container>
  );
};
export default HomeInvitations;

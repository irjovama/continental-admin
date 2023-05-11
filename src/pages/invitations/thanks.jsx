import styled from "styled-components";
import { Logo } from "../../img/logo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  max-width: 360px;
  margin: auto;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  /* or 58px */

  text-align: center;

  color: #7a00c6;
  margin-bottom: 48px;
`;

const Thanks = function () {
  return (
    <Container>
      <Center>
        <Logo />
        <Title>Gracias por participar</Title>
      </Center>
    </Container>
  );
};
export default Thanks;

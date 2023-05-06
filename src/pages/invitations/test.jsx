import styled from "styled-components";
import { MiniLogo } from "../../img/logo";
import { Link } from "react-router-dom";

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
  gap: 1rem;
  width: 800px;
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
const Paragraph = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  /* or 27px */

  color: #1c1c1a;
`;
const Table = styled.table`
  width: 500px;
`;
const InfoInvitations = function () {
  return (
    <>
      <MiniLogo />
      <Container>
        <Center></Center>
      </Container>
    </>
  );
};
export default InfoInvitations;

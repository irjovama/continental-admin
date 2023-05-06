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
        <Center>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            autem quam in quos vero aliquid, alias, veniam laborum error
            explicabo sint voluptas nihil quia unde incidunt aspernatur ab illum
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam ut ipsum earum beatae deleniti perspiciatis soluta nostrum.
            Magnam fugit pariatur dolorem error distinctio illo, libero
            laboriosam voluptas aperiam consequuntur autem dignissimos cum
            veritatis voluptatem suscipit culpa earum dicta! Officia, veritatis
            laboriosam. Itaque autem voluptatem culpa dolor esse ipsum quos
          </Paragraph>
          <Table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Lider</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Irving Jones Valdes Maciel</td>
                <td>Irving Jones Valdes Maciel</td>
              </tr>
            </tbody>
          </Table>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            autem quam in quos vero aliquid, alias, veniam laborum error
            explicabo sint voluptas nihil quia unde incidunt aspernatur ab illum
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam ut ipsum earum beatae deleniti perspiciatis soluta nostrum.
            Magnam fugit pariatur dolorem error distinctio illo, libero
            laboriosam voluptas aperiam consequuntur autem dignissimos cum
          </Paragraph>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            autem quam in quos vero aliquid, alias, veniam laborum error
            explicabo sint voluptas nihil quia unde incidunt aspernatur ab illum
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam ut ipsum earum beatae deleniti perspiciatis soluta nostrum.
            Magnam fugit pariatur dolorem error distinctio illo, libero
          </Paragraph>
          <Link to="test">
            {" "}
            <Button>Comenzar</Button>
          </Link>
        </Center>
      </Container>
    </>
  );
};
export default InfoInvitations;

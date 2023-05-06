import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 5px;
  padding: 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: small;
`;
const Input = function ({ name, value, setValue }) {
  return (
    <Container>
      <Title>{name}:</Title>
      <StyledInput
        value={value[name]}
        onInput={(e) => setValue({ ...value, [name]: e.target.value })}
      />
    </Container>
  );
};
export default Input;

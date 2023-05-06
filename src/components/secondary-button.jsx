import styled from "styled-components";
import colors from "../styles/colors";
const SecondaryButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.text};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: ${colors.white};
  &:hover {
    background-color: ${colors.primary};
  }
`;
export default SecondaryButton;

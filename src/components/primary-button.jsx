import styled from "styled-components";
import colors from "../styles/colors";
const PrimaryButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: ${colors.white};
  &:hover {
    background-color: ${colors.secondary};
  }
`;
export default PrimaryButton;

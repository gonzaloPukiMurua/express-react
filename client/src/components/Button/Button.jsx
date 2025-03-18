import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #646cff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #535bf2;
  }

  &:active {
    background-color: #4247e0;
  }

  &:focus {
    outline: 2px solid #535bf2;
    outline-offset: 2px;
  }
`;

export function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButtonLink = styled(Link)`
  background-color: #646cff;
  color: white;
  padding: 4px 8px;
  text-decoration: none;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
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

export const ButtonLink = ({ to, children }) => (
  <StyledButtonLink to={to}>
    {children}
  </StyledButtonLink>
);

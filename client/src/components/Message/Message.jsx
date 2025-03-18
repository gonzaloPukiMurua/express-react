import styled from "styled-components";

const StyledMessage = styled.p`
  color: #ff4d4d;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  border: 1px solid #ff4d4d;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
`

export function Message({ message }) {
    return (
      <StyledMessage>
        {message}
      </StyledMessage>
    );
  };
import styled from "styled-components";

const StyledFormContainer = styled.div`
  max-width: 600px;
  min-width: 500px;
  margin: 90px auto;
  padding: 18px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
`;

export function FormContainer({children}){
    return(
        <StyledFormContainer>{children}</StyledFormContainer>
    )
};
import styled from "styled-components";

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
  }

  input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    color: black;
    &:focus {
      border-color: #646cff;
    }
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export function FormGroup({children}){
    return(
        <StyledFormGroup>{children}</StyledFormGroup>
    )
};
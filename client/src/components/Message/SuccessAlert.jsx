import styled from "styled-components";

const SuccessAlertContainer = styled.div`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AlertMessage = styled.span`
  font-size: 1em;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #155724;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: #0c3e1c;
  }
`;

export function SuccessAlert({ message, onClose }) {
  return (
    <SuccessAlertContainer>
      <AlertMessage>{message}</AlertMessage>
      <CloseButton onClick={onClose}>X</CloseButton>
    </SuccessAlertContainer>
  );
}

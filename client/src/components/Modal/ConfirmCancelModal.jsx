import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  color: black;
`;

const ConfirmButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: darkgreen;
  }
`;

const CloseButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: darkgray;
  }
`;

export function ConfirmCancelModal({ show, message, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Advertencia</h3>
        <p>{message}</p>
        <div>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
          <CloseButton onClick={onClose}>Cancelar</CloseButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

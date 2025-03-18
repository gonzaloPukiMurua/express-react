import { useState } from "react";
import { useAppointments } from "../../context/appointmentsContext";
import { ConfirmCancelModal } from "../Modal/ConfirmCancelModal";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 100%;
  height: auto;
  background-color: #1e1e1e;
  border: 1px solid #333;
  padding: 8px 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 4px 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;

const CardBody = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 0.5fr;
  gap: 12px;
  align-items: center;
  color: white;
`;

const CardTitle = styled.h5`
  font-weight: bold;
  font-size: 14px;
  color: white;
  text-align: center;
`;

const CardDate = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const CardTime = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const CardStatus = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: ${({ status }) => (status === "cancelled" ? "red" : "green")};
  text-align: center;
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background-color: darkred;
  }
`;

export function Card({ appointment }) {
  const { cancelAppointment } = useAppointments();
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    cancelAppointment(appointment.id);
    setShowModal(false);
  };

  return (
    <StyledCard>
      <CardBody>
        <CardTitle>Turno #{appointment.id}</CardTitle>
        <CardDate>
          {new Date(appointment.date).toLocaleDateString("es-ES", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </CardDate>
        <CardTime>{appointment.time}</CardTime>
        <CardStatus status={appointment.status}>
          {appointment.status === "cancelled" ? "Cancelado" : "Activo"}
        </CardStatus>
        {appointment.status !== "cancelled" && (
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
        )}
      </CardBody>

      <ConfirmCancelModal
        show={showModal}
        message="¿Estas seguro de cancelar este turno?"
        onConfirm={handleConfirmCancel}
        onClose={() => setShowModal(false)}
      />
    </StyledCard>
  );
}

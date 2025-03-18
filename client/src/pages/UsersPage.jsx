import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import styled from "styled-components";

const UsersContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  a {
    color: #535bf2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#535bf2")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }
`;

export function UsersPage() {
  const { users, getUsers, deleteUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    console.log("Estos son los users: ", users);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
    }
  };

  return (
    <UsersContainer>
      <h2>Lista de Usuarios</h2>
      {users.map((user) => (
        <UserRow key={user.id}>
          <Link to={`/users/${user.id}`}>{user.email}</Link>
          <span>Rol: {user.roles}</span>
          <div>
            <Button onClick={() => navigate(`/update-user/${user.id}`)}>Editar</Button>
            <Button danger onClick={() => handleDelete(user.id)}>Eliminar</Button>
          </div>
        </UserRow>
      ))}
    </UsersContainer>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  background-color: #333;
  padding: 14px 18px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 2px -2px gray;
  box-sizing: border-box;
  margin-bottom: 60px;
`;

const StyledTitleLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #646cff;
  }
`;

const StyledNavList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 18px;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const StyledNavItem = styled.li`
  font-family: "Montserrat", sans-serif;
  color: #fff;

  & + & {
    margin-left: 15px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #535bf2;
      text-decoration: underline;
    }
  }
`;

export function Navbar() {
  const { logout, user, userValidated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Comprueba si el usuario tiene un rol específico
  const hasRole = (role) => user?.roles?.includes(role) ?? false;

  return (
    <StyledNavbar>
      <h2>
        <StyledTitleLink to="/">Asesor de turnos</StyledTitleLink>
      </h2>
      <StyledNavList>
        <StyledNavItem>
          <Link to="/">Home</Link>
        </StyledNavItem>
        {!userValidated ? (
          <>
            <StyledNavItem>
              <ButtonLink to="/login">Login</ButtonLink>
            </StyledNavItem>
            <StyledNavItem>
              <ButtonLink to="/register">Register</ButtonLink>
            </StyledNavItem>
          </>
        ) : (
          <>
            <StyledNavItem>
              <Link to="/create-order">Crear orden</Link>
            </StyledNavItem>
            <StyledNavItem>
              <Link to="/orders">Mis órdenes</Link>
            </StyledNavItem>
            <StyledNavItem>
              <Link to="/profile">Mi perfil</Link>
            </StyledNavItem>
            {hasRole("admin") && (
              <>
                <StyledNavItem>
                  <Link to="/create-product">Crear productos</Link>
                </StyledNavItem>
                <StyledNavItem>
                  <Link to="/products">Productos</Link>
                </StyledNavItem>
                <StyledNavItem>
                  <Link to="/users">Usuarios</Link>
                </StyledNavItem>
              </>
            )}
            <StyledNavItem>
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </StyledNavItem>
          </>
        )}
      </StyledNavList>
    </StyledNavbar>
  );
}

import { createContext, useContext, useState } from "react";
import {
  getUserRequest,
  getUsersRequest,
  deleteUserRequest
} from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useProducts must be used within UserProvider.");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const {data}= await getUsersRequest();
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getUser = async (id) => {
    try {
      const { data } = await getUserRequest(id);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserRequest(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUser,
        getUsers,
        deleteUser,
        useUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

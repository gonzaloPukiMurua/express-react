import axios from "./axios";

export const registerRequest = (user) => axios.post(`auth/signup`, user);
export const loginRequest = (user) => axios.post(`auth/signin`, user);
export const verifyTokenRequest = () => axios.get(`auth/verify`);

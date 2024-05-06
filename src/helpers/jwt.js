import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const createAccessToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {expiresIn: "1d"},
            (error, token) => {
                if(error)reject(error);
                resolve(token);
            }
        );
    });
}
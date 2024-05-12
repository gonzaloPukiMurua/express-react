import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const authorization = (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if(!token) res.status(401).json({ message: "Not token. Not authorized."});
    jwt.verify(
        token,
        TOKEN_SECRET, (error, user) => {
            if(error) res.status(402).json({ message : "Invalid token."});
            console.log(user);
            req.user = user; //Guardo en el objeto request el usuario validado.
            next();
        });
}
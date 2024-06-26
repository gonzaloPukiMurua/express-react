import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../helpers/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
    
    const {username, email, password} = req.body;
    console.log (username, " | ", email, " | ", password);

    try{
        const userFound = await User.findOne({email});
        if(userFound) return res.status(400).json({ message: "Email already exists."})
        const hashPassword = await bcryptjs.hash(password, 10); // Hashing password
        const newUser = new User({
            username, 
            email, 
            password: hashPassword
        });
        console.log(newUser); //Production
        const savedUser = await newUser.save(); //Saving user in DB
        const token = await createAccessToken({ id: savedUser._id }); //Creating token
        console.log(token);
        res.cookie( "token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: false
        });
        res.json({ message: "Usuario creado." });

    }catch(e){
        res.status(500).json({ message: error.message});
    }    
}

export const login =  async (req, res) => {
    const {email, password} = req.body;
    console.log (email, " | ", password);
    try{
        const userToFind = await User.findOne({ email }); //Finding user 
        if(!userToFind) return res.status(400).json({message: "User not found."});
        
        const passwordMatch = await bcryptjs.compare(password, userToFind.password); //Comparing password inserted with password in DB
        if(!passwordMatch) return res.status(400).json({ message: "Password incorrect."});
        
        const token = await createAccessToken( {id: userToFind._id});
        res.cookie("token", token);
        console.log(token);
        res.json({
            id: userToFind._id,
            username: userToFind.username,
            email: userToFind.email,
            createdAt: userToFind.createdAt,
            updatedAt: userToFind.updatedAt
        });

    }catch(e){
        res.status(500).json({ message: error.message});
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", { expires : new Date(0)});
    return res.status(200).json({ message: "Logout!"});
}

export const profile = async (req, res) => {

    console.log(req.user);
    const userToFind = await User.findById(req.user.id);
    if(!userToFind) return res.status(400).json({message: "User not found."});
    res.json({
        id: userToFind._id,
        username: userToFind.username,
        email: userToFind.email,
        createdAt: userToFind.createdAt,
        updatedAt: userToFind.updatedAt
    });
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "Not authorized."});
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        console.log("Verifying token.")
        if(err) return res.status(401).json({message: "Not authorized."});
        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "Not authorized."});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}
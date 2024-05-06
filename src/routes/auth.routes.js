import express from "express";
import {
    login,
    register,
    logout,
    profile
} from "../controllers/auth.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/api/register", register); //

router.post("/api/login", login);

router.post("/api/logout", logout);

router.get("/api/profile", validateToken, profile);

export default router;
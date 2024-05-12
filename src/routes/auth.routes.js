import express from "express";
import {
    login,
    register,
    logout,
    profile
} from "../controllers/auth.controllers.js";
import { authorization } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register); //

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authorization, profile);

export default router;
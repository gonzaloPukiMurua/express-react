import express from "express";
import {
    addTask,
    getTask,
    allTasks,
    updateTask,
    deleteTask
 } from "../controllers/task.controllers.js";

import { authorization } from "../middlewares/auth.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = express.Router();

router.get("/task/", authorization, allTasks);
router.get("/task/:id", authorization, getTask);
router.post(
    "/task/",
    authorization,
    validateSchema(taskSchema),
    addTask
);
router.put("/task/:id", authorization, updateTask);
router.delete("/task/:id", authorization, deleteTask);

export default router;
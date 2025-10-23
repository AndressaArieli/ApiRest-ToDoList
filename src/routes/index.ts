import { Router } from "express";
import * as authController from "../controllers/authController";
import * as taskController from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected task routes
router.use("/tasks", authMiddleware);
router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.listTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;

import { Router } from "express";
import {
  getTasksByProject,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate";
import { insertTaskSchema, updateTaskSchema } from "../db/validators";

const router = Router();

// GET /api/projects/:projectId/tasks - Get all tasks for a project
router.get("/projects/:projectId/tasks", getTasksByProject);

// POST /api/projects/:projectId/tasks - Create task for a project
router.post("/projects/:projectId/tasks", validate(insertTaskSchema), createTask);

// GET /api/tasks/:id - Get task by ID
router.get("/tasks/:id", getTaskById);

// PUT /api/tasks/:id - Update task
router.put("/tasks/:id", validate(updateTaskSchema), updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete("/tasks/:id", deleteTask);

export default router;

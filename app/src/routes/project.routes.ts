import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { validate } from "../middlewares/validate";
import { insertProjectSchema, updateProjectSchema } from "../db/validators";

const router = Router();

// GET /api/projects - Get all projects
router.get("/", getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get("/:id", getProjectById);

// POST /api/projects - Create project
router.post("/", validate(insertProjectSchema), createProject);

// PUT /api/projects/:id - Update project
router.put("/:id", validate(updateProjectSchema), updateProject);

// DELETE /api/projects/:id - Delete project
router.delete("/:id", deleteProject);

export default router;

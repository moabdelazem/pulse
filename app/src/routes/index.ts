import { Router } from "express";
import projectRoutes from "./project.routes";
import taskRoutes from "./task.routes";

const router = Router();

// Mount project routes at /api/projects
router.use("/projects", projectRoutes);

// Mount task routes at /api (includes both /projects/:id/tasks and /tasks/:id)
router.use("/", taskRoutes);

export default router;

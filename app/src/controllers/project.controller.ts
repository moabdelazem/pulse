import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { projects } from "../db/schema";
import { eq } from "drizzle-orm";

// Get all projects
export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await db.select().from(projects);
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)));

    if (project.length === 0) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json(project[0]);
  } catch (error) {
    next(error);
  }
};

// Create project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, repoUrl } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const newProject = await db
      .insert(projects)
      .values({ name, description, repoUrl })
      .returning();

    res.status(201).json(newProject[0]);
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, repoUrl } = req.body;

    const updatedProject = await db
      .update(projects)
      .set({ name, description, repoUrl })
      .where(eq(projects.id, parseInt(id)))
      .returning();

    if (updatedProject.length === 0) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json(updatedProject[0]);
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning();

    if (deletedProject.length === 0) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

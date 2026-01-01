import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { tasks } from "../db/schema";
import { eq, and } from "drizzle-orm";

// Get all tasks for a project
export const getTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, parseInt(projectId)));

    res.json(projectTasks);
  } catch (error) {
    next(error);
  }
};

// Get task by ID
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, parseInt(id)));

    if (task.length === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task[0]);
  } catch (error) {
    next(error);
  }
};

// Create task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { title, content, status, dueDate } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const newTask = await db
      .insert(tasks)
      .values({
        projectId: parseInt(projectId),
        title,
        content,
        status: status || "todo",
        dueDate: dueDate ? new Date(dueDate) : null,
      })
      .returning();

    res.status(201).json(newTask[0]);
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content, status, dueDate } = req.body;

    const updatedTask = await db
      .update(tasks)
      .set({
        title,
        content,
        status,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      })
      .where(eq(tasks.id, parseInt(id)))
      .returning();

    if (updatedTask.length === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(updatedTask[0]);
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedTask = await db
      .delete(tasks)
      .where(eq(tasks.id, parseInt(id)))
      .returning();

    if (deletedTask.length === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

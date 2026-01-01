import { createInsertSchema, createUpdateSchema, createSelectSchema } from "drizzle-zod";
import { projects, tasks, statusEnum } from "./schema";

// Project schemas
export const insertProjectSchema = createInsertSchema(projects, {
  name: (schema) => schema.min(1, "Name is required").max(255),
  description: (schema) => schema.max(1000).optional(),
  repoUrl: (schema) => schema.url("Invalid URL format").optional(),
});

export const updateProjectSchema = createUpdateSchema(projects, {
  name: (schema) => schema.min(1).max(255).optional(),
  description: (schema) => schema.max(1000).optional(),
  repoUrl: (schema) => schema.url("Invalid URL format").optional(),
});

export const selectProjectSchema = createSelectSchema(projects);

// Task schemas
export const insertTaskSchema = createInsertSchema(tasks, {
  title: (schema) => schema.min(1, "Title is required").max(255),
  content: (schema) => schema.max(5000).optional(),
});

export const updateTaskSchema = createUpdateSchema(tasks, {
  title: (schema) => schema.min(1).max(255).optional(),
  content: (schema) => schema.max(5000).optional(),
});

export const selectTaskSchema = createSelectSchema(tasks);

// Status enum schema
export const statusEnumSchema = createSelectSchema(statusEnum);

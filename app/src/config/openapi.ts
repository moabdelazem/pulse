import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pulse API",
      version: "1.0.0",
      description:
        "Project and task management API for DevOps and SRE workflows",
      contact: {
        name: "Mohamed Abdelazim",
        url: "https://github.com/moabdelazem/pulse",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "/api",
        description: "API server",
      },
    ],
    tags: [
      { name: "Projects", description: "Project management endpoints" },
      { name: "Tasks", description: "Task management endpoints" },
      { name: "Health", description: "Health check endpoints" },
    ],
    components: {
      schemas: {
        Project: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Project ID" },
            name: { type: "string", description: "Project name" },
            description: { type: "string", description: "Project description", nullable: true },
            repoUrl: { type: "string", description: "Repository URL", nullable: true },
            createdAt: { type: "string", format: "date-time", description: "Creation timestamp" },
            updatedAt: { type: "string", format: "date-time", description: "Last update timestamp" },
          },
        },
        CreateProject: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", minLength: 1, maxLength: 255, description: "Project name" },
            description: { type: "string", maxLength: 1000, description: "Project description" },
            repoUrl: { type: "string", format: "uri", description: "Repository URL" },
          },
        },
        UpdateProject: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 1, maxLength: 255, description: "Project name" },
            description: { type: "string", maxLength: 1000, description: "Project description" },
            repoUrl: { type: "string", format: "uri", description: "Repository URL" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Task ID" },
            title: { type: "string", description: "Task title" },
            content: { type: "string", description: "Task content", nullable: true },
            status: { type: "string", enum: ["pending", "in_progress", "completed"], description: "Task status" },
            projectId: { type: "integer", description: "Parent project ID" },
            createdAt: { type: "string", format: "date-time", description: "Creation timestamp" },
            updatedAt: { type: "string", format: "date-time", description: "Last update timestamp" },
          },
        },
        CreateTask: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", minLength: 1, maxLength: 255, description: "Task title" },
            content: { type: "string", maxLength: 5000, description: "Task content" },
            status: { type: "string", enum: ["pending", "in_progress", "completed"], description: "Task status" },
          },
        },
        UpdateTask: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 1, maxLength: 255, description: "Task title" },
            content: { type: "string", maxLength: 5000, description: "Task content" },
            status: { type: "string", enum: ["pending", "in_progress", "completed"], description: "Task status" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/app.ts"],
};

export const openApiSpec = swaggerJsdoc(options);


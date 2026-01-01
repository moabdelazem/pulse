# Pulse API

Pulse is a project and task management API designed for applying DevOps and SRE workflows. It provides a RESTful interface for managing projects and tasks, with built-in support for task status tracking, due dates, and repository URL tracking.

## Features

- Project management with repository URL tracking
- Task management with status workflow (todo, in_progress, completed, backlog)
- Production-ready structured JSON logging with Pino
- Request validation using Zod schemas
- Health check endpoint with database connectivity verification
- Graceful shutdown handling
- PostgreSQL database with Drizzle ORM

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | TypeScript |
| Database | PostgreSQL 16 |
| ORM | Drizzle ORM |
| Validation | Zod + drizzle-zod |
| Logging | Pino |

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start PostgreSQL
docker-compose up -d

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3333 |
| NODE_ENV | Environment (development/production) | development |
| DATABASE_URL | PostgreSQL connection string | - |
| LOG_LEVEL | Logging level (fatal/error/warn/info/debug/trace) | info |

## API Reference

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Returns API and database health status |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | List all projects |
| GET | /api/projects/:id | Get project by ID |
| POST | /api/projects | Create a new project |
| PUT | /api/projects/:id | Update a project |
| DELETE | /api/projects/:id | Delete a project |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects/:projectId/tasks | List all tasks for a project |
| POST | /api/projects/:projectId/tasks | Create a task for a project |
| GET | /api/tasks/:id | Get task by ID |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Project Structure

```
src/
├── config/          # Application configuration
├── controllers/     # Route handlers
├── db/              # Database schema and connection
├── middlewares/     # Express middlewares
├── routes/          # API route definitions
├── utils/           # Utility modules (logger)
├── app.ts           # Express application setup
└── server.ts        # Server entry point
```

## Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Start development server with hot reload |
| npm run build | Compile TypeScript to JavaScript |
| npm run start | Start production server |
| npm run lint | Run ESLint |
| npm run db:generate | Generate database migrations |
| npm run db:migrate | Apply migrations |
| npm run db:push | Push schema directly to database |
| npm run db:studio | Open Drizzle Studio |

## Completed Tasks

- [x] Project scaffolding with Express and TypeScript
- [x] PostgreSQL setup with Docker Compose
- [x] Drizzle ORM integration with schema definition
- [x] REST API endpoints for projects and tasks
- [x] Request validation with drizzle-zod
- [x] Production structured logging with Pino
- [x] HTTP request logging middleware
- [x] Health check with database ping
- [x] Graceful shutdown handling
- [x] 404 error handling
- [x] Global error handler middleware
- [x] Docker containerization for the API

## Roadmap

- [ ] Authentication and authorization (JWT)
- [ ] Rate limiting
- [ ] API versioning
- [ ] Pagination for list endpoints
- [ ] Filtering and sorting
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and integration tests
- [ ] CI/CD pipeline With Jenkins
- [ ] Prometheus metrics endpoint

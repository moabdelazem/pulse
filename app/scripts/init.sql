-- Create status enum type
CREATE TYPE status AS ENUM ('todo', 'in_progress', 'completed', 'backlog');

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    repo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status status DEFAULT 'todo' NOT NULL,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert sample projects
INSERT INTO projects (name, description, repo_url) VALUES
('Pulse API', 'Main backend API for the Pulse application', 'https://github.com/moabdelazem/pulse'),
('Infrastructure', 'Kubernetes and Terraform configurations', 'https://github.com/moabdelazem/infra'),
('Monitoring Stack', 'Prometheus and Grafana dashboards setup', 'https://github.com/moabdelazem/monitoring'),
('CI/CD Pipeline', 'Jenkins and ArgoCD automation', NULL);

-- Insert sample tasks for Pulse API (project_id = 1)
INSERT INTO tasks (project_id, title, content, status, due_date) VALUES
(1, 'Setup Drizzle ORM', 'Configure Drizzle with PostgreSQL', 'completed', NULL),
(1, 'Create REST API endpoints', 'Implement CRUD for projects and tasks', 'completed', NULL),
(1, 'Add authentication', 'Implement JWT authentication', 'todo', '2025-01-15'),
(1, 'Write API tests', 'Unit and integration tests with Jest', 'backlog', NULL);

-- Insert sample tasks for Infrastructure (project_id = 2)
INSERT INTO tasks (project_id, title, content, status, due_date) VALUES
(2, 'Setup Kubernetes cluster', 'Deploy k3s on local VMs', 'in_progress', '2025-01-10'),
(2, 'Create Helm charts', 'Package applications with Helm', 'todo', '2025-01-20'),
(2, 'Setup Terraform modules', 'AWS and GCP infrastructure', 'backlog', NULL);

-- Insert sample tasks for Monitoring Stack (project_id = 3)
INSERT INTO tasks (project_id, title, content, status, due_date) VALUES
(3, 'Install Prometheus', 'Deploy Prometheus with node exporters', 'completed', NULL),
(3, 'Create Grafana dashboards', 'CPU, memory, and network monitoring', 'in_progress', '2025-01-05'),
(3, 'Setup alerting rules', 'Configure AlertManager with Slack', 'todo', '2025-01-12');

-- Insert sample tasks for CI/CD Pipeline (project_id = 4)
INSERT INTO tasks (project_id, title, content, status, due_date) VALUES
(4, 'Configure Jenkins', 'Setup Jenkins with Docker agents', 'todo', '2025-01-08'),
(4, 'Setup ArgoCD', 'GitOps deployment with ArgoCD', 'backlog', NULL);

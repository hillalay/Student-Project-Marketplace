# Student Project Marketplace

This project is a React frontend with a Node.js + Express backend and PostgreSQL database.

## How to Run with Docker

1. Start the database containers:

```powershell
docker compose up -d
```

2. Open a terminal in the backend folder and install backend packages:

```powershell
cd backend
npm install
```

3. Start the backend server:

```powershell
npm run dev
```

4. Open these URLs in your browser:

```text
http://localhost:5000
http://localhost:5000/api/test-db
http://localhost:5050
```

5. Use these pgAdmin login details:

- Email: admin@example.com
- Password: admin123

6. In pgAdmin, create or register a server with these connection settings:

- Host: db
- Port: 5432
- Username: postgres
- Password: postgres123
- Database: student_project_marketplace

## What I Changed

- Added `docker-compose.yml` so PostgreSQL and pgAdmin can run in Docker.
- Added `database/init.sql` so the database tables and default categories are created automatically.
- Added `backend/.env` and updated `backend/.env.example` so the backend knows how to connect to PostgreSQL.
- Updated `backend/src/config/db.js` to create a PostgreSQL connection pool with the `pg` package.
- Updated `backend/src/server.js` to add the `/api/test-db` endpoint.
- Updated `.gitignore` to keep local environment files and temporary Docker-related files out of Git.

## Beginner Note

- `docker-compose.yml` tells Docker which containers to run.
- `database/init.sql` runs once when PostgreSQL starts for the first time and creates your tables.
- `backend/.env` stores local backend settings like the database password.
- `backend/src/config/db.js` is the place where the backend connects to PostgreSQL.
- `backend/src/server.js` starts the API server and exposes the test routes.

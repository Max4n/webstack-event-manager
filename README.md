# Event Manager
## FullStack Event-Manager App

This app was created as part of a coursework for CS22002 - Modern Web Stack Development.

### Project Structure: 

Frontend. We have used React.js as main library to dynamically handle live CRUD operations from the user. Also, it allows the Admin to edit events without the page flickering or reloading, and it handles the JWT (JSON Web Token) storage in the browser's local memory for persistent sessions.

Backend. We have used Flask, it was chosen for its lightweight efficiency. It acts as a REST API that validates incoming data, enforces "Admin-Only" permissions using JWT middleware, and communicates with the database

Database. PostgreSQL ensures Referential Integrity. This means it won't let an admin delete a venue if there is still an event scheduled there, preventing "ghost" data and keeping your event records accurate.

### App structure: 

App is split into admin and client pages. Admin page handles most of CRUD operations, allowing user to create, edit, delete and view events, where functionality of client page is limited and allows user only to see events created by admin. 

### Setup: 

Before you begin, ensure you have the following installed:
- *Python 3.10+*
- *Node.js & npm*
- *PostgreSQL*

### 1. Database Setup
1. Open your PostgreSQL terminal (or SQLTools).
2. Create a database: `CREATE DATABASE event_manager_db;`
3. Execute the queries located in `/db/schema.sql` to create tables and insert dummy data.

### 2. Backend Configuration
1. Navigate to the backend folder: `cd backend`
2. Create a virtual environment: `python -m venv .venv`
3. Activate it:
   - Windows: `.venv\Scripts\activate`
   - Mac/Linux: `source .venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file and add:
   ```env
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/event_manager_db
   JWT_SECRET_KEY=your_32_character_long_secret_key

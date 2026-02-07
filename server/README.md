# Todo PWA with Real Database Backend

This is a Progressive Web App (PWA) Todo list that now connects to a real SQLite3 database backend.

## Setup & Installation

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start the Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run at `http://localhost:3000`

### 3. Open the PWA
Open `index.html` in your browser (you can use a local server or just open the file directly)

## Architecture

### Backend (`server/`)
- **server.js** - Express REST API server
- **database.js** - SQLite3 database initialization
- **package.json** - Backend dependencies
- **todos.db** - Real SQLite3 database file (created automatically)

### Frontend (`/`)
- **index.html** - Main UI
- **app.js** - Todo app logic (now uses backend API)
- **server/api.js** - API client for communicating with backend

## API Endpoints

### GET /api/todos
Get all todos from the database
```javascript
GET /api/todos
Response: [{ id, text, completed, createdAt }, ...]
```

### POST /api/todos
Create a new todo
```javascript
POST /api/todos
Body: { text: "Task description" }
Response: { id, text, completed, createdAt }
```

### PUT /api/todos/:id
Update a todo (text and/or completion status)
```javascript
PUT /api/todos/:id
Body: { text: "New text", completed: true }
Response: { id, text, completed }
```

### DELETE /api/todos/:id
Delete a todo
```javascript
DELETE /api/todos/:id
Response: { message: "Todo deleted", id }
```

## Data Persistence

All data is now saved in a real **SQLite3 database** (`todos.db`) on your server's filesystem. This means:

✅ Data persists across server restarts  
✅ Multiple clients can access the same data  
✅ No reliance on browser storage  
✅ Can easily migrate to other databases (PostgreSQL, MySQL, etc.)

## Features

- ✅ Add, edit, delete todos
- ✅ Toggle completion status
- ✅ Persistent database storage
- ✅ Real-time sync with backend
- ✅ PWA support
- ✅ Responsive design

## Future Enhancements

- User authentication
- Multi-user sync
- Cloud deployment
- Database migration to PostgreSQL
- Real-time updates with WebSockets

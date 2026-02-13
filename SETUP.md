# Flask + MySQL Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Ensure MySQL is Running
Make sure MySQL server is installed and running on `localhost` with:
- User: `root`
- Password: (empty) - change in `server.py` and `init_db.py` if needed

### 3. Initialize Database
```bash
python init_db.py
```
This creates the `todo_db` database and `todos` table.

### 4. Start Flask Server
```bash
python server.py
```
Server runs at `http://localhost:5000`

### 5. Open Your App
Open `index.html` in your browser. It will automatically connect to the API.

---

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Add new todo (body: `{"text": "..."`)
- `PATCH /api/todos/<id>` - Update todo (body: `{"completed": true}` or `{"text": "..."}`)
- `DELETE /api/todos/<id>` - Delete todo

---

## Database Credentials

If you want to change the MySQL password:
1. Edit `db_config` in `server.py`
2. Edit `db_config` in `init_db.py`
3. Re-run `init_db.py`

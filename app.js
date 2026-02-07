class TodoApp {
    constructor() {
        Object.assign(this, {
            input: document.getElementById("todoInput"),
            btn: document.getElementById("addBtn"),
            list: document.getElementById("todoList"),
            count: document.getElementById("todoCount"),
            todos: [],
            db: null,
            editId: null,
            dbReady: false
        });
        this.initDB();
    }

    async initDB() {
        const SQL = await initSqlJs({
            locateFile: file => `https://sql.js.org/dist/${file}`
        });
        const data = localStorage.getItem("todoDb");
        if (data) {
            this.db = new SQL.Database(new Uint8Array(data.split(",").map(Number)));
        } else {
            this.db = new SQL.Database();
            this.db.run(`CREATE TABLE todos (
                id INTEGER PRIMARY KEY,
                text TEXT NOT NULL,
                completed INTEGER DEFAULT 0
            )`);
        }
        this.loadTodos();
        this.dbReady = true;
        this.init();
    }

    loadTodos() {  //View
        const result = this.db.exec("SELECT * FROM todos");
        this.todos = result.length ? result[0].values.map(row => ({
            id: row[0],
            text: row[1],
            completed: Boolean(row[2])
        })) : [];
    }

    saveDB() {
        const data = this.db.export();
        const arr = Array.from(data);
        localStorage.setItem("todoDb", arr.toString());
    }

    init() {
        this.btn.onclick = () => this.add();
        this.input.addEventListener("keypress", e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), this.add()));
        this.render();
    }

    add() {
        const text = this.input.value.trim();
        if (!text) return alert("Please enter a task.");
        const id = Date.now();
        this.db.run("INSERT INTO todos (id, text, completed) VALUES (?, ?, 0)", [id, text]);
        this.saveDB();
        this.loadTodos();
        this.render();
        this.input.value = "";
    }

    del(id) {
        this.db.run("DELETE FROM todos WHERE id = ?", [id]);
        this.saveDB();
        this.loadTodos();
        this.render();
    }

    toggle(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.db.run("UPDATE todos SET completed = ? WHERE id = ?", [!todo.completed ? 1 : 0, id]);
            this.saveDB();
            this.loadTodos();
            this.render();
        }
    }

    edit(id) {
        this.editId = id;
        this.render();
        setTimeout(() => document.getElementById(`edit-${id}`)?.focus(), 0);
    }

    saveEdit(id) {
        const ta = document.getElementById(`edit-${id}`);
        const text = ta?.value.trim();
        if (!text) return alert("Task text cannot be empty.");
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.db.run("UPDATE todos SET text = ? WHERE id = ?", [text, id]);
            this.saveDB();
            this.loadTodos();
            this.editId = null;
            this.render();
        }
    }

    escape(s) {
        const d = document.createElement("div");
        return d.textContent = s, d.innerHTML;
    }

    render() {
        this.list.innerHTML = this.todos.map(t => 
            this.editId === t.id 
                ? `<li class="list-group-item">
                    <textarea id="edit-${t.id}" class="form-control mb-2" rows="2">${this.escape(t.text)}</textarea>
                    <div class="btn-group w-100">
                        <button class="btn btn-sm btn-success flex-grow-1" onclick="app.saveEdit(${t.id})">Save</button>
                        <button class="btn btn-sm btn-secondary flex-grow-1" onclick="app.editId=null,app.render()">Cancel</button>
                    </div>
                </li>`
                : 
                    `<li class="list-group-item d-flex gap-2 align-items-start">
                        <input type="checkbox" class="form-check-input mt-1" ${t.completed ? "checked" : ""} onchange="app.toggle(${t.id})">
                        <span class="flex-grow-1 ${t.completed ? "text-decoration-line-through text-muted" : ""}">${this.escape(t.text)}</span>
                        <button class="btn btn-sm btn-info" onclick="app.edit(${t.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="app.del(${t.id})">Delete</button>
                    </li>`

        ).join("") || '<li class="list-group-item text-center text-muted">No tasks yet</li>';
        this.count.textContent = this.todos.length;
    }
}

let app;
document.addEventListener("DOMContentLoaded", () => app = new TodoApp());
"serviceWorker" in navigator && window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));

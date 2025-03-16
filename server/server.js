const express = require('express');
const mysql = require('mysql2/promise');
const cors = require("cors");

const app = express();
const PORT = 3001;
const ENABLE_LAG = false;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: "true"
}))

// Add a random delay on every request
if (ENABLE_LAG) {
    console.log('LAG IS ENABLE')
    app.use((req, res, next) => {
        const delayTime = Math.random() * (1.5 - 0.5) + 0.5;
        setTimeout(next, delayTime * 1000);
    })
}

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const { title, completed } = req.body;
    try {
        await pool.execute('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, completed]);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update task completion status
app.patch('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        await pool.execute('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id]);
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
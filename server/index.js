const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const cors = require('cors');
const pool = require('./db')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;


// MIDDLEWARE
app.use(cors());
app.use(express.json());  // req.body


// ROUTES 

// create a todo
app.post('/todos', async(req, res) => {
    try {
        // console.log(req.body)
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

        // res.json(newTodo);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);    
    }
})


// get all todos
app.get('/todos', async(req, res) => {
    try {
        const getTodos = await pool.query("SELECT * FROM todo");
        res.json(getTodos.rows);
    } catch (err) {
        console.error(err.message); 
    }
})


// get a todo
app.get('/todos/:id', async(req, res) => {
    try {
        // console.log(req.params);

        const { id } = req.params;

        const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(getTodo.rows);
        
    } catch (err) {
        console.error(err.message); 
    }
})


// update a todo
app.patch('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]);
            res.json("Todo was updated successfully")
            //res.json(updateTodo.rows);
            // res.status(200).json({
            //     status: 'success',
            //     data: {
            //         description,
            //         updateTodo
            //     }
            // })
    } catch (err) {
        console.error(err.message); 
    }
})


// delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json('Todo Deleted')

    } catch (err) {
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})
import express from 'express';
import db from './db/db';
import bodyParser from "body-parser";

// set up express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ========== GET all todos ==========
app.get('/api/v1/todos', (request, response) => {
    response.status(200).send({
        success: "true",
        message: "todos retrieved successfully",
        todos: db
    })
});

// ========== GET a single item ==========
app.get("/api/v1/todos/:id", (request, response) => {
    const id = parseInt(request.params.id, 10);
    db.map((todo) => {
        if (todo.id === id) {
            return response.status(200).send({
                success: "true",
                message: "todo retrieved successfully",
                todo,
            });
        }
    });
    return response.status(404).send({
        success: "false",
        message: "todo does not exist",
    });
});

// ========== Create a single todo and POST ==========
app.post("/api/v1/todos", (request, response) => {
    if (!request.body.title) { 
        // code 400 = Bad Request. generic client-side error status.
        return response.status(400).send({
            success: "false",
            message: "title is required"
        });
    } else if(!request.body.description) {
        return response.status(400).send({
            success: "false",
            message: "description is required"
        });
    }
    const todo = {
        id: db.length + 1,
        title: request.body.title,
        description: request.body.description
    }
    db.push(todo);
    return response.status(201).send({
        success: "true",
        message: "todo added auccessfully",
        todo
    })
});

// ========== DELETE todos from db ==========
app.delete("/api/v1/todos/:id", (request, response) => {
    const id = parseInt(request.params.id, 10);
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return response.status(200).send({
                success: "true",
                message: "Todo deleted successfully" 
            });
        }
    });
    return response.status(404).send({
        success: "false",
        message: "todo not found",
    });
});

// ========== update (PUT) todos ==========
app.put("/api/v1/todos/:id", (request, response) => {
    const id = parseInt(request.params.id, 10);
    let todoFound;
    let itemIndex;
    // find item by index
    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
        }
    })

    if (!todoFound) {
        return response.status(404).send({
            success: "false",
            message: "todo not found"
        });
    }

    if (!request.body.title) {
        return response.status(400).send({
            success: "false",
            message: "title is required",
        });
    } else if (!request.body.description) {
        return response.status(400).send({
            success: "false",
            message: "description is required"
        });
    }

    const updatedTodo = {
        id: todoFound.id,
        title: request.body.title || todoFound.title,
        description: request.body.description || todoFound.description
    };

    // remove old item, replace with updated item
    db.splice(itemIndex, 1, updatedTodo);

    return response.status(201).send({
        success: "true",
        message: "todo added successfully",
        updatedTodo
    })
});


// start local server with with $node_modules/.bin/babel-node app.js
const PORT = 5000;
app.listen(PORT, () => {
    console.log("server running on port ", PORT)
});

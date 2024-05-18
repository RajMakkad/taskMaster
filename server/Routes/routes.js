const express = require("express");
const router = express.Router();
const { table, user } = require("../Database/database");
const { verifyJWT } = require("../Middlewares/authorization");


// Create a todo.
router.post("/createTodo", verifyJWT, async (req, res) => {
    try {
        const { task, priority, time, status } = req.body;
        const username = req.username;
        console.log(username);
        const exists = await table.findOne({ task, priority });
        if (exists) {
            return res.status(409).json({ message: "This task is already present" });
        }
        const userObj = await user.findOne({ username }); 
        if (!userObj) {
            return res.status(404).json({ message: "The user does not exist." });
        }
        let newtodo = new table({ author: userObj, task, priority, time: Number(time), status });
        newtodo.save() 
            .then((todo) => {
                todo.author.password = undefined; // This wont show up at the front-end.
                return res.status(200).json({ todo, message: "New task added to the system." })
            })
            .catch(error => res.status(500).json({ message: "Failed to add the new task to the system." })); // Corrected status code
    } catch (err) {
        res.status(500).json({
            message: "Some Error",
            error: err
        });
    }
});

// path parameter
// uri = http://localhost:port/api/deleteTodo/xyz
// id => xyz
// Delete a todo.
router.delete("/deleteTodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const exists = await table.findOne({ _id: id });
        if (!exists) {
            alert("ID does not exist")
            return res.status(404).end({ message: "This task is does not exist" });
        }

        table.deleteOne({ _id: id })
            .then(() => res.status(200).json({ message: "Deleted the task." }))
            .catch(err => res.status(400).json({ message: "Failed to delete the task." }))
    } catch (err) {
        res.status(500).json({
            message: "Some Error",
            error: err
        })
    }
});

// Update a todo.
router.put("/updateTodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { task, priority, time, status } = req.body;

        const todo = await table.findOneAndUpdate(
            { _id: id },
            { task, priority, time, status },
            { new: true } // Returns the updated document
        );

        if (!todo) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json({ todo, message: "Todo updated successfully." });
    } catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Read all the todos.
router.get("/getAllTodos", async (req, res) => {
    try {
        const todo = await table.find({});
        res.status(200).json({
            todo,
            message: "All the todos"
        })
    } catch (err) {
        res.status(500).json({
            message: "Some Error",
            error: err
        })
    }
})

module.exports = {
    taskRouter: router
}
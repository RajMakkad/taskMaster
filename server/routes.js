const express = require("express");
const router = express.Router();
const table = require("./database");

// Create a todo.
router.post("/todo", async (req, res) => {
    const { todo, priority, time } = req.body;
    const exists = await table.findOne({ todo, priority });
    if (exists) {
        alert("This task is already present")
        return res.status(404).end({ message: "This task is already present" });
    }
    const newtodo = new table({ todo, priority, time });
    newtodo.save()
    .then(() => res.status(200).json({todo:[todo, priority, time], message: "New task added to the system."}))
    .catch(error => res.send(300).json({message: "Failed to add the new task to the system."}))
});

// path parameter
// uri = http://localhost:port/api/todo/xyz
// id => xyz
// Delete a todo.
router.delete("/todo/:id", async (req, res) => {
    const {id} = req.params;
    const exists = await table.findOne({ _id:id });
    if (!exists) {
        alert("ID does not exist")
        return res.status(404).end({ message: "This task is does not exist" });
    }

    table.deleteOne({_id:id})
    .then(() => res.status(200).json({message: "Deleted the task."}))
    .catch(err => res.status(400).json({message: "Failed to delete the task."}))
});

// Update a todo.
router.put("/todo/:id", async (req, res) => {
    const {id} = req.params;
    const exists = await table.findOne({_id:id});
    if(!exists){
        alert("ID does not exist")
        return res.status(404).end({ message: "This task is does not exist" });
    }

    const {todo, pritoriy, time, completed} = req.body;
    exists = await table.findOne({todo, pritoriy});
    if(exists){
        return res.status(200).json({message: "A similar entry is already present."})
    }

    table.findByIdAndUpdate(id, {todo, pritoriy, time, completed}, (err, todo) => {
        if(err){
            return res.status(300).json({message: "Failed to update an todo."})
        }
        console.log("updated a todo.")
        res.status(200).json({
            todo,
            message: "Updated the todo."
        })
    })
})

// Read all the todos.
router.get("/todos", async (req, res) => {
    const todo = await table.find({});
    res.status(200).json({
        todo,
        message: "All the todos"
    })
})

module.exports = {
    router
}
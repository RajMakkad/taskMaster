import { useState, useEffect } from "react"
import './App.css'

export default function App() {
    const [todos, updateTodos] = useState([]);

    const [newTask, updateTask] = useState({
        task: "",
        priority: 0,
        time: 0,
        status: false
    });

    const CreateNewTask = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/todo", {
            method: "POST",
            body: JSON.stringify({
                task: newTask.task,
                priority: newTask.priority,
                time: newTask.time,
                status: newTask.status
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const resp = await response.json();
        console.log(resp);
        updateTodos([
            ...todos,
            resp.todo
        ]);
        console.log(todos);
        updateTask({
            task: "",
            priority: 0,
            time: 0,
            status: false
        });
        console.log(newTask);
    }


    // useEffect works as, whenever a option changes inside of the passed array ([option1, option2]) then the passed function will be executed.
    // When nothing is passed ([]) then the function will run only once at the time of mount, because nothing changes inside an empty array.
    useEffect(() => {
        const getTodos = async () => {
            const resp = await fetch("http://localhost:5000/api/todos");
            const todos = await resp.json();
            console.log(todos)
            updateTodos(todos.todo);
        }
        getTodos();
    }, []);
    return <main className='container'>
        <h1 className="title">taskMaster</h1>
        <form action="" className="form" onSubmit={CreateNewTask}>
            <input
                type="text"
                name="taskInput"
                id="taskInput" value={newTask.task}
                placeholder="Enter a new task"
                className="form_task"
                required
                onChange={
                    e => updateTask({
                        ...newTask,
                        task: e.target.value
                    })
                }
            />
            <input 
                type="text" 
                name="priorityInput" 
                id="priorityInput" 
                value={newTask.priority} 
                placeholder="Enter priority of the new task" 
                className="form_priority"
                required 
                onChange={
                e => updateTask({
                    ...newTask,
                    priority: e.target.value
                })}
            />
            <input 
                type="text" 
                name="timeInput" 
                id="priorityInput" 
                value={newTask.time} 
                placeholder="Enter time required to complete the new task"
                className="form_time" 
                required 
                onChange={
                e => updateTask({
                    ...newTask,
                    time: e.target.value
                })}
            />
            <button type="submit">Create</button>
        </form>
        <div className="todos">
            {
                todos.length > 0 &&
                todos.map((t) => {
                    return <div key={t._id} className="todo">
                        <p>{t.task}</p>
                        <p>{t.priority}</p>
                        <p>{t.time}</p>
                        <button className="todo_status">{t.status ? "☑" : "☐"}</button>
                    </div>
                })
            }
        </div>
    </main>
}
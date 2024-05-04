import { useState, useEffect } from "react"
import './App.css'

export default function App() {
    const [todos, updateTodo] = useState({
        todo: [],
        message: ""
    });



    // useEffect works as, whenever a option changes inside of the passed array ([option1, option2]) then the passed function will be executed.
    // When nothing is passed ([]) then the function will run only once at the time of mount, because nothing changes inside an empty array.
    useEffect(() => {
        const getTodos = async () => {
            const resp = await fetch("http://localhost:5000/api/todos");
            const todos = await resp.json();
            console.log(todos)
            updateTodo(todos);
        }
        getTodos();
    }, []);
    const { todo, message } = todos;
    return <main className='container'>
        <h1 className="title">taskMaster</h1>
        <div className="todos">
            {
                todo.length > 0 &&
                todo.map((e) => {
                    return <div key={e._id} className="todo">
                        <p>{e.todo}</p>
                        <p>{e.priority}</p>
                        <p>{e.time}</p>
                        <button className="todo__status">{e.status?"☑":"☐"}</button>
                    </div>
                })
            }
        </div>
        {message && <h2>{message}</h2>}
    </main>
}
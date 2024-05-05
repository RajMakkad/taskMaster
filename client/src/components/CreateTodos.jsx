import { useState, useEffect } from "react"

export default function CreateTodos() {
    const [todos, setTodos] = useState([]);

    const [newTask, setNewTask] = useState({
        task: "",
        priority: "Low",
        time: "",
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
        // console.log(resp);
        setTodos([
            ...todos,
            resp.todo
        ]);
        console.log(todos);
        setNewTask({
            task: "",
            priority: "",
            time: "",
            status: false
        });
        console.log(newTask);
    }

    // useEffect works as, whenever a option changes inside of the passed array ([option1, option2]) then the passed function will be executed.
    // When nothing is passed ([]) then the function will run only once at the time of mount, because nothing changes inside an empty array.
    // useEffect(() => {
        // const getTodos = async () => {
        //     const resp = await fetch("http://localhost:5000/api/todos");
        //     const todos = await resp.json();
        //     // console.log(todos)
        //     setTodos(todos.todo);
        // }
        // getTodos();
    // }, []);
    return <main className='flex justify-center items-center flex-col'>
        <div className="h-16"></div>
        <h1 className="text-5xl font-semibold pb-5">TaskMaster</h1>
        <form action="" className="flex w-3/5 justify-around" onSubmit={CreateNewTask}>

            <div className="flex flex-col w-full">
                <label htmlFor="taskInput" className="ml-3">Task</label>
                <input
                    type="text"
                    name="taskInput"
                    id="taskInput" value={newTask.task}
                    placeholder="Enter a new task"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-ellipsis p-2 m-2"
                    required
                    onChange={
                        e => setNewTask({
                            ...newTask,
                            task: e.target.value
                        })
                    }
                />
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="priorityInput" className="ml-3">Priority</label>
                <select id="priorityInput"
                    required
                    value={newTask.priority}
                    onChange={
                        e => setNewTask({
                            ...newTask,
                            priority: e.target.value
                        })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 m-2">
                    <option defaultChecked disabled>Set Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="timeInput" className="ml-3">Time</label>
                <input
                    type="text"
                    name="timeInput"
                    id="timeInput"
                    value={newTask.time}
                    placeholder="Time To Complete (in hrs)"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-ellipsis p-2 m-2"
                    required
                    onChange={
                        e => setNewTask({
                            ...newTask,
                            time: e.target.value
                        })}
                />
            </div>

            <button className="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center h-fit self-end mb-2.5" type="submit">Create</button>
        </form>
        {/* <div className="flex flex-col">
            {
                todos.length > 0 &&
                todos.map((t) => {
                    return <div key={t._id} className="flex flex-row">
                        <p>{t.task}</p>
                        <p>{t.priority}</p>
                        <p>{t.time}</p>
                        <button className="todo_status">{t.status ? "☑" : "☐"}</button>
                    </div>
                })
            }
        </div> */}
    </main>
}
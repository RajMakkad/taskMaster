import { useState } from "react"
import { api } from "../utils/Api"
import axios from "axios"

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
        const response = await axios.post(`${api.create}`, {
            task: newTask.task,
            priority: newTask.priority,
            time: newTask.time,
            status: newTask.status
        });

        const resp = response.data;
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

    return <main className='flex justify-center items-center flex-col'>
        <div className="h-12"></div>
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
    </main>
}
import { useState } from "react"
import { api } from "../utils/Api"
import axios from "axios"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

export default function CreateTodos() {
    const [newTask, setNewTask] = useState({
        task: "",
        priority: "Low",
        time: 1,
        status: false
    });
    const navigate = useNavigate();
    const [cookies] = useCookies();

    const CreateNewTask = async (e) => {
        e.preventDefault();
        try {
            const token = cookies.token;
            const response = await axios.post(`${api.create}`, {
                task: newTask.task,
                priority: newTask.priority,
                time: newTask.time,
                status: newTask.status
            },
                {
                    headers: {
                        token
                    }
                }
            );
            if (response.status == 200) {
                const resp = response.data;
                setNewTask({
                    task: "",
                    priority: "Low",
                    time: 1,
                    status: false
                });
                alert("Task is Created. Please Check Total Task")
            }
        } catch (err) {
            console.log(err);
            if (err?.response?.data?.message == "This task is already present") {
                alert(err?.response?.data?.message)
            } else {
                navigate('/error', { state: { errorMessage: `${err?.response ? err?.response?.data?.message : err?.message}` } });
            }
        }

    }

    const timeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <>
            <main className='flex justify-center items-center flex-col'>
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
                        <select
                            name="timeInput"
                            id="timeInput"
                            value={newTask.time}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-ellipsis p-2 m-2"
                            required
                            onChange={e => setNewTask({
                                ...newTask,
                                time: e.target.value
                            })}
                        >
                            <option defaultChecked disabled>Set Time (Hours)</option>
                            {timeArray.map((time, index) => <option key={index} value={time}>{time}</option>)}
                        </select>
                    </div>
                    <button className="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center h-fit self-end mb-2.5" type="submit">Create</button>
                </form>
            </main>
        </>
    )
}
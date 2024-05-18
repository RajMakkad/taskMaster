import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/Api";
import { parseTasks } from "../utils/Taskutils";

// default rule: 0
// 0: "All the tasks without any filtering",
// 1: "All the incomplete tasks",
// 2: "All the completed tasks",
// 3: "All the incomplete task sort by priority",
// 4: "All the incomplete task sort by time"

export default function ShowTodos() {
    const [todos, setTodos] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const useEffectOnce = useRef(false);

    const { state } = useLocation();
    let rule = 0;
    if (state.rule) {
        rule = state.rule;
    }

    const getTodos = async () => {
        const response = await axios.get(`${api.list}`);
        const fetchedTodos = response.data.todo;
        const parsedTodos = parseTasks[rule](fetchedTodos);
        setTodos(parsedTodos);
    }

    const deleteTask = async (id) => {
        const response = await axios.delete(`${api.delete}/${id}`)
        if (response.status == 200) {
            setTaskToDelete(null);
            setShowDeleteConfirmation(false);
            return getTodos();
        }
        alert("Unable to delete the task because of some backend error");
    };

    const deleteConfirmation = (id) => {
        setTaskToDelete(id);
        setShowDeleteConfirmation((prevVal) => {
            return !prevVal
        });
        if(id === -1){
            setTaskToDelete(null);
        }
    }

    const markTask = async (todo) => {
        try {
            const { task, priority, time, status, _id } = todo;
            const response = await axios.put(`${api.update}/${_id}`, {
                task,
                priority,
                time,
                status: !status,
            });
            if (response.status == 200) {
                return getTodos();
            } else {
                throw new Error("Failed to update task");
            }
        } catch (error) {
            console.error("Error marking task as done:", error);
            alert("Unable to mark the task as done due to a server error");
        }
    };

    // useEffect works as, whenever a option changes inside of the passed array ([option1, option2]) then the passed function will be executed.
    // When nothing is passed ([]) then the function will run only once at the time of mount, because nothing changes inside an empty array.
    useEffect(() => {
        if (useEffectOnce.current == false) {
            getTodos();
            return () => { useEffectOnce.current = true }
        }
    }, []);

    return (
        <>
            <div className="w-1/2 mx-auto relative">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Task
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Priority
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Time
                            </th>
                            <th scope="col" className="px-2 py-3 text-center">
                                Mark as completed
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos?.length > 0 &&
                            todos.map((todo) => {
                                return (
                                    <tr key={todo._id} className="bg-white border-b hover:bg-gray-100">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {todo.task}
                                        </th>
                                        <td className="px-6 py-4 text-center">
                                            {todo.priority}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {todo.time}
                                        </td>
                                        <td className="px-2 py-4  cursor-pointer hover:bg-gray-200 text-center" onClick={(e) => markTask(todo)} >
                                            {todo.status ? "☑" : "☐"}
                                        </td>
                                        <td className="px-6 py-4  cursor-pointer hover:bg-gray-200 text-center" onClick={(e) => deleteConfirmation(todo._id)} >
                                            ❌
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {showDeleteConfirmation &&
                (<div id="deleteModal" aria-hidden="true" className="flex shadow-2xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path></svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this Task?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button onClick={() => deleteConfirmation(-1)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    No, cancel
                                </button>
                                <button onClick={() => deleteTask(taskToDelete)} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}
import { useEffect, useRef, useState } from "react";
import axios from "axios"
import { api } from "../utils/Api"

export default function ShowTodos() {
    const [todos, setTodos] = useState([]);
    const useEffectOnce = useRef(false);

    const getTodos = async () => {
        const response = await axios.get(`${api.list}`);
        const fetchedTodos = response.data.todo;
        // Use functional update to get the latest state
        setTodos(fetchedTodos);
    }

    const deleteTask = async (e) => {
        console.log(e.target);
        const {id} = e.target;
        const response = await axios.delete(`${api.delete}/${id}`)
        if(response.status == 200){
            return getTodos();
        }
        alert("Unable to delete the task because of some backend error");
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
        <div className="w-1/2 mx-auto relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Task
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Priority
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mark as completed
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos?.length > 0 &&
                        todos.map((todo) => {
                            return (
                                <tr key={todo._id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {todo.task}
                                    </th>
                                    <td className="px-6 py-4">
                                        {todo.priority}
                                    </td>
                                    <td className="px-6 py-4">
                                        {todo.time}
                                    </td>
                                    <td className="px-6 py-4  cursor-pointer ">
                                        {todo.status ? "☑" : "☐"}
                                    </td>
                                    <td className="px-6 py-4  cursor-pointer " onClick={deleteTask} id={todo._id}>
                                        ❌
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
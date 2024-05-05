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

    // useEffect works as, whenever a option changes inside of the passed array ([option1, option2]) then the passed function will be executed.
    // When nothing is passed ([]) then the function will run only once at the time of mount, because nothing changes inside an empty array.
    useEffect(() => {
        if (useEffectOnce.current == false) {
            getTodos();
            return () => { useEffectOnce.current = true }
        }
    }, []);

    return (
        <div className="flex flex-col justify-center">
            {
                todos?.length > 0 &&
                todos.map((t) => {
                    return <div key={t._id} className="flex">
                        <p>{t.task}</p>
                        <p>{t.priority}</p>
                        <p>{t.time}</p>
                        <button className="todo_status">{t.status ? "☑" : "☐"}</button>
                    </div>
                })
            }
        </div>
    )
}
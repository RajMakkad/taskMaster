import { Navigate, Route, Routes } from "react-router-dom";
import CreateTodos from "./CreateTodos";
import ShowTodos from "./ShowTodos";
import Appbar from "./Appbar";


export default function Landing() {
    return (
        <div>
            <Appbar />
            <Routes>
                <Route path="/createTodo" element={<CreateTodos />} />
                <Route path="/showTodo" element={<ShowTodos />} />
                <Route path="/anotherShowTodo" element={<ShowTodos />} />
                {/* default */}
                <Route path="/user/*" element={<Navigate to="/user/createTodo" />} />
            </Routes>
        </div>
    )
}
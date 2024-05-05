import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import CreateTodos from "./components/CreateTodos";
import ShowTodos from "./components/ShowTodos";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Appbar />
                <Routes>
                    <Route path="/" element={<CreateTodos />} />
                    <Route path="/showTodo" element={<ShowTodos />} />
                    <Route path="/anotherShowTodo" element={<ShowTodos />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
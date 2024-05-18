import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/Signin";
import ErrorLogin from "./components/ErrorLogin";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/user/*" element={ <ProtectedRoute Component={Landing}/> } />
                    {/* <Route index path="/user/*" element={<Landing />} /> */}
                    <Route path="/error" element={<ErrorLogin />} />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
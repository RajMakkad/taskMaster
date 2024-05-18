import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie'

export default function SignIn() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const onChangeUserName = (e) => {
        const { value } = e.target;
        setCredentials((prevVal) => ({
            ...prevVal,
            username: value
        }))
    }

    const onChangePassword = (e) => {
        const { value } = e.target;
        setCredentials((prevVal) => ({
            ...prevVal,
            password: value
        }))

    }

    const loginUser = async () => {
        try {
            const user = await axios.post(`${api.signin}`, { username: credentials.username, password: credentials.password });
            if (user.status == 200) {
                const token = user.data.token;
                setCookies("token", token, { path: "/" })
                navigate("/user/createTodo");
            } else {
                removeCookie("token");
                navigate("/error");
            }
        }
        catch (err) {
            navigate('/error', { state: { errorMessage: "SignIn Error" } });
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col bg-gray-400">
                <div className="bg-gray-200 rounded-xl p-10 flex flex-col">
                    <div className="font-bold text-2xl">
                        Enter your Details
                    </div>
                    <div className="flex flex-col pt-3">
                        <label className="text-lg pb-0.5 pl-1 font-medium">User Name</label>
                        <input onChange={onChangeUserName} value={credentials.username} className="pl-2 p-0.5 border-2 border-black rounded-md" type="text" id="userName" />
                    </div>
                    <div className="flex flex-col pt-3 pb-4">
                        <label className="text-lg pb-0.5 pl-1 font-medium">Password</label>
                        <input onChange={onChangePassword} value={credentials.password} className="pl-2 p-0.5 border-2 border-black rounded-md" type="password" id="password" />
                    </div>
                    <button onClick={loginUser} className="px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}
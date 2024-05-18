import { useNavigate } from "react-router-dom"

export default function Appbar() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="w-1/2 mx-auto relative">
                <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
                    <div className="w-full w-auto">
                        <ul className="font-medium py-2 px-5 flex flex-col border border-gray-100 rounded-lg bg-gray-50 shadow-md md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/showTodo', { state: { rule: 0 } });
                                        window.location.reload();
                                    }}>
                                    Total Tasks
                                </a>
                            </li>
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/createTodo')
                                    }}>
                                    Create New Task
                                </a>
                            </li>
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/showTodo', { state: { rule: 1 } });
                                        window.location.reload();
                                    }}>
                                    Incomplete Tasks
                                </a>
                            </li>
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/showTodo', { state: { rule: 2 } });
                                        window.location.reload();
                                    }}>
                                    Completed Tasks
                                </a>
                            </li>
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/showTodo', { state: { rule: 3 } });
                                        window.location.reload();
                                    }}>
                                    Sort by Priority
                                </a>
                            </li>
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/ShowTodo', { state: { rule: 4 } });
                                        window.location.reload();
                                    }}>
                                    Sort by Time
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
            <br />
            <br />
        </>
    )
}
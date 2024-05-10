import { useNavigate } from "react-router-dom"

export default function Appbar() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="w-1/2 mx-auto relative overflow-x-auto">
                <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
                    <div className="hidden w-full md:block md:w-auto">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
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
                                        navigate('/user/showTodo')
                                    }}>
                                    Sort by Priority
                                </a>
                            </li>
                            {/* add link */}
                            <li className="flex-grow">
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/user/anotherShowTodo')
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
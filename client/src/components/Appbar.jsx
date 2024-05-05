import { useNavigate } from "react-router-dom"

export default function Appbar() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="bg-white-400 border-white-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="hidden w-full md:block md:w-auto">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/')
                                    }}>
                                    Create New Task
                                </a>
                            </li>
                            <li>
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/showTodo')
                                    }}>
                                    Sort by Priority
                                </a>
                            </li>
                            <li>
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                    onClick={() => {
                                        navigate('/anotherShowTodo')
                                    }}>
                                    Sort by Time
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
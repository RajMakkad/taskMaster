import { useNavigate } from "react-router-dom"

export default function ErrorLogin({ ErrorMessage = "Error" }) {

    const navigate = useNavigate();
    // error related to API will be redirected to this page
    // use this page if cookies are not set to redirect
    return (
        <div className="h-screen bg-gray-400 flex flex-col justify-center items-center">
            <div className="bg-white rounded-xl p-5 pt-3">
                <div className="font-bold text-3xl pb-3">
                    {{ ErrorMessage }}
                </div>
                <div className="">
                    Please click on <span onClick={() => { navigate('/signin') }} className="hover:underline underline-offset-2">Signin</span>
                </div>
            </div>
        </div>
    )
}
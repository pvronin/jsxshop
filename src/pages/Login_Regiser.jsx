import { useState } from "react"
import { FormLogin } from "../components/FormLogin";
import { FormRegister } from "../components/FormRegister";

export function Login_Register() {
    const [showlogin, setShowlogin] = useState(true);

    const toggleShowlogin = () => {
        setShowlogin(!showlogin)
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-700">
            {showlogin ? <FormLogin onToggle={toggleShowlogin} /> : <FormRegister onToggle={toggleShowlogin} />}
        </div>
    )
}

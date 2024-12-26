import React, { useState } from "react";
import Agentsignup from "./Agentsignup";
import axios from 'axios'

function Agentlogin({ onClose }) {
    const [isAgentSignupPopupOpen, setIsAgentSignupPopupOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const toggleAgentSignupPopup = () => {
        setIsAgentSignupPopupOpen(!isAgentSignupPopupOpen);
    };

    const closeAgentSignupPopup = () => {
        setIsAgentSignupPopupOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
        try {
            const response= await axios.post('http://localhost:3000/agent/agentlogin', { username, password });
            const token = response.data.Agenttoken;
            const Agentusername=username
            localStorage.setItem("Agenttoken", token);
            localStorage.setItem("Agentusername", Agentusername);
            setIsLoading(false);
            window.location.href = "/agentpanel";
        }
        catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            alert("Login failed.Please check your emailid and password")
        }

        if (!username.trim()) {
            newErrors.username = ' Username is required';
            hasErrors = true;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            hasErrors = true;
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }
    };

    return (
        <>
            <div className="flex justify-center items-center shadow-2xl mx-8 ">
                <button
                    className="relative  left-[24.5rem] top-[-9.5rem] text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col justify-center items-center w-[11cm] bg-gray-200 rounded-lg ">
                    <h2 className="text-blue-950 text-2xl font-sens flex items-center justify-center font-bold px-5 mt-4">AGENT LOGIN</h2>
                    <form className="mt-8 w-3/4" onSubmit={handleSubmit}>
                    <div className="mb-5">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your Username"
                            />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>

                        <button
                            className="bg-blue-950 hover:bg-blue-900 hover:text-white border-[1px] border-blue-900 text-white font-bold text-[20px] py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            type="submit"
                        >
                            Login
                        </button>
                        <div className=" text-right justify-between mt-4 mb-2">
                            Not a member?
                            <a
                                onClick={toggleAgentSignupPopup}
                                className="text-blue-500 text-sm hover:underline ml-2"
                                href="#"
                            >
                                Signup here
                            </a>
                        </div>
                    </form>
                </div>
                {isAgentSignupPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <Agentsignup onClose={closeAgentSignupPopup} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Agentlogin;

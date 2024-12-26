import React, { useState } from "react";
import Donorsignup from "./Donorsignup";
import axios from "axios";

function Donerlogin({ onClose }) {
    const [isDonorSignupPopupOpen, setIsDonorSignupPopupOpen] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const toggleDonorSignupPopup = () => {
        setIsDonorSignupPopupOpen(!isDonorSignupPopupOpen);
    };

    const closeDonorSignupPopup = () => {
        setIsDonorSignupPopupOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
       

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

        // Simulated checkbox validation
       

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

         
        try {
            const response = await axios.post('http://localhost:3000/donor/donorlogin', { username, password });
            const token = response.data.Donortoken;
            const Username = username
            localStorage.setItem("Donortoken", token);
            localStorage.setItem("username", Username);


            setIsLoading(false);
            window.location.href = "/";
        }
        catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            alert("Login failed.Please check your username and password")
        }
      
        // TODO: add your authentication logic here
        console.log("Username:", username , "Password:", password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-gray-200 rounded-xl shadow-lg">
                <button
                    className="relative left-[23.5rem] -top-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <img
                        className="w-[5rem] h-[5rem]"
                        src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"
                        alt="User Icon"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold text-blue-950">
                        DONOR LOGIN
                    </h2>
                </div>
                <form className="mt-8 " onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-5">
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only rounded">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="mt-5">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border-[1px] text-lg font-bold  rounded-md border-blue-900   text-white bg-blue-950 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            LOGIN
                        </button>
                    </div>
                    <div className=" bottom-0 pl-[5cm] text-sm  mt-4">
                        Don't have account?
                        <a
                            onClick={toggleDonorSignupPopup}
                            className="text-blue-500 text-sm hover:underline ml-2 "
                            href="#"
                        >
                            Signup here
                        </a>
                    </div>
                </form>
            </div>
            {isDonorSignupPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Donorsignup onClose={closeDonorSignupPopup} />
                </div>
            )}
        </div>
    );
}

export default Donerlogin;

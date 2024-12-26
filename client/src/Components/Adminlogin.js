import React, { useState } from 'react';
import Adminlogo from '../assets/adminimg.png';
import axios from 'axios';

function Adminlogin({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
        try {
            const response = await axios.post('http://localhost:3000/admin/adminlogin', { email, password });
            // if (response.status === 400) {
            //     alert('admin is not registered')
            // }
            // if (response.status === 401) {
            //     alert('password is incorrect')
            // }
            const token = response.data.Admintoken;
            localStorage.setItem("Admintoken", token);
            setIsLoading(false);
            window.location.href = "/adminpanel";
        }
        catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            alert("Login failed.Please check your emailid and password")
        }


        if (!email.trim()) {
            newErrors.email = "Email is required";
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
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

        // TODO: Add your authentication logic here
        console.log('email:', email, 'Password:', password);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[11cm]">
                <button className="relative left-[23.5rem] top-10 text-gray-600 hover:text-gray-800" onClick={onClose}>
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
                <div className="bg-gray-200 py-8 px-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <div className="flex justify-center items-center flex-col">
                            <img className="w-[2cm] h-[2cm]" src={Adminlogo} alt="" />
                            <h2 className="text-2xl font-[700] font-sens text-blue-950 mt-4">ADMIN PANEL</h2>
                        </div>
                    </div>
                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-sm font-sens text-gray-500">
                                EMAIL
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full py-2 px-3 mt-1 text-blue-950 bg-white border-b-2 border-gray-400 focus:outline-none focus:border-blue-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-sens text-gray-500">
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full py-2 px-3 mt-1 text-blue-950 bg-white border-b-2 border-gray-400 focus:outline-none focus:border-blue-700"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">{/* Error Message */}</div>
                            <button
                                type="submit"
                                className="py-2 px-4 bg-transparent text-blue-950 font-bold border border-blue-950 rounded hover:bg-blue-950 hover:text-white transition duration-300"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Adminlogin;

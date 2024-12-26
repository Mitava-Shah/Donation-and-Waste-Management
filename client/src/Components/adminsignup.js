import React,{useState} from 'react'
import axios from 'axios';
function Adminsignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
        try {
            const response= await axios.post('http://localhost:3000/admin/adminsignup', { email, password });
            const token = response.data.Admintoken;
            localStorage.setItem("Admintoken", token);
            setIsLoading(false);
            window.location.href = "/";
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
    };

  return (
    <div>
      <div className="flex justify-center items-center h-screen  lg:px-[15rem] md:px-[10rem] sm:px-[8rem] px-[12px] shadow-2xl ">
                <button
                    className="relative  left-[24.5rem] top-[-9.5rem] text-gray-600 hover:text-gray-800"
                    
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
                    <h2 className="text-blue-950 text-2xl font-sens flex items-center justify-center font-bold px-5 mt-4">Admin signup</h2>
                    <form className="mt-8 w-3/4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Email ID</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
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
                               
                                className="text-blue-500 text-sm hover:underline ml-2"
                                href="#"
                            >
                                Signup here
                            </a>
                        </div>
                    </form>
                </div>
                
            </div>
    </div>
  )
}

export default Adminsignup

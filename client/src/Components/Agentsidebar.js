import React, { useEffect,useState } from 'react'
import { IoPersonCircle, IoMenu } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom"

function Agentsidebar() {
    const [AgentLogin, setAgentLogin] = React.useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => { // Check if token is available in local storage
        const token = localStorage.getItem("Agenttoken");
        if (token) {
            setAgentLogin(true);
        }
    }, []);

    const handleAgentLogout = () => {
        localStorage.removeItem("Agenttoken");
        setAgentLogin(false);
        window.location.assign("/");
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <div className=' text-white  bg-blue-900 h-screen'>
                <button className="sm:hidden relative top-5 left-4 rounded mr-4 " onClick={toggleSidebar}>
                    {showSidebar ? <IoMenu size={20} /> : <IoMenu size={24} />}
                </button>
            </div>
            <div className={` ${showSidebar ? ' sm:flex-row' : ' hidden sm:block sm:flex-col'} sm:w-64 bg-blue-900 text-gray-900 font-sans font-bold border-r border-gray-300`}>
                {/* Sidebar content */}
                <div className="p-4 border-b border-gray-300 flex">
                    <spam className="mt-[0.15rem] mr-2"><IoPersonCircle color='white' size={24} /></spam>
                    <h1 className="text-lg font-sans font-semibold text-white">Agent Panel</h1>

                </div>
                
                
                <nav className="flex-grow">
                    <ul className="p-2">
                    {/* <li className="mb-2">
                            <Link to="/" className="block p-2 rounded hover:bg-gray-200 text-white hover:text-black">Home</Link>
                        </li> */}
                        <li className="mb-2">
                            <Link to="/agentpanel" className="block p-2 rounded hover:bg-gray-200 text-white hover:text-black">Dashboard</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/agentpandingcollection" className="block p-2 rounded hover:bg-gray-200 text-white hover:text-black">My Pending Collections</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/agentcollectionhistory" className="block p-2 rounded hover:bg-gray-200 text-white hover:text-black">My Collections History</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/agentprofile" className="block p-2 rounded hover:bg-gray-200 text-white hover:text-black">Manage Profile</Link>
                        </li>
                        <li className="mb- flex hover:bg-gray-200 text-white hover:text-black rounded">
                            <spam className="pt-3 pl-1"><CiLogout /></spam>
                            <button type='submit' onClick={handleAgentLogout} className="block p-2  ">Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Agentsidebar

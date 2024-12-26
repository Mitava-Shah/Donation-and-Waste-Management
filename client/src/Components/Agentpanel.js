import React ,{useEffect} from 'react'
import { IoPersonCircle } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom"
import Agentsidebar from './Agentsidebar';
import axios from 'axios'

const Agentpanel = () => {
    const [Countnotcollected, setCountnotcollected] = React.useState(0)
    const [Countcollected, setCountcollected] = React.useState(0)
    const [Countdelivered, setCountdelivered] = React.useState(0)
    
    useEffect(() => {

        const username = localStorage.getItem("username");

        // if (!username) {
        //     console.log("username not found in local storage");
        //     return;
        // }

        const agentusername = localStorage.getItem("Agentusername");
        if (!agentusername) { 
            console.log("Agent username not found in local storage");
            return;
        }
       
      

    axios.get(`http://localhost:3000/admin/assigned?agentusername=${agentusername}&username=${username}`).then(response => {
    setCountnotcollected(response.data.agentdonations);
    }).catch(error => {
        console.log("Error fetching data", error)
    });

    axios.get(`http://localhost:3000/admin/collected?agentusername=${agentusername}&username=${username}`).then(response => {
        setCountcollected(response.data.agentdonations);
    }).catch(error => {
        console.log("Error fetching data", error)
    });

    axios.get(`http://localhost:3000/admin/delivered?agentusername=${agentusername}&username=${username}`).then(response => {
        setCountdelivered(response.data.agentdonations);
    }).catch(error => {
        console.log("Error fetching data", error)
    });

    },[]);
    return (
        <div className="flex h-screen bg-gray-200">

            <Agentsidebar />
            {/* Main content */}
            <div className="flex flex-col flex-1">
                <div className="p-4 bg-blue-900 text-white border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>
                <div className="flex-grow p-4">
                    {/* Main content area */}
                    <p>Welcome to the Agent Panel Dashboard!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {/* Box 1 */}
                        <div className="bg-red-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 mb-2 font-bold">{Countnotcollected}</h3>
                            <p className=' font-semibold'>Donations not collected yet.</p>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-green-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 mb-2 font-bold">{Countcollected}</h3>
                            <p className=' font-semibold'>Donations not delivered yet.</p>
                        </div>

                        <div className="bg-blue-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 mb-2 font-bold">{Countdelivered}</h3>
                            <p className=' font-semibold'>Donations Delivered by you.</p>
                        </div>


                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Agentpanel;

import React,{useState,useEffect} from 'react';
import { IoPersonCircle } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Adminsidebar from './Adminsidebar';
import axios from 'axios'

const Adminpanel = () => {
    const [countdonor, setCountdonor] = useState(0);
    const [countadmin, setCountadmin] = useState(0);
    const [countagent, setCountagent] = useState(0);
    const [countpanding,setCountpanding]=useState(0);
    const [countaccepted,setCountaccepted]=useState(0);
    const [countassigned,setCountassigned]=useState(0);
    const [countcollected,setCountcollected]=useState(0);
    const [countdelivered,setCountdelivered]=useState(0);



      useEffect(() => {
        axios.get('http://localhost:3000/donor/countdonor').then(response => {
            setCountdonor(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/countadmin').then(response => {
            setCountadmin(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/agent/countagent').then(response => {
            setCountagent(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/pending').then(response => {
            setCountpanding(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/accepted').then(response => {
            setCountaccepted(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/assigned').then(response => {
            setCountassigned(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/collected').then(response => {
            setCountcollected(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });

        axios.get('http://localhost:3000/admin/delivered').then(response => {
            setCountdelivered(response.data.count);
        }).catch(error => {
            console.log("Error fetching data", error)
        });
    }, []);

   
    return (
        <div className="flex h-screen bg-gray-200">
            <Adminsidebar/>
            {/* Sidebar */}
            {/* Main content */}
            <div className="flex flex-col flex-1">
                <div className="p-4 bg-blue-900 text-white border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>
                <div className="flex-grow p-4">
                    {/* Main content area */}
                    <p>Welcome to the Admin Panel Dashboard!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {/* Box 1 */}
                        <div className="bg-blue-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countadmin}</h3>
                            <p className=' font-semibold'>Admins</p>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-fuchsia-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countagent}</h3>
                            <p className=' font-semibold'>Agents</p>
                        </div>

                        {/* Box 3 */}
                        <div className="bg-stone-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countdonor}</h3>
                            <p className=' font-semibold'>Doners</p>
                        </div>

                        {/* Box 4 */}
                        <div className="bg-orange-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countpanding}</h3>
                            <p className=' font-semibold'>New donation requests</p>
                        </div>

                        {/* Box 5 */}
                        <div className="bg-yellow-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countaccepted}</h3>
                            <p className=' font-semibold'>Donations to be assigned to agent</p>
                        </div>
                        {/* Box 6 */}
                        <div className="bg-red-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countassigned}</h3>
                            <p className=' font-semibold'>Donations not collected yet</p>
                        </div>
                        {/* Box 7 */}
                        <div className="bg-green-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countcollected}</h3>
                            <p className=' font-semibold'>Donations collected</p>
                        </div>
                        <div className="bg-blue-300 border border-gray-300 rounded p-4">
                            <h3 className="text-2xl text-gray-800 font-bold mb-2">{countdelivered}</h3>
                            <p className=' font-semibold'>Donations Delivered</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminpanel;
import React, { useState, useEffect, useParams } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Adminsidebar from "./Adminsidebar";
import axios from 'axios'
import Agentassign from "./Agentassign"

const Adminpanding = () => {
    const [record, setRecord] = useState([])
    const [donors, setDonors] = useState({});
    const [agents,setAgents]=useState([]);
    const [isFormPopupOpen, setIsFormPopupOpen] = useState(false)
    const [selectedDonation, setSelectedDonation] = useState(null)



    const closeFormPopup = () => {
        setIsFormPopupOpen(false);
        setSelectedDonation(null)
    };

    useEffect(() => {
        axios.get('http://localhost:3000/admin/pandingdonations').then(response => {
            setRecord(response.data);
            fetchDonorInfo(response.data);
            fetchAgentInfo(response.data);
        }).catch(error => {
            console.log("Error fetching data", error);
        });
    }, []);


    const fetchDonorInfo = async (donationRecords) => {
        const donorInfo = {};
        for (const donation of donationRecords) {
            try {
                const response = await axios.get(`http://localhost:3000/donor/${donation.email}`);
                if (response.data && response.data.email === donation.email) {
                    donorInfo[donation.email] = `${response.data.firstName} ${response.data.lastName}`;
                } else {
                    donorInfo[donation.email] = 'Unknown';
                }
            } catch (error) {
                console.error(`Error fetching donor information for ${donation.email}`, error);
                donorInfo[donation.email] = 'Unknown'; // Default to 'Unknown' if fetch fails
            }
        }
        setDonors(donorInfo);
    };

    const fetchAgentInfo = async (donationRecords) => {
        const AgentInfo = {};
        for (const donation of donationRecords) {
            try {
                const response = await axios.get(`http://localhost:3000/agent/${donation.agentemail}`);
                if (response.data && response.data.email === donation.agentemail) {
                    AgentInfo[donation.agentemail] = `${response.data.firstName} ${response.data.lastName}`;
                } else {
                    AgentInfo[donation.agentemail] = 'Unknown';
                }
            } catch (error) {
                console.error(`Error fetching donor information for ${donation.agentemail}`, error);
                AgentInfo[donation.agentemail] = 'Unknown'; // Default to 'Unknown' if fetch fails
            }
        }
        setAgents(AgentInfo);
    };


    const handleAccept = (id) => {
        axios.put(`http://localhost:3000/admin/accept/${id}`)
            .then(() => {
                const updatedRecords = record.map((r) => {
                    if (r._id === id) {
                        return { ...r, Status: 'Accepted' };
                    }
                    return r;
                });
                setRecord(updatedRecords);
            })
            .catch((error) => {
                console.error("Error updating status to Accepted", error);
            });

    };

    const handleReject = (id) => {
        axios.put(`http://localhost:3000/admin/reject/${id}`)
            .then(() => {
                const updatedRecords = record.map((r) => {
                    if (r._id === id) {
                        return { ...r, Status: 'Rejected' };
                    }
                    return r;
                });
                setRecord(updatedRecords);
            })
            .catch((error) => {
                console.error("Error updating status to Accepted", error);
            });

    };

    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/admin/delete/${id}`)
            .then(() => {
                const updatedRecords = record.filter((r) => r._id !== id);
                setRecord(updatedRecords);
            })
            .catch((error) => {
                console.error("Error deleting record", error);
            });
    };

    const handleAssignAgent = (id) => {
        setSelectedDonation(record.find((r) => r._id === id));
        setIsFormPopupOpen(true);
    };

    return (
       <>
        <div className="flex  bg-gray-200"> 
            <Adminsidebar />
            <div className="bg-gray-200 w-full ">
                <div className="flex flex-col flex-1">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">Pending Donations</h2>
                    </div>
                </div>

                <div className="  w-full">
                    <table className="w-full border-collapse border border-slate-500">
                        <thead>
                            <tr className="bg-gray-300 text-gray-600 uppercase text-sm  border-b-2 border-gray-500">
                                <th className="py-2 px-1 border border-slate-400  ">No.</th>              
                                <th className="py-2 px-1 border border-slate-400 ">Username</th>
                                <th className="py-2 px-1 border border-slate-400 ">email id</th>
                                <th className="py-2 px-1 border border-slate-400 ">Contact No.</th>
                                <th className="py-2 px-1 border border-slate-400 ">Donation Type</th>
                                <th className="py-2 px-1 border border-slate-400 ">Quantity</th>
                                <th className="py-2 px-1 border border-slate-400 ">Condition</th>
                                <th className="py-2 px-1 border border-slate-400 ">Time of cooking</th>
                                <th className="py-2 px-1 border border-slate-400 ">Address to Collect</th>
                                <th className="py-2 px-1 border border-slate-400 ">Area</th>
                                <th className="py-2 px-1 border border-slate-400 ">Message</th>
                                <th className="py-2 px-1 border border-slate-400 ">Status</th>
                                <th className="py-2 px-1 border border-slate-400 ">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                record.filter((a) => a.Status !== 'Delivered').map((a, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-2 px-1 border border-slate-400  whitespace-nowrap">{index + 1}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.username}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.email}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.contactno}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.donationtype}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.quantity}</td>
                                       {
                                        a.condition ?  <td className="py-2 px-1 border border-slate-400 ">{a.condition}</td>: <td className="py-2 px-1 text-center border border-slate-400 ">-</td>
                                       }
                                        {
                                            a.timeofcooking ?  <td className="py-2 px-1 border border-slate-400 ">{a.timeofcooking}</td>:<td className="py-2 px-1 text-center border border-slate-400 ">-</td>
                                        }
                                        <td className="py-2 px-1 border border-slate-400 ">{a.addresstocollect}</td>
                                        <td className="py-2 px-1 border border-slate-400 ">{a.area}</td>
                                        {
                                            a.message ?  <td className="py-2 px-1 border border-slate-400 ">{a.message}</td>:<td className="py-2 px-1 text-center border border-slate-400 ">-</td>
                                        }
                                        <td className="py-2 px-1 border border-slate-400 ">{a.Status}</td>

                                        <td className="py-2 px-1 text-center border border-slate-400 ">
                                            {a.Status === "Pending" && (
                                                <div className=" items-center justify-center">
                                                    <button onClick={() => handleAccept(a._id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2  rounded mr-2 mb-2">
                                                        Accept
                                                    </button>
                                                    <button onClick={() => handleReject(a._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2  rounded mr-2">
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {a.Status === "Accepted" && (
                                                <button onClick={() => handleAssignAgent(a._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2  rounded mr-2">
                                                    Assign Agent
                                                </button>
                                            )}
                                            {a.Status === "Rejected" && (
                                                <button onClick={() => handleDelete(a._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2  rounded mr-2">
                                                    Delete
                                                </button>
                                            )}
                                            {a.Status === "Agent assigned" && (
                                               <h1>Assigned to {a.agentusername}</h1>
                                            )}

                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {isFormPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Agentassign onClose={closeFormPopup} selectedDonation={selectedDonation} donors={donors} updateRecord={setRecord} />
                </div>
            )}
        </div>
       </>
    );
};

export default Adminpanding;
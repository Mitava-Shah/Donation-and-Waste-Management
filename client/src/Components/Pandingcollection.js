import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Agentsidebar from "./Agentsidebar";
import axios from 'axios'
import Donationaddress from "./Donationaddress";

const Pandingcollection = () => {
    const [record, setRecord] = useState([])
    const [donors, setDonors] = useState([])
    const [isDonationaddressPopupOpen, setIsDonationaddressPopupOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null)

    const toggleDeliveryaddressPopup = () => {
        setIsDonationaddressPopupOpen(!isDonationaddressPopupOpen);
    };

    const closeDonationaddressPopup = () => {
        setIsDonationaddressPopupOpen(false);
    };

    useEffect(() => {
        const agentusername = localStorage.getItem("Agentusername");
        if (!agentusername) {
            console.log("agent username not found in local storage");
            return;
        }

        axios.get(`http://localhost:3000/agent/pandingcollection?agentusername=${agentusername}`).then(response => {
            setRecord(response.data);
            fetchDonorInfo(response.data);
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

    const handleCollect = (id) => {
        axios.put(`http://localhost:3000/agent/collect/${id}`)
            .then(() => {
                const updatedRecords = record.map((r) => {
                    if (r._id === id) {
                        return { ...r, Status: 'Collected' };
                    }
                    return r;
                });
                setRecord(updatedRecords);
            })
            .catch((error) => {
                console.error("Error updating status to Collected", error);
            });
    };



    const handleAddress = (id) => {
        setSelectedDonation(record.find((r) => r._id === id));
        setIsDonationaddressPopupOpen(true);
    };

    return (
        <div className="flex bg-gray-200 ">
            <Agentsidebar />
            <div className=" bg-gray-100 flex flex-col flex-1">
                <div className="">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">My Pending Collections</h2>
                    </div>
                    {/* <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <TiArrowBackOutline className="mr-2" />
            Back
          </button>
        </div> */}
                </div>
                <table className="w-full table-auto ">
                    <thead>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal border-b-2	border-gray-500">
                            <th className="py-3 px-3 text-center">No.</th>
                            <th className="py-3 px-3 text-center">Username</th>
                            <th className="py-3 px-3 text-center">Email id</th>
                            <th className="py-3 px-3 text-center">Conatct No.</th>
                            <th className="py-3 px-3 text-center">Donation Type</th>
                            <th className="py-3 px-3 text-center">Quantity</th>
                            <th className="py-3 px-3 text-center">Address to Collect</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {
                            record.filter((a) => a.Status !== 'Delivered').map((a, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-3 text-center whitespace-nowrap">{index + 1}</td>
                                    <td className="py-3 px-3 text-center">{a.username}</td>
                                    <td className="py-3 px-3 text-center">{a.email}</td>
                                    <td className="py-3 px-3 text-center">{a.contactno}</td>
                                    <td className="py-3 px-3 text-center">{a.donationtype}</td>
                                    <td className="py-3 px-3 text-center">{a.quantity}</td>
                                    <td className="py-3 px-3 text-center">{a.addresstocollect}</td>
                                    <td className="py-3 px-3 text-center">
                                        {a.Status === 'Agent assigned' && (
                                            <button
                                                onClick={() => handleCollect(a._id)}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
                                            >
                                                Collect
                                            </button>
                                        )}
                                        {a.Status === 'Collected' && (
                                            <button
                                                // onClick={() => handleDeliver(a._id)}
                                                onClick={() => handleAddress(a._id)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                                            >
                                                Deliver
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {isDonationaddressPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Donationaddress onClose={closeDonationaddressPopup} selectedDonation={selectedDonation} donors={donors} updateRecord={setRecord} />
                </div>
            )}
        </div>
    );
};

export default Pandingcollection;

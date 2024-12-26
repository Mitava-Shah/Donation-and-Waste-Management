import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Agentsidebar from "./Agentsidebar";
import axios from 'axios';

const Collectionhistory = () => {
    const [records, setRecords] = useState([]);
const[donors,setDonors]=useState([])
    // useEffect(() => {
    //     axios.get('http://localhost:3000/agent/deliveredcollections')
    //         .then(response => {
    //             setRecords(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching delivered collections:', error);
    //         });
    // }, []);
    useEffect(() => {
        const agentusername = localStorage.getItem("Agentusername");
        if (!agentusername) {
            console.log("Email not found in local storage");
            return;
        }

        axios.get(`http://localhost:3000/agent/deliveredcollections?agentusername=${agentusername}`).then(response => {
            setRecords(response.data);
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

    return (
        <>
        <div className="flex bg-gray-200 ">
            <Agentsidebar />
            <div className="bg-gray-100  flex flex-col flex-1">
                <div className="">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">My Collection history</h2>
                    </div>
                    <div className="m-4">
                        {records.map((a, index) => (
                            <table key={index} className="w-full border-b border-gray-300 shadow-md rounded">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <hr className=" " />
                                        </td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">#</td>
                                        <td className="pr-2">{index + 1}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Donor Username:</td>
                                        <td className="pr-2">{a.username}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Email id:</td>
                                        <td className="pr-2">{a.email}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Contact no:</td>
                                        <td className="pr-2">{a.contactno}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Donation Type:</td>
                                        <td className="pr-2">{a.donationtype}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Quantity:</td>
                                        <td className="pr-2">{a.quantity}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Address to Collect:</td>
                                        <td className="pr-2">{a.addresstocollect}</td>
                                    </tr>
                                    
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Delivered at:</td>
                                        <td className="pr-2">{a.addresstodonate}</td>
                                    </tr>
                                    <td colSpan="2">
                                        <hr className="my-4 border-t-2 border-gray-300" />
                                    </td>
                                </tbody>
                            </table>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Collectionhistory;

import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Donorsidebar from './Donorsidebar';
import axios from 'axios'

const Donerpanding = () => {
    const [record, setRecord] = useState([])
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            console.log("Email not found in local storage");
            return;
        }

        axios.get(`http://localhost:3000/donor/pandingdonations?username=${username}`).then(response => {
            setRecord(response.data);
        }).catch(error => {
            console.log("Error fetching data", error);
        });
    }, []);


    return (
        <div className="flex bg-gray-200">
            <Donorsidebar />
            <div className="w-full bg-gray-100 shadow-md ">
                <div className="flex flex-col flex-1 ">
                    <div className="p-4 bg-blue-900 text-white border-b border-gray-300">
                        <h2 className="text-lg font-semibold">My Pending Donations</h2>
                    </div>

                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-500">
                            <th className="py-3 px-3 text-center ">No.</th>
                            <th className="py-3 px-3 text-center ">Donation Type</th>
                            <th className="py-3 px-3 text-center ">Quantity</th>
                            <th className="py-3 px-3 text-center ">Condition</th>
                            <th className="py-3 px-3 text-center ">Time of cooking</th>
                            <th className="py-3 px-3 text-center ">Address to Collect</th>
                            <th className="py-3 px-3 text-center ">Area</th>
                            <th className="py-3 px-3 text-center ">Message</th>
                            <th className="py-3 px-3 text-center ">Status</th>
                            <th className="py-3 px-3 text-center ">Action</th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-800 ">
                        {
                            record.filter((a) => a.Status !== 'Delivered').map((a, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-3 text-center  whitespace-nowrap">{index + 1}</td>
                                    <td className="py-3 px-3 text-center ">{a.donationtype}</td>
                                    <td className="py-3 px-3 text-center ">{a.quantity}</td>
                                    {
                                        a.condition ? <td className="py-3 px-3 text-center ">{a.condition}</td> : <td className="py-3 px-3 text-center">-</td>
                                    }
                                    {
                                        a.timeofcooking ? <td className="py-3 px-3 text-center ">{a.timeofcooking}</td > : <td className="py-3 px-3 text-center">-</td>
                                    }
                                    <td className="py-3 px-3 text-center ">{a.addresstocollect}</td>
                                    <td className="py-3 px-3 text-center ">{a.area}</td>
                                    {
                                        a.message ? <td className="py-3 px-3 text-center">{a.message}</td> : <td className="py-3 px-3 text-center">-</td>
                                    }
                                    <td className="py-3 px-3 text-center ">{a.Status}</td>
                                    <td className="py-3 px-3 text-center ">
                                        <div className="flex justify-center items-center  flex-wrap">
                                            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mb-2 md:mb-0">
                                                <a href="mailto:mitvashah792@gmail.com" target='_blank'>Inquiry</a>

                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Donerpanding;
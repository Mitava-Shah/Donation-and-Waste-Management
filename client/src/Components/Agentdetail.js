import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Adminsidebar from "./Adminsidebar";
import axios from 'axios'

const Agentdetail = () => {
    const [record, setRecord] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/agent/agentdetail').then(response => {
            setRecord(response.data)
        }).catch(error => {
            console.log("Error fetching data", error)
        });
    }, []);


    return (
        <div className="flex h-screen bg-gray-200">
            <Adminsidebar />
            <div className="bg-gray-200  w-full">
                <div className="flex flex-col flex-1">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">Agent Detail</h2>
                    </div>
                    {/* <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <TiArrowBackOutline className="mr-2" />
            Back
          </button>
        </div> */}
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-500">
                            <th className="py-3 px-3 text-center">No.</th>
                            <th className="py-3 px-3 text-center">Agent Username</th>
                            <th className="py-3 px-3 text-center">Agent Name</th>
                            <th className="py-3 px-3 text-center">Email</th>
                            <th className="py-3 px-3 text-center">Contact no.</th>
                            <th className="py-3 px-3 text-center">Address</th>
                            <th className="py-3 px-3 text-center">Area</th>
                            <th className="py-3 px-3 text-center">City</th>
                            <th className="py-3 px-3 text-center">Pincode</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-lg font-light">
                        {
                            record.map((a, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-3 text-center whitespace-nowrap">{index + 1}</td>
                                    <td className="py-3 px-3 text-center">{a.username}</td>
                                    <td className="py-3 px-3 text-center">{a.firstName} {a.lastName}</td>
                                    <td className="py-3 px-3 text-center">{a.email}</td>
                                    <td className="py-3 px-3 text-center">{a.contactNo}</td>
                                    <td className="py-3 px-3 text-center">{a.address}</td>
                                    <td className="py-3 px-3 text-center">{a.area}</td>
                                    <td className="py-3 px-3 text-center">{a.city}</td>
                                    <td className="py-3 px-3 text-center">{a.pincode}</td>
                                    
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Agentdetail;
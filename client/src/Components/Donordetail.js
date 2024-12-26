import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Adminsidebar from "./Adminsidebar";
import axios from 'axios'

const Donordetail = () => {
    const [record, setRecord] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/admin/donordetail').then(response => {
            setRecord(response.data)
        }).catch(error => {
            console.log("Error fetching data", error)
        });
    }, []);

    
    return (
        <div className="flex h-screen bg-gray-200 w-full">
            <Adminsidebar />
            <div className="bg-gray-200  w-full">
                <div className="flex flex-col flex-1">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">Donor Detail</h2>
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
                            <th className="py-3 px-3 text-center">Donor Username</th>
                            <th className="py-3 px-3 text-center">Donor Name</th>
                            <th className="py-3 px-3 text-center">Email</th>
                            <th className="py-3 px-3 text-center">Contact no.</th>
                            <th className="py-3 px-3 text-center">Address</th>
                            <th className="py-3 px-3 text-center">City</th>
                            <th className="py-3 px-3 text-center">Pincode</th>
                            {/* <th className="py-3 px-3 text-center">Actions</th> */}

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
                                    <td className="py-3 px-3 text-center">{a.city}</td>
                                    <td className="py-3 px-3 text-center">{a.pincode}</td>
                                    {/* <td className="py-3 px-3 text-center">{a.Status}</td> */}

                                    {/* <td className="py-3 px-3 text-center">
                                        <div className="flex flex-wrap">
                                           
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mb-2 md:mb-0 md:mr-2">
                                                Remove
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Donordetail;
import React,{useState,useEffect} from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Donorsidebar from './Donorsidebar';
import axios from 'axios'

const Donerhistory = () => {
    
    const [record, setRecord] = useState([])
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            console.log("Email not found in local storage");
            return;
        }

        axios.get(`http://localhost:3000/donor/delivereddonations?username=${username}`).then(response => {
            setRecord(response.data);
        }).catch(error => {
            console.log("Error fetching data", error);
        });
    }, []);

    

    return (
        <div className="flex  bg-gray-200">
            <Donorsidebar />
            <div className="bg-gray-200  w-full">
                <div className="">
                    <div className=" flex flex-col flex-1 ">
                        <div className="p-4 bg-blue-900 text-white ">
                            <h2 className="text-lg font-semibold">My Donation History</h2>
                        </div>
                      
                    </div>
                    <div className="m-4">
                        {record.map((a, index) => (
                            <table key={index} className="w-full  border-b border-gray-300 shadow-md rounded">
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
                                        <td className="font-bold pr-2 w-full sm:w-auto">Donation Type:</td>
                                        <td className="pr-2">{a.donationtype}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Quantity:</td>
                                        <td className="pr-2">{a.quantity}</td>
                                    </tr>
                                    {
                                        a.condition ?<tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Condition:</td>
                                        <td className="pr-2">{a.condition}</td>
                                    </tr>: null
                                    }
                                    {
                                        a.timeofcooking ?<tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Time of cooking:</td>
                                        <td className="pr-2">{a.timeofcooking}</td>
                                    </tr>: null
                                    }
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Address to Collect:</td>
                                        <td className="pr-2">{a.addresstocollect}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Phone:</td>
                                        <td className="pr-2">{a.contactno}</td>
                                    </tr>
                                    
                                    {
                                        a.message ?<tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Message:</td>
                                        <td className="pr-2">{a.message}</td>
                                    </tr>: null
                                    }
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Status:</td>
                                        <td className="pr-2">{a.Status}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold pr-2 w-full sm:w-auto">Donated at:</td>
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
    );
};

export default Donerhistory;
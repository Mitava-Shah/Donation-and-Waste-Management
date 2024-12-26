import React,{useEffect,useState} from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import Adminsidebar from "./Adminsidebar";
import axios  from 'axios';

const Donationhistory = () => {
    const [record,setRecord]=useState([]);
    const [donors, setDonors] = useState([]);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/admin/delivereddonations').then(response => {
            setRecord(response.data);
            fetchDonorInfo(response.data);
            fetchAgentInfo(response.data)
        }).catch(error => {
            console.log("Error fetching data", error);
        });
    }, []);

    const fetchAgentInfo = async (donationRecords) => {
        const AgentInfo = {};
        for (const donation of donationRecords) {
            try {
                const response = await axios.get(`http://localhost:3000/agent/${donation.agentusername}`);
                if (response.data && response.data.username === donation.agentusername) {
                    AgentInfo[donation.agentusername] = `${response.data.firstName} ${response.data.lastName}`;
                } else {
                    AgentInfo[donation.agenteusenname] = 'Unknown';
                }
            } catch (error) {
                console.error(`Error fetching donor information for ${donation.agenteusername}`, error);
                AgentInfo[donation.agentusername] = 'Unknown'; // Default to 'Unknown' if fetch fails
            }
        }
        setAgents(AgentInfo);
    };


    const fetchDonorInfo = async (donationRecords) => {
        const donorInfo = {};
        for (const donation of donationRecords) {
            try {
                const response = await axios.get(`http://localhost:3000/donor/${donation.username}`);
                if (response.data && response.data.username === donation.username) {
                    donorInfo[donation.username] = `${response.data.firstName} ${response.data.lastName}`;
                } else {
                    donorInfo[donation.username] = 'Unknown';
                }
            } catch (error) {
                console.error(`Error fetching donor information for ${donation.username}`, error);
                donorInfo[donation.username] = 'Unknown'; // Default to 'Unknown' if fetch fails
            }
        }
        setDonors(donorInfo);
    };

    return (
        
        <div className="flex bg-gray-200">
            <Adminsidebar />
            <div className="bg-gray-200 w-full">
                <div className=" ">
                    <div className="flex flex-col flex-1 ">
                        <div className="p-4 bg-blue-900 text-white ">
                            <h2 className="text-lg font-semibold">Donation History</h2>
                        </div>
                    </div>
                    <div className="m-4 ">
                        {record.map((a, index) => (
                            <table key={index} className="w-full border-b border-gray-300 shadow-md rounded">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <hr className=" " />
                                        </td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2">#</td>
                                        <td className="pr-2">{index + 1}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Donor Username:</td>
                                        <td className="pr-2">{a.username}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2">Email id:</td>
                                        <td className="pr-2">{a.email}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2">Contact No.:</td>
                                        <td className="pr-2">{a.contactno}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Donation Type:</td>
                                        <td className="pr-2">{a.donationtype}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2">Quantity:</td>
                                        <td className="pr-2">{a.quantity}</td>
                                    </tr>
                                    {
                                        a.condition ?<tr className="flex flex-wrap">
                                        <td className="font-bold px-2">Condition:</td>
                                        <td className="pr-2">{a.condition}</td>
                                    </tr> :null
                                    }
                                    {
                                        a.timeofcooking ? <tr className="flex flex-wrap">
                                        <td className="font-bold px-2">Time of cooking:</td>
                                        <td className="pr-2">{a.timeofcooking}</td>
                                    </tr>: null
                                    }
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Address to Collect:</td>
                                        <td className="pr-2">{a.addresstocollect}</td>
                                    </tr>
                                    {
                                        a.message ?<tr className="flex flex-wrap">
                                        <td className="font-bold px-2 w-full sm:w-auto">Message:</td>
                                        <td className="pr-2">{a.message}</td>
                                    </tr>: null
                                    }
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Status:</td>
                                        <td className="pr-2">{a.Status}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Donated at:</td>
                                        <td className="pr-2">{a.addresstodonate}</td>
                                    </tr>
                                    <tr className="flex flex-wrap">
                                        <td className="font-bold px-2 ">Agent Username :</td>
                                        <td className="pr-2">{a.agentusername}</td>
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

export default Donationhistory;
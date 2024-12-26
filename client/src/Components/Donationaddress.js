import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Donationaddress = ({ onClose, selectedDonation, donors,updateRecord }) => {
    const [donorName, setDonorName] = useState("");
    const [username, setUsername] = useState('');
    const [donorEmail, setDonorEmail] = useState("");
    const [donationType, setDonationType] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState('')
    const [selecteddonationaddres, setSelecteddonationaddress] = useState("");
    //   const [agents, setAgents] = useState([]);

    useEffect(() => {
        // Update form fields when selectedDonation changes
        if (selectedDonation) {
            setDonorName(donors[selectedDonation.email] || "");
            setDonorEmail(selectedDonation.email || "");
            setArea(selectedDonation.area || "");
            setUsername(selectedDonation.username || "");
            setDonationType(selectedDonation.donationtype || "");
            setAddress(selectedDonation.addresstocollect || "");
        }
    }, [selectedDonation, donors]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
    const update = await axios.put(`http://localhost:3000/agent/deliver/${selectedDonation._id}`, {
            addresstodonate: selecteddonationaddres,
            Status: 'Delivered'
        });

        updateRecord((prevRecords) => {
            return prevRecords.map((r)=>{
            if (r._id === selectedDonation._id) {
                return { ...r, Status: 'Delivered', addresstodonate: selecteddonationaddres };
            }
            return r;
        });
           
           
        });
        console.log("Donation updated")
        onClose();
        Window.location.assign('/agentcollectionhistory')
    }
     catch(error) {
    console.error("Error updating status to Delivered", error);
        }};







return (
    <div className="container mx-auto mt-8 ">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto rounded-lg bg-white px-8 py-4">
            <div className='text-right'>
                <button
                    className=" text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="mb-6 pointer-events-none">
                <label htmlFor="donorName" className="block text-gray-700 font-bold mb-2">Donor Name</label>
                <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full border border-gray-300  bg-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required

                />
            </div>
            <div className="mb-6 pointer-events-none">
                <label htmlFor="donorEmail" className="block text-gray-700 font-bold mb-2">Donor Email</label>
                <input
                    type="email"
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full border border-gray-300  bg-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-6 pointer-events-none">
                <label htmlFor="donationType" className="block text-gray-700 font-bold mb-2">Donation Type</label>
                <input
                    type="text"
                    id="donationType"
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-full border border-gray-300  bg-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-6 pointer-events-none">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address to Collect</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full  border border-gray-300   bg-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required
                    rows={1}
                ></textarea>
            </div>
            <div className="mb-6">
                <label htmlFor="selectedAgent" className="block text-gray-700 font-bold mb-2">Donated at</label>
                <input
                    id="selectedAgent"
                    value={selecteddonationaddres}
                    onChange={(e) => setSelecteddonationaddress(e.target.value)}
                    className="w-full border border-gray-300  bg-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required
                >
                </input>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </form>
    </div>
);
};

export default Donationaddress;
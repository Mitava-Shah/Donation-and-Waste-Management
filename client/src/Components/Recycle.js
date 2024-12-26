import React, { useState, useEffect } from 'react';
import axios from 'axios'
const Recycleform = ({ onClose }) => {
    const [donationtype, setDonationtype] = useState('')
    const [quantity, setQuantity] = useState('')
    // const [condition, setCondition] = useState('')
    const [contactno, setContactno] = useState('')
    const [message, setMessage] = useState('')
    const [addresstocollect, setAddresstocollect] = useState('')
    // const [addresstodonate, setAddresstodonate] = useState('')
    const [email, setEmail] = useState('')
    const [area, setArea] = useState("")
    const [errors, setErrors] = useState({});
    const [records, setRecords] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            console.log("username not found in local storage");
            return;
        }
        if (username) {
            setUsername(username);
        }
    }, []);

    useEffect(() => {
        const fetchDonorRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/donor?username=${username}`);
                console.log(response.data);

                console.log(response.data);
                setEmail(response.data.email)

            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        };
        if (username) {
            fetchDonorRecords();
        }
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for validation before submission
        let hasErrors = false;
        const newErrors = {};

        if (!donationtype.trim()) {
            newErrors.donationtype = 'Material Type is required';
            hasErrors = true;
        }

        if (!quantity.trim()) {
            newErrors.quantity = 'Quantity is required';
            hasErrors = true;
        }

        // if (!condition.trim()) {
        //     newErrors.condition = 'Condition is required';
        //     hasErrors = true;
        // } 


        if (!contactno.trim()) {
            newErrors.contactno = 'Phone Number is required';
            hasErrors = true;
        } else if (!/^\d{10}$/.test(contactno)) {
            newErrors.contactno = 'Please enter a valid 10-digit phone number';
            hasErrors = true;
        }


        // if (!email.trim()) {
        //     newErrors.email = 'Email is required';
        //     hasErrors = true;
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     newErrors.email = 'Please enter a valid email address';
        //     hasErrors = true;
        // }else if (emailid !== email) {
        //     newErrors.email = 'Please enter the registered email address';
        //     hasErrors = true;
        // }

        // if (!addresstodonate.trim()) { // Validation for new field
        //     newErrors.addresstodonate = 'Address to Donate is required';
        //     hasErrors = true;
        // }

        if (!addresstocollect.trim()) {
            newErrors.addresstocollect = 'Address is required';
            hasErrors = true;
        }

        if (!area.trim()) {
            newErrors.area = 'Area is required';
            hasErrors = true;
        }

        if (hasErrors) {
            // Set error messages for required fields and invalid inputs
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            const response = await axios.post('http://localhost:3000/donate/donation', { donationtype, quantity, contactno, addresstocollect, message, username, email, area });
            if (response.status === 200) {
                alert('Donated successfully');
                window.location.assign("/");
            } else {
                alert('Failed to donate. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('please check all the details carefully');
        }

    };

    const handleChange = () => {

        if (donationtype.trim()) {
            delete errors.donationtype;
        }

        if (quantity.trim()) {
            delete errors.quantity;
        }

        // if (condition.trim()) {
        //     delete errors.condition;
        // }

        if (contactno.trim()) {
            delete errors.contactno;
        }

        if (email.trim()) {
            delete errors.email;
        }

        if (area.trim()) {
            delete errors.area;
        }

        if (addresstocollect.trim()) {
            delete errors.addresstocollect;
        }

        // if (addresstodonate.trim()) { // Validation for new field
        //     delete errors.addresstodonate;
        // }
    }
    const handleClear = () => {
        setDonationtype('');
        setQuantity('');
        // setCondition('');
        setContactno('');
        setMessage('');
        setAddresstocollect('');
        // setAddresstodonate('');
        // setEmail('');
        setArea('');
        setErrors({});
    };


    return (
        <div className="flex justify-center items-center h-screen m-4">
            <form className="w-full max-w-lg border-4 rounded-md py-[5px] px-[20px] mx-1 bg-gray-200" onSubmit={handleSubmit}>
                {/* Inputs for each field */}
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
                <div className="mb-[5px]">
                    <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="footwearType">
                        Material Type<span className='text-red-500 ml-1'>*</span>
                    </label>
                    <input
                        className="shadow capitalize appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="footwearType"
                        type="text"
                        placeholder="Plastic Bottles,cans etc./Paper"
                        name="footwearType"
                        value={donationtype}
                        onChange={(e) => { setDonationtype(e.target.value); handleChange() }}
                    />
                    {errors.donationtype && <p className="text-red-500 text-xs italic">{errors.donationtype}</p>}

                </div>

                <div className="mb-[5px]">
                    <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="quantity">
                        Quantity<span className='text-red-500 ml-1'>*</span>
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="quantity"
                        placeholder="Enter Quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => { setQuantity(e.target.value); handleChange() }}
                        min="0" // Optionally set a minimum value
                        // max="10" // Optionally set a maximum value
                        step="1" // Optionally set a step value
                    />
                    {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}

                </div>


                <div className="mb-[5px]">
                        <label className="block text-gray-700 text-sm font-semibold font-sans mb-1" htmlFor="clothType">
                            Username<span className='text-red-500 ml-1'>*</span>
                        </label>

                        <input
                            className="shadow  appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="clothType"
                            type="text"

                            name="clothType"
                            value={username}
                            disabled

                        />
                        {/* {errors. && <p className="text-red-500 text-xs italic">{errors.donationtype}</p>} */}
                    </div>


                <div className="flex justify-between lg:flex-row flex-col lg:gap-4">
                    <div className="mb-[5px]">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="phoneNumber">
                            Phone Number<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full lg:w-[6cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter Phone Number"
                            name="phoneNumber"
                            value={contactno}
                            onChange={(e) => { setContactno(e.target.value); handleChange() }}
                        />
                        {errors.contactno && <p className="text-red-500 text-xs italic">{errors.contactno}</p>}

                    </div>
                    
                    <div className="mb-[5px]">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">
                            Email<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full lg:w-[5.5cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter you registered Email"
                            name="email"
                            value={email}
                            disabled
                        // onChange={(e) => { setEmail(e.target.value); handleChange() }}

                        />
                        {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
                    </div>
                </div>

                <div className="flex justify-between lg:flex-row flex-col lg:gap-4">
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="address">
                            Address collect<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <textarea
                            className="shadow capitalize appearance-none border rounded w-full lg:w-[6cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            placeholder="Enter Address"
                            name="address"
                            value={addresstocollect}
                            onChange={(e) => { setAddresstocollect(e.target.value); handleChange() }}
                            rows={1}
                        />
                        {errors.addresstocollect && <p className="text-red-500 text-xs italic">{errors.addresstocollect}</p>}

                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="quality">
                            Area<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full lg:w-[5.5cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="area"
                            name="area"
                            value={area}
                            onChange={(e) => { setArea(e.target.value); handleChange() }}
                        >
                            <option value="">Select area</option>
                            <option value="Chala">Chala</option>
                            <option value="Gunjan">Gunjan</option>
                            <option value="Chharvada">Chharvada</option>
                            <option value="Dungra">Dungra</option>
                            <option value="Balitha">Balitha</option>
                            <option value="Chanod">Chanod</option>
                            <option value="Chanod Colony">Chanod Colony</option>
                            <option value="Chhiri">Chhiri</option>
                            <option value="GIDC">GIDC</option>
                            <option value="Kanchanagar">Kanchanagar</option>
                        </select>
                        {errors.area && <p className="text-red-500 text-xs italic">{errors.area}</p>}


                    </div>
                </div>

                <div className="mb-[5px]">
                    <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="note">
                        Want to write somthing?
                    </label>
                    <textarea
                        className="shadow  appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Enter Message"
                        name="message"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); handleChange() }}
                    />
                </div>
                <div className="flex items-center justify-between">

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
                <div className="pl-5 pt-[5px] mx-2  font-sans text-xs">
                    <ol className="list-decimal ">
                        <p className='font-semibold underline text-red-500 '> Note:</p>
                        <li className="mb-1 text-gray-700">Only paper and plastic materials will be accepted; other materials will be declined.</li>
                        <li className="mb-1 text-gray-700">Please specify the quantity of paper and plastic and ensure they are packed correctly.</li>
                        <li className="mb-1 text-gray-700">We send paper and plastic waste to a recycling company for processing.</li>
                    </ol>
                </div>
            </form>
        </div>
    );
};

export default Recycleform;
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Foodform = ({ onClose }) => {
    // const [formData, setFormData] = useState({
    //     donationtype: '',
    //     quantity: '',
    //     timeofcooking: '',
    //     contactno: '',
    //     addresstocollect: '',
    //     message: '',
    //     addresstodonate: '',
    //     email: '',
    // });
    const [donationtype, setDonationtype] = useState('')
    const [quantity, setQuantity] = useState('')
    const [timeofcooking, setTimeofcooking] = useState('')
    const [contactno, setContactno] = useState('')
    const [addresstocollect, setAddresstocollect] = useState('')
    const [message, setMessage] = useState('')
    const [area, setArea] = useState('')
    const [email, setEmail] = useState('')
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

        let hasErrors = false;
        const newErrors = {};

        if (!donationtype.trim()) {
            newErrors.donationtype = 'Food Type is required';
            hasErrors = true;
        }

        // Validate quantity
        if (!quantity.trim()) {
            newErrors.quantity = 'Quantity is required';
            hasErrors = true;
        }

        if (!area.trim()) {
            newErrors.area = 'Area is required';
            hasErrors = true;
        }

        // Validate contact number
        const contactnoPattern = /^[0-9]{10}$/;
        if (!contactno.trim()) {
            newErrors.contactno = 'Phone Number is required';
            hasErrors = true;
        } else if (!contactnoPattern.test(contactno)) {
            newErrors.contactno = 'Invalid Phone Number';
            hasErrors = true;
        }

        // Validate email
        // if (!email.trim()) {
        //     newErrors.email = 'Email is required';
        //     hasErrors = true;
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     newErrors.email = 'Please enter a valid email address';
        //     hasErrors = true;
        // } else if (emailid !== email) {
        //     newErrors.email = 'Please enter the registered email address';
        //     hasErrors = true;
        // }

        // Validate address to donate
        // if (!addresstodonate.trim()) {
        //     newErrors.addresstodonate = 'Address to Donate is required';
        //     hasErrors = true;
        // }

        // Validate address to collect
        if (!addresstocollect.trim()) {
            newErrors.addresstocollect = 'Address is required';
            hasErrors = true;
        }

        // Set errors if any
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Perform date validation
        const timeOfCookingDate = new Date(timeofcooking);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (isNaN(timeOfCookingDate.getTime())) {
            newErrors.timeofcooking = 'Invalid date and time';
            setErrors(newErrors);
            return;
        }

        if (timeOfCookingDate < yesterday) {
            newErrors.timeofcooking = 'Date and time cannot be before yesterday';
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/donate/donation', { donationtype, quantity, contactno, addresstocollect, message, email, username, timeofcooking,area })
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

        if (timeofcooking.trim()) {
            delete errors.timeofcooking;
        }

        if (contactno.trim()) {
            delete errors.contactno;
        }

        if (area.trim()) {
            delete errors.area;
        }

        if (email.trim()) {
            delete errors.email;
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
        setTimeofcooking('');
        setAddresstocollect('');
        // setAddresstodonate('');
        // setEmail('');
        setArea('');
        setContactno('');
        setMessage('')
    };


    return (

        <div className="flex justify-center items-center min-h-screen m-4">

            <form className="w-full max-w-lg border-4 rounded-md py-[5px] px-[20px] mx-1 bg-gray-200" onSubmit={handleSubmit}>
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
                <div className="mb-2">

                    <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="foodType">
                        Food Type<span className='text-red-500 ml-1'>*</span>
                    </label>
                    <input
                        className="shadow capitalize appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="foodType"
                        type="text"
                        placeholder="Enter Food Type"
                        name="foodType"
                        value={donationtype}
                        onChange={(e) => { setDonationtype(e.target.value); handleChange() }}
                    />
                    {errors.foodType && <p className="text-red-500 text-xs italic">{errors.foodType}</p>}

                </div>
                <div className='flex justify-between lg:flex-row flex-col lg:gap-4'>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="quantity">
                            Quantity<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <input
                            className="shadow capitalize appearance-none border rounded w-full lg:w-[6cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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


                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="cookingTime">
                            Time of Cooking<span className='text-red-500 ml-1'>*</span>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full lg:w-[5.5cm] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cookingTime"
                            type="datetime-local"
                            name="cookingTime"
                            value={timeofcooking}
                            onChange={(e) => { setTimeofcooking(e.target.value); handleChange() }}
                            required
                        />
                        {errors.timeofcooking && <p className="text-red-500 text-xs italic">{errors.timeofcooking}</p>}
                    </div>
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

                <div className="mb-2">
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
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>

                </div>
                <div className="pl-5 pt-[5px] mx-2  font-sans text-xs">
                    <ol className="list-decimal ">
                        <p className='font-semibold underline text-red-500'> Note:</p>
                        <li className="mb-1 text-gray-700">Please ensure that the food is fresh and properly packaged.</li>
                        <li className="mb-1 text-gray-700">Avoid donating food that has passed its expiration date.</li>
                        <li className="mb-1 text-gray-700">For large donations, please contact us in advance to arrange pickup or drop-off.</li>
                    </ol>
                </div>
            </form>

        </div>

    );
};

export default Foodform;
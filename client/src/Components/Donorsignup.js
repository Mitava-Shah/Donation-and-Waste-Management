import React, { useState } from 'react';
import axios from 'axios';

const Donorsignup = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPinCode] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
            hasErrors = true;
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            hasErrors = true;
        }

        if (!contactNo.trim()) {
            newErrors.contactNo = 'Contact number is required';
            hasErrors = true;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            hasErrors = true;
        }

        if (!username.trim()) {
            newErrors.username = ' Username is required';
            hasErrors = true;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            hasErrors = true;
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            hasErrors = true;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            hasErrors = true;
        }

        if (!address.trim()) {
            newErrors.address = 'Address is required';
            hasErrors = true;
        }

        if (!city.trim()) {
            newErrors.city = 'City is required';
            hasErrors = true;
        }

        if (!pincode.trim()) {
            newErrors.pincode = 'Pin code is required';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:3000/donor/donorsignup', { firstName, lastName, contactNo, email, username, password, address, city, pincode }).then(response => {
            if (response.data.status) {
                onClose();
            }
        }).catch(error => {
            console.error("Registration error:", error);
            setIsLoading(false);
            alert("Registration failed.Please check all the details properly!")
        })


        // TODO: Add your signup logic here
        console.log('First Name:', firstName, 'Last Name:', lastName, 'Contact No.:', contactNo, 'Email:', email, 'username:', username, 'Password:', password, 'Address:', address, 'City:', city, 'Pin Code:', pincode);
    };

    return (
        <div className="h-screen flex justify-center items-center py-7 px-32">
            <button className="relative left-[35rem] top-[-18.5rem] text-gray-600 hover:text-gray-800" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="flex flex-col justify-center items-center sm:w-[15cm] w-[10cm] m-4 rounded bg-gray-200">
                <h2 className="text-blue-950 text-3xl font-sans font-semibold flex items-center justify-center px-5">Donor Sign-up</h2>
                <form className="mt-7 w-[85%]" onSubmit={handleSubmit}>
                    <div className="flex gap-11">
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">First name</label>
                            <input
                                type="text"
                                className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                        </div>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Last name</label>
                            <input
                                type="text"
                                className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className='flex gap-11'>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Contact no.</label>
                            <input
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your contact number"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                            />
                            {errors.contactNo && <p className="text-red-500 text-xs italic">{errors.contactNo}</p>}
                        </div>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Email ID</label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="mb-2 w-full">
                        <label className="block text-gray-600 text-sm font-medium mb-1">Create Username</label>
                        <input
                            type="text"
                            className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-2 ">
                        <label className="block text-gray-600 text-sm font-medium mb-1">Create password</label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 text-sm font-medium mb-1">Confirm password</label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your full address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                    </div>
                    <div className="flex gap-11">
                        <div className="mb-4 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">City</label>
                            <input
                                type="text"
                                className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
                        </div>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Pin code</label>
                            <input
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your city code"
                                value={pincode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                            {errors.pinCode && <p className="text-red-500 text-xs italic">{errors.pinCode}</p>}
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                        Sign up
                    </button>
                    <div className=" text-right justify-between mt-3 mb-1">
                        Already a member?
                        <a onClick={onClose} className="text-blue-500 text-sm hover:underline ml-2" href="#">
                            Login Now
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Donorsignup;

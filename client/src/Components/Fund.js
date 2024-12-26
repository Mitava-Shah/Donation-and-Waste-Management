import React, { useState } from 'react';
import axios from 'axios';

const Gpay = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState({});
    const [amountError, setAmountError] = useState('');
    const emailid=localStorage.getItem("email")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('YOUR_PAYMENT_API_ENDPOINT', {
                name,
                email,
                amount,
                note
            });

            // Handle response from payment gateway
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

        let hasErrors = false;
        const newErrors = {};
        if (emailid !== email) {
            newErrors.email = 'Please enter the registered email address';
            hasErrors = true;
        }
        if(hasErrors){
            setErrors(newErrors);
            return;
        }
    };

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        if (newAmount === "other") {
            setAmount('');
            setAmountError('');
        } else {
            setAmount(newAmount);
            if (parseInt(newAmount) < 50) {
                setAmountError('Amount should not be less than 50');
            } else {
                setAmountError('');
            }
        }


    };


    const handleChange = (e) => {
        if (email.trim()) {
            delete errors.email;
        }
    }

    const handleClearForm = () => {
        setName('');
        setEmail('');
        setAmount('');
        setNote('');
        setAmountError('');
    };

    return (
        <div className="flex justify-center items-center h-screen">
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
                {/* <h2 className="text-2xl font-semibold mb-4 text-center">Make a Donation</h2> */}
                <div className="mb-[5px]">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-semibold font-sans mb-1">Full Name<span className='text-red-500 ml-1'>*</span></label>
                    <input type="text" id="name" placeholder="Enter your full name" className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-[5px]">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold font-sans mb-1">Email Address<span className='text-red-500 ml-1'>*</span></label>
                    <input type="email" id="email" placeholder="Enter your registered email" className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => { setEmail(e.target.value); handleChange() }} required
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-[5px]">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-semibold font-sans mb-1">Amount (INR)<span className='text-red-500 ml-1'>*</span></label>
                    <input type="number" id="amount" placeholder="Amount should not be less then 50" className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={amount} onChange={handleAmountChange} required />
                    {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
                    <div className="flex items-center mt-2">
                        <span className=" mr-2 text-gray-700 text-xs font-semibold font-sans mb-1">Choose Amount:</span>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2" value="50" onClick={handleAmountChange}>50</button>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2" value="100" onClick={handleAmountChange}>100</button>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2" value="250" onClick={handleAmountChange}>250</button>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2" value="500" onClick={handleAmountChange}>500</button>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2" value="1000" onClick={handleAmountChange}>1000</button>
                        <button className="bg-gray-100 text-gray-700 py-1 px-1 rounded mr-2 text-xs" value="other" onClick={handleAmountChange}>Other Amount</button>
                    </div>
                </div>
                <div className="mb-[5px]">
                    <label htmlFor="note" className="block text-gray-700 font-sans text-sm font-semibold mb-1">Want to write somthing?</label>
                    <textarea id="note" placeholder="Enter Message" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <div className="flex justify-between ">
                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClearForm}>Clear</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">Pay Now</button>
                </div>
                <div className="pl-5 pt-[5px] mx-2  font-sans text-xs">
                    <ol className="list-decimal ">
                        <p className='font-semibold underline text-red-500'> Note:</p>
                        <li className="mb-1 text-gray-700">Amount should not be less then 50 INR.</li>
                        <li className="mb-1 text-gray-700">Any amount above 50 INR is accepted.</li>
                        <li className="mb-1 text-gray-700">We donate in selected areas between Vapi to Surat.</li>
                    </ol>
                </div>
            </form>
        </div>
    );
};

export default Gpay;

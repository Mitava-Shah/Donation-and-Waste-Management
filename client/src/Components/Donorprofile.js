import React, { useState , useEffect} from "react";
import axios from 'axios'

function Donerprofile() {
    
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [contactNo, setContactNo] = useState("");
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [pincode, setPinCode] = useState("");
    // const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            console.log("username not found in local storage");
            return;
        }
        axios.get(`http://localhost:3000/donor/donors?username=${username}`).then(response => {
            setRecords(response.data);
        }).catch(error => {
            console.log("Error fetching data", error);
        });
    }, []);

    const handleChange = (e, id, field) => {
        const { value } = e.target;
        setRecords(prevRecords =>
            prevRecords.map(record =>
                record._id === id ? { ...record, [field]: value } : record
            )
        );
    };
    
    const handleSubmit = async (e,id) => {
        e.preventDefault();
        const recordToUpdate = records.find(record => record._id === id);
        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:3000/donor/${id}`, {
                firstName: recordToUpdate.firstName,
                lastName: recordToUpdate.lastName,
                contactNo: recordToUpdate.contactNo,
                address: recordToUpdate.address,
                city: recordToUpdate.city,
                pincode: recordToUpdate.pincode
            });
            setIsLoading(false);
            alert("updated successfully")
            window.location.assign("/")

        } catch (error) {
            console.error("Update error:", error);
            setIsLoading(false);
            alert("Update failed")
        }

        // let hasErrors = false;
        // const newErrors = {};

        // if (!firstName.trim()) {
        //     newErrors.firstName = "First name is required";
        //     hasErrors = true;
        // }

        // if (!lastName.trim()) {
        //     newErrors.lastName = "Last name is required";
        //     hasErrors = true;
        // }

        // if (!contactNo.trim()) {
        //     newErrors.contactNo = "Contact number is required";
        //     hasErrors = true;
        // }

      
        // if (!address.trim()) {
        //     newErrors.address = "Address is required";
        //     hasErrors = true;
        // }

        // if (!city.trim()) {
        //     newErrors.city = "City is required";
        //     hasErrors = true;
        // }

        // if (!pincode.trim()) {
        //     newErrors.pinCode = "Pin code is required";
        //     hasErrors = true;
        // }

        // if (hasErrors) {
        //     setErrors(newErrors);
        //     return;
        // }

        // // Submit the form if no errors
        // console.log("Form submitted successfully");
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200 py-7 px-32 shadow-2xl">
            {/* <button className="relative sm:top-[-11.5rem] sm:left-[34rem] top-[-11.5rem] left-[20rem]  text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button> */}
            <div className="flex flex-col justify-center items-center sm:w-[15cm] w-[9cm] rounded-md bg-white">

                <h2 className="text-blue-950 text-3xl font-sans font-semibold flex items-center justify-center mt-4">My Profile</h2>
                {
                    records.map(record=><form className="mt-7 w-[85%]" onSubmit={(e)=>handleSubmit(e,record._id)}>
                    <div className="flex gap-8">
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                First name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your first name"
                                value={record.firstName}
                                onChange={(e) => handleChange(e, record._id, "firstName")}
                            />
                            {/* {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>} */}
                        </div>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Last name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your last name"
                                value={record.lastName}
                                onChange={(e) =>handleChange(e, record._id, "lastName")}
                                />
                            {/* {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>} */}
                        </div>
                    </div>
                    
                        <div className="mb-2 w-full">
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Contact no.
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Enter your contact number"
                                value={record.contactNo}
                                onChange={(e) => handleChange(e, record._id, "contactNo")} 
                            />
                            {/* {errors.contactNo && <p className="text-red-500 text-xs italic">{errors.contactNo}</p>} */}
                        </div>
                        

                    
                    <div className="mb-2">
                        <label className="block text-gray-600 text-sm font-medium mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your full address"
                            value={record.address}
                            onChange={(e) => handleChange(e, record._id, "address")}
                        />
                        {/* {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>} */}
                    </div>
                    <div className="flex gap-8">
                        <div className="mb-4 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your city name"
                                value={record.city}
                                onChange={(e) => handleChange(e, record._id, "city")}
                            />
                            {/* {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>} */}
                        </div>
                        <div className="mb-2 w-[6cm]">
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Pin code
                            </label>
                            <input
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your city code"
                                value={record.pincode}
                                onChange={(e) => handleChange(e, record._id, "pincode")}
                            />
                            {/* {errors.pinCode && <p className="text-red-500 text-xs italic">{errors.pinCode}</p>} */}
                        </div>

                    </div>

                    <button type='submit' className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Save
                    </button>
                    
                </form>)
                }
            </div>
        </div>
    );
}

export default Donerprofile;
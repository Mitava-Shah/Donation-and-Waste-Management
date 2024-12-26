import React, { useState ,useEffect } from 'react';
// import Data from "./data"
import { Link, Outlet } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios'

const Demo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/images').then((response) => {
            setImages(response.data);
        });
    }, []);

    const openOverlay = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsOpen(true);
    };

    const closeOverlay = () => {
        setSelectedImage('');
        setIsOpen(false);
    };
    return (
        <div className=" flex">
            <div className='relative top-10 left-8'>
                <Link to='/'> <IoArrowBackOutline size={24} /></Link>
            </div>
            <div className="mx-auto px-4">
                <p className="text-3xl font-bold text-center mt-8 mb-4 pointer-events-none text-blue-950">Gallery</p>
                <p className="text-lg text-center text-gray-600 mb-8 pointer-events-none">It's not just a photograph; it's about capturing a moment. Be a part of this moment—donate today!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
                    {
                        images.map((a) => (
                            <div key={a._id} className="relative overflow-hidden">
                                <img className="w-full h-64 object-cover"  src={`http://localhost:3000/images/download/${a.path}`} alt={a.description} />
                                <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                                    <button onClick={() => openOverlay(`http://localhost:3000/images/download/${a.path}`)} className="text-white px-4 py-2 bg-gray-800 bg-opacity-75 rounded-lg">View</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="max-w-screen overflow-auto">
                        <div className="relative p-4">
                            <button onClick={closeOverlay} className="absolute top-0 right-0 m-8 text-white bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2">Close X</button>
                            <img src={selectedImage} alt="Selected Project" className="mx-auto max-h-screen lg:w-[35rem] lg:h-[30rem] md:w-[30rem] md:h-[25rem] sm:w-[25rem] sm:h-[20rem] w-[20rem] h-[15rem]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};
export default Demo;

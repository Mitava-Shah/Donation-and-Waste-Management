import React, { useState, useEffect } from 'react'
import G1 from "../assets/gallary1.jpg";
import G2 from "../assets/g2.jpg";
import G3 from "../assets/g3.jpeg";
import G4 from "../assets/g4.avif";
import G5 from "../assets/g5.jpeg";
import G6 from "../assets/g6.jpeg";
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios'

const Minigallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch the last 6 images from MongoDB
        axios.get('http://localhost:3000/images/image') // Adjust the API endpoint as per your server setup
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, []);

    return (
        <>
            <div className='bg-gray-200 pb-[10px] pt-[10px]'>
                <div className='p-0 m-0 box-border grid items-center font-serif border-l-8 border-blue-950  mx-4'>
                    <div className='box-content flex text-black mt-[10px] pl-[10px] h-[30px]    '>
                        <p className='font-semibold  sm:text-[18px] text-[16px]'>GALLERY</p>
                    </div>
        <p className='font-semibold  sm:text-[18px] text-[16px] ml-2'>We have delivered <span className='text-blue-900 font-bold'>Wastage</span> or <span className='text-blue-900 font-bold'>Donations</span> to needy people.</p>
                
                </div>

                {/* <div className=' flex text-black pl-[10px]  h-[30px] p-0 m-0 items-center font-serif border-l-8 border-blue-950  mx-auto '>
                    <div>
                        <p className='font-semibold  sm:text-[25px] text-[16px] text-blue-950'>GALLERY</p>
                    </div>
                    <p className='font-semibold  sm:text-[25px] text-[16px] text-blue-950'> We have delivered<span className='text-gray-900 font-bold'>Wastage </span>or<span className='text-gray-900 font-bold'> Donations </span>to needy people.</p>
                </div> */}
                {/* <p className='text-gray-600 pl-[20px] mt-[10px] font-semibold  mx-auto'>We have delivered <span className='text-gray-900 font-bold'>Wastage </span>or<span className='text-gray-900 font-bold'> Donations </span>to needy people.</p> */}
                <div className=" mt-8 mb-4">
                    <div className=" px-4 justify-center items-center " >
                        <div className=" lg:mx-[10rem]  md:mx-[8rem] sm:mx-[5rem] mx-[3rem] mt-[4rem] lg:gap-y-16 md:gap-x-4 sm:gap-10 gap-8 pb-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-center  ">
                            {images.map((a) =>
                                <div className="overflow-hidden border-4 border-white rounded-lg ">
                                    <img className="w-full h-52 object-cover hover:scale-125 transition-all duration-500" src={`http://localhost:3000/images/download/${a.path}`} alt="" />

                                </div>
                            )
                            }
                        </div>
                        <div className="flex justify-end pr-[10rem]">
                            <button className='bg-gray-800 text-white font-sans font-base text-[20px] p-[5px] rounded  hover:text-black hover:bg-gray-200'><Link to="/Gallery">View More</Link></button>

                        </div>
                    </div>


                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Minigallery

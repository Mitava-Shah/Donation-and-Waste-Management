import React, { forwardRef } from 'react';
const AboutUs = (props, ref) => {
    return (
        <>
        <div ref={ref} className="bg-gray-200 py-12 shadow-md ">
            <div className="flex items-center lg:flex-row flex-col lg:mx-[14rem]">
                 <div className=" sm:text-xl text-xs font-sans font-semibold">
                    <p className=" font-bold font-serif  lg:text-3xl md:text-2xl text-xl text-blue-950 m-4 my-4  mr-[20px] pl-[10px] border-l-8 border-blue-950">ABOUT US</p>

                    <p className='lg:text-xl md:text-base sm:text-base text-sm font-sans font-semibold m-4 mb-4  text-gray-700'>
                        At Charity Nest, we're committed to making a difference in the lives of those in need in the <span className='text-blue-950 font-bold'>Vapi</span> area. Our mission is to create positive change through kindness and generosity. With the support of volunteers, donors, and supporters, we've been able to touch countless lives, offering hope and a brighter future. Join us in spreading kindness and making a lasting difference in the world!
                    </p>
                    
                </div>
                <img className="w-60 h-60  " src="https://cdn-icons-png.flaticon.com/512/6449/6449314.png" alt="" />
            </div>
        </div>
        </>
    );
};

export default forwardRef(AboutUs);
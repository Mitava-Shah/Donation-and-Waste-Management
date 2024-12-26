import React from 'react'
import Donation from "../assets/g11.jpeg"

const Purpose = () => {
  
  return (
    <div className='m-0 p-0 box-border shadow-2xl shadow-black '>
       <div className='bg-white flex items-center justify-between lg:flex-row flex-col py-[4rem] lg:mx-[12rem] '>
       
       <img className=' lg:w-[400px] w-[300px] ' src={Donation} alt="" /> 
       
        <div className='lg:ml-[20px]'>
          <p className='uppercase font-bold font-serif lg:text-3xl md:text-2xl text-xl m-4 my-4 text-start border-l-8 border-blue-950 text-blue-950 ml-[20px] pl-[10px] '>
            What We Do & Why We Do ?
          </p>
          <p className='lg:text-xl md:text-base sm:text-base text-[15px] font-sans font-semibold m-4 mb-4  text-gray-500'>
          Charity Nest revolutionizes donations and waste management by creating a sustainable solution. They redistribute unused items to those in need, promoting a circular economy and reducing waste. Charity Nest also provides educational resources on sustainable living. Their mission is driven by the belief in the power of giving and environmental stewardship.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Purpose

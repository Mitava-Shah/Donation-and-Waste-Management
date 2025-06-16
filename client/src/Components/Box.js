import React, { forwardRef, useState, useEffect } from 'react'
import "../animation.css"
import Clothimg from "../assets/male-clothes.png"
import Footwearimg from "../assets/sneakers.png"
import Stationeryimg from "../assets/stationery.png"
// import Fundimg from "../assets/funding.png"
import Waste from "../assets/waste.png"
import Utensilsimg from "../assets/kitchen.png"
import Foodimg from "../assets/diet.png"
import Food from "./Food"
import Utensils from "./Utensils"
import Cloth from "./Cloth"
import Footwear from "./Footwear"
import Stationery from './Stationery'
import Alert from './Alert'
import Recycle from "./Recycle"
import ReactGA from "react-ga4";

function Box(props, ref) {
  const [isFoodPopupOpen, setIsFoodPopupOpen] = useState(false);
  const [isFootwearPopupOpen, setIsFootwearPopupOpen] = useState(false);
  const [isUtensilsPopupOpen, setIsUtensilsPopupOpen] = useState(false);
  const [isClothPopupOpen, setIsClothPopupOpen] = useState(false);
  const [isStationeryPopupOpen, setIsStationeryPopupOpen] = useState(false);
  const [isRecyclePopupOpen, setIsRecyclePopupOpen] = useState(false);
  const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false)
  const [DonorLogin, setDonorLogin] = useState("")

  const toggleFoodPopup = () => {
    setIsFoodPopupOpen(!isFoodPopupOpen);
    trackEvent('Donation', 'Food Popup Toggled');
  };

  const closeFoodPopup = () => {
    setIsFoodPopupOpen(false);
  };

  const toggleFootwearPopup = () => {
    setIsFootwearPopupOpen(!isFootwearPopupOpen);
  };

  const closeFootwearPopup = () => {
    setIsFootwearPopupOpen(false);
  };

  const toggleUtensilsPopup = () => {
    setIsUtensilsPopupOpen(!isUtensilsPopupOpen);
  };

  const closeUtensilsPopup = () => {
    setIsUtensilsPopupOpen(false);
  };

  const toggleClothPopup = () => {
    setIsClothPopupOpen(!isClothPopupOpen);
  };

  const closeClothPopup = () => {
    setIsClothPopupOpen(false);
  };

  const toggleStationeryPopup = () => {
    setIsStationeryPopupOpen(!isStationeryPopupOpen);
  };

  const closeStationeryPopup = () => {
    setIsStationeryPopupOpen(false);
  };

  const toggleAlertPopup = () => {
    setIsAlertPopupOpen(!isAlertPopupOpen);
  };

  const closeAlertPopup = () => {
    setIsAlertPopupOpen(false);
  };

  const toggleRecyclePopup = () => {
    setIsRecyclePopupOpen(!isRecyclePopupOpen);
  };

  const closeFundPopup = () => {
    setIsRecyclePopupOpen(false);
  };

  const trackEvent = (category, action) => {
    ReactGA.event({
      category,
      action
    });
  };

 
  useEffect(() => {
    // Check if token is available in local storage
    const token = localStorage.getItem('Donortoken');
    if (token) {
      setDonorLogin(true);
    }

  }, []);

  return (
    <div ref={ref} className='bg-gray-200 pt-[40px]'>
      <div className='p-0 m-0 box-border grid items-center font-serif border-l-8 border-blue-950  mx-4'>
        <div className='box-content flex text-black mt-[10px] pl-[10px] h-[30px]'>
          <p className='font-semibold  sm:text-[18px] text-[14px]'>YOU CAN DONATE</p>
          <div className='overflow-hidden'>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>UTENSILS</span>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>FOOD</span>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>STATIONARY</span>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>CLOTHES</span>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>FOOTWEAR</span>
            <span className='block pl-[10px] h-[100%] animate-[Spin_8s_infinite] font-bold text-blue-900  sm:text-[20px] text-[14px]'>UTENSILS</span>
          </div>
        </div>
        <p className='font-semibold  sm:text-[18px] text-[14px] ml-2'>YOU CAN ALSO GIVE WASTE <span className='text-blue-900 font-bold'>PLASIC/PAPER</span> TO US & WE WILL <span className='text-blue-900 font-bold'>RECYCLE</span> IT.</p>

      </div>
      <div class=" mx-[10rem] mt-[2rem] lg:gap-y-16 md:gap-x-4 sm:gap-10 gap-8 pb-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-center ">
        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm] m-auto rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Clothimg} alt="" />
          </div>
          <div className='flex justify-center items-center px-[1px]'>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Cloths</p>
              <p className='font-sans  text-gray-600 font-semibold'>Share your wear, Show you care.</p>
              {DonorLogin ? <button onClick={toggleClothPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>}
            </div>
          </div>
        </div>
        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm] m-auto rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Footwearimg} alt="" />
          </div>
          <div className='flex justify-center items-center px-[1px]'>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Footwear</p>
              <p className='font-sans text-gray-600 font-semibold'>Your old shoes, their new beginnings.</p>
              {DonorLogin ? <button onClick={toggleFootwearPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>}
            </div>
          </div>
        </div>
        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm]  m-auto rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Foodimg} alt="" />
          </div>
          <div className='flex justify-center items-center'>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Food</p>
              <p className='font-sans text-gray-600 font-semibold'>Feed the need.</p>
              {DonorLogin ? <button onClick={toggleFoodPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>}
            </div>
          </div>
        </div>
        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm] m-auto rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Utensilsimg} alt="" />
          </div>
          <div className='flex justify-center items-center px-[1px]'>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Utensils</p>
              <p className='font-sans text-gray-600 font-semibold'>Fill empty shelves, donate utensils.</p>
              {DonorLogin ? <button onClick={toggleUtensilsPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>}
            </div>
          </div>
        </div>
        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm] m-auto rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Stationeryimg} alt="" />
          </div>
          <div className='flex justify-center items-center px-[5px] '>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Stationery</p>
              <p className='font-sans text-gray-600 font-semibold'>Stationery donation, a step toward a brighter nation.</p>
              {DonorLogin ? <button onClick={toggleStationeryPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Donate Now</button>}
            </div>
          </div>
        </div>

        <div className=' bg-white lg:w-[7cm] lg:h-[6.5cm] md:w-[6cm] md:h-[6cm] sm:w-[6cm] sm:h-[6cm] w-[5.5cm] m-auto  rounded-md shadow-lg '>
          <div className=' flex justify-center items-end h-[2.5cm]'>
            <img className='w-[1.5cm] h-[1.5cm]' src={Waste} alt="" />
          </div>
          <div className='flex justify-center items-center px-[1px]'>
            <div className='text-center'>
              <p className='text-[20px] font-sans font-bold '>Recycle</p>
              <p className='font-sans text-gray-600 font-semibold'>Recycle paper, recycle plastic, keep our planet fantastic.</p>
                {DonorLogin ? <button onClick={toggleStationeryPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Give now</button>
                :
                <button onClick={toggleAlertPopup} className='bg-blue-950 text-white px-[10px] py-[5px] my-[10px]  text-[15px] font-semibold rounded-sm font-sans  hover:text-black hover:bg-gray-200'>Give Now</button>}
        </div>
          </div>
        </div>
      </div>
      {isFoodPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Food onClose={closeFoodPopup} />
        </div>
      )}
      {isFootwearPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Footwear onClose={closeFootwearPopup} />
        </div>
      )}
      {isUtensilsPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Utensils onClose={closeUtensilsPopup} />
        </div>
      )}
      {isClothPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Cloth onClose={closeClothPopup} />
        </div>
      )}
      {isStationeryPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Stationery onClose={closeStationeryPopup} />
        </div>
      )}
      {isAlertPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Alert onClose={closeAlertPopup} />
        </div>
      )}
      {isRecyclePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Recycle onClose={closeFundPopup} />
        </div>
      )}
    </div>
  )
}
export default forwardRef(Box);
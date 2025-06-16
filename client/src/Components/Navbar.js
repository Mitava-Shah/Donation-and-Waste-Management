import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import Profile from "../assets/profile.png"
import Logo from "../assets/logo.png"
import gmail from "../assets/gmail.png"
// import Video from './Video';
import Videobg from "../assets/videobg.mp4"
import Box from './Box';
import Purpose from './Purpose';
import Minigallery from './Minigallery';
import Donerlogin from './Donerlogin';
import Agentlogin from './Agentlogin';
import Adminlogin from "./Adminlogin"
import AboutUs from './Aboutus';
import Contactus from "./Contactus"
import axios from 'axios'
function Navbar() {
  const [AgentLogin, setAgentLogin] = React.useState(false);
  const [DonorLogin, setDonorLogin] = React.useState(false);
  const [AdminLogin, setAdminLogin] = React.useState(false);


  useEffect(() => { // Check if token is available in local storage
    const token = localStorage.getItem("Agenttoken");
    if (token) {
      setAgentLogin(true);
    }
  }, []);

  useEffect(() => { // Check if token is available in local storage
    const token = localStorage.getItem("Donortoken");
    if (token) {
      setDonorLogin(true);
    }
  }, []);

  useEffect(() => { // Check if token is available in local storage
    const token = localStorage.getItem("Admintoken");
    if (token) {
      setAdminLogin(true);
    }
  }, []);

  const [record, setRecord] = useState([])
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.log("username not found in local storage");
      return;
    }

    axios.get(`http://localhost:3000/donor/donors?username=${username}`).then(response => {
      setRecord(response.data);
    }).catch(error => {
      console.log("Error fetching data", error);
    });
  }, []);

  const handleAgentLogout = () => {
    localStorage.removeItem("Agenttoken");
    localStorage.removeItem("Agentusername")
    setAgentLogin(false);
    window.location.assign("/");
  };

  const handleDonorLogout = () => {
    localStorage.removeItem("Donortoken");
    localStorage.removeItem("username")
    setDonorLogin(false);
    window.location.assign("/");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("Admintoken");
    setAdminLogin(false);
    window.location.assign("/");
  };


  const refDonate = useRef(null);
  const refContactus = useRef(null);
  const refAboutus = useRef(null);

  const handleDonate = () => {
    refDonate.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const handleButton = () => {
    refDonate.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const handleAboutus = () => {
    refContactus.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const handleContactus = () => {
    refAboutus.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isLoginOptionsOpen, setIsLoginOptionsOpen] = useState(false);
  const [isDonorLoginPopupOpen, setIsDonorLoginPopupOpen] = useState(false);
  const [isAgentLoginPopupOpen, setIsAgentLoginPopupOpen] = useState(false);
  const [isAdminLoginPopupOpen, setIsAdminLoginPopupOpen] = useState(false);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };

  const toggleLoginOptions = () => {
    setIsLoginOptionsOpen(!isLoginOptionsOpen);
  };


  const toggleDonorLoginPopup = () => {
    setIsDonorLoginPopupOpen(!isDonorLoginPopupOpen);
  };

  const closeDonorLoginPopup = () => {
    setIsDonorLoginPopupOpen(false);
  };

  const toggleAgentLoginPopup = () => {
    setIsAgentLoginPopupOpen(!isAgentLoginPopupOpen);
  };

  const closeAgentLoginPopup = () => {
    setIsAgentLoginPopupOpen(false);
  };

  const toggleAdminLoginPopup = () => {
    setIsAdminLoginPopupOpen(!isAdminLoginPopupOpen);
  };

  const closeAdminLoginPopup = () => {
    setIsAdminLoginPopupOpen(false);
  };


  return (
    <>
      <div className='p-0 m-0 box-border  bg-blue-950 '>
        <nav className="  mx-auto">
          <div className="flex flex-wrap items-center justify-between mx-[10px] p-[8px] sm:p-[10px] md:p-[12px] lg:p-[16px]">
            <img src={Logo} className="h-[32px] w-[3cm] sm:h-[36px] sm:w-[4cm] md:h-[40px] md:w-[4.5cm] lg:h-[48px] lg:w-[5cm] " alt="Logo" />
            <div className='flex'>
              {
                DonorLogin &&
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button type="button" className="hidden text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={toggleUserProfile}>
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={Profile} alt="user photo" />
                  </button>
                  <div className={`z-50
                     ${isUserProfileOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-16 right-[3rem]`}>
                    {
                      record.map((a) => <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">{a.username}</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{a.email}</span>
                      </div>)
                    }
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My profile</a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                      </li>

                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
                      </li>
                    </ul>
                  </div>

                </div>
              }
              <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleMenu}>
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div className={`items-center justify-between mx-2 w-[94%] md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'} absolute top-12 left-2  md:static md:top-auto `}>
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:bg-blue-950 dark:border-gray-700">
                  <li>
                    <a href="#" onClick={() => { toggleMenu(); }} className="block py-2 px-3 text-white font-sans font-normal bg-blue-950 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                  </li>
                  <li>
                    <a onClick={() => { handleDonate(); toggleMenu(); }} href="#" className="block py-2 px-3 font-sans font-normal hover:text-white md:text-gray-100 rounded hover:bg-blue-950 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Donate</a>
                  </li>
                  <li>
                    <Link to="/Gallery" onClick={() => { toggleMenu(); }} className="block py-2 px-3 font-sans font-normal hover:text-white md:text-gray-100 rounded hover:bg-blue-950 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Gallery</Link>
                  </li>
                  <li>
                    <a onClick={() => { handleAboutus(); toggleMenu(); }} href="#" className="block py-2 px-3 font-sans font-normal hover:text-white md:text-gray-100 rounded hover:bg-blue-950 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
                  </li>
                  <li>
                    <a onClick={() => { handleContactus(); toggleMenu(); }} href="#" className="block py-2 px-3 font-sans font-normal hover:text-white md:text-gray-100 rounded hover:bg-blue-950 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Us</a>
                  </li>
                  {!DonorLogin &&
                    <li>
                      <a href="#" className="block py-2 px-3 font-sans font-normal md:text-gray-100 rounded hover:text-white hover:hover:bg-blue-950 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={toggleLoginOptions}>Login/Signup</a>
                      <div className={`${isLoginOptionsOpen ? 'block' : 'hidden'} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow dark:bg-gray-700 dark:divide-gray-600 absolute md:top-16 top-17 `}>
                        <ul className="py-2 px-2 font-normal font-sans " aria-labelledby="login-menu-button">
                          <li>
                            <a onClick={() => {
                              toggleDonorLoginPopup();
                              toggleLoginOptions();
                              toggleMenu();
                            }} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Donor</a>
                          </li>
                          <li>
                            <a onClick={() => {
                              toggleAgentLoginPopup();
                              toggleLoginOptions();
                              toggleMenu();
                            }} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Agent</a>
                          </li>
                          <li>
                            <a onClick={() => {
                              toggleAdminLoginPopup();
                              toggleLoginOptions();
                              toggleMenu();
                            }} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  }

                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-gray-200 py-1 ">
          <div className=" px-[20px] py-1  mx-auto ">
            <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between">
              <div className=" w-full lg:w-1/2 md:mb-0 mb-2 sm:mb-4 lg:mb-0 lg:ml-0  sm:text-center md:text-left lg:text-left text-center flex items-center">
                <div className='flex '>
                  <FaPhoneAlt className="text-xl mb-3 text-blue-950 " />
                  <a className="hover:text-blue-700 text-md text-gray-700 pl-2 hover:underline" href="tel:+919726378756">+91 9726378756</a>
                </div>
              </div>
              <div className="w-full lg:w-1/2  text-center sm:text-right md:text-right lg:text-right ">
                <div className="flex justify-center md:justify-end lg:justify-end">
                  <a href="https://www.facebook.com" target='_blank'><svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2.5 text-[#1877f2]"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg></a>
                  <a href="https://www.instagram.com/itsmii_317 " target='_blank'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 text-[#c13584]" fill="currentColor" viewBox="0 0 24 24"><path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg></a>
                  <a href="https://www.youtube.com" target='_blank'><svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5  mr-2.5 text-[#ff0000]"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg></a>
                  <a href="https://www.linkedin.com/in/mitva-shah317" target='_blank'><svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5  mr-2.5 text-[#0077b5]"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg></a>
                  <a href="mailto:mitvashah792@gmail.com" target='_blank'><img src={gmail} alt="gmail" className=" h-5 w-5 mr-2.5 " /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Navbar */}
      {/* Video */}
      <div className='m-0 p-0 box-border font-[sans-serif] flex justify-center items-center bg-gray-300'>
        <video src={Videobg} className='w-full h-[250px] sm:h-[300px] md:h-[450px] object-cover ' autoPlay loop muted />
        <div className='absolute w-full flex flex-col justify-center items-center text-center text-white '>
          <h1 className='text-2xl font-[500] sm:text-4xl sm:font-[500] md:text-5xl md:font-[500] lg:text-5xl lg:font-[500]  font-serif '>Alone we can do little,</h1>
          <h1 className='text-2xl font-[500] sm:text-4xl sm:font-[500] md:text-5xl md:font-[500] lg:text-5xl lg:font-[500]  font-serif'>together we can do so much.</h1>
          <button onClick={handleButton} className=' bg-blue-950 opacity-80 text-gray-200  font-sans  rounded-[0.3rem] px-[10px] py-[10px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-[15px]  mt-[2rem] hover:font-semibold '>Donate Now</button>
        </div>
      </div>
      <Box ref={refDonate} />
      <Minigallery />
      <Purpose />
      <AboutUs ref={refAboutus} />
      <Contactus ref={refContactus} />
      {isDonorLoginPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Donerlogin onClose={closeDonorLoginPopup} />
        </div>
      )}
      {isAgentLoginPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Agentlogin onClose={closeAgentLoginPopup} />
        </div>
      )}
      {isAdminLoginPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Adminlogin onClose={closeAdminLoginPopup} />
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Navbar;



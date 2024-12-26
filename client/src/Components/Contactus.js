import React,{forwardRef} from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";




const Contact = (props,ref) => {
    const email = "mitvashah792@gmail.com";

    const handleEmailClick = () => {
      window.location.href = `mailto:${email}`;
    };
    return (
      <div ref={ref} className="bg-white text-black m-4 container mx-auto">
        <h1 className="text-3xl mb-5 font-serif font-semibold text-blue-950 border-l-8 border-blue-950 p-[10px] ">CONTACT US</h1>
        <div className="bg-white rounded-lg mb-5">
          <h2 className="text-xl mb-3 pl-[20px] font-semibold text-gray-600">Get in touch and let us know how we can help.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-200 p-5 rounded-lg">
             <div className='flex'>
             <FaLocationDot className="text-2xl mb-3" />
              <h3 className="text-lg mb-2 ml-2">Address</h3>
             </div>
              <p>Plot No-14, ROFEL BBA AND BCA College, 5, Chharwada Rd, Gurukrupa Society, ROFEL, GIDC Campus, Vapi, Chharwada, Gujarat 396191 </p>
            </div>
            <div className="bg-gray-200 p-5 rounded-lg">
             <div className='flex'> <FaPhoneAlt className="text-2xl mb-3" />
              <h3 className=" text-lg mb-2 ml-2">Phone</h3>
              </div>
              <a className="hover:text-blue-700 flex" href="tel:+917600295356">+91 7600295356</a>
              <a className="hover:text-blue-700 " href="tel:+919726378756">+91 9726378756</a>
            </div>
            <div className="bg-gray-200 p-5 rounded-lg">
              <div className='flex'>
              <MdEmail className="text-2xl mb-3" />
              <h3 className="text-lg mb-2 ml-2">Email</h3>
              </div>
              <p className="text-base mb-3 cursor-pointer hover:text-blue-900" onClick={handleEmailClick}>mitvashah792@gmail.com</p> 
            </div>
            <div className="bg-gray-200 p-5 rounded-lg">
              <div className='flex'>
              <RiMessage2Fill className="text-2xl mb-3" />
              <h3 className="text-lg mb-2 ml-2">Chat</h3>
              </div>
              <p className="text-base mb-3 cursor-pointer hover:text-blue-900" onClick={handleEmailClick}>mitvashah792@gmail.com</p> 
            </div>
          </div>
        </div> 
      </div> 
    );
  }
export default forwardRef(Contact);

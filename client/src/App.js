// App.js
import './App.css';
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AnalyticsTracker from './Components/AnalyticsTracker'; // Import the new component

import Navbar from './Components/Navbar';
import Gallery from "./Components/Gallery";
import Donorlogin from "./Components/Donerlogin";
import Agentlogin from './Components/Agentlogin';
import Agentsignup from "./Components/Agentsignup";
import Donorsignup from './Components/Donorsignup';
import Agentpanel from './Components/Agentpanel';
import Donorpanel from './Components/Donorpanel';
import Adminsignup from './Components/adminsignup';
import Adminlogin from './Components/Adminlogin';
import Adminpanel from './Components/Adminpanel';
import Donorpanding from './Components/Donorpanding';
import Donorhistory from './Components/Donorhistory';
import Donorprofile from './Components/Donorprofile';
import Pandingcollection from './Components/Pandingcollection';
import Collectionhistory from './Components/Collectionhistory';
import Agentprofile from './Components/Agentprofile';
import Adminpanding from './Components/Adminpanding';
import Donationhistory from './Components/Donationhistory';
import Agentdetail from './Components/Agentdetail';
import Donordetail from './Components/Donordetail';
import Agentassign from "./Components/Agentassign";
import Food from './Components/Food';
import Admingallery from './Components/Admingallery';
import Donationaddress from './Components/Donationaddress';

const agentrouter = createBrowserRouter([
  { path: '/agentpanel', Component: Agentpanel },
  { path: '/agentpandingcollection', Component: Pandingcollection },
  { path: '/agentcollectionhistory', Component: Collectionhistory },
  { path: '/agentprofile', Component: Agentprofile },
  { path: '/donationaddress', Component: Donationaddress },
  { path: '/Gallery', Component: Gallery }
]);

const donorrouter = createBrowserRouter([
  { path: '/', Component: Navbar },
  { path: '/donorpanel', Component: Donorpanel },
  { path: '/donorpanding', Component: Donorpanding },
  { path: '/donorhistory', Component: Donorhistory },
  { path: '/donorprofile', Component: Donorprofile },
  { path: '/donation', Component: Food },
  { path: '/Gallery', Component: Gallery }
]);

const adminrouter = createBrowserRouter([
  { path: '/adminpanel', Component: Adminpanel },
  { path: '/adminpanding', Component: Adminpanding },
  { path: '/donationhistory', Component: Donationhistory },
  { path: '/agentdetail', Component: Agentdetail },
  { path: '/Gallery', Component: Gallery },
  { path: '/admingallery', Component: Admingallery },
  { path: '/agentassign', Component: Agentassign },
  { path: '/donordetail', Component: Donordetail }
]);

const logRouter = createBrowserRouter([
  { path: '/adminsignup', Component: Adminsignup },
  { path: '/', Component: Navbar },
  { path: '/adminlogin', Component: Adminlogin },
  { path: '/agentsignup', Component: Agentsignup },
  { path: '/agentlogin', Component: Agentlogin },
  { path: '/donorsignup', Component: Donorsignup },
  { path: '/donorlogin', Component: Donorlogin },
  { path: '/Gallery', Component: Gallery },
  { path: '/donation', Component: Food }
]);

function App() {
  const [AgentLogin, setAgentLogin] = React.useState(false);
  const [DonorLogin, setDonorLogin] = React.useState(false);
  const [AdminLogin, setAdminLogin] = React.useState(false);

  useEffect(() => {
    // Check if token is available in local storage
    const token = localStorage.getItem('Agenttoken');
    if (token) {
      setAgentLogin(true);
    }
  }, []);

  useEffect(() => {
    // Check if token is available in local storage
    const token = localStorage.getItem('Donortoken');
    if (token) {
      setDonorLogin(true);
    }
  }, []);

  useEffect(() => {
    // Check if token is available in local storage
    const token = localStorage.getItem('Admintoken');
    if (token) {
      setAdminLogin(true);
    }
  }, []);

  return (
    <>
      <AnalyticsTracker /> {/* Add this line */}
      {!AgentLogin && !DonorLogin && !AdminLogin ? <RouterProvider router={logRouter} /> : null}
      {AgentLogin ? <RouterProvider router={agentrouter} /> : null}
      {DonorLogin ? <RouterProvider router={donorrouter} /> : null}
      {AdminLogin ? <RouterProvider router={adminrouter} /> : null}
    </>
  );
}

export default App;

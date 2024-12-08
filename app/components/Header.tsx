
"use client"

import Link from 'next/link'; // Import Link from Next.js
import { IoMenu } from 'react-icons/io5';
import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'; // Correct import for Next.js 13+
import { TbReport } from "react-icons/tb";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineRecommend } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import { BsCalculator } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBox2Heart } from "react-icons/bs";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (href: string) => pathname === href;
  
  return (
    <>
    <nav className='bg-black h-[10vh]'>
        <div className='w-[98%] h-full mx-auto text-white flex  '>

          <div className='w-2/5 h-full  flex  items-center'> <IoMenu className="text-5xl  hover:text-gray-300 hover:cursor-pointer" onClick={toggleSidebar} /> </div>
          
          <div className='w-1/5 h-full  flex justify-center items-center'> <img className=" h-12  " src="/images/PWlogo.png" alt="" /> </div>
          <div className='w-2/5 h-full  flex justify-end items-center'> 
            <ul className='my-auto flex gap-6'>

              <Link href="/favorites">
                <BsBox2Heart  className="text-5xl my-auto hover:text-gray-200 hover:cursor-pointer" />
              </Link>

              <Link href="/vehiclesinfo">
                <IoIosHome  className="text-5xl my-auto hover:text-gray-200 hover:cursor-pointer" />
              </Link>

              {/* <Link className="bg-transparent text-xl text-white px-4 py-2 border border-gray-300 rounded-lg mx-auto  hover:text-gray-300 hover:border-gray-300 transition-colors duration-300" href="/userinterface">Home</Link> */}
              {/* <IoPersonCircleOutline className="text-5xl my-auto hover:text-gray-200 hover:cursor-pointer" /> */}

              <Link href="/profileinfo">
                <FaUserCog  className="text-5xl my-auto hover:text-gray-200 hover:cursor-pointer" />
              </Link>
            </ul>
          </div>
    
        </div>
    </nav>

    <aside className={`fixed top-0 left-0 w-1/5 h-full bg-white shadow-lg transition-transform  duration-1000 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}>
        
      {/* Sidebar content here */}

      <div className='flex flex-col bg-white text-center'>
        
        <Link href="" className='flex justify-center items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium hover:cursor-pointer' onClick={toggleSidebar}>
          <IoCloseCircleOutline className="text-3xl mx-3" />
          Close
        </Link>

        <Link href="/vehiclesinfo" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/vehiclesinfo') ? 'bg-zinc-800 text-white' : ''}`}>
          <BsCalculator className="text-3xl mx-3" />
          1-Vehicles Info
        </Link>

        <Link href="/pricecalculator" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('') ? 'bg-zinc-800 text-white' : ''}`}>
          <BsCalculator className="text-3xl mx-3" />
          2-Price Calculator
        </Link>

        <Link href="/calculate-taxes" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-taxes') ? 'bg-zinc-800 text-white' : ''}`}>
          <TbReceiptTax className="text-3xl mx-3" />
          3-Calculate Taxes
        </Link>

        <Link href="/calculate-loan-financing" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-loan-financing') ? 'bg-zinc-800 text-white' : ''}`}>
          <GiTakeMyMoney className="text-4xl mx-3" />
          4-Calculate Loan Financing
        </Link>

        <Link href="/recommendations" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/get-recommendations') ? 'bg-zinc-800 text-white' : ''}`}>
          <MdOutlineRecommend className="text-3xl mx-3" />
          5-Get Recommendations
        </Link>

        <Link href="/dashboard" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/my-dashboard') ? 'bg-zinc-800 text-white' : ''}`}>
          <LuLayoutDashboard className="text-3xl mx-3" />
          6-My Dashboard
        </Link>

        <Link href="/system-overview" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/system-overview') ? 'bg-zinc-800 text-white' : ''}`}>
          <AiOutlineDashboard className="text-3xl mx-3" />
          7-System Overview
        </Link>

        <Link href="/generateReport" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/generate-reports') ? 'bg-zinc-800 text-white' : ''}`}>
          <TbReport className="text-3xl mx-3" />
          8-Generate Reports
        </Link>

        <Link href="/profileinfo" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/profileinfo') ? 'bg-zinc-800 text-white' : ''}`}>
          <FaUserCog  className="text-3xl mx-3" />
          9-Profile Settings
        </Link>

        <Link
          href="/login"
          onClick={() => {
            // Play logout sound from the public/images folder
            const logoutSound = new Audio('/sounds/logout.wav');  // Correct path to the sound file
            logoutSound.play();
            
            localStorage.removeItem("toastShown");
            localStorage.removeItem("token");
          }}
          className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-taxes') ? 'bg-zinc-800 text-white' : ''}`}
        >
          <RiLogoutBoxLine className="text-3xl mx-3" />
          Logout
        </Link>

      </div>

    </aside>

    <div className={`fixed top-0 w-full h-full bg-black bg-opacity-70 transition-opacity duration-1000  ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleSidebar} ></div>
    </>
  )
}

export default Header




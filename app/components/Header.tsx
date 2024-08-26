
"use client"

import Link from 'next/link'; // Import Link from Next.js
import { IoPersonCircleOutline, IoMenu, IoClose } from 'react-icons/io5';
import { FaUserEdit } from "react-icons/fa";
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

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (href: string) => pathname === href;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  return (
    <>
    <nav className='bg-black h-[10vh]'>
        <div className='w-[98%] h-full mx-auto text-white flex  '>

          <div className='w-2/5 h-full  flex  items-center'> <IoMenu className="text-5xl  hover:text-gray-300 hover:cursor-pointer" onClick={toggleSidebar} /> </div>
          
          <div className='w-1/5 h-full  flex justify-center items-center'> <img className=" h-12  " src="/images/PWlogo.png" alt="" /> </div>
          <div className='w-2/5 h-full  flex justify-end items-center'> 
            <ul className='my-auto flex gap-6'>

              <Link href="/userinterface">
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

        <div className='flex flex-col bg-gray-100 text-center'>
          
          <Link href="" className='flex justify-center items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium hover:cursor-pointer' onClick={toggleSidebar}>
            <IoCloseCircleOutline className="text-3xl mx-3" />
            Close
          </Link>

          <Link href="" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('') ? 'bg-zinc-800 text-white' : ''}`}>
            <BsCalculator className="text-3xl mx-3" />
            1-Price Calculator
          </Link>

          <Link href="/calculate-taxes" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-taxes') ? 'bg-zinc-800 text-white' : ''}`}>
            <TbReceiptTax className="text-3xl mx-3" />
            2-Calculate Taxes
          </Link>

          <Link href="/calculate-loan-financing" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-loan-financing') ? 'bg-zinc-800 text-white' : ''}`}>
            <GiTakeMyMoney className="text-4xl mx-3" />
            3-Calculate Loan Financing
          </Link>

          <Link href="/get-recommendations" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/get-recommendations') ? 'bg-zinc-800 text-white' : ''}`}>
            <MdOutlineRecommend className="text-3xl mx-3" />
            4-Get Recommendations
          </Link>

          <Link href="/my-dashboard" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/my-dashboard') ? 'bg-zinc-800 text-white' : ''}`}>
            <LuLayoutDashboard className="text-3xl mx-3" />
            5-My Dashboard
          </Link>

          <Link href="/system-overview" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/system-overview') ? 'bg-zinc-800 text-white' : ''}`}>
            <AiOutlineDashboard className="text-3xl mx-3" />
            6-System Overview
          </Link>

          <Link href="/generate-reports" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/generate-reports') ? 'bg-zinc-800 text-white' : ''}`}>
            <TbReport className="text-3xl mx-3" />
            7-Generate Reports
          </Link>

          <Link href="/userinterface" className={`py-4 text-xl font-medium border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white ${isActive('/userinterface') ? 'bg-zinc-800 text-white' : ''}`}>
            Link 1
          </Link>

          <Link href="/screen2go" className={`py-4 text-xl font-medium border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white ${isActive('/screen2go') ? 'bg-zinc-800 text-white' : ''}`}>
            Link 2
          </Link>

          <Link href="/login" className={`flex items-center border-slate-950 border-b-2 hover:bg-zinc-800 hover:text-white py-4 text-xl font-medium ${isActive('/calculate-taxes') ? 'bg-zinc-800 text-white' : ''}`}>
            <RiLogoutBoxLine  className="text-3xl mx-3" />
            Logout
          </Link>

        </div>

    </aside>

    <div className={`fixed top-0 w-full h-full bg-black bg-opacity-70 transition-opacity duration-1000  ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleSidebar} ></div>
    </>
  )
}

export default Header



































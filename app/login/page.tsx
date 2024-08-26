"use client"

import React from 'react'
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useEffect } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useRouter } from 'next/navigation';  

import { RxCrossCircled } from "react-icons/rx";
import OtpInput from '../components/Otp';
import { useRef } from 'react';
import ConfettiButton, { ConfettiButtonHandle } from '../components/ConfettiButton';


import { GrLogin } from "react-icons/gr";
import ForgotPassScreen from '../components/Logg/ForgotPassScreen'

const Myloginpage = () => {

  // State to track input values and errors
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // Handle form submission
  const router = useRouter();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    // Reset errors
    setEmailError(false);
    setPasswordError(false); 
    // Validate inputs
    let hasError = false;
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (!hasError) {
      console.log('Form submitted with:', { email, password });
      router.push('/userinterface');
      // window.location.href = '/userinterface';
    }
  };

  const [FPScreen, setFPScreen] = useState<boolean>(false);
  const handleToggle = () => {
    setFPScreen(!FPScreen); // Toggle visibility of Farhan component
  };

  return (

    <div className="m-0">
      {/* Navbar Screen */}
      <nav className='bg-black  h-[10vh]'>
        <div className='w-[95%] h-full mx-auto  text-white flex justify-between'>
          <img className=" h-[50px] my-auto " src="/images/PWlogo.png" alt=""  />
          <ul className='my-auto flex gap-9 '>
            <Link className="bg-transparent text-xl text-white px-4 py-2 border border-gray-300 rounded-lg mx-auto  hover:text-gray-300 hover:border-gray-300 transition-colors duration-300" href="/">Home</Link>
          </ul>
        </div>
      </nav>

      <div className="w-full h-[88vh]  flex items-center justify-center my-auto">
        <div className="w-[95%] h-[95%]  flex">

          {/* Login Screen */}
          <div className="w-1/2 p-8 flex flex-col gap-12 my-auto">
            <img className=" h-[50px]  mx-auto " src="/images/PBlogo.png" alt="" />
            
            <form className='w-5/6 mx-auto' onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold my-6 text-center">Login</h1>

              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-xl font-bold">
                  Email ID <span className='text-red-500'>*</span>
                </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 p-2 border border-gray-300 rounded w-full" placeholder="Email ID" />
                {emailError && ( <span className="block text-red-700 text-base font-semibold">  Please enter your email. </span> )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-xl font-bold">
                  Password <span className='text-red-500'>*</span>
                </label>
                <div className="relative">
                  <input type={isPasswordVisible ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 p-2 border border-gray-300 rounded w-full" placeholder="Enter Password" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 pt-2 text-gray-500" >
                    {isPasswordVisible ? <IoEyeOff className="text-xl" /> : <IoEye className="text-xl" />}
                  </button>
                </div>
                {passwordError && ( <span className="block text-red-700 text-base font-semibold"> Please enter your password. </span> )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="inline-flex items-center hover:cursor-pointer">
                  <input type="checkbox" className="form-checkbox text-blue-500 w-5 h-5" />
                  <span className="ml-2 text-blue-600 text-lg">Remember Me</span>
                </label>
                <div>
                  <a href="#" className="text-lg text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); handleToggle(); }}>
                    Forgot Password?
                  </a>
                  {/* Pass FPScreen state and handleToggle function as props */}
                  <ForgotPassScreen show={FPScreen} onClick={handleToggle} />
                </div>
              </div>
              <div className='flex mx-auto'>
                <button type="submit" className="flex justify-center items-center gap-2 bg-blue-600 text-lg text-white p-2 rounded w-full mx-auto hover:bg-blue-700">
                  <GrLogin className="text-2xl" /> Login
                </button>
              </div>
              <p className=" text-gray-600 text-base mt-4"> Don’t have an account? <Link href="/signup" className="text-blue-600 hover:underline ml-4" > Register Here </Link>  </p>
            </form>
          </div>

          <div className="w-1/2 flex justify-end rounded-r-3xl">
            <div className='w-11/12 bg-black h-full flex justify-center items-center rounded-3xl'>
              <div className='w-10/12 bg-white/30 backdrop-blur-lg h-[87%] border-2 border-white rounded-3xl flex flex-col gap-8'>
                <h2 className="text-5xl font-bold text-white p-10">Your dream car is just one click away!</h2>
                <img src="/images/carslider/LPSlider/audi.png" alt="Dream Car" className="relative right-40 w-[730px]  max-w-min" />
              </div>
            </div>
          </div>

          {/* Content Was Here Before */}

          {/* Test Party Poppers */}
          {/* <button onClick={()=> handleConfirmClick()}>click me</button> */}
          
        </div>

      </div>

    </div>

  )
}

export default Myloginpage




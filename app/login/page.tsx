"use client"

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { GrLogin } from "react-icons/gr";
import ForgotPassScreen from '../components/LoginFPSC/ForgotPassScreen';
import axios from 'axios';

const Myloginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [FPScreen, setFPScreen] = useState<boolean>(false);
 

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggle = () => {
    setFPScreen(!FPScreen);
  };

  const validateEmail = (email: string): string => {
    if (!email) {
      return 'Email is required.';
    } else if (/\s/.test(email)) {
      return 'Email cannot contain spaces.';
    } else if (email.length < 3 ) {
      return 'Email should be between 3 and 40 characters.';
    } else if (!/@/.test(email)) {
      return 'Email must include @.';
    } else if (!/\.[a-zA-Z]{1,}/.test(email.split('@')[1] || '')) {
      return 'Email must include a valid domain (e.g, .com / .in / .net)';
    } else {
      return '';
    }
  };

  const validatePassword = (password: string): string => {
    if(!password){
      return 'Password is required.';
    } else if (/\s/.test(password)) {
      return 'Password cannot contain spaces.';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,40}/.test(password)) {
      return 'Password must contain 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    } else if (password.length > 7) {
      return '';
    } else{
      return '';
    }

  }

  const handleLogin = async(event: FormEvent) => {
    event.preventDefault();
  
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
    } else {
      setEmailError('');
    }
  
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    } else {
      setPasswordError('');
    }

    if (!emailValidationError && !passwordValidationError) {

      try {
        // Construct the query string with email and password
        const query = new URLSearchParams({ email, password }).toString();

        // Use the environment variable for the API base URL
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Send the request with query parameters
        const response = await fetch(`${BASE_URL}/login?${query}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
        });
    
    
        // Check if the response was not OK (error cases)
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 400) {
                setEmailError('Email is not registered with us.');
            } else if (response.status === 401) {
                setPasswordError('Invalid password.');
            } else {
                console.error('Unexpected error:', errorData.detail);
            }
            return;
        }
    
        // If login is successful
        const data: any = await response.json();
        
        if(response.ok){
          console.log(data);
          localStorage.setItem('token', data.token); // Store the token securely
          router.push('/vehiclesinfo'); // Redirect to another page
          // Play the PositiveNotification sound after a 2-second delay
          setTimeout(() => {
            const positiveSound = new Audio('/sounds/login.wav'); // Correct path to your sound
            positiveSound.play();
          }, 20);  // 2000 milliseconds = 2 seconds

        } else {
          console.error('Unexpected response:', data);
          // Play the Denied sound on failure
          const deniedSound = new Audio('/sounds/denied.wav');
          deniedSound.play();
        }

      } catch (error) {
          console.error('An error occurred:', error);
          // Handle network errors or other unexpected issues
          // Play the Denied sound on failure
          const deniedSound = new Audio('/sounds/denied.wav');
          deniedSound.play();
      }

    }
  };

  return (
    <div className="m-0">
      {/* Navbar Screen */}
      <nav className='bg-black h-[10vh]'>
        <div className='w-[95%] h-full mx-auto text-white flex justify-between'>
          <Link href="/" className='my-auto'><img className="w-[150px] " src="/images/PWlogo.png" alt="" /></Link>
          {/* <ul className='my-auto flex gap-9'>
            <Link className="bg-transparent text-xl text-white px-4 py-2 border border-gray-300 rounded-lg mx-auto hover:text-gray-300 hover:border-gray-300 transition-colors duration-300" href="/">Home</Link>
          </ul> */}
        </div>
      </nav>

      <div className="w-full h-[88vh] flex items-center justify-center my-auto">
        <div className="w-[95%] h-[95%] flex">
          {/* Login Screen */}
          <div className="w-1/2 p-8 flex flex-col gap-12 my-auto">
            <img className="h-[50px] mx-auto" src="/images/PBlogo.png" alt="" />

            <form className='w-5/6 mx-auto' onSubmit={handleLogin} noValidate>
              <h1 className="text-3xl font-bold my-6 text-center">Login</h1>

              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-xl font-bold">
                  Email ID <span className='text-red-500'>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="Email ID"
                  maxLength={40}
                />
                {emailError && (
                  <span className="block text-red-700 text-sm font-semibold">
                    {emailError}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-xl font-bold">
                  Password <span className='text-red-500'>*</span>
                </label>

                <div className="relative">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                    placeholder="Enter Password"
                    maxLength={40}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 pt-2 text-gray-500"
                  >
                    {isPasswordVisible ? <IoEyeOff className="text-xl" /> : <IoEye className="text-xl" />}
                  </button>
                </div>
                {passwordError && (
                  <span className="block text-red-700 text-sm font-semibold">
                    {passwordError}
                  </span>
                )}
              </div>

              <div className="flex justify-end items-center mb-4">
                {/* <label className="inline-flex items-center hover:cursor-pointer">
                  <input type="checkbox" className="form-checkbox text-blue-500 w-5 h-5" />
                  <span className="ml-2 text-blue-600 text-lg">Remember Me</span>
                </label> */}
                <div>
                  <a
                    href="#"
                    className=" text-lg text-blue-600 hover:underline"
                    onClick={(e) => { e.preventDefault(); handleToggle(); }}
                  >
                    Forgot Password?
                  </a>
                  <ForgotPassScreen show={FPScreen} onClick={handleToggle} />
                </div>
              </div>

              <div className='flex mx-auto'>
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 bg-blue-600 text-lg text-white p-2 rounded w-full mx-auto hover:bg-blue-700"
                >
                  <GrLogin className="text-2xl" /> Login
                </button>
              </div>

              <p className="text-gray-600 text-base mt-4">
                Don’t have an account? 
                <Link href="/signup" className="text-blue-600 hover:underline ml-4">
                  Register Here
                </Link>
              </p>
            </form>
          </div>

          <div className="w-1/2 flex justify-end rounded-r-3xl">
            <div className='w-11/12 bg-black h-full flex justify-center items-center rounded-3xl'>
              <div className='w-10/12 bg-white/30 backdrop-blur-lg h-[87%] border-2 border-white rounded-3xl flex flex-col gap-8'>
                <h2 className="text-5xl font-bold text-white p-10">
                  Your dream car is just one click away!
                </h2>
                <img src="/images/carslider/LPSlider/audi.png" alt="Dream Car" className="relative right-40 w-[730px] max-w-min" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Myloginpage;









          {/* Content Was Here Before */}

          {/* Test Party Poppers */}
          {/* <button onClick={()=> handleConfirmClick()}>click me</button> */}


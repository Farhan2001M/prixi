


"use client";
import Link from 'next/link';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';

import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import ConfettiButton, { ConfettiButtonHandle } from '../components/ConfettiButton';
import { useRouter } from 'next/navigation';  

import JitterText from '@/components/animata/text/jitter-text-'

const SignUpForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const [errors, setErrors] = useState<any>({});

  const validateFields = (name: string, value: string) => {
    let newErrors: any = {};    
    
    if (name === 'firstName') {
      if(value.length < 1){
        newErrors.firstName = '';
      } else if (/\s/.test(value)) {
        newErrors.firstName = 'First name cannot contain spaces.';
      } else if(value.length < 2 || value.length > 30) {
        newErrors.firstName = 'First name should be between 2 and 30 characters.';
      } else{
        newErrors.firstName = '';
      }
    }
    if (name === 'lastName') {
      if(value.length < 1){
        newErrors.lastName = '';
      } else if (/\s/.test(value)) {
        newErrors.lastName = 'Last name cannot contain spaces.';
      } else if(value.length < 2 || value.length > 30) {
        newErrors.lastName = 'Last name should be between 2 and 30 characters.';
      } else{
        newErrors.lastName = '';
      }
    }
    if (name === 'email') {
      if (value.length < 1) {
        newErrors.email = '';
      } else if (/\s/.test(value)) {
        newErrors.email = 'Email cannot contain spaces.';
      } else if (value.length < 3 ) {
        newErrors.email = 'Email should be between 3 and 60 characters.';
      } else if (!/@/.test(value)) {
        newErrors.email = 'Email must include @';
      } else if (!/\.[a-zA-Z]{1,}/.test(value.split('@')[1] || '')) {
        newErrors.email = 'Email must include .domain-name';
      } else {
        newErrors.email = '';
      }
    }
    if (name === 'password') {
      
      if(value.length < 1){
        newErrors.password = '';
      } else if (/\s/.test(value)) {
        newErrors.password = 'Password cannot contain spaces.';
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)) {
        newErrors.password = 'Password must contain 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
      } else if(value.length > 7){
        newErrors.password = '';
        if (value !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match.';
        }else{
          newErrors.confirmPassword = '';
        }
      }
    }
    if (name === 'confirmPassword') {
      if (value !== password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      else{
        newErrors.confirmPassword = '';
      }
    }
    setErrors((prevErrors: any) => ({ ...prevErrors, ...newErrors }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);

    validateFields(name, value);

  };


  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const normalizedNumber = phoneNumber;
    // console.log(normalizedNumber.length)

    if (normalizedNumber.length === 10) {
      setIsValid(true);
      setError(''); // Clear error if phone number is valid
    } else if(normalizedNumber.length > 0 && normalizedNumber.length < 10){
      setIsValid(false);
      setError('Phone No is not Valid');
    } 
    else {
      setIsValid(false);
    }

  }, [phoneNumber]);


  {/* Success Password Change Screen Code */}
  const [SuccessConfirmationScreen, setSuccessConfirmationScreen] = useState(false);
  
  


  {/* Confetti Animation Code */}
  const confettiButtonRef = useRef<ConfettiButtonHandle>(null);
  const handleConfirmClick = () => {

    TriggerConfetti();

    const intervalDuration = 4000; // 3 seconds
    const totalExecutions = 1000;
    let executionCount = 0;
    const intervalId = setInterval(() => {
        TriggerConfetti();
        executionCount += 1;
        if (executionCount >= totalExecutions) {
            clearInterval(intervalId);
        }
    }, intervalDuration);    
  };

  const TriggerConfetti = () => {
    // Trigger confetti animation
    if (confettiButtonRef.current) {
      confettiButtonRef.current.triggerConfetti(); 
    }
  };



  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    validateFields('firstName', firstName);
    validateFields('lastName', lastName);
    validateFields('email', email);
    validateFields('password', password);
    validateFields('confirmPassword', confirmPassword);
    if (!phoneNumber) {
      setError('Phone number is required');
    }
    if (!firstName) newErrors.firstName = 'First name is required.';
    if (!lastName) newErrors.lastName = 'Last name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors((prevErrors: any) => ({ ...prevErrors, ...newErrors }));

    
    if (isValid && Object.keys(newErrors).length === 0){
      console.log("Hello");
      setTimeout(()=>{
        setSuccessConfirmationScreen(!SuccessConfirmationScreen);
      },350);
      setTimeout(() => { 
        handleConfirmClick();
      }, 700);
    } 

  };


  return (
    <div className="m-0">
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
          <div className="w-1/2 p-8 flex flex-col my-auto">
            <img className="h-[50px] mx-auto mb-10" src="/images/PBlogo.png" alt="" />
            <form onSubmit={handleSubmit} className="w-[95%] mx-auto my-6 p-4 rounded" noValidate>
              <div className='w-full flex gap-4'>
                <div className="mb-4 w-1/2">
                  <label htmlFor="firstName" className="block text-black text-base font-bold">First Name <span className='text-red-500'>*</span></label>
                  <input id="firstName" name="firstName" type="text" value={firstName} maxLength={30} onChange={handleInputChange} className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded" placeholder="Enter Your First Name"/>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="lastName" className="block text-black text-base font-bold">Last Name <span className='text-red-500'>*</span></label>
                  <input id="lastName" name="lastName" type="text" value={lastName} maxLength={30} onChange={handleInputChange} className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded" placeholder="Enter Your Last Name" />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className='w-full flex gap-4'>
                
                <div className="mb-4 w-1/2">
                  <label htmlFor="cellNo" className="block text-black text-base font-bold"> Cell No <span className="text-red-500">*</span> </label>
                  
                  <PatternFormat
                    format="+1 (###) ###-####"
                    customInput={TextField}
                    allowEmptyFormatting ={false}
                    mask="_"
                    value={phoneNumber}
                    onValueChange={({ value }) => setPhoneNumber(value)}
                    placeholder="Your US number as +1 (123) 123 1234"
                    InputProps={{
                      classes: {
                        root: 'bg-red-600 rounded border border-gray-300',
                        input: 'text-white ',
                      },
                    }}
                    sx={{
                      width: '100%', // Ensure the root container takes full width
                      '& .MuiInputBase-root': {
                        width: '100%', // Ensure the input base takes full width
                        backgroundColor: 'transparent', // Transparent background
                        borderRadius: '0.175rem', // Tailwind's rounded class equivalent
                        border: '0px solid #d1d5db', // Tailwind's border-gray-300 equivalent
                        padding: '0rem', // Tailwind's p-2 equivalent
                        marginTop: '0px', // Margin top
                        '& input': {
                          color: '#333',
                          padding: '8px',
                          paddingBottom:'9px',
                          border: '1px solid #d1d5db',
                          marginTop: '8px',
                          borderRadius: '0.175rem',
                          boxShadow: '1px 1px #f6f6f6',
                          width: '100%', // Ensure the input field takes full width
                          '::placeholder': {
                            color: '#9ca3af', // Ensure the placeholder is visible
                            opacity: 1, // Make sure placeholder is fully opaque
                          },
                          '&:focus': {
                            border: 'none', // Change border on focus
                            outline: '3px solid black', // Remove default focus outline
                          },
                        },
                        
                      },
                      '& .MuiOutlinedInput-root': {
                        width: '100%', // Ensure the outlined input root takes full width
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  />
                  
                  {error && (<div className='text-red-500 text-sm mt-2'>{error}</div>)}

                </div>
                <div className="mb-4 w-1/2">
                  <label htmlFor="email" className="block text-black text-base font-bold">Email ID <span className='text-red-500'>*</span></label>
                  <input id="email" name="email" type="email" value={email} onChange={handleInputChange} className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded" placeholder="Enter A Valid Email Address" maxLength={60} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className='w-full flex gap-4'>
                <div className="mb-4 w-1/2">
                  <label htmlFor="password" className="block text-black text-base font-bold">Password <span className='text-red-500'>*</span></label>
                  <div className="relative">
                    <input id="password" name="password" type={isPasswordVisible ? 'text' : 'password'} value={password} maxLength={30} onChange={handleInputChange} className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded" placeholder="Enter Your Password" />
                    <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" >
                      {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="confirmPassword" className="block text-black text-base font-bold">Confirm Password <span className='text-red-500'>*</span></label>
                  <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type={isConfirmPasswordVisible ? 'text' : 'password'} value={confirmPassword} maxLength={35} onChange={handleInputChange} className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded" placeholder="Confirm Your Password" />
                    <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" >
                      {isConfirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className='flex mx-auto'>
                <button type="submit"  className="bg-blue-600 text-lg text-white p-2 rounded w-full mx-auto mt-3 hover:bg-blue-700">
                  Sign Up
                </button>
                <ConfettiButton ref={confettiButtonRef} />
                
              </div>

              <p className="text-left text-gray-600 text-base mt-2">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline ml-4">Login Here</Link>
              </p>
            </form>
          </div>

          <div className="w-1/2 flex justify-end rounded-r-3xl">
            <div className='w-11/12 bg-black h-full flex justify-center items-center rounded-3xl'>
              <div className='w-10/12 bg-white/30 backdrop-blur-lg h-[87%] border-2 border-white rounded-3xl flex flex-col gap-8'>
                <h2 className="text-5xl font-bold text-white p-10">Your dream car is just one click away!</h2>
                <img src="/images/carslider/LPSlider/audi.png" alt="Dream Car" className="relative right-40 top-5 w-[730px] max-w-min" />
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Confirmation of Account Creation */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/3 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700  transform ${SuccessConfirmationScreen ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
        <div className=' flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white'>

          <div>
            <h2 className="text-3xl leading-10 font-bold text-center my-4">Congratulations! &quot;{firstName}&quot; You Prixi Account Has Been Registered Successfully...!</h2>
            <p className=" text-center">Now you can log in and start exploring Prixi and its services.!</p>
          </div>
          
          <div className='flex flex-col justify-center  w-[95%] h-[95%] '>
            <button type="button" onClick={()=> { router.push('/login'); }} className={`text-lg p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
              <JitterText text="Continue To Login" />
            </button>
          </div>
          
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   ${SuccessConfirmationScreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} >
      </div>

    </div>
  );
};

export default SignUpForm;

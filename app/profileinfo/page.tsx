"use client";

import Header from "../components/Header";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { NumberFormatter } from 'react-number-formatter';
import React, { useState, useEffect } from 'react';

import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import ConfettiButton, { ConfettiButtonHandle } from '../components/ConfettiButton';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';  

import { GrLogout } from "react-icons/gr";
import { MdOutlineEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";


const MyProfileInfo = () => {
  {/* Edit Image Functionality */}
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleImageRemove = () => {
    // Reset the file input value to ensure handleImageChange is triggered
    const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }    
    setImageSrc(null);
  };




  {/* Edit Image Functionality */}
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [cellNo, setCellNo] = useState('');
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
      if(value.length < 1){
        newErrors.email = '';
      } else if (/\s/.test(value)) {
        newErrors.email = 'Email cannot contain spaces.';
      } else if(value.length < 3 || value.length > 254) {
        newErrors.email = 'Email should be between 3 and 254 characters. ';
      } else{
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
      }  else{
        newErrors.password = '';
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
    // if (name === 'cellNo') setCellNo(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);

    validateFields(name, value);
  };

  const router = useRouter();



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
    // Trigger confetti animation
    if (confettiButtonRef.current) {
      confettiButtonRef.current.triggerConfetti(); 
    }
  };
  

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



  const [ConfirmLogout, setConfirmLogout] = useState(false);
  const toggleLogoutScreen = () => {
    setConfirmLogout(!ConfirmLogout);
  };


  const [ConfirmDeleteProfile, setConfirmDeleteProfile] = useState(false);
  const toggleDeleteProfile = () => {
    setConfirmDeleteProfile(!ConfirmDeleteProfile);
  };

  const [DeleteAccount, setDeleteAccount] = useState(false);
  const toggleDeleteAccountScreen = () => {
    setDeleteAccount(!DeleteAccount);
  };






  const [notApproved, setnotApproved] = useState(false);

  const [remarks, setRemarks] = useState('');

  const handleRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(event.target.value);

    const newRemarks = event.target.value;

    if(newRemarks === "DELETE"){
      setnotApproved(true)
    }else if(remarks.length > 10){
      setnotApproved(true)
    }
    else{
      setnotApproved(false)
    }
  };

  // Handle delete account button click
  const handleDeleteAccountClick = () => {
    if(notApproved){
      router.push('/' ); 
    }
  };

  
  return (
    <div className="flex flex-col">
      <Header />

      <div className="h-[90vh] p-4 ">
        <div className="h-[100%] p-4 flex flex-col items-center">
          <h1 className="text-3xl mb-5">View/Edit Your Profile Info </h1>

          <div className="relative w-48 h-48 bg-slate-200 rounded-full">
            <img
              src={imageSrc || "/images/clientTestimonial/person-circle.png"} // Update with your default image path
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute top-0 left-0 p-1">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className={` p-1 rounded-full  ${!isEditing ? ' text-white bg-gray-300  cursor-not-allowed ' : 'bg-black  text-white hover:bg-blue-700 '} transition-colors `}>
                  <MdOutlineEdit className="text-2xl" />
                </div>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
            </div>
            <div className="absolute top-0 right-0 p-1">
              <button
                onClick={handleImageRemove}
                disabled={!isEditing}
                className={`p-1 rounded-full text-white transition-colors ${!isEditing ? 'text-white bg-gray-300 cursor-not-allowed ' : 'bg-black hover:bg-blue-700 cursor-pointer'}`}
              >
                <RxCross2 className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="w-4/5">

            <form onSubmit={handleSubmit} className="w-[95%] mx-auto my-6 p-4 rounded">

              <div className='w-full flex gap-4'>
                <div className="mb-4 w-1/2">
                  <label htmlFor="firstName" className="block text-black text-base font-bold">First Name <span className='text-red-500'>*</span></label>
                  <input id="firstName" name="firstName" type="text" value={firstName} maxLength={30} onChange={handleInputChange} 
                  className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`} 
                  placeholder={`Enter Your First Name ${firstName}`} disabled={!isEditing}/>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="lastName" className="block text-black text-base font-bold">Last Name <span className='text-red-500'>*</span></label>
                  <input id="lastName" name="lastName" type="text" value={lastName} maxLength={30} onChange={handleInputChange} 
                  className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`} 
                  placeholder="Enter Your Last Name" disabled={!isEditing}/>
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
                    disabled={!isEditing}
                    InputProps={{
                      classes: {
                        root: 'bg-red-600 rounded border border-gray-300',
                        input: 'text-white ',
                      },
                    }}
                    sx={{
                      width: '100%', // Ensure the root container takes full width
                      '& .MuiInputBase-root': {
                        width: '100%', 
                        backgroundColor: 'transparent', 
                        borderRadius: '0.175rem', 
                        border: '0px solid #d1d5db', 
                        padding: '0rem', 
                        marginTop: '0px', 
                        '& input': {
                          color: isEditing ? '#020202' : '#020202',
                          backgroundColor: isEditing ? '#ffffff' : '#f3f4f6' ,
                          padding: '8px',
                          paddingBottom:'9px',
                          border: '1px solid #d1d5db',
                          marginTop: '8px',
                          borderRadius: '0.275rem',
                          boxShadow: '1px 1px #f6f6f6',
                          cursor: isEditing ? 'text' : 'not-allowed',
                          width: '100%', // Ensure the input field takes full width
                          '::placeholder': {
                            color: '#9ca3af', // Ensure the placeholder is visible
                            opacity: 1, // Make sure placeholder is fully opaque
                          },
                          '&:focus': {
                            border: 'none', 
                            outline: '3px solid black', 
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
                  <input id="email" name="email" type="email" value={email} onChange={handleInputChange} 
                  className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`} 
                  placeholder="Enter A Valid Email Address" disabled={!isEditing} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* <div className='w-full flex gap-4'>
                <div className="mb-4 w-1/2">
                  <label htmlFor="password" className="block text-black text-base font-bold">Password <span className='text-red-500'>*</span></label>
                  <div className="relative">
                    <input id="password" name="password" type={isPasswordVisible ? 'text' : 'password'} value={password} maxLength={30} onChange={handleInputChange} 
                    className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`} 
                    placeholder="Enter Your Password" disabled={!isEditing}/>
                    <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" >
                      {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="confirmPassword" className="block text-black text-base font-bold">Confirm Password <span className='text-red-500'>*</span></label>
                  <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type={isConfirmPasswordVisible ? 'text' : 'password'} value={confirmPassword} maxLength={35} onChange={handleInputChange} 
                      className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`} 
                      placeholder="Confirm Your Password"  disabled={!isEditing} />
                    <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" >
                      {isConfirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div> */}

              <div className='w-full flex gap-4'>
                <div className="mb-4 w-1/2">
                  <label htmlFor="password" className="block text-black text-base font-bold">
                    Password <span className='text-red-500'>*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      maxLength={30}
                      onChange={handleInputChange}
                      className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`}
                      placeholder="Enter Your Password"
                      disabled={!isEditing}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!isEditing) e.preventDefault(); // Prevent default action if not editing
                        else setIsPasswordVisible(!isPasswordVisible); // Toggle visibility if editing
                      }}
                      className={`absolute inset-y-0 right-0 flex items-center px-2 ${!isEditing ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
                      disabled={!isEditing} // Disable button if not editing
                    >
                      {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="confirmPassword" className="block text-black text-base font-bold">
                    Confirm Password <span className='text-red-500'>*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      value={confirmPassword}
                      maxLength={35}
                      onChange={handleInputChange}
                      className={`block w-full shadow-sm mt-2 p-2 border rounded ${!isEditing ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} transition-colors`}
                      placeholder="Confirm Your Password"
                      disabled={!isEditing}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!isEditing) e.preventDefault(); // Prevent default action if not editing
                        else setIsConfirmPasswordVisible(!isConfirmPasswordVisible); // Toggle visibility if editing
                      }}
                      className={`absolute inset-y-0 right-0 flex items-center px-2 ${!isEditing ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
                      disabled={!isEditing} // Disable button if not editing
                    >
                      {isConfirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              

              <div className='flex gap-5 mx-auto'>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    if (isEditing) {
                      // Reset form fields when exiting editing mode
                      setFirstName('');
                      setLastName('');
                      setEmail('');
                      setPassword('');
                      setConfirmPassword('');
                      setError('');
                      setErrors('');
                      setPhoneNumber('');
                      setIsPasswordVisible(false);
                      setIsConfirmPasswordVisible(false); 
                    }
                  }}
                  className={`flex justify-center items-center text-lg p-2 rounded w-full mx-auto mt-3 ${
                    isEditing
                      ? 'bg-transparent text-black border-2 border-blue-600 hover:bg-blue-700 hover:text-white' // Styles when in editing mode
                      : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' // Styles when not in editing mode
                  }`}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'} {/* Toggle button label */}
                </button>

                <button type="submit" className={`bg-blue-600 text-lg text-white p-2 rounded w-full mx-auto mt-3 ${isEditing ? 'hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} disabled={!isEditing} >
                  Save Changes
                </button>
                <ConfettiButton ref={confettiButtonRef} />

                {/* <div onClick={ ()=>{
                  if (isEditing) {
                    return
                  }else{
                    setConfirmLogout(!ConfirmLogout);
                  } }} 
                  className={`text-lg text-center p-2 rounded w-full mx-auto mt-3  ${isEditing ? 'bg-gray-300 text-gray-600 cursor-not-allowed ' : 'bg-blue-600  text-white hover:bg-blue-700 hover:cursor-pointer'}`}  >
                  Logout
                </div> */}

                {/* <div onClick={ ()=>{
                  if (isEditing) {
                    return
                  }else{
                    setConfirmDeleteProfile(!ConfirmDeleteProfile);
                  } }} 
                  className={`text-lg text-center p-2 rounded w-full mx-auto mt-3  ${isEditing ? ' text-white bg-gray-300  cursor-not-allowed ' : 'bg-blue-600  text-white hover:bg-blue-700 hover:cursor-pointer'}`}  >
                  Delete Profile
                </div> */}

                <div onClick={ ()=>{
                  if (isEditing) {
                    return
                  }else{
                    setConfirmDeleteProfile(!ConfirmDeleteProfile);
                  } }} 
                  className={`w-[100%] text-lg text-center p-2 rounded  mx-auto mt-3  ${isEditing ? ' text-white bg-gray-300  cursor-not-allowed ' : 'bg-red-600  text-white hover:bg-red-700 hover:cursor-pointer'}`}  >
                  Delete Profile
                </div>

              </div>

            </form>

            

          </div>

          {/* Confirmation of Account Detailed Modification */}
          <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/4 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700  transform ${SuccessConfirmationScreen ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
            <div className=' flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white'>

              <div>
                <h2 className="text-3xl leading-10 font-bold text-center my-4 w-5/6 mx-auto">Congratulations! &quot;{firstName}&quot; Your Account Details Has Been Successfully Edited...!</h2>
              </div>
              
              <div className='flex flex-col justify-center  w-[95%] h-[95%] '>
                <button type="button" onClick={()=> { 
                  router.push('/userinterface' ); 
                  }} className={`text-xl p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
                  Continue to Home Screeen
                </button>
              </div>
              
            </div>
          </div>
          <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   ${SuccessConfirmationScreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} > </div>

          {/* Confirm Logout */}
          <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-[27%] bg-slate-200 shadow-lg rounded-2xl transition-transform duration-1000  transform ${ConfirmLogout ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
            <div className='relative flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white'>
              <RxCrossCircled onClick={toggleLogoutScreen} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />

              <div>
                <h2 className="text-3xl leading-10 font-bold text-center my-4 w-4/6 mx-auto">Are You Sure You Want To Logout Of Your Prixi Account!</h2>
              </div>

              
              
              <div className='flex flex-col justify-center  w-[95%] h-[95%] '>
                <button type="button" onClick={()=> { 
                  router.push('/login' );  
                  }} className={`flex justify-center items-center gap-2 text-lg p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
                  <GrLogout className="text-4xl  " /> Confirm Logout
                </button>
              </div>
              
            </div>
          </div>
          <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-1000   ${ConfirmLogout ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleLogoutScreen} > </div>

          {/* Confirm Delete Account */}
          <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/4 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-1000  transform ${ConfirmDeleteProfile ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
            <div className='relative flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white '>
              <RxCrossCircled onClick={toggleDeleteProfile} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />

              <div>
                <h2 className="text-3xl leading-10 font-bold text-center my-4 w-4/6 mx-auto">Are You Sure You Want To Delete Your Prixi Account!</h2>
              </div>
              
              <div className='flex gap-4 justify-center  w-[95%]  pb-3  '>
                <button type="button" onClick={()=> { 
                  
                  toggleDeleteProfile();
                  // router.push('/login' );  
                  }} className={`text-lg p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
                  Cancel
                </button>
                <button type="button" onClick={()=> { 
                  toggleDeleteProfile();
                  toggleDeleteAccountScreen();
                  // router.push('/login' );  
                  }} className={`text-lg p-2 rounded w-full mx-auto bg-red-600 text-white hover:bg-red-700   `}  >
                  Confirm Delete
                </button>
              </div>
              
            </div>
          </div>
          <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-1000   ${ConfirmDeleteProfile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleDeleteProfile}  > </div>
          
          {/* Delete My Account Permanently*/}
          <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-2/3 h-1/2 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-1000  transform ${DeleteAccount ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
            <div className='relative flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white '>
              <RxCrossCircled onClick={toggleDeleteAccountScreen} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />

              <div>
                <h2 className="text-3xl leading-10 font-bold text-center mt-4 mb-2 w-4/6 mx-auto">We&apos;re sorry to see you go.</h2>
                <p className=" text-center text-xl w-5/6 mx-auto mb-2" >Deleting your account is permanent & it will remove all of your information from our database. This action cannot be undone⚠️</p>
                {/* <p className=" text-center" >Deleting your account will remove all of your information from our database. This action cannot be undone.</p> */}
              </div>

              <div className='w-[90%] mx-auto mb-4'>
                    <label htmlFor="remarks" className="block text-center text-xl font-semibold my-2 tracking-wide">Leaving Remarks:</label>
                    <textarea
                        id="remarks"
                        value={remarks}
                        maxLength={10000}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg p-2 resize-none text-lg"
                        placeholder={`Please Leave us with some suggestions so that we can improve ourselves..! 
Or Simply Type DELETE To Delete Your Account`}
                        onChange={(e)=>handleRemarksChange(e)}
              />

              </div>
              
              <div className='flex gap-4 justify-center  w-[95%]  pb-3  '>
                <button type="button" onClick={()=> { 
                  toggleDeleteAccountScreen();
                   
                  }} className={`text-lg p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
                  Cancel
                </button>
                <button type="button" onClick={()=> {
                  handleDeleteAccountClick();
                  
                  }} className={`text-lg p-2 rounded w-full mx-auto  ${notApproved ? 'bg-red-600 text-white hover:bg-red-700 ' : 'bg-gray-100 cursor-not-allowed border-gray-300 '}  `} disabled={!notApproved} >
                  Delete Account
                </button>
              </div>
              
            </div>
          </div>
          <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-1000   ${DeleteAccount ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleDeleteAccountScreen}  > </div>


        </div>
      </div>
    </div>
  );
};

export default MyProfileInfo;

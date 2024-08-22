import React from 'react'
import ConfettiButton, { ConfettiButtonHandle } from '../ConfettiButton';
import { useState, FormEvent } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import { RxCrossCircled } from "react-icons/rx";
import { useRef } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Link from 'next/link';
import OtpInput from '../Otp' 

const ForgetScreen = () => {
  
  const [forgetOpen, setForgetOpen] = useState(false);
  const toggleForgetPass = () => {
    setForgetOpen(!forgetOpen);
  };

  const [ConfirmPassOpen, setConfirmPassOpen] = useState(false);

  const toggleConfirmPassOpen = () => {
    setConfirmPassOpen(!ConfirmPassOpen);
  };



  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const validateEmail = (Femail: string): boolean => {
    // Simple email regex for validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Femail);
  };

  // Check the validity of the email on every change
  const [Femail, setFEmail] = useState('');
  useEffect(() => {
    setIsValidEmail(validateEmail(Femail));
  }, [Femail]);


  const [OTPOpen, setOTPOpen] = useState(false);
  const gettingOTP = (): void => {
    console.log('OTP requested for:', Femail , 'is ' , otp);
    setOTPOpen(!OTPOpen);
  };
  
  const handleRequestOTP = () => {
    setTimeout(() => {
      console.log(Femail)
      startTimer();
      // setFEmail(''); // Clear the email input field
    }, 1000); // Delay in milliseconds (e.g., 2000 ms = 2 seconds)
  };

  const [otp, setOtp] = useState<string>("");
  const [isOtpComplete, setIsOtpComplete] = useState<boolean>(false);
  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };
  const handleOtpComplete = (isComplete: boolean) => {
    setIsOtpComplete(isComplete);
  };
  const handleConfirmOtp = () => {
    console.log("Entered OTP:", otp);
  };


  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeLeft(5); // Set initial time (60 seconds)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second
  };


  // Handle resend code click
  const handleResendCode = () => {
    console.log("Hello");
  };

  // Format time left into MM:SS format
  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  

  // Reset Your Password Popup Screen
  const [RSTpassword, setRSTpassword] = useState('');
  const [RSTconfirmPassword, setRSTconfirmPassword] = useState('');
  const [RSTisPasswordVisible, setRSTisPasswordVisible] = useState(false);
  const [RSTisConfirmPasswordVisible, setRSTisConfirmPasswordVisible] = useState(false);
  const [RSTerrors, setRSTerrors] = useState<any>({});

  const RSTvalidateFields = (name: string, value: string) => {
    let RSTnewErrors: any = {};

    if (name === 'password') {
      if (value.length < 1) {
        RSTnewErrors.password = '';
      } else if (/\s/.test(value)) {
        RSTnewErrors.password = 'Password cannot contain spaces.';
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)) {
        RSTnewErrors.password = 'Password must contain 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
      } else {
        RSTnewErrors.password = '';
      }
    }
    if (name === 'confirmPassword') {
      if(value.length < 1){
        RSTnewErrors.confirmPassword = '';
      } else if (value !== RSTpassword) {
        RSTnewErrors.confirmPassword = 'Passwords do not match.';
      } else {
        RSTnewErrors.confirmPassword = '';
      }
    }
    setRSTerrors((prevErrors: any) => ({ ...prevErrors, ...RSTnewErrors }));
  };
  const RSThandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') setRSTpassword(value);
    if (name === 'confirmPassword') setRSTconfirmPassword(value);
    RSTvalidateFields(name, value);
  };
  const isButtonDisabled = () => {
    return RSTerrors.password || RSTerrors.confirmPassword || !RSTpassword || !RSTconfirmPassword;
  };


  {/* Success Password Change Screen Code */}
  const [SuccessConfirmationScreen, setSuccessConfirmationScreen] = useState(false);
  
  const toggleSuccessConfirmationScreen = () => {
    toggleConfirmPassOpen();
    setTimeout(() => { 
      setSuccessConfirmationScreen(!SuccessConfirmationScreen);
      handleConfirmClick();
    }, 700);
  };


  {/* Confetti Animation Code */}
  const confettiButtonRef = useRef<ConfettiButtonHandle>(null);
  const handleConfirmClick = () => {
    // Trigger confetti animation
    if (confettiButtonRef.current) {
      confettiButtonRef.current.triggerConfetti(); 
    }
  };


  return (
    <div>
      {/* Forget Screen */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/2 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700 transform ${forgetOpen ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-250%] translate-y-[-50%]'} z-20`}>
        <div className='relative flex flex-col justify-around items-center w-[95%] h-[90%]  bg-white'>
          <RxCrossCircled onClick={toggleForgetPass} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />

          <div>
            <h2 className="text-3xl font-bold text-center mb-4">Forgot your password?</h2>
            <p className=" text-center">Enter your email to get an OTP</p>
          </div>

          <div className='flex justify-center items-center w-[95%] h-[47%]  border-2 border-black rounded-2xl'>
            <div className='flex flex-col justify-center  w-[95%] h-[95%] '>

              <label htmlFor="email" className="block text-black text-xl font-bold">
                Enter Your Registered Email ID <span className='text-red-500'>*</span>
              </label>
              <input type="email" id="email" value={Femail} onChange={(e) => setFEmail(e.target.value)} className="mt-2 p-2 border border-gray-300 rounded w-full" placeholder="Email ID" />
              <button type="button" onClick={()=> { gettingOTP(); toggleForgetPass(); handleRequestOTP()}} className={`text-lg p-2 rounded w-full mx-auto mt-5 ${isValidEmail ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} disabled={!isValidEmail} >
                Request OTP
              </button>

            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   ${forgetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} onClick={toggleForgetPass} >
      </div>

      {/* 'OTP Screen */}                                                                                                                                                                                                                            {/* 'translate-x-full' */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/2 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700 transform ${OTPOpen ? 'translate-x-[-50%] translate-y-[-50%] ' : 'translate-x-[250%] translate-y-[-50%]  '} z-20`}>  
        <div className='relative flex flex-col justify-around items-center w-[95%] h-[90%] bg-white'>
          <RxCrossCircled onClick={gettingOTP} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />
          <div>
            <h2 className="text-3xl font-bold text-center mb-4">OTP Verification</h2>
            <h1 className="text-xl text-center">Enter the OTP code sent to the "{Femail}"</h1>
          </div>
          <div className='flex justify-center items-center w-[95%] h-[65%] border-2 border-black rounded-2xl'>
            <div className='flex flex-col justify-around w-[95%] h-[95%]'>
              <OtpInput onOtpChange={handleOtpChange} onOtpComplete={handleOtpComplete} />
              {/* <Link href="" className="text-base text-center text-blue-600 hover:underline" >Resend Code</Link> */}
              <div className='text-center'>
                <p className="text-lg  ">Didn't receive OTP Code</p>
                
                {isTimerActive && (
                  <p className="text-lg mt-3">
                    Resend Code available in: {formatTimeLeft(timeLeft)}
                  </p>
                )}

                
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    if (!isTimerActive) {
                      handleResendCode();
                    }
                  }}
                  className={`text-base text-center ${isTimerActive ? 'text-gray-500 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                  style={{ opacity: isTimerActive ? 0.5 : 1 }}
                >
                  Resend Code
                </Link>

              </div>

              <button
                type="button"
                // onClick={gettingOTP}
                onClick={ () => { handleConfirmOtp() ; gettingOTP() ; toggleConfirmPassOpen() } }
                className={`text-lg p-2 rounded w-full mx-auto my-3   ${isOtpComplete ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} `}
                // disabled={!isValidEmail}
                disabled={!isOtpComplete}
              >
                Confirm OTP 
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-[1000ms]   ${OTPOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10` }  >
      </div>


      {/* Password change Screen */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/2 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-[1000ms] transform ${ConfirmPassOpen ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[-250%]'} z-20`}>
        <div className='relative flex flex-col justify-around items-center w-[95%] h-[90%]  bg-white'>
          <RxCrossCircled onClick={toggleConfirmPassOpen} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />

          <div>
            <h2 className="text-3xl font-bold text-center mb-2">Reset your password</h2>
            <p className=" text-center">Create a strong password for your Prixi account</p>
          </div>

          <div className='flex justify-center items-center w-[95%] border-2 border-black rounded-2xl h-auto py-2 '>
            <div className='flex flex-col justify-center  w-[95%] h-[95%] '>

              <div className="mb-4 ">
                <label htmlFor="password" className="block text-black text-base font-bold">Password <span className='text-red-500'>*</span></label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={RSTisPasswordVisible ? 'text' : 'password'}
                    value={RSTpassword}
                    maxLength={30}
                    onChange={RSThandleInputChange}
                    className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded"
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setRSTisPasswordVisible(!RSTisPasswordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                  >
                    {RSTisPasswordVisible ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
                {RSTerrors.password && <p className="text-red-500 text-sm mt-1">{RSTerrors.password}</p>}
              </div>

              <div className="mb-4 ">
                <label htmlFor="confirmPassword" className="block text-black text-base font-bold">Confirm Password <span className='text-red-500'>*</span></label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={RSTisConfirmPasswordVisible ? 'text' : 'password'}
                    value={RSTconfirmPassword}
                    maxLength={35}
                    onChange={RSThandleInputChange}
                    className="block w-full shadow-sm mt-2 p-2 border border-gray-300 rounded"
                    placeholder="Confirm Your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setRSTisConfirmPasswordVisible(!RSTisConfirmPasswordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                  >
                    {RSTisConfirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
                {RSTerrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{RSTerrors.confirmPassword}</p>}
              </div>
              
              <button
                type="button"
                disabled={isButtonDisabled()}
                onClick={ () => { toggleSuccessConfirmationScreen();} }
                className={`text-lg p-2 rounded w-full mx-auto ${isButtonDisabled() ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Confirm Reset Password
              </button>
              <ConfettiButton ref={confettiButtonRef} />
              {/* The ConfettiButton component, which will handle the animation */}

            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   ${ConfirmPassOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} >
      </div>


      {/* Confirmation of Password change */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/4 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700  transform ${SuccessConfirmationScreen ? 'translate-x-[-50%] translate-y-[-50%]' : 'translate-x-[-50%] translate-y-[250%]'} z-20`}>
        <div className=' flex flex-col justify-around items-center w-[95%] h-[85%]  bg-white'>

          <div>
            <h2 className="text-3xl font-bold text-center my-4">Password Changed Successfully</h2>
            <p className=" text-center">You’ve successfully reset your password. Please log in with your new password.</p>
          </div>

          <div className='flex flex-col justify-center  w-[95%] h-[95%] '>
            <button type="button" onClick={()=> { window.location.reload() }} className={`text-lg p-2 rounded w-full mx-auto bg-blue-600 text-white hover:bg-blue-700   `}  >
              Continue to Login
            </button>
          </div>
          
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   ${SuccessConfirmationScreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} >
      </div>
    </div>
  )
}

export default ForgetScreen
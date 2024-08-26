"use client"

import React, { useEffect } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import OtpInput from '../Otp' 


import PasswordChangeScreen from './PasswordChangeScreen';


interface OTPScreenProps {
  visible: boolean;
  onClick: () => void;
  Femail: string;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ visible, onClick , Femail }) => {


  const [showPasswordChangeScreen, setShowPasswordChangeScreen] = useState<boolean>(false);
  
  const [OTPOpen, setOTPOpen] = useState(false);
  const gettingOTP = (): void => {
    console.log('OTP requested for:', Femail , 'is ' , otp);
    setOTPOpen(!OTPOpen);
  };
  
  const handleRequestOTP = () => {
    setTimeout(() => {
      console.log(Femail)
      startTimer();
    }, 30); 
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
    onClick();
    setShowPasswordChangeScreen(true);
  };

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeLeft(10); // Set initial time (60 seconds)
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


  // Format time left into MM:SS format
  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Call handleRequestOTP when the component becomes visible
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        handleRequestOTP();
      },1000);
    }
  }, [visible]);



  const [displayFemail, setDisplayFemail] = useState('');
  
  useEffect(() => {
    if (Femail) {
      setDisplayFemail(Femail);
    }
  }, [Femail]);



  return (
    <div>

      <div className={`fixed top-1/2 left-1/2 w-1/2 h-1/2 bg-slate-200 shadow-lg rounded-2xl z-20 transform transition-transform duration-[700ms] ease-in-out flex items-center justify-center `} style={{ transform: visible ? 'translateX(-50%) translateY(-50%)' : 'translateX(250%) translateY(-50%)' }} >
      <div className='relative flex flex-col justify-around items-center w-[95%] h-[90%] bg-white'>
          <RxCrossCircled onClick={onClick} className='absolute top-1 right-1 text-black hover:text-red-500 cursor-pointer' size={40}  />
          <div>
            <h2 className="text-3xl font-bold text-center mb-4">OTP Verification</h2>
            <h1 className="text-xl text-center">Enter the OTP code sent to the &quot;{displayFemail}&quot;</h1>
          </div>
          <div className='flex justify-center items-center w-[95%] h-[65%] border-2 border-black rounded-2xl'>
            <div className='flex flex-col justify-around w-[95%] h-[95%]'>
              <OtpInput onOtpChange={handleOtpChange} onOtpComplete={handleOtpComplete} />
              {/* <Link href="" className="text-base text-center text-blue-600 hover:underline" >Resend Code</Link> */}
              <div className='text-center'>
                <p className="text-lg  ">Didn&apos;t receive OTP Code</p>
                
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
                      handleRequestOTP();
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
                onClick={ () => { handleConfirmOtp()} }
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

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 z-10 transition-opacity duration-1000 ease-in-out flex items-center justify-center`} style={{  opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }} onClick={onClick} >
      </div>   
      
      <PasswordChangeScreen visible={showPasswordChangeScreen} onClick={() => setShowPasswordChangeScreen(false)} />
    
    </div>
  );
};

export default OTPScreen;









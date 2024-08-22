'use client'



import React, { useEffect, useRef } from 'react';
import './styles.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

const Page: React.FC = () => {
  // Refs for DOM elements
  const signUpButtonRef = useRef<HTMLButtonElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const signUpButton = signUpButtonRef.current;
    const signInButton = signInButtonRef.current;
    const container = containerRef.current;

    const handleSignUpClick = () => {
      if (container) {
        container.classList.add("right-panel-active");
      }
    };

    const handleSignInClick = () => {
      if (container) {
        container.classList.remove("right-panel-active");
      }
    };

    if (signUpButton) {
      signUpButton.addEventListener('click', handleSignUpClick);
    }
    
    if (signInButton) {
      signInButton.addEventListener('click', handleSignInClick);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (signUpButton) {
        signUpButton.removeEventListener('click', handleSignUpClick);
      }

      if (signInButton) {
        signInButton.removeEventListener('click', handleSignInClick);
      }
    };
  }, []);

  return (

    <div className='main'>
        <div className="container" id="container" ref={containerRef}>
        <div className="form-container sign-up-container">
            <form action="#">
            <h1 className='text-5xl'>Create Account Using</h1>
            <div className="social-container">
                <a href="#" className="social"><FaFacebook style={{ color: 'blue', fontSize: '35px' ,  }}/> </a>
                <a href="#" className="social "><FcGoogle style={{ color: 'blue', fontSize: '35px' }}/></a>
                <a href="#" className="social"><FaLinkedin style={{ color: 'blue', fontSize: '35px' }}/></a>
            </div>
            <span className='text-2xl mb-6'>or use your email for registration</span>
            <input type="text" placeholder="Name" className='mt-4'/>
            <input type="email" placeholder="Email" className='mt-6' />
            <input type="password" placeholder="Password" className='mt-6'/>
            <input type="password" placeholder="Confirm your Password" className='mt-6'/>
            <button className='text-xl mt-10  px-10 py-2  hover:text-white'>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
            <h1 className='text-5xl mb-5'>Sign in </h1>
            {/* <div className="social-container">
                <a href="#" className="social"><FaFacebook style={{ color: 'blue', fontSize: '35px' }}/></a>
                <a href="#" className="social"><FcGoogle style={{ color: 'blue', fontSize: '35px' }}/></a>
                <a href="#" className="social"><FaLinkedin style={{ color: 'blue', fontSize: '35px' }}/></a>
            </div> */}  
            <span className='text-2xl mb-6'>To use your Prixi account</span>
            <input type="email" placeholder="Email"  className='mt-6' />
            <input type="password" placeholder="Password" className='mt-8' />
            <Link href="/forgetpassword" className='text-xl hover:text-slate-500 mt-12' > Forgot your password? </Link>
            <button className='text-xl mt-2  px-10 py-2  hover:text-white'>Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1 className='text-5xl'>Welcome Back!</h1>
                <p className='text-xl'>To keep using prixiyou must login with us through your personal account</p>
                <button className="ghost text-xl mt-5 px-10 py-2" id="signIn" ref={signInButtonRef}>Sign In</button>
                <img className='mt-20' src="./images/carslider/LPslider/silvercar.png" alt="" />
            </div>
            <div className="overlay-panel overlay-right">
                <h1 className='text-5xl'>Hello, Friend!</h1>
                <p className='text-xl'>Dont have your prixi account yet.! Click the sign-up button now to fill a simple form to register with us and get start your journey with us. </p>
                <button className="ghost text-xl mt-5 px-10 py-2" id="signUp" ref={signUpButtonRef}>Sign Up</button>
                <img className='mt-24' src="./images/carslider/LPslider/audi.png" alt="" />
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Page;

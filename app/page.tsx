"use client"

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import BouncingArrow from './components/LandingPage/BouncingArrow';
import LPHowItWorks from './components/LandingPage/LPHowItWorks';
import LPCards from './components/LandingPage/LPCards';
import LandingPageServices from './components/LandingPage/LandingPageServices';
import LPTestimonials from './components/LandingPage/LPTestimonials';
import Footer from './components/LandingPage/Footer';


const MainPage: React.FC = () => {

  const nextSectionRef = useRef<HTMLDivElement>(null);
    
    const [showContent, setShowContent] = useState(false);
    const handleScroll = () => {
        setShowContent(true);
        // Use setTimeout to allow content to render before scrolling
        setTimeout(() => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        }, 420);
    };
  

  return (
    <main>
      
      <header className="relative w-full max-h-[1035px] overflow-hidden">
            <div className="relative w-full max-w-[1920px] mx-auto h-screen max-h-[1035px]">
                <video className="absolute top-0 left-0 w-full h-full object-cover" src="/videoes/intro.mp4" autoPlay loop muted ></video>
                <nav className="relative max-w-[1700px] mx-auto flex justify-between items-center pt-8 z-10">
                    <a href=""><img className=" w-[150px] " src="/images/PWlogo.png" alt="Prixilogo" /></a>
                    <Link href="/login" className="text-white text-xl border-2 border-l-4 border-r-4 border-white rounded-full px-4 py-2 mr-6 hover:text-gray-300 hover:border-gray-300 transition-colors duration-300" >Login/Signup</Link>
                </nav>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center z-10">
                    <h1 className="text-white text-4xl mb-5">Explore Prixi Now</h1>
                    <BouncingArrow onScroll={handleScroll} />
                </div>
            </div>
        </header>

        <div ref={nextSectionRef} id="next-section" className="h-0"></div>

        {showContent && (
          <>
            <LPHowItWorks />
            <LPCards />
            <LandingPageServices />
            <LPTestimonials />
            <Footer />
          </>
        )}
      
    </main>
  );
};

export default MainPage;


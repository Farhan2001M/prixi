"use client"


import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { useState, FormEvent } from 'react';
import { useEffect } from 'react';

const Myforgetpage = () => {


  return (
    <div>
      {/* Forget Screen */}
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 w-1/2 h-1/2 bg-slate-200 shadow-lg rounded-2xl transition-transform duration-700 transform translate-x-[-50%] translate-y-[-50%]  z-20`}>
        <div className='relative flex flex-col justify-around items-center w-[95%] h-[90%]  bg-white'>
          <h1>hello</h1>
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-full bg-black bg-opacity-70 transition-opacity duration-700   opacity-100 pointer-events-auto z-10`}  >
      </div>
    </div>
  )
}

export default Myforgetpage
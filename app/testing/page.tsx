"use client"

import React from 'react';
import Link from 'next/link';

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const TestComponent: React.FC = () => {

  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`;

 
  return (
    <div className='bg-slate-300 h-screen' >

      <h1>Hello</h1> <br />
        <Link href = "/login" className='ml-10 mt-8'> Back to login </Link>
        <Link href = "/screen1" className='ml-10 mt-28'>  Screen 1 </Link>
      <br />

      <div className='mt-8 ml-96 mx-auto'>
    
          <br /><br />
        
      </div>

      <div className='mt-8 ml-96 mx-auto '>  

        <br /><br />

      </div>

      <br />

      <TextGenerateEffect duration={5} filter={false} words={words} />

      <br />
    
    </div>
  );
};

export default TestComponent;

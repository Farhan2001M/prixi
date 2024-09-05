// "use client"

// import React from 'react'

// const HelloFunc = () => {
//   return (
//     <div>

//     <div>HelloFunc</div>
    
//     <button className='bg-slate-600 p-5 m-5 text-white'>
      
//     </button>

//     </div>
    
//   )
// }

// export default HelloFunc









'use client';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from '@/components/core/animated-number';
import React from 'react'

const HelloFunc = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(2082);
  }, []);

  return (
    <div className='flex w-full items-center justify-center'>
      <p className='text-xl'>$</p>
      <AnimatedNumber
        className='inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50'
        springOptions={{
          bounce: 0,
          duration: 3000,
        }}
        value={value}
      />
    </div>
  );
}

export default HelloFunc

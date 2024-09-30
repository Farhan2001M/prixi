"use client";

import React from 'react';

import Header from '../components/Header';

import Accodion from '../components/CarBrands/Acoordion';


const TestComponent: React.FC = () => {

  return (   
    <div className='bg-white flex flex-col  w-full'>

      <Header/>  

      <div className='w-full px-8 mt-4'>
        <div className='w-full flex flex-col items-center  p-2'>

          <div className='my-4 w-full'>
            <Accodion />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TestComponent;








// {data.filter( (item)=> {
//   return  item.first_name.toLowerCase().includes(search)
//   // return search.toLowerCase() === '' ? item : item.first_name.toLowerCase().includes(search)

// } ).map( (item)=> (

//   <tr key={item.id} className=''>
//     <td className='w-1/4 table-cell'>{item.first_name}</td>
//     <td className='w-1/4 table-cell'>{item.last_name}</td>
//     <td className='w-1/4 table-cell'>{item.email}</td>
//     <td className='w-1/4 table-cell'>{item.phone}</td>
//   </tr>

// ))}
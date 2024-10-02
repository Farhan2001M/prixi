"use client";

import Header from '../components/Header';

import Accodion from '../components/CarBrands/Acoordion';


const UserInterface = () => {
  
  return (  

    <div className="flex flex-col">

      <Header/>  

      <div className="h-[90vh] bg-white p-4">
        
        <div className='w-full'>
          <Accodion />
        </div>
      
      </div>  
    
    </div>

  );
};

export default UserInterface;

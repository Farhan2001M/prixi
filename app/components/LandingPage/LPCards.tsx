

import React from 'react';

interface CarvanaSectionProps {
  title: string;
  subtitle: string;
  logo: string; // Replace with image path
  buttonText: string;
}
const CarvanaSection: React.FC<CarvanaSectionProps> = ({ title, subtitle, logo, buttonText }) => {
  return (
    
        <div className="w-full max-w-[550px] bg-white text-black  rounded-2xl flex flex-col items-center mx-auto">
            
            <div className='h-2/4  w-full'>
                <img src={logo} alt="Carvana Logo" className="h-[110%] p-9 mx-auto" />
            </div>

            <div className='h-2/4 bg-white rounded-2xl w-full flex flex-col justify-center items-center text-center'>
                <h2 className="text-2xl font-extrabold">{title}</h2>
                <p className="text-lg mt-2 w-4/5">{subtitle}</p>
                <button className="bg-gray-200 hover:bg-gray-300 text-black font-medium text-xl tracking-wide px-4 py-2 rounded-md mt-4">{buttonText}</button>
            </div>

        </div>
    
  );
};
const LPCards = () => {
  return (
    <section  className='w-full max-w-[1920px] mx-auto h-[580px]  flex'>

        <div className='w-full max-w-[1150px] mx-auto bg-gray-200 rounded-2xl p-8 h-[450px] mt-6'>
          <div className="flex gap-12 h-full">
            <CarvanaSection
              title="Get Personalized Recommendations"
              subtitle="We use latesst up-to-date Gen AI to keep you updated and to serve your purposes. "
              logo="./images/Cards/AI.png" // Replace with actual logo path
              buttonText="Learn More"
            />
            <CarvanaSection
              title="Calculate Taxes And loans"
              subtitle="Few clicks to save the hassle of hours in taxation and loaning by our partners."
              logo="./images/Cards/coin.png" // Replace with actual logo path
              buttonText="Learn More"
            />
          </div>
        </div>

    </section>
  )
}

export default LPCards
'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import { Input, Select, SelectItem, Button, Checkbox } from '@nextui-org/react';

const US_STATES_TAX = {
  Alabama: 4,
  Alaska: 0,
  Arizona: 5.6,
  Arkansas: 6.5,
  California: 7.25,
  Colorado: 2.9,
  Connecticut: 6.35,
  Delaware: 0,
  Florida: 6,
  Georgia: 4,
  Hawaii: 4,
  Idaho: 6,
  Illinois: 6.25,
  Indiana: 7,
  Iowa: 6,
  Kansas: 6.5,
  Kentucky: 6,
  Louisiana: 4.45,
  Maine: 5.5,
  Maryland: 6,
  Massachusetts: 6.25,
  Michigan: 6,
  Minnesota: 6.88,
  Mississippi: 7,
  Missouri: 4.23,
  Montana: 0,
  Nebraska: 5.5,
  Nevada: 8.5,
  NewHampshire: 0,
  NewJersey: 6.63,
  NewMexico: 5.13,
  NewYork: 4,
  NorthCarolina: 4.75,
  NorthDakota: 5,
  Ohio: 5.75,
  Oklahoma: 4.5,
  Oregon: 0,
  Pennsylvania: 6,
  RhodeIsland: 7,
  SouthCarolina: 6,
  SouthDakota: 4.5,
  Tennessee: 7,
  Texas: 8,
  Utah: 4.85,
  Vermont: 6,
  Virginia: 5.3,
  Washington: 6.5,
  WestVirginia: 6,
  Wisconsin: 5,
  Wyoming: 4,
};

const US_STATES_REGISTRATION = {
  Alabama: 100,
  Alaska: 0,
  Arizona: 150,
  Arkansas: 75,
  California: 120,
  Colorado: 130,
  Connecticut: 95,
  Delaware: 50,
  Florida: 100,
  Georgia: 80,
  Hawaii: 130,
  Idaho: 110,
  Illinois: 115,
  Indiana: 140,
  Iowa: 70,
  Kansas: 125,
  Kentucky: 50,
  Louisiana: 120,
  Maine: 100,
  Maryland: 150,
  Massachusetts: 140,
  Michigan: 90,
  Minnesota: 160,
  Mississippi: 75,
  Missouri: 100,
  Montana: 0,
  Nebraska: 130,
  Nevada: 150,
  NewHampshire: 50,
  NewJersey: 125,
  NewMexico: 90,
  NewYork: 150,
  NorthCarolina: 130,
  NorthDakota: 100,
  Ohio: 110,
  Oklahoma: 120,
  Oregon: 0,
  Pennsylvania: 115,
  RhodeIsland: 140,
  SouthCarolina: 85,
  SouthDakota: 70,
  Tennessee: 130,
  Texas: 150,
  Utah: 110,
  Vermont: 95,
  Virginia: 100,
  Washington: 120,
  WestVirginia: 90,
  Wisconsin: 140,
  Wyoming: 125,
};

const TaxCalculatorPage = () => {
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [includeRegistrationFee, setIncludeRegistrationFee] = useState(false);
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);

  const handleCalculateTax = async () => {
    if (!vehiclePrice || !selectedState) return;

    const price = parseFloat(vehiclePrice);

    if (price < 2500) {
      setCalculatedTax(0);
      setMessage('No Taxes For U.😊.You only need to pay toll taxes.');
      setShowRegistrationMessage(false);
      return;
    }

    if (price < 5000) {
      setShowRegistrationMessage(true);
      setIncludeRegistrationFee(false);
    } else {
      setShowRegistrationMessage(false);
    }

    const taxRate = US_STATES_TAX[selectedState as keyof typeof US_STATES_TAX] || 0;
    const registrationFee = includeRegistrationFee ? US_STATES_REGISTRATION[selectedState as keyof typeof US_STATES_REGISTRATION] || 0 : 0;

    const taxAmount = (price * taxRate) / 100;
    const totalTax = taxAmount + registrationFee;
    setCalculatedTax(totalTax);
    setMessage('');

    // Save the calculated tax to the backend
    await saveCalculatedTax(totalTax, selectedState);

  };

  const saveCalculatedTax = async (taxAmount: number, state: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('User not logged in.');
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${BASE_URL}/savetax`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taxAmount,
          state,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save tax data');
      }

      console.log('Tax data saved successfully');
    } catch (err) {
      console.error('Error saving tax data:', err);
    }
  };

  const handleReset = () => {
    setVehiclePrice('');
    setSelectedState('');
    setIncludeRegistrationFee(false);
    setCalculatedTax(null);
    setMessage('');
    setShowRegistrationMessage(false);
  };

  const isFormValid = vehiclePrice && selectedState;

  const isRegistrationDisabled = parseFloat(vehiclePrice) < 5000;

  if (isRegistrationDisabled && includeRegistrationFee ) {
    setIncludeRegistrationFee(false);
  }

  return (
    <div>
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10">
        <div className="items-center justify-center max-w-lg mx-auto text-center mb-7">
          <h1 className="text-4xl mt-7">Vehicle Tax Calculator</h1>
          <h3 className="text-xl mt-2 mb-12">Calculate the tax you owe based on your state</h3>
        </div>

        <form className="flex flex-col gap-5 items-center justify-center max-w-lg mx-auto">
          {/* Vehicle Price Input */}
          <Input
            label="Vehicle Price"
            type="number"
            size="lg"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(e.target.value)}
            aria-label="Enter Vehicle Price"
            placeholder="Enter the price of the vehicle"
            min={0}
            max={50000000}
          />

          {/* State Selection */}
          <Select
            label="Select State"
            size="lg"
            selectedKeys={new Set([selectedState])}
            onSelectionChange={(keys) => setSelectedState(Array.from(keys)[0] as string || '')}
            aria-label="Select State"
          >
            {Object.keys(US_STATES_TAX).map((state) => (
              <SelectItem key={state} value={state} className="text-2xl">
                {state}
              </SelectItem>
            ))}
          </Select>

          {/* Include Registration Fee Checkbox */}
          <Checkbox
            isSelected={includeRegistrationFee}
            size="lg"
            isDisabled={isRegistrationDisabled || !vehiclePrice || !selectedState}
            onChange={(e) => setIncludeRegistrationFee(e.target.checked)}
          >
            Include Registration Fee ({
              selectedState && US_STATES_REGISTRATION[selectedState as keyof typeof US_STATES_REGISTRATION]
                ? `$${US_STATES_REGISTRATION[selectedState as keyof typeof US_STATES_REGISTRATION]}`
                : "$0"
            })
          </Checkbox>

          {showRegistrationMessage && (
            <div className="text-red-500 text-sm">
              No registration fee on vehicles that cost less than $5000.
            </div>
          )}

          {/* Calculate Tax Button */}
          <Button
            type="button"
            size="lg"
            onClick={handleCalculateTax}
            className="bg-blue-500 text-white w-full"
            isDisabled={!vehiclePrice || !selectedState}
          >
            Calculate Tax
          </Button>

          {/* Display Calculated Tax */}
          {calculatedTax !== null && (
            <div className="mt-3 text-3xl font-semibold text-center">
              Total Tax: ${calculatedTax !== null ? calculatedTax.toFixed(2) : "0.00"}
            </div>
          )}

          {message && (
            <div className="mt-4 text-3xl text-blue-500 text-center">
              {message}
            </div>
          )}
        </form>

        {/* Reset Button */}
        <Button
          onClick={handleReset}
          size="lg"
          color="danger"
          className="absolute bottom-10 right-10"
          isDisabled={!isFormValid}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TaxCalculatorPage;





























// 'use client';

// import React, { useState } from 'react';
// import Header from '../components/Header';
// import { Input, Select, SelectItem, Button, Checkbox } from '@nextui-org/react';

// const US_STATES_TAX = {
//   Alabama: 4,
//   Alaska: 0,
//   Arizona: 5.6,
//   Arkansas: 6.5,
//   California: 7.25,
//   Colorado: 2.9,
//   Connecticut: 6.35,
//   Delaware: 0,
//   Florida: 6,
//   Georgia: 4,
//   Hawaii: 4,
//   Idaho: 6,
//   Illinois: 6.25,
//   Indiana: 7,
//   Iowa: 6,
//   Kansas: 6.5,
//   Kentucky: 6,
//   Louisiana: 4.45,
//   Maine: 5.5,
//   Maryland: 6,
//   Massachusetts: 6.25,
//   Michigan: 6,
//   Minnesota: 6.88,
//   Mississippi: 7,
//   Missouri: 4.23,
//   Montana: 0,
//   Nebraska: 5.5,
//   Nevada: 8.5,
//   NewHampshire: 0,
//   NewJersey: 6.63,
//   NewMexico: 5.13,
//   NewYork: 4,
//   NorthCarolina: 4.75,
//   NorthDakota: 5,
//   Ohio: 5.75,
//   Oklahoma: 4.5,
//   Oregon: 0,
//   Pennsylvania: 6,
//   RhodeIsland: 7,
//   SouthCarolina: 6,
//   SouthDakota: 4.5,
//   Tennessee: 7,
//   Texas: 8,
//   Utah: 4.85,
//   Vermont: 6,
//   Virginia: 5.3,
//   Washington: 6.5,
//   WestVirginia: 6,
//   Wisconsin: 5,
//   Wyoming: 4,
// };

// const US_STATES_REGISTRATION = {
//   Alabama: 100,
//   Alaska: 0,
//   Arizona: 150,
//   Arkansas: 75,
//   California: 120,
//   Colorado: 130,
//   Connecticut: 95,
//   Delaware: 50,
//   Florida: 100,
//   Georgia: 80,
//   Hawaii: 130,
//   Idaho: 110,
//   Illinois: 115,
//   Indiana: 140,
//   Iowa: 70,
//   Kansas: 125,
//   Kentucky: 50,
//   Louisiana: 120,
//   Maine: 100,
//   Maryland: 150,
//   Massachusetts: 140,
//   Michigan: 90,
//   Minnesota: 160,
//   Mississippi: 75,
//   Missouri: 100,
//   Montana: 0,
//   Nebraska: 130,
//   Nevada: 150,
//   NewHampshire: 50,
//   NewJersey: 125,
//   NewMexico: 90,
//   NewYork: 150,
//   NorthCarolina: 130,
//   NorthDakota: 100,
//   Ohio: 110,
//   Oklahoma: 120,
//   Oregon: 0,
//   Pennsylvania: 115,
//   RhodeIsland: 140,
//   SouthCarolina: 85,
//   SouthDakota: 70,
//   Tennessee: 130,
//   Texas: 150,
//   Utah: 110,
//   Vermont: 95,
//   Virginia: 100,
//   Washington: 120,
//   WestVirginia: 90,
//   Wisconsin: 140,
//   Wyoming: 125,
// };




// 'use client';

// import React, { useState } from 'react';
// import Header from '../components/Header';
// import { Input, Select, SelectItem, Button, Checkbox } from '@nextui-org/react';

// const US_STATES_TAX = {
//   Florida: 6,
//   Texas: 8,
//   California: 7.25,
//   NewYork: 4,
//   Nevada: 8.5,
// };

// const TaxCalculatorPage = () => {
//   const [vehiclePrice, setVehiclePrice] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [includeRegistrationFee, setIncludeRegistrationFee] = useState(false);
//   const [calculatedTax, setCalculatedTax] = useState<number | null>(null);

//   const handleCalculateTax = () => {
//     if (!vehiclePrice || !selectedState) return;

//     const price = parseFloat(vehiclePrice);
//     const taxRate = US_STATES_TAX[selectedState as keyof typeof US_STATES_TAX] || 0;
//     const taxAmount = (price * taxRate) / 100;
//     const registrationFee = includeRegistrationFee ? 200 : 0;

//     setCalculatedTax(taxAmount + registrationFee);
//   };

//   const handleReset = () => {
//     setVehiclePrice('');
//     setSelectedState('');
//     setIncludeRegistrationFee(false);
//     setCalculatedTax(null);
//   };

//   const isFormValid = vehiclePrice && selectedState 

//   return (
//     <div>
//       <Header />
//       <div className="h-[90vh] bg-white px-12 py-10">
//         <div className="items-center justify-center max-w-lg mx-auto text-center mb-7">
//           <h1 className="text-3xl">Vehicle Tax Calculator</h1>
//           <h3 className="text-xl">Calculate the tax you owe based on your state</h3>
//         </div>

//         <form className="flex flex-col gap-5 items-center justify-center max-w-lg mx-auto">
//           {/* Vehicle Price Input */}
//           <Input
//             label="Vehicle Price"
//             type="number"
//             size="lg"
//             value={vehiclePrice}
//             onChange={(e) => setVehiclePrice(e.target.value)}
//             aria-label="Enter Vehicle Price"
//             placeholder="Enter the price of the vehicle"
//             min={0}
//           />

//           {/* State Selection */}
//           <Select
//             label="Select State"
//             size="lg"
//             selectedKeys={new Set([selectedState])}
//             onSelectionChange={(keys) => setSelectedState(Array.from(keys)[0] as string || '')}
//             aria-label="Select State"
//           >
//             {Object.keys(US_STATES_TAX).map((state) => (
//               <SelectItem key={state} value={state} className='text-2xl'>
//                 {state}
//               </SelectItem>
//             ))}
//           </Select>

//           {/* Include Registration Fee Checkbox */}
//           <Checkbox
//             isSelected={includeRegistrationFee}
//             size="lg"
//             onChange={(e) => setIncludeRegistrationFee(e.target.checked)}
//             >
//             Include Registration Fee ($200)
//           </Checkbox>

//           {/* Calculate Tax Button */}
//           <Button
//             type="button"
//             onClick={handleCalculateTax}
//             className="bg-blue-500 text-white w-full"
//             isDisabled={!vehiclePrice || !selectedState}
//           >
//             Calculate Tax
//           </Button>

//           {/* Display Calculated Tax */}
//           {calculatedTax !== null && (
//             <div className="mt-3 text-3xl font-semibold text-center">
//               Total Tax: ${calculatedTax.toLocaleString()}
//             </div>
//           )}
//         </form>

//         {/* Reset Button */}
//         <Button
//           onClick={handleReset}
//           size="lg"
//           color="danger"
//           className="absolute bottom-10 right-10"
//           isDisabled={!isFormValid}
//         >
//           Reset
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TaxCalculatorPage;
























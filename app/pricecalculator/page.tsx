'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Input, Select, SelectItem, Button } from '@nextui-org/react'
import ConfettiButton, { ConfettiButtonHandle } from '../components/ConfettiButton';
import Papa from 'papaparse'
import { useRef } from 'react';
import JitterText from '@/components/animata/text/jitter-text-'


interface CsvRow {
  year: string
  make: string
  model: string
  miles: string
  trim: string
  sold_price: string
}

const Page = () => {
  const [makes, setMakes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [trims, setTrims] = useState<string[]>([])
  const [csvData, setCsvData] = useState<CsvRow[]>([])

  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedTrim, setSelectedTrim] = useState<string | null>(null)
  const [miles, setMiles] = useState<string>('')
  const [year, setYear] = useState<string>('')

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load CSV data
  useEffect(() => {
    const loadCsvData = async () => {
      const response = await fetch('/make-model-trim.csv')
      const text = await response.text()
      Papa.parse<CsvRow>(text, {
        complete: (result) => {
          setCsvData(
            result.data
              .filter((item) => item.make && item.model)
              .map((item) => ({
                ...item,
                make: item.make.trim(),
                model: item.model.trim(),
                trim: item.trim?.trim(),
              }))
          )
        },
        header: true,
      })
    }

    loadCsvData()
  }, [])

  // Populate makes
  useEffect(() => {
    if (csvData.length > 0) {
      const makesList = Array.from(new Set(csvData.map((item) => item.make))).sort()
      setMakes(makesList)
    }
  }, [csvData])

  // Populate models based on selected make
  useEffect(() => {
    if (selectedMake) {
      const modelsList = Array.from(
        new Set(
          csvData
            .filter((item) => item.make.toLowerCase() === selectedMake.toLowerCase())
            .map((item) => item.model)
        )
      ).sort()
      setModels(modelsList)
      setSelectedModel(null)
      setTrims([])
    } else {
      setModels([])
    }
    setYear('')
    setMiles('')
  }, [selectedMake, csvData])

  // Populate trims based on selected model
  useEffect(() => {
    if (selectedModel) {
      const trimsList = Array.from(
        new Set(
          csvData
            .filter(
              (item) =>
                item.make.toLowerCase() === selectedMake.toLowerCase() &&
                item.model.toLowerCase() === selectedModel.toLowerCase()
            )
            .map((item) => item.trim)
        )
      ).sort()
      setTrims(trimsList)
      setSelectedTrim(null)
    } else {
      setTrims([])
    }
    setYear('')
    setMiles('')
  }, [selectedModel, csvData, selectedMake])

  // Handle trim selection
  useEffect(() => {
    setYear('')
    setMiles('')
  }, [selectedTrim])

  // Check if all fields are filled
  const isFormValid = selectedMake && selectedModel && selectedTrim && miles && year

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to send to the API
    const requestData = {
      year: parseInt(year),
      make: selectedMake,
      model: selectedModel,
      miles: parseInt(miles),
      trim: selectedTrim,
    };

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists; if not, log a warning and exit
    if (!token) {
      console.warn("User not logged in.");
      setError("User not logged in. Please log in first.");
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
      // Make the POST request to the price prediction route
      const response = await fetch(`${BASE_URL}/pricepredict`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(requestData),
      });

      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error('Error in price prediction');
      }

      const data = await response.json();
      const price = parseFloat(data.predicted_price.replace('$', '').replace(',', ''));

      // Set the price or error based on the value
      if (price < 0) {
        setPredictedPrice(null);
        setError("Your car is an antique piece, Donate it to a museum");
        setTimeout(() => {
          handleConfirmClick();
        }, 700);
      } else {
        setPredictedPrice(price);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch the predicted price. Please try again later.');
      setPredictedPrice(null);
    }
  };

  {/* Confetti Animation Code */}
  const confettiButtonRef = useRef<ConfettiButtonHandle>(null);
  const handleConfirmClick = () => {
    // Trigger confetti animation
    if (confettiButtonRef.current) {
      confettiButtonRef.current.triggerConfetti(); 
    }
  };


  // Reset form fields
  const handleReset = () => {
    setSelectedMake('')
    setSelectedModel(null)
    setSelectedTrim(null)
    setMiles('')
    setYear('')
    setPredictedPrice(null)
    setError(null)
  }

  return (
    <div>
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10 ">
        <div className='items-center justify-center max-w-lg mx-auto text-center mb-7'>
          <h1 className='text-3xl'>Prixi Price Calculator</h1>
          <h3 className='text-xl'>Get instant price predictions with 90% accuracy</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center max-w-lg mx-auto" >
          {/* Make Selection */}
          <Select
            label="Make"
            selectedKeys={new Set([selectedMake])}
            onSelectionChange={(keys) => setSelectedMake(Array.from(keys)[0] as string || '')}
            aria-label="Select Make"
            disabled={makes.length === 0}
          >
            {makes.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </Select>

          {/* Model Selection */}
          <Select
            label="Model"
            selectedKeys={new Set([selectedModel || ''])}
            onSelectionChange={(keys) => setSelectedModel(Array.from(keys)[0] as string || null)}
            aria-label="Select Model"
            isDisabled={!selectedMake || models.length === 0}
          >
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </Select>

          {/* Trim Selection */}
          <Select
            label="Trim"
            selectedKeys={new Set([selectedTrim || ''])}
            onSelectionChange={(keys) => setSelectedTrim(Array.from(keys)[0] as string || null)}
            aria-label="Select Trim"
            isDisabled={!selectedModel || trims.length === 0}
          >
            {trims.map((trim) => (
              <SelectItem key={trim} value={trim}>
                {trim}
              </SelectItem>
            ))}
          </Select>

          {/* Miles Input */}
          <Input
            label="Miles"
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            aria-label="Enter Miles"
            isDisabled={!selectedTrim}
            min={0}
            max={3000000} 
          />

          {/* Year Input */}
          <Input
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Enter Year"
            isDisabled={!miles}
            min={2000}  
            max={2025}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={!isFormValid}
            className="bg-blue-500 text-white  w-full">
            Submit
          </Button>

          {/* Display predicted price or message */}
          {predictedPrice !== null && predictedPrice >= 0 && (
            <div className="mt-3 text-3xl font-semibold text-center">
              ${predictedPrice.toLocaleString()}
            </div>
          )}

          {error && (
            <div className="mt-3 text-xl font-semibold text-center text-red-600">
              <JitterText text={error} />
            </div>
          )}
        </form>

        {/* Reset Button (Positioned at the bottom left corner) */}
        <Button
          onClick={handleReset}
          color="danger"
          className="absolute bottom-10 right-10 "
          isDisabled={!isFormValid}  
        >
          Reset Form
        </Button>

      </div>

      <ConfettiButton ref={confettiButtonRef} />

    </div>
  )
}

export default Page









































// 'use client'

// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import { Input, Select, SelectItem, Button } from '@nextui-org/react'
// import Papa from 'papaparse'

// // Define the structure of the CSV data
// interface CsvRow {
//   year: string
//   make: string
//   model: string
//   miles: string
//   trim: string
//   sold_price: string
// }

// const Page = () => {
//   const [makes, setMakes] = useState<string[]>([])
//   const [models, setModels] = useState<string[]>([])
//   const [trims, setTrims] = useState<string[]>([])
//   const [csvData, setCsvData] = useState<CsvRow[]>([]) // Use the defined type

//   const [selectedMake, setSelectedMake] = useState<string>('')
//   const [selectedModel, setSelectedModel] = useState<string | null>(null)
//   const [selectedTrim, setSelectedTrim] = useState<string | null>(null)
//   const [miles, setMiles] = useState<string>('')
//   const [year, setYear] = useState<string>('')

//   // Load CSV data
//   useEffect(() => {
//     const loadCsvData = async () => {
//       const response = await fetch('/make-model-trim.csv')
//       const text = await response.text()
//       Papa.parse<CsvRow>(text, {
//         complete: (result) => {
//           setCsvData(
//             result.data
//               .filter((item) => item.make && item.model) // Ensure valid data
//               .map((item) => ({
//                 ...item,
//                 make: item.make.trim(),
//                 model: item.model.trim(),
//                 trim: item.trim?.trim(),
//               }))
//           )
//         },
//         header: true,
//       })
//     }

//     loadCsvData()
//   }, [])

//   // Populate makes
//   useEffect(() => {
//     if (csvData.length > 0) {
//       const makesList = Array.from(new Set(csvData.map((item) => item.make))).sort()
//       setMakes(makesList)
//     }
//   }, [csvData])

//   // Populate models based on selected make
//   useEffect(() => {
//     if (selectedMake) {
//       const modelsList = Array.from(
//         new Set(
//           csvData
//             .filter((item) => item.make.toLowerCase() === selectedMake.toLowerCase())
//             .map((item) => item.model)
//         )
//       ).sort()
//       setModels(modelsList)
//       setSelectedModel(null) // Reset model when make changes
//       setTrims([]) // Reset trims when make changes
//     } else {
//       setModels([]) // Reset models if no make is selected
//     }
//     // Reset year and miles when make changes
//     setYear('')
//     setMiles('')
//   }, [selectedMake, csvData])

//   // Populate trims based on selected model
//   useEffect(() => {
//     if (selectedModel) {
//       const trimsList = Array.from(
//         new Set(
//           csvData
//             .filter(
//               (item) =>
//                 item.make.toLowerCase() === selectedMake.toLowerCase() &&
//                 item.model.toLowerCase() === selectedModel.toLowerCase()
//             )
//             .map((item) => item.trim)
//         )
//       ).sort()
//       setTrims(trimsList)
//       setSelectedTrim(null) // Reset trim when model changes
//     } else {
//       setTrims([]) // Reset trims if no model is selected
//     }
//     // Reset year and miles when model changes
//     setYear('')
//     setMiles('')
//   }, [selectedModel, csvData, selectedMake])

//   // Handle trim selection
//   useEffect(() => {
//     // Reset year and miles when trim changes
//     setYear('')
//     setMiles('')
//   }, [selectedTrim])

//   return (
//     <div>
//       <Header />
//       <div className="h-[90vh] bg-slate-100 px-12 py-10">
//         <form className="space-y-4">
//           {/* Make Selection */}
//           <Select
//             label="Make"
//             selectedKeys={new Set([selectedMake])} // Display the selected make
//             onSelectionChange={(keys) => setSelectedMake(Array.from(keys)[0] as string || '')} // Extract value from Set
//             aria-label="Select Make"
//             disabled={makes.length === 0}
//           >
//             {makes.map((make) => (
//               <SelectItem key={make} value={make}>
//                 {make}
//               </SelectItem>
//             ))}
//           </Select>

//           {/* Model Selection */}
//           <Select
//             label="Model"
//             selectedKeys={new Set([selectedModel || ''])} // Display the selected model
//             onSelectionChange={(keys) => setSelectedModel(Array.from(keys)[0] as string || null)} // Extract value from Set
//             aria-label="Select Model"
//             disabled={!selectedMake || models.length === 0}
//           >
//             {models.map((model) => (
//               <SelectItem key={model} value={model}>
//                 {model}
//               </SelectItem>
//             ))}
//           </Select>

//           {/* Trim Selection */}
//           <Select
//             label="Trim"
//             selectedKeys={new Set([selectedTrim || ''])} // Display the selected trim
//             onSelectionChange={(keys) => setSelectedTrim(Array.from(keys)[0] as string || null)} // Extract value from Set
//             aria-label="Select Trim"
//             disabled={!selectedModel || trims.length === 0}
//           >
//             {trims.map((trim) => (
//               <SelectItem key={trim} value={trim}>
//                 {trim}
//               </SelectItem>
//             ))}
//           </Select>

//           {/* Miles Input */}
//           <Input
//             label="Miles"
//             type="number"
//             value={miles}
//             onChange={(e) => setMiles(e.target.value)}
//             aria-label="Enter Miles"
//             disabled={!selectedTrim}
//           />

//           {/* Year Input */}
//           <Input
//             label="Year"
//             type="number"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             aria-label="Enter Year"
//             disabled={!miles}
//           />

//           <Button type="submit">Submit</Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Page






























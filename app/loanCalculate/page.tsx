'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { CustomToast, CustomToastContainer } from "../components/CustomToastService";

const LoanCalculatorPage = () => {
  const defaultSchedule = [
    { label: 'Weekly', payment: '-', totalPayments: '-' },
    { label: 'Fortnightly', payment: '-', totalPayments: '-' },
    { label: 'Monthly', payment: '-', totalPayments: '-' },
    { label: 'Tri-Monthly', payment: '-', totalPayments: '-' },
    { label: 'Biannual', payment: '-', totalPayments: '-' },
    { label: 'Annual', payment: '-', totalPayments: '-' },
  ];

  const [vehiclePrice, setVehiclePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanSchedule, setLoanSchedule] = useState(defaultSchedule);

  const [totalCost, setTotalCost] = useState('$0.00');
  const [extraAmount, setExtraAmount] = useState('$0.00');

  const calculateLoan = async () => {
    
    if (!vehiclePrice || !downPayment || !loanTerm || !interestRate) {
      // If any field is missing, show the custom error toast
      CustomToast.error("Fill in the fields first.");
      return; // Stop further execution of the function
    }

    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment);
    const term = parseFloat(loanTerm);
    const rate = parseFloat(interestRate) / 100;

    const loanAmount = price - down;
    const monthlyRate = rate / 12;
    const totalMonths = term * 12;
    const monthlyPayment =
      loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));

    const totalLoanAmount = monthlyPayment * totalMonths;
    const extraPaidAmount = totalLoanAmount - loanAmount;

    const schedule = [
      { label: 'Weekly', payment: (monthlyPayment * 12) / 52, totalPayments: term * 52 },
      { label: 'Fortnightly', payment: (monthlyPayment * 12) / 26, totalPayments: term * 26 },
      { label: 'Monthly', payment: monthlyPayment, totalPayments: term * 12 },
      { label: 'Tri-Monthly', payment: monthlyPayment * 3, totalPayments: term * 4 },
      { label: 'Biannual', payment: monthlyPayment * 6, totalPayments: term * 2 },
      { label: 'Annual', payment: monthlyPayment * 12, totalPayments: term * 1 },
    ];

    setLoanSchedule(
      schedule.map((entry) => ({
        label: entry.label,
        payment: `$${entry.payment.toFixed(2)}`,
        totalPayments: `${entry.totalPayments}`, // Convert totalPayments to a string
      }))
    );

    const totalCostValue = price + extraPaidAmount; // Total cost is vehicle price + interest paid
    setTotalCost(`$${totalCostValue.toFixed(2)}`);
    setExtraAmount(`$${extraPaidAmount.toFixed(2)}`);

    // Save the calculated loan data to the backend
    await saveCalculatedLoan({
      vehiclePrice: price,
      downPayment: down,
      loanTerm: term,
      interestRate: rate,
      loanAmount,
      monthlyPayment,
      totalLoanAmount,
      extraPaidAmount,
      totalCost: totalCostValue,
    });
  };

  const saveCalculatedLoan = async (loanData: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('User not logged in.');
        return;
    }

    try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${BASE_URL}/saveloan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...loanData,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to save loan data');
        }

        console.log('Loan data saved successfully');
    } catch (err) {
        console.error('Error saving loan data:', err);
    }
  };

  const handleReset = () => {
    setVehiclePrice('');
    setDownPayment('');
    setLoanTerm('');
    setInterestRate('');
    setLoanSchedule(defaultSchedule);
    setTotalCost('$0.00');
    setExtraAmount('$0.00');
  };

  return (
    <div>
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10">
        <div className="text-center mb-7">
          <h1 className="text-4xl mt-7">Vehicle Loan Calculator</h1>
          <h3 className="text-xl mt-2 mb-12">Calculate your loan payment schedule</h3>
        </div>

        <div className="flex justify-center items-center gap-10">
          {/* Form Section */}
          <form className="flex flex-col gap-5 items-center justify-center max-w-lg w-1/2">
            <Input
              label="Vehicle Price"
              type="number"
              size="lg"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              aria-label="Enter Vehicle Price"
              placeholder="Enter the price of the vehicle"
              min={0}
            />

            <Input
              label="Down Payment"
              type="number"
              size="lg"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              aria-label="Enter Down Payment"
              placeholder="Enter the down payment amount"
              min={0}
            />

            <Input
              label="Loan Term (Years)"
              type="number"
              size="lg"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              aria-label="Enter Loan Term"
              placeholder="Enter loan term in years"
              min={1}
            />

            <Input
              label="Interest Rate (%)"
              type="number"
              size="lg"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              aria-label="Enter Interest Rate"
              placeholder="Enter the interest rate"
              min={0}
              max={100}
            />

            <Button
              type="button"
              size="lg"
              onClick={calculateLoan}
              className="bg-blue-500 text-white w-full"
            >
              Calculate Loan
            </Button>
          </form>

          {/* Table Section */}
          <div className="w-1/2 max-w-xl flex flex-col  gap-10">
            <Table
              aria-label="Loan Payment Schedule"
              className="max-w-xl"
            >
              <TableHeader>
                <TableColumn>Payment Frequency</TableColumn>
                <TableColumn>Payment Amount</TableColumn>
                <TableColumn>Total Payments</TableColumn>
              </TableHeader>
              <TableBody>
                {loanSchedule.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.label}</TableCell>
                    <TableCell>{entry.payment}</TableCell>
                    <TableCell>{entry.totalPayments}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Total Cost and Extra Amount */}
            <div className="text-center">
              <p>Total Cost of ownership : {totalCost}</p>
              <p>Extra Amount To Be Paid Due To Loan: {extraAmount}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleReset}
          size="lg"
          color="danger"
          className="absolute bottom-10 right-10"
        >
          Reset
        </Button>
      </div>
      {/* ToastContainer for notifications */}
      <CustomToastContainer />
    </div>
  );
};

export default LoanCalculatorPage;






















// 'use client';

// import React, { useState } from 'react';
// import Header from '../components/Header';
// import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

// const LoanCalculatorPage = () => {
//   const defaultSchedule = [
//     { label: 'Weekly', payment: '-', totalPayments: '-' },
//     { label: 'Fortnightly', payment: '-', totalPayments: '-' },
//     { label: 'Monthly', payment: '-', totalPayments: '-' },
//     { label: 'Tri-Monthly', payment: '-', totalPayments: '-' },
//     { label: 'Biannual', payment: '-', totalPayments: '-' },
//     { label: 'Annual', payment: '-', totalPayments: '-' },
//   ];

//   const [vehiclePrice, setVehiclePrice] = useState('');
//   const [downPayment, setDownPayment] = useState('');
//   const [loanTerm, setLoanTerm] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [loanSchedule, setLoanSchedule] = useState(defaultSchedule);

//   const [totalAmount, setTotalAmount] = useState<string | null>(null);
//   const [extraAmount, setExtraAmount] = useState<string | null>(null);


//   const calculateLoan = () => {
//     if (!vehiclePrice || !downPayment || !loanTerm || !interestRate) return;

//     const price = parseFloat(vehiclePrice);
//     const down = parseFloat(downPayment);
//     const term = parseFloat(loanTerm);
//     const rate = parseFloat(interestRate) / 100;

//     const loanAmount = price - down;
//     const monthlyRate = rate / 12;
//     const totalMonths = term * 12;
//     const monthlyPayment =
//       loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));

//     const totalLoanAmount = monthlyPayment * totalMonths;
//     const extraPaidAmount = totalLoanAmount - loanAmount;

//     const schedule = [
//       { label: 'Weekly', payment: (monthlyPayment * 12) / 52, totalPayments: term * 52 },
//       { label: 'Fortnightly', payment: (monthlyPayment * 12) / 26, totalPayments: term * 26 },
//       { label: 'Monthly', payment: monthlyPayment, totalPayments: term * 12 },
//       { label: 'Tri-Monthly', payment: monthlyPayment * 3, totalPayments: term * 4 },
//       { label: 'Biannual', payment: monthlyPayment * 6, totalPayments: term * 2 },
//       { label: 'Annual', payment: monthlyPayment * 12, totalPayments: term * 1 },
//     ];

//     setLoanSchedule(
//       schedule.map((entry) => ({
//         label: entry.label,
//         payment: `$${entry.payment.toFixed(2)}`,
//         totalPayments: `${entry.totalPayments}`, // Convert totalPayments to a string
//       }))
//     );
//     setTotalAmount(`$${totalLoanAmount.toFixed(2)}`);
//     setExtraAmount(`$${extraPaidAmount.toFixed(2)}`);
      
//   };

//   const handleReset = () => {
//     setVehiclePrice('');
//     setDownPayment('');
//     setLoanTerm('');
//     setInterestRate('');
//     setLoanSchedule(defaultSchedule);
//     setTotalAmount(null);
//     setExtraAmount(null);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="h-[90vh] bg-white px-12 py-10">
//         <div className="text-center mb-7">
//           <h1 className="text-4xl mt-7">Vehicle Loan Calculator</h1>
//           <h3 className="text-xl mt-2 mb-12">Calculate your loan payment schedule</h3>
//         </div>

//         <div className="flex justify-center items-center gap-10">
//           {/* Form Section */}
//           <form className="flex flex-col gap-5 items-center justify-center max-w-lg w-1/2">
//             <Input
//               label="Vehicle Price"
//               type="number"
//               size="lg"
//               value={vehiclePrice}
//               onChange={(e) => setVehiclePrice(e.target.value)}
//               aria-label="Enter Vehicle Price"
//               placeholder="Enter the price of the vehicle"
//               min={0}
//             />

//             <Input
//               label="Down Payment"
//               type="number"
//               size="lg"
//               value={downPayment}
//               onChange={(e) => setDownPayment(e.target.value)}
//               aria-label="Enter Down Payment"
//               placeholder="Enter the down payment amount"
//               min={0}
//             />

//             <Input
//               label="Loan Term (Years)"
//               type="number"
//               size="lg"
//               value={loanTerm}
//               onChange={(e) => setLoanTerm(e.target.value)}
//               aria-label="Enter Loan Term"
//               placeholder="Enter loan term in years"
//               min={1}
//             />

//             <Input
//               label="Interest Rate (%)"
//               type="number"
//               size="lg"
//               value={interestRate}
//               onChange={(e) => setInterestRate(e.target.value)}
//               aria-label="Enter Interest Rate"
//               placeholder="Enter the interest rate"
//               min={0}
//               max={100}
//             />

//             <Button
//               type="button"
//               size="lg"
//               onClick={calculateLoan}
//               className="bg-blue-500 text-white w-full"
//             >
//               Calculate Loan
//             </Button>
//           </form>

//           {/* Table Section */}
//           <div className="w-1/2">
//             <Table
//               aria-label="Loan Payment Schedule"
//               className="mt-5"
//             >
//               <TableHeader>
//                 <TableColumn>Payment Frequency</TableColumn>
//                 <TableColumn>Payment Amount</TableColumn>
//                 <TableColumn>Total Payments</TableColumn>
//               </TableHeader>
//               <TableBody>
//                 {loanSchedule.map((entry, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{entry.label}</TableCell>
//                     <TableCell>{entry.payment}</TableCell>
//                     <TableCell>{entry.totalPayments}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Total and Extra Amount */}
//             {totalAmount && extraAmount && (
//               <div className="mt-5">
//                 <p>Total Amount After Loan: {totalAmount}</p>
//                 <p>Extra Amount Paid Due to Loan: {extraAmount}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <Button
//           onClick={handleReset}
//           size="lg"
//           color="danger"
//           className="absolute bottom-10 right-10"
//         >
//           Reset
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LoanCalculatorPage;




















// 'use client';

// import React, { useState } from 'react';
// import Header from '../components/Header';
// import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

// type LoanScheduleEntry = {
//   label: string;
//   frequency: number;
//   payment: number;
// };

// const LoanCalculatorPage = () => {
//   const [vehiclePrice, setVehiclePrice] = useState('');
//   const [downPayment, setDownPayment] = useState('');
//   const [loanTerm, setLoanTerm] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [loanSchedule, setLoanSchedule] = useState<LoanScheduleEntry[]>([]);

//   const calculateLoan = () => {
//     if (!vehiclePrice || !downPayment || !loanTerm || !interestRate) return;

//     const price = parseFloat(vehiclePrice);
//     const down = parseFloat(downPayment);
//     const term = parseFloat(loanTerm);
//     const rate = parseFloat(interestRate) / 100;

//     const loanAmount = price - down;
//     const monthlyRate = rate / 12;
//     const totalMonths = term * 12;
//     const monthlyPayment =
//       loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));

//     const schedule: LoanScheduleEntry[] = [
//       { label: 'Weekly', frequency: 52, payment: (monthlyPayment * 12) / 52 },
//       { label: 'Fortnightly', frequency: 26, payment: (monthlyPayment * 12) / 26 },
//       { label: 'Monthly', frequency: 12, payment: monthlyPayment },
//       { label: 'Tri-Monthly', frequency: 4, payment: monthlyPayment * 3 },
//       { label: 'Biannual', frequency: 2, payment: monthlyPayment * 6 },
//       { label: 'Annual', frequency: 1, payment: monthlyPayment * 12 },
//     ];

//     setLoanSchedule(schedule);
//   };

//   const handleReset = () => {
//     setVehiclePrice('');
//     setDownPayment('');
//     setLoanTerm('');
//     setInterestRate('');
//     setLoanSchedule([]);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="h-[90vh] bg-white px-12 py-10">
//         <div className="items-center justify-center max-w-lg mx-auto text-center mb-7">
//           <h1 className="text-4xl mt-7">Vehicle Loan Calculator</h1>
//           <h3 className="text-xl mt-2 mb-12">Calculate your loan payment schedule</h3>
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

//           {/* Down Payment Input */}
//           <Input
//             label="Down Payment"
//             type="number"
//             size="lg"
//             value={downPayment}
//             onChange={(e) => setDownPayment(e.target.value)}
//             aria-label="Enter Down Payment"
//             placeholder="Enter the down payment amount"
//             min={0}
//           />

//           {/* Loan Term Input */}
//           <Input
//             label="Loan Term (Years)"
//             type="number"
//             size="lg"
//             value={loanTerm}
//             onChange={(e) => setLoanTerm(e.target.value)}
//             aria-label="Enter Loan Term"
//             placeholder="Enter loan term in years"
//             min={1}
//           />

//           {/* Interest Rate Input */}
//           <Input
//             label="Interest Rate (%)"
//             type="number"
//             size="lg"
//             value={interestRate}
//             onChange={(e) => setInterestRate(e.target.value)}
//             aria-label="Enter Interest Rate"
//             placeholder="Enter the interest rate"
//             min={0}
//             max={100}
//           />

//           {/* Calculate Loan Button */}
//           <Button
//             type="button"
//             size="lg"
//             onClick={calculateLoan}
//             className="bg-blue-500 text-white w-full"
//           >
//             Calculate Loan
//           </Button>

//           {/* Display Loan Schedule */}
//           {loanSchedule.length > 0 && (
//             <Table aria-label="Loan Payment Schedule" className="mt-8 mb-8">
//               <TableHeader>
//                 <TableColumn>Payment Frequency</TableColumn>
//                 <TableColumn>Payment Amount</TableColumn>
//               </TableHeader>
//               <TableBody>
//                 {loanSchedule.map((entry, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{entry.label}</TableCell>
//                     <TableCell>${entry.payment.toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </form>

//         {/* Reset Button */}
//         <Button
//           onClick={handleReset}
//           size="lg"
//           color="danger"
//           className="absolute bottom-10 right-10"
//         >
//           Reset
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LoanCalculatorPage;

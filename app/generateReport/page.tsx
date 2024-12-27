"use client";

import React from 'react';
import Header from '../components/Header';
import { Button } from '@nextui-org/react';

const generateReport = () => {
  // Function to trigger the download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/mypdf.pdf'; // Path to the PDF in the public folder
    link.download = 'mypdf.pdf'; // You can set a custom name for the downloaded file
    link.click(); // Trigger the download
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col">
        {/* Add additional content if needed */}
      </div>

      {/* Reset Button */}
      <Button
        size="lg"
        color="danger"
        className="absolute bottom-10 right-10"
        onClick={handleDownload} // Trigger the download when clicked
      >
        Generate Report
      </Button>
    </div>
  );
};

export default generateReport;





// "use client"

// import React from 'react';
// import Header from '../components/Header';
// import { Button } from '@nextui-org/react';

// const generateReport = () => {
 
//   return (
//     <div className="flex flex-col">
      
//       <Header />

//       <div className="flex flex-col">
          
//       </div>

//       {/* Reset Button */}
//       <Button
//         size="lg"
//         color="danger"
//         className="absolute bottom-10 right-10"
//       >
//         Generate Report
//       </Button>

//     </div>
//   );
// };


// export default generateReport;


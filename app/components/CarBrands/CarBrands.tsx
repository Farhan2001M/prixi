import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the new Car interface to match the backend data structure
interface Car {
  brandName: string;
}

const CarBrands: React.FC = () => {
  const [brands, setBrands] = useState<Car[]>([]);  // State to hold brand data

  // Fetch brand data from the backend
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-car-brands');  // New API endpoint
        const data = await response.json();
        setBrands(data);  // Store fetched brands in state
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Function to split the data into rows with 7 car brands each
  const chunkArray = (array: Car[], chunkSize: number): Car[][] => {
    const result: Car[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split the car data into rows
  const rows = chunkArray(brands, 7);

  const pathname = usePathname();  // Get current path

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 ">
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-center">
            {row.map((brand) => {
              const linkUrl = `/carsbrands/${brand.brandName}`;  // Updated link URL with brand name only
              const isActive = pathname === linkUrl;  // Check if the link URL matches the current route

              return (
                <td
                  key={brand.brandName}
                  className="text-xl font-medium" >
                  <Link
                    href={linkUrl}
                    className={`block py-1 px-2 rounded transition-colors duration-500 ${
                      isActive ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white active:bg-slate-400'
                    }`}
                  >
                    {brand.brandName}  {/* Updated to use brandName */}
                  </Link>
                </td>
              );
            })}

            {/* Add empty cells if the row has fewer than 7 items */}
            {row.length < 7 && (
              <>
                {Array.from({ length: 7 - row.length }).map((_, i) => (
                  <td
                    key={`empty-${i}`}
                    className="px-2 py-2 whitespace-nowrap"
                  ></td>
                ))}
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarBrands;









// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// interface Car {
//   M_id: number;
//   name: string;
// }

// const CarBrands: React.FC = () => {
//   const [brands, setBrands] = useState<Car[]>([]);  // State to hold brand data

//   // Fetch brand data from the backend
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/get-car-brands');  // New API endpoint
//         const data = await response.json();
//         setBrands(data);  // Store fetched brands in state
//       } catch (error) {
//         console.error('Error fetching car brands:', error);
//       }
//     };
//     fetchBrands();
//   }, []);

//   // Function to split the data into rows with 7 car brands each
//   const chunkArray = (array: Car[], chunkSize: number): Car[][] => {
//     const result: Car[][] = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   // Split the car data into rows 
//   const rows = chunkArray(brands, 7);

//   const pathname = usePathname();  // Get current path

//   return (
//     <table className="min-w-full divide-y divide-gray-200 border border-gray-300 ">
//       <tbody className="bg-white divide-y divide-gray-200">
//         {rows.map((row, rowIndex) => (
//           <tr key={rowIndex} className="text-center">
//             {row.map((brand) => {
//               const linkUrl = `/carsbrands/${brand.name}${brand.M_id}`;  // Create the link URL (brand name + id)
//               const isActive = pathname === linkUrl;  // Check if the link URL matches the current route

//               return (
//                 <td
//                   key={brand.M_id}
//                   className="text-xl font-medium" >
//                   <Link
//                     href={linkUrl}
//                     className={`block py-1 px-2 rounded transition-colors duration-500 ${
//                       isActive ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white active:bg-slate-400'
//                     }`}
//                   >
//                     {brand.name}
//                   </Link>
//                 </td>
//               );
//             })}

//             {/* Add empty cells if the row has fewer than 7 items */}
//             {row.length < 7 && (
//               <>
//                 {Array.from({ length: 7 - row.length }).map((_, i) => (
//                   <td
//                     key={`empty-${i}`}
//                     className="px-2 py-2 whitespace-nowrap"
//                   ></td>
//                 ))}
//               </>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default CarBrands;

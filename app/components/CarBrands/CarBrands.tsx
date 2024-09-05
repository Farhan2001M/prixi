import React from 'react';
import { Car, data } from '../../MyCarsData/GeneralCars'; // Adjust the import path as necessary
import Link from 'next/link';

// import { useRouter } from 'next/navigation'; // Import useRouter
import { usePathname } from 'next/navigation';

const CarBrands: React.FC = () => {
  // Function to split the data into rows with 3 car brands each
  const chunkArray = (array: Car[], chunkSize: number): Car[][] => {
    const result: Car[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split the car data into rows of 3
  const rows = chunkArray(data, 7);

  // Get the current route from useRouter
  const pathname = usePathname(); // Get current path
  // const { asPath } = useRouter();

  return (
      <table className="min-w-full  divide-y divide-gray-200 border border-gray-300 ">
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-center">
              {row.map((car) => {

                const linkUrl = `/carsbrands/${car.name}${car.id}`; // Create the link URL
                const isActive = pathname === linkUrl; // Check if the link URL matches the current route

                return (
                  <td
                    key={car.id}
                    className="text-xl font-medium"
                  >
                    <Link
                        href={linkUrl}
                        className={`block py-1 px-2 rounded transition-colors duration-500 ${
                          isActive ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white active:bg-slate-400'
                        }`}
                      >
                        {car.name}
                      </Link>
                  </td>
                  );
                })}

              {/* Add empty cells if the row has fewer than 7 items */}
              {row.length < 7 && (
                <>
                  {Array.from({ length: 7 - row.length }).map(( _ , i) => (
                    <td
                      key={`empty-${i}`}
                      className=" px-2 py-2 whitespace-nowrap"
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


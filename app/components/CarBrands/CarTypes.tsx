// CarTypes.tsx
import React from 'react';
import { VehicleType, vehicleTypes } from '../../MyCarsData/GeneralCars'; // Adjust the import path as necessary
import Link from 'next/link';

const CarTypes: React.FC = () => {
  // Function to split the vehicle types data into rows with 3 vehicle types each
  const chunkArray = (array: VehicleType[], chunkSize: number): VehicleType[][] => {
    const result: VehicleType[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split the vehicle types data into rows of 7
  const rows = chunkArray(vehicleTypes, 7);

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mb-4">
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-center">
            {row.map((type) => (
              <td
                key={type.id}
                className="text-xl font-medium"
              >
                <Link
                  href={`/vehicletype/${type.name}${type.id}`} // Adjust the href attribute as necessary
                  className="block text-gray-900 hover:bg-black hover:text-white active:bg-slate-400 py-1 px-2 rounded transition-colors duration-500"
                >
                  {type.name}
                </Link>
              </td>
            ))}
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

export default CarTypes;

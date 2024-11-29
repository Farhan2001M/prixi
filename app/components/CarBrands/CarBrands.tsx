import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Car {
  brandName: string;
}

const CarBrands: React.FC = () => {
  const [brands, setBrands] = useState<Car[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-car-brands');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Function to split the data into rows with 5 car brands each
  const chunkArray = (array: Car[], chunkSize: number): Car[][] => {
    const result: Car[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows = chunkArray(brands, 5);
  const pathname = usePathname();

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-fixed">
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-center">
            {row.map((brand) => {
              const linkUrl = `/carsbrands/${brand.brandName}`; // Updated link URL with brand name only
              const isActive = pathname === linkUrl; // Check if the link URL matches the current route

              return (
                <td
                  key={brand.brandName}
                  className="text-xl font-medium  text-center"
                  style={{ width: '20%' }} // Set fixed width for each cell
                >
                  <Link
                    href={linkUrl}
                    className={`block py-2 px-2 rounded transition-colors duration-500 ${
                      isActive ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white active:bg-slate-400'
                    }`}
                  >
                    {brand.brandName} {/* Displaying brand name */}
                  </Link>
                </td>
              );
            })}

            {/* Add empty cells if the row has fewer than 5 items */}
            {row.length < 5 && (
              <>
                {Array.from({ length: 5 - row.length }).map((_, i) => (
                  <td
                    key={`empty-${i}`}
                    className="px-2 py-2 whitespace-nowrap"
                    style={{ width: '20%' }} // Ensure empty cells also have equal width
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

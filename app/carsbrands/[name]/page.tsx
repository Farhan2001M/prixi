"use client";

import React, { useEffect, useState } from 'react';
import Cards from '../../components/CarBrands/CarCards';
import Range from './Filter';
import Header from '../../components/Header';
import Accodion from '../../components/CarBrands/Acoordion';
import Slider from '../../components/CarBrands/Slider';
import { usePathname } from 'next/navigation';
import { VehicleModel } from '../../MyCarsData/Types';
import { Input } from "@nextui-org/react";

const MainPage = () => {
  const [MyData, setMyData] = useState<VehicleModel[]>([]);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const pathParts = pathname.split('/');
  const BrandName = pathParts[pathParts.length - 1];

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 


  useEffect(() => {
    const fetchCarModels = async () => {
      if (BrandName) {
        try {
          const response = await fetch(`${BASE_URL}/get-car-brand/${BrandName}`);
          if (!response.ok) {
            throw new Error(`Error fetching car data: ${response.statusText}`);
          }
          const data = await response.json();
          console.log("Fetched car models:", data.models); // Log the fetched data
          setMyData(data.models);
        } catch (err) {
          console.error('Error fetching car models:', err);
        }
      }
    };
    fetchCarModels();
  }, [BrandName]);

  const [filters, setFilters] = useState({
    priceRange: [0, 2500000],
    yearRange: [1980, 2030],
    vehicleTypes: [] as string[],
    minSeatingCapacity: 1,
    horsepowerRange: [0, 2500],
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  console.log("Current filters:", filters);

  const filteredData = MyData.filter((car: VehicleModel) => {
    const launchPrice = car.launchPrice || 0;
    const horsepower = car.horsepower || 0;
    const seatingCapacity = car.seatingCapacity || 0;
    const vehicleTypeMatch = filters.vehicleTypes.length === 0 || filters.vehicleTypes.some(type => car.vehicleType?.toLowerCase().includes(type.toLowerCase()));
    const modelNameMatch = car.modelName.toLowerCase().includes(searchTerm.toLowerCase());

    let isValid = true;

    if (launchPrice < filters.priceRange[0] || launchPrice > filters.priceRange[1]) {
      console.log(`Filtering out ${car.modelName}: Price (${launchPrice}) not in range ${filters.priceRange[0]} - ${filters.priceRange[1]}`);
      isValid = false;
    }
    if (horsepower < filters.horsepowerRange[0] || horsepower > filters.horsepowerRange[1]) {
      console.log(`Filtering out ${car.modelName}: Horsepower (${horsepower}) not in range ${filters.horsepowerRange[0]} - ${filters.horsepowerRange[1]}`);
      isValid = false;
    }
    if (seatingCapacity < filters.minSeatingCapacity) {
      console.log(`Filtering out ${car.modelName}: Seating capacity (${seatingCapacity}) less than minimum ${filters.minSeatingCapacity}`);
      isValid = false;
    }
    if (!vehicleTypeMatch) {
      console.log(`Filtering out ${car.modelName}: Vehicle type does not match any of the selected types`);
      isValid = false;
    }
    if (!modelNameMatch) {
      console.log(`Filtering out ${car.modelName}: Model name does not match search term "${searchTerm}"`);
      isValid = false;
    }

    return isValid;
  });

  console.log("Filtered cars:", filteredData);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      priceRange: [0, 2500000],
      yearRange: [1980, 2030],
      vehicleTypes: [],
      minSeatingCapacity: 1,
      horsepowerRange: [0, 2500],
    });
  };

  const handleFocus = async () => {
    setShowHistory(true); // Show the history dropdown
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/getsearchhistory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch search history:", err);
    }
  };

  const handleSearchSubmit = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      setShowHistory(false);
      try {
        const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/updatesearchhistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ searchTerm }),
        });

        setSearchHistory((prevHistory) => {
          const updatedHistory = [searchTerm, ...prevHistory.filter(term => term !== searchTerm)];
          return updatedHistory.slice(0, 3);
        });

      } catch (err) {
        console.error("Failed to update search history:", err);
      }
    }
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term); // Set the clicked term as the search term
    setShowHistory(false); // Hide the dropdown
  };

  const [isDeleting, setIsDeleting] = useState(false); // Track if we are deleting a term

  const handleDeleteSearch = async (term: string) => {
    try {
      const token = localStorage.getItem("token");
      // Mark as deleting
      setIsDeleting(true);
      // Call the backend to remove the search term
      const response = await fetch(`${BASE_URL}/removesearchhistory/${term}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Update the local state with the new search history
        setSearchHistory(data.searches);
      } else {
        console.error("Failed to delete search term:", await response.json());
      }
    } catch (err) {
      console.error("Error deleting search term:", err);
    } finally {
      setTimeout(() => {
        setIsDeleting(false); // Reset the deleting state after the delay
      }, 700); // Set delay before hiding dropdown
    }
  };
  

  const handleBlur = () => {
    // Add a slight delay to allow clicks to register before hiding
    setTimeout(() => setShowHistory(false), 200);
  };

  return (
    <div className="flex flex-col">
      <Header />

      <div className='m-8 w-10/12 mx-auto flex justify-between'>

        <Accodion />

        <div className="relative w-1/3">
          {/* Search Bar */}
          <Input
            isClearable
            type="text"
            variant="bordered"
            placeholder="Enter Model Name & Click Enter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            className="w-full"
            onFocus={handleFocus}
            onBlur={handleBlur} // Hide dropdown on blur
            onKeyDown={handleSearchSubmit}
          />

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            // <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className={`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 ${isDeleting ? "opacity-0 pointer-events-none" : "transition-opacity opacity-100"}`}>
              {searchHistory.map((term, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-gray-100"
                  onClick={() => handleHistoryClick(term)} // Attach click handler to the whole line
                >
                  <span className="cursor-pointer">
                    {term}
                  </span>
                  {/* Cross Icon */}
                  <button
                    className="text-red-500 hover:text-red-900 ml-2 transform transition-transform duration-300 hover:rotate-90 "
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from triggering handleHistoryClick
                      handleDeleteSearch(term);
                    }}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        <Range onFiltersChange={handleFiltersChange} brandName={BrandName} searchTerm={searchTerm}onResetFilters={handleResetFilters} />

      </div>

      <div className="m-4 w-10/12 mx-auto">
        <Slider brandName={BrandName} />
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        <Cards filter={filteredData} brandname={BrandName} />
      </div>

    </div>
  );
};

export default MainPage;


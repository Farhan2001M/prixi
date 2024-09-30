import React, { useState, useEffect } from "react";
import { Slider, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { VehicleModel } from '../../MyCarsData/Types';  // Use the new VehicleModel interface

interface Filters {
  priceRange: number[];
  yearRange: number[];
  vehicleTypes: string[];
  minSeatingCapacity: number;
  horsepowerRange: number[];
}

interface PriceRangeProps {
  onFiltersChange: (filters: Filters) => void;
  brandName: string;  // Now we receive brandName as a prop
}

const PriceRange: React.FC<PriceRangeProps> = ({ onFiltersChange, brandName }) => {
  const [data, setData] = useState<VehicleModel[]>([]);  // Store fetched car data
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [yearRange, setYearRange] = useState([1980, 2030]);
  const [vehicleTypes, setVehicleTypes] = useState<Set<string>>(new Set());
  const [minSeatingCapacity, setMinSeatingCapacity] = useState(2);
  const [horsepowerRange, setHorsepowerRange] = useState([0, 1500]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Fetch car data for the selected brand
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get-car-brand/${brandName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for brand: ${brandName}`);
        }
        const carData = await response.json();
        setData(carData.models || []);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    if (brandName) {
      fetchData();
    }
  }, [brandName]);  // Refetch data when the brand name changes

  // Handle applying filters
  const handleApplyFilters = () => {
    onFiltersChange({
      priceRange,
      yearRange,
      vehicleTypes: Array.from(vehicleTypes),  // Convert Set to Array
      minSeatingCapacity,
      horsepowerRange,
    });
    setFiltersApplied(true);
  };

  // Handle resetting filters
  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setYearRange([1980, 2030]);
    setVehicleTypes(new Set());
    setMinSeatingCapacity(2);
    setHorsepowerRange([0, 1500]);
    setFiltersApplied(false);
    onFiltersChange({
      priceRange: [0, 500000],
      yearRange: [1980, 2030],
      vehicleTypes: [],
      minSeatingCapacity: 2,
      horsepowerRange: [0, 1500],
    });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();  // Modal control

  // Extract unique vehicle types from fetched data
  const uniqueVehicleTypes = Array.from(new Set(data.map(car => car.vehicleType).filter(Boolean)));

  const handleSelectionChange = (e: any) => {
    setVehicleTypes(new Set(e.target.value.split(",")));
  };

  // State to track if the Select component is open
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Handler to update `isSelectOpen` when Select opens or closes
  const handleSelectOpenChange = (isOpen: any) => {
    setIsSelectOpen(isOpen);
  };

  return (
    <div>
      <div className="flex gap-5 justify-center">
        <Button size="md" onPress={onOpen} color={filtersApplied ? "success" : "primary"} className="text-base">
          Show Filters
        </Button>

        <Button size="md" color="warning" onPress={handleResetFilters} className="text-base">
          Reset Filters
        </Button>
      </div>

      <Modal backdrop={"blur"} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filter Cars</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-8 items-center">
                  {/* Price Range Slider */}
                  <Slider
                    label="Price Range"
                    step={10000}
                    minValue={0}
                    maxValue={500000}
                    value={priceRange}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    className="max-w-md"
                    onChange={(val) => setPriceRange(val as number[])}  // Casting to number[]
                  />

                  {/* Year Range Slider */}
                  <Slider
                    label="Year Range"
                    step={1}
                    minValue={1980}
                    maxValue={2030}
                    value={yearRange}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={(val) => setYearRange(val as number[])}  // Casting to number[]
                  />

                  {/* Vehicle Type Select */}
                  <Select
                    size={"lg"}
                    labelPlacement="outside"
                    variant={"bordered"}
                    label="Vehicle Type"
                    selectionMode="multiple"
                    placeholder="Select vehicle types"
                    selectedKeys={Array.from(vehicleTypes)}  // Convert Set to Array
                    onChange={handleSelectionChange}
                    onOpenChange={handleSelectOpenChange}  // Track when Select opens or closes
                    className="max-w-md"
                  >
                    {uniqueVehicleTypes.filter(type => type !== undefined).map((type) => (
                      <SelectItem key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Seating Capacity Slider */}
                  <Slider
                    label="Minimum Seating Capacity"
                    step={1}
                    minValue={2}
                    maxValue={7}  // Adjust if needed
                    value={minSeatingCapacity}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={(val) => setMinSeatingCapacity(val as number)}  // Casting to number
                  />

                  {/* Horsepower Range Slider */}
                  <Slider
                    label="Horsepower Range"
                    step={50}
                    minValue={0}
                    maxValue={1500}
                    value={horsepowerRange}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={(val) => setHorsepowerRange(val as number[])}  // Casting to number[]
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}
                  isDisabled={isSelectOpen}  // Disable based on Select open state
                > Close
                </Button>

                <Button color="success" onPress={() => { onClose(); handleApplyFilters(); }}
                  isDisabled={isSelectOpen}  // Disable based on Select open state
                > Apply Filters
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PriceRange;















// import React, { useState } from "react";

// import { Slider, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
// import { data } from '../../MyCarsData/Tesla53';

// interface Filters {
//   priceRange: number[];
//   yearRange: number[];
//   vehicleTypes: string[];
//   minSeatingCapacity: number;
//   horsepowerRange: number[];
// }

// interface PriceRangeProps {
//   onFiltersChange: (filters: Filters) => void;
// }

// const PriceRange: React.FC<PriceRangeProps> = ({ onFiltersChange }) => {
//   const [priceRange, setPriceRange] = useState([0, 500000]);
//   const [yearRange, setYearRange] = useState([1980, 2030]);
//   const [vehicleTypes, setVehicleTypes] = useState<Set<string>>(new Set());
//   const [minSeatingCapacity, setMinSeatingCapacity] = useState(2);
//   const [horsepowerRange, setHorsepowerRange] = useState([0, 1500]);
//   const [filtersApplied, setFiltersApplied] = useState(false);

//   const handleApplyFilters = () => {
//     onFiltersChange({
//       priceRange,
//       yearRange,
//       vehicleTypes: Array.from(vehicleTypes), // Convert Set to Array
//       minSeatingCapacity,
//       horsepowerRange,
//     });
//     setFiltersApplied(true);
//   };

//   const handleResetFilters = () => {
//     setPriceRange([0, 250000]);
//     setYearRange([1980, 2030]);
//     setVehicleTypes(new Set());
//     setMinSeatingCapacity(2);
//     setHorsepowerRange([0, 1500]);
//     setFiltersApplied(false);
//     onFiltersChange({
//       priceRange: [0, 250000],
//       yearRange: [1980, 2030],
//       vehicleTypes: [],
//       minSeatingCapacity: 2,
//       horsepowerRange: [0, 1500],
//     });
//   };

  
//   const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control
//   const uniqueVehicleTypes = Array.from(new Set(data.map(car => car.vehicleType).filter(Boolean))); // Extract unique vehicle types from data

//   const handleSelectionChange = (e:any) => {
//     setVehicleTypes(new Set(e.target.value.split(",")));   // Handle changes in the Select component
//   };


//   // State to track if the Select component is open
//   const [isSelectOpen, setIsSelectOpen] = useState(false);
  
//    // Handler to update `isSelectOpen` when Select opens or closes
//   const handleSelectOpenChange = (isOpen:any) => {
//     setIsSelectOpen(isOpen); // Update state based on Select open/close status
//   };

//   return (
//     <div>
//       <div className="flex gap-5 justify-center">
//         <Button size="md" onPress={onOpen} color={filtersApplied ? "success" : "primary"} className="text-base">
//             Show Filters
//         </Button>

//         <Button size="md" color="warning" onPress={handleResetFilters} className="text-base">
//             Reset Filters
//         </Button>
//       </div>

//       <Modal backdrop={"blur"} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Filter Cars</ModalHeader>
//               <ModalBody>
//                 <div className="flex flex-col gap-8 items-center">
//                   {/* Price Range Slider */}
//                   <Slider
//                     label="Price Range"
//                     step={10000}
//                     minValue={0}
//                     maxValue={500000}
//                     value={priceRange}
//                     formatOptions={{ style: "currency", currency: "USD" }}
//                     className="max-w-md"
//                     onChange={(val) => setPriceRange(val as number[])} // Casting to number[]
//                   />

//                   {/* Year Range Slider */}
//                   <Slider
//                     label="Year Range"
//                     step={1}
//                     minValue={1980}
//                     maxValue={2030}
//                     value={yearRange}
//                     formatOptions={{ style: "decimal" }}
//                     className="max-w-md"
//                     onChange={(val) => setYearRange(val as number[])} // Casting to number[]
//                   />

//                   {/* Vehicle Type Select */}
//                   <Select
//                     size={"lg"}
//                     labelPlacement="outside"
//                     variant={"bordered"}
//                     label="Vehicle Type"
//                     selectionMode="multiple"
//                     placeholder="Select vehicle types"
//                     selectedKeys={Array.from(vehicleTypes)} // Convert Set to Array
//                     onChange={handleSelectionChange}
//                     onOpenChange={handleSelectOpenChange} // Track when Select opens or closes
//                     className="max-w-md"
                    
//                   >
//                     {uniqueVehicleTypes.filter(type => type !== undefined).map((type)  => (
//                       <SelectItem key={type} >
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </Select>


//                   {/* Seating Capacity Slider */}
//                   <Slider
//                     label="Minimum Seating Capacity"
//                     step={1}
//                     minValue={2}
//                     maxValue={7} // Assuming max seating is 7, adjust if needed
//                     value={minSeatingCapacity}
//                     formatOptions={{ style: "decimal" }}
//                     className="max-w-md"
//                     onChange={(val) => setMinSeatingCapacity(val as number)} // Casting to number
//                   />

//                   {/* Horsepower Range Slider */}
//                   <Slider
//                     label="Horsepower Range"
//                     step={50}
//                     minValue={0}
//                     maxValue={1500}
//                     value={horsepowerRange}
//                     formatOptions={{ style: "decimal" }}
//                     className="max-w-md"
//                     onChange={(val) => setHorsepowerRange(val as number[])} // Casting to number[]
//                   />
//                 </div>
//               </ModalBody>

//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose} 
//                     isDisabled={isSelectOpen} // Disable based on Select open state 
//                 > Close
//                 </Button>

//                 <Button color="success" onPress={() => { onClose(); handleApplyFilters(); }}
//                   isDisabled={isSelectOpen} // Disable based on Select open state
//                 > Apply Filters
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default PriceRange;


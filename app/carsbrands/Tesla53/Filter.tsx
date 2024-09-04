import React, { useState } from "react";

import { Slider, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { data } from '../../carsbrands/Tesla53/ModelsData';

const PriceRange = ({ onFiltersChange }) => {
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [vehicleTypes, setVehicleTypes] = useState(new Set());
  const [minSeatingCapacity, setMinSeatingCapacity] = useState(2);
  const [horsepowerRange, setHorsepowerRange] = useState([0, 1500]);
  const [filtersApplied, setFiltersApplied] = useState(false);


  const handleApplyFilters = () => {
    onFiltersChange({
      priceRange,
      yearRange,
      vehicleTypes: Array.from(vehicleTypes), // Convert Set to Array
      minSeatingCapacity,
      horsepowerRange,
    });
    setFiltersApplied(true);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 250000]);
    setYearRange([2000, 2024]);
    setVehicleTypes(new Set());
    setMinSeatingCapacity(2);
    setHorsepowerRange([0, 1500]);
    setFiltersApplied(false);
    onFiltersChange({
      priceRange: [0, 250000],
      yearRange: [2000, 2024],
      vehicleTypes: [],
      minSeatingCapacity: 2,
      horsepowerRange: [0, 1500],
    });
  };

  
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control
  const uniqueVehicleTypes = Array.from(new Set(data.map(car => car.vehicleType).filter(Boolean))); // Extract unique vehicle types from data

  const handleSelectionChange = (e) => {
    setVehicleTypes(new Set(e.target.value.split(",")));   // Handle changes in the Select component
  };


  // State to track if the Select component is open
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
   // Handler to update `isSelectOpen` when Select opens or closes
  const handleSelectOpenChange = (isOpen) => {
    setIsSelectOpen(isOpen); // Update state based on Select open/close status
  };

  return (
    <div>
      <div className="flex gap-5">
        <Button onPress={onOpen} color={filtersApplied ? "success" : "primary"}>
            Show Filters
        </Button>

        <Button color="warning" onPress={handleResetFilters}>
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
                    maxValue={250000}
                    value={priceRange}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    className="max-w-md"
                    onChange={setPriceRange}
                  />

                  {/* Year Range Slider */}
                  <Slider
                    label="Year Range"
                    step={1}
                    minValue={2000}
                    maxValue={2024}
                    value={yearRange}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={setYearRange}
                  />

                  {/* Vehicle Type Select */}
                  <Select
                    size={"lg"}
                    labelPlacement="outside"
                    variant={"bordered"}
                    label="Vehicle Type"
                    selectionMode="multiple"
                    placeholder="Select vehicle types"
                    selectedKeys={vehicleTypes} // Convert Set to Array
                    className="max-w-md"
                    onChange={handleSelectionChange}
                    onOpenChange={handleSelectOpenChange} // Track when Select opens or closes
                    
                  >
                    {uniqueVehicleTypes.map((type) => (
                      <SelectItem key={type} >
                        {type}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Display Selected Vehicle Types */}
                  {/* {vehicleTypes.size > 0 && (
                    <p className="text-lg text-default-500">
                        Selected Vehicle Types: {Array.from(vehicleTypes).join(", ")}
                    </p>
                   )} */}


                  {/* Seating Capacity Slider */}
                  <Slider
                    label="Minimum Seating Capacity"
                    step={1}
                    minValue={2}
                    maxValue={7} // Assuming max seating is 7, adjust if needed
                    value={minSeatingCapacity}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={setMinSeatingCapacity}
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
                    onChange={setHorsepowerRange}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                
                <Button color="danger" variant="light" onPress={onClose} 
                    isDisabled={isSelectOpen} // Disable based on Select open state 
                >
                  Close
                </Button>

                <Button color="success" onPress={() => { onClose(); handleApplyFilters(); }}
                  isDisabled={isSelectOpen} // Disable based on Select open state
                >
                  Apply Filters
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


















































// import React, { useState, useEffect } from "react";
// import { Slider } from "@nextui-org/react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// const PriceRange = ({ onRangeChange }) => {
//   const [range, setRange] = useState([0, 250000]);
//   const [filtersApplied, setFiltersApplied] = useState(false);

//   const handleChange = (newRange) => {
//     setRange(newRange);
//   };

//   const handleApplyFilters = () => {
//     onRangeChange(range);
//     setFiltersApplied(true);
//   };

//   const handleResetFilters = () => {
//     setRange([0, 250000]);
//     setFiltersApplied(false);
//     onRangeChange([0, 250000]); // Trigger filter application with default values
//   };

//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   // Optional: Sync or handle any side-effects when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       // You can reset the slider range or other logic if needed when modal opens
//     }
//   }, [isOpen]);

//   return (
//     <div>
//       <Button
//         onPress={onOpen}
//         color={filtersApplied ? "success" : "primary"}
//       >
//         Show Filters
//       </Button>

//       <Modal backdrop={"blur"} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//               <ModalBody>
//                 <div className="flex gap-8 items-center">
//                   <Slider
//                     label="Price Range"
//                     step={10000}
//                     minValue={0}
//                     maxValue={250000}
//                     value={range} // Bind value to state to reflect changes
//                     formatOptions={{ style: "currency", currency: "USD" }}
//                     className="max-w-md"
//                     onChange={handleChange}
//                   />

//                   <Slider
//                     label="Year Range"
//                     step={1}
//                     minValue={2000}
//                     maxValue={2024}
//                     value={range} // Bind value to state to reflect changes
//                     formatOptions={{ style: "decimal" }}
//                     className="max-w-md"
//                     onChange={handleChange}
//                   />

//                 {/* I want A Year Slider Here */}


//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   color="danger"
//                   variant="light"
//                   onPress={onClose}
//                 >
//                   Close
//                 </Button>
//                 <Button
//                   color="success"
//                   onPress={() => {
//                     onClose();
//                     handleApplyFilters();
//                   }}
//                 >
//                   Apply Filters
//                 </Button>
//                 <Button
//                   color="warning"
//                   onPress={() => {
//                     handleResetFilters();
//                     // onClose(); // Optionally: close the modal after resetting
//                   }}
//                 >
//                   Reset Filters
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



























































// import React, { useState, useEffect } from "react";
// import { Slider } from "@nextui-org/react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// const PriceRange = ({ onRangeChange }) => {
//   const [range, setRange] = useState([0, 250000]);
//   const [filtersApplied, setFiltersApplied] = useState(false);

//   const handleChange = (newRange) => {
//     setRange(newRange);
//   };

//   const handleApplyFilters = () => {
//     onRangeChange(range);
//     setFiltersApplied(true);
//   };

//   const handleResetFilters = () => {
//     setRange([0, 250000]);
//     setFiltersApplied(false);
//     onRangeChange([0, 250000]); 
       
//   };

//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   // Check if filters are applied when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       // Optionally: any logic to handle when modal opens, e.g., sync with some external state
//     }
//   }, [isOpen]);

//   return (
//     <div>
//       <Button
//         onPress={onOpen}
//         color={filtersApplied ? "success" : "primary"}
//       >
//         Show Filters
//       </Button>

//       <Modal backdrop={"blur"} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//               <ModalBody>
//                 <div className="flex gap-8 items-center">
//                   <Slider
//                     label="Price Range"
//                     step={10000}
//                     minValue={0}
//                     maxValue={250000}
//                     defaultValue={range}
//                     formatOptions={{ style: "currency", currency: "USD" }}
//                     className="max-w-md"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   color="danger"
//                   variant="light"
//                   onPress={() => {
//                     onClose();
//                     // Optionally: reset filters when closing modal
//                   }}
//                 >
//                   Close
//                 </Button>
//                 <Button
//                   color="primary"
//                   onPress={() => {
//                     onClose();
//                     handleApplyFilters();
//                   }}
//                 >
//                   Apply Filters
//                 </Button>
//                 <Button
//                   color="warning"
//                   onPress={() => {
//                     handleResetFilters();
//                     // onClose(); // Optionally: close the modal after resetting
//                   }}
//                 >
//                   Reset Filters
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










// import React, { useState } from "react";
// import { Slider } from "@nextui-org/react";

// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// const PriceRange = ({ onRangeChange }) => {
//   const [range, setRange] = useState([0, 250000]);

//   const handleChange = (newRange:any) => {
//     setRange(newRange);
//   };

//   const handleApplyFilters = () => {
//     onRangeChange(range);
//   };

//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

//   return (
//     <div>
//         <Button onPress={onOpen}>Show Filters</Button>

//         <Modal backdrop={"blur"} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
//             <ModalContent>
//                 {(onClose) => (
//                 <>  
//                     <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//                     <ModalBody>
                    
//                     <div className="flex gap-8 items-center">
//                         <Slider 
//                             label="Price Range"
//                             step={10000} 
//                             minValue={0} 
//                             maxValue={250000} 
//                             defaultValue={range} 
//                             formatOptions={{ style: "currency", currency: "USD" }}
//                             className="max-w-md"
//                             onChange={handleChange}
//                         />
                        
//                     </div>        

//                     </ModalBody>
//                     <ModalFooter>
//                     <Button color="danger" variant="light" onPress={onClose}>
//                         Close
//                     </Button>
//                     <Button color="primary" onPress={()=>{
//                         onClose();
//                         handleApplyFilters();
//                     }}>
//                         Apply Filters
//                     </Button>
//                     </ModalFooter>
//                 </>
//                 )}
//             </ModalContent>
//         </Modal>
//     </div>

//   );
// }

// export default PriceRange;

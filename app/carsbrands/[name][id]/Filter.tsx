import React, { useState } from "react";

import { Slider, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { data } from '../../MyCarsData/TeslaData';

interface Filters {
  priceRange: number[];
  yearRange: number[];
  vehicleTypes: string[];
  minSeatingCapacity: number;
  horsepowerRange: number[];
}

interface PriceRangeProps {
  onFiltersChange: (filters: Filters) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ onFiltersChange }) => {
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [vehicleTypes, setVehicleTypes] = useState<Set<string>>(new Set());
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

  const handleSelectionChange = (e:any) => {
    setVehicleTypes(new Set(e.target.value.split(",")));   // Handle changes in the Select component
  };


  // State to track if the Select component is open
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
   // Handler to update `isSelectOpen` when Select opens or closes
  const handleSelectOpenChange = (isOpen:any) => {
    setIsSelectOpen(isOpen); // Update state based on Select open/close status
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
                    maxValue={250000}
                    value={priceRange}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    className="max-w-md"
                    onChange={(val) => setPriceRange(val as number[])} // Casting to number[]
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
                    onChange={(val) => setYearRange(val as number[])} // Casting to number[]
                  />

                  {/* Vehicle Type Select */}
                  <Select
                    size={"lg"}
                    labelPlacement="outside"
                    variant={"bordered"}
                    label="Vehicle Type"
                    selectionMode="multiple"
                    placeholder="Select vehicle types"
                    selectedKeys={Array.from(vehicleTypes)} // Convert Set to Array
                    onChange={handleSelectionChange}
                    onOpenChange={handleSelectOpenChange} // Track when Select opens or closes
                    className="max-w-md"
                    
                  >
                    {uniqueVehicleTypes.filter(type => type !== undefined).map((type)  => (
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
                    onChange={(val) => setMinSeatingCapacity(val as number)} // Casting to number
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
                    onChange={(val) => setHorsepowerRange(val as number[])} // Casting to number[]
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} 
                    isDisabled={isSelectOpen} // Disable based on Select open state 
                > Close
                </Button>

                <Button color="success" onPress={() => { onClose(); handleApplyFilters(); }}
                  isDisabled={isSelectOpen} // Disable based on Select open state
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


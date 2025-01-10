import React, { useState, useEffect } from "react";
import { Slider, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, } from "@nextui-org/react";
import { VehicleModel } from "../../MyCarsData/Types"; // Use the new VehicleModel interface

interface Filters {
  priceRange: number[];
  yearRange: number[];
  vehicleTypes: string[];
  minSeatingCapacity: number;
  horsepowerRange: number[];
}

interface PriceRangeProps {
  onFiltersChange: (filters: Filters) => void;
  brandName: string; // Now we receive brandName as a prop
  searchTerm: string; // Accept searchTerm as a prop
  onResetFilters: () => void; // Receive onResetFilters function as a prop
}

const PriceRange: React.FC<PriceRangeProps> = ({ onFiltersChange, brandName , searchTerm , onResetFilters,}) => {
  const [data, setData] = useState<VehicleModel[]>([]); // Store fetched car data
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
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
        const response = await fetch(`${BASE_URL}/get-car-brand/${brandName}`);
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
  }, [brandName]); // Refetch data when the brand name changes

  // Helper function to check if filters are applied
  const areFiltersApplied = (): boolean => {
    return (
      priceRange[0] !== 0 ||
      priceRange[1] !== 500000 ||
      yearRange[0] !== 1980 ||
      yearRange[1] !== 2030 ||
      vehicleTypes.size > 0 ||
      minSeatingCapacity !== 2 ||
      horsepowerRange[0] !== 0 ||
      horsepowerRange[1] !== 1500 ||
      searchTerm !== '' // Check if search term is not empty
    );
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    const applied = areFiltersApplied();
    onFiltersChange({
      priceRange,
      yearRange,
      vehicleTypes: Array.from(vehicleTypes), // Convert Set to Array
      minSeatingCapacity,
      horsepowerRange,
    });
    setFiltersApplied(applied); // Only set to true if filters are actually applied
  };

  // Handle resetting filters
  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setYearRange([1980, 2030]);
    setVehicleTypes(new Set());
    setMinSeatingCapacity(2);
    setHorsepowerRange([0, 1500]);
    onResetFilters();  // This calls the function passed down from MainPage to reset the filters
    setFiltersApplied(false);
    onFiltersChange({
      priceRange: [0, 500000],
      yearRange: [1980, 2030],
      vehicleTypes: [],
      minSeatingCapacity: 2,
      horsepowerRange: [0, 1500],
    });
  };

  // Check if filters are applied
  const isResetButtonEnabled = areFiltersApplied();

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control

  // Extract unique vehicle types from fetched data
  const uniqueVehicleTypes = Array.from(
    new Set(data.map((car) => car.vehicleType).filter(Boolean))
  );

  const handleSelectionChange = (e: any) => {
    setVehicleTypes(new Set(e.target.value.split(",")));
  };

  // State to track if the Select component is open
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Handler to update isSelectOpen when Select opens or closes
  const handleSelectOpenChange = (isOpen: any) => {
    setIsSelectOpen(isOpen);
  };

  

  return (
    <div>
      <div className="flex gap-5 justify-center">
        <Button
          size="md"
          onPress={onOpen}
          color={filtersApplied ? "danger" : "primary"}
          className="text-base"
        >
          Show Filters
        </Button>

        <Button
          size="md"
          color="warning"
          onPress={handleResetFilters}
          className="text-base"
          isDisabled={!isResetButtonEnabled} // Disable button if no filters are applied
        >
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
                    onChange={(val) => setPriceRange(val as number[])} // Casting to number[]
                  />

                  {/* Year Range Slider */}
                  {/* <Slider
                    label="Year Range"
                    step={1}
                    minValue={1980}
                    maxValue={2030}
                    value={yearRange}
                    formatOptions={{ style: "decimal" }}
                    className="max-w-md"
                    onChange={(val) => setYearRange(val as number[])} // Casting to number[]
                  /> */}

                  {/* Vehicle Type Select */}
                  {/* <Select
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
                    {uniqueVehicleTypes
                      .filter((type) => type !== undefined)
                      .map((type) => (
                        <SelectItem key={type}>{type}</SelectItem>
                      ))}
                  </Select> */}

                  {/* Seating Capacity Slider */}
                  <Slider
                    label="Minimum Seating Capacity"
                    step={1}
                    minValue={2}
                    maxValue={7} // Adjust if needed
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
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isSelectOpen} // Disable based on Select open state
                >
                  Close
                </Button>

                <Button
                  color="success"
                  onPress={() => {
                    onClose();
                    handleApplyFilters();
                  }}
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








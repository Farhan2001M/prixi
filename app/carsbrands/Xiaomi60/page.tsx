"use client"

import React from "react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { vehicleTypes } from "@/app/testing/Cardata";

import {Select, SelectItem} from "@nextui-org/react";


import { data } from '../../carsbrands/Tesla53/ModelsData';


const Page = () => {

  const [values, setValues] = React.useState(new Set([]));

  const handleSelectionChange = (e:any) => {
    setValues(new Set(e.target.value.split(",")));
  };

  return (

    <>

      {/* <CheckboxGroup
        label="Vehicle Type"
        onChange={setVehicleTypes}
        orientation="horizontal"
        value={vehicleTypes}
        defaultValue={[]}
      >
        <Checkbox value="Sedan">Sedan</Checkbox>
        <Checkbox value="SUV">SUV</Checkbox>
        <Checkbox value="Coupe">Coupe</Checkbox>
      </CheckboxGroup> */}


      <Select
        label="Favorite Animal"
        selectionMode="multiple"
        placeholder="Select an animal"
        selectedKeys={values}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {data.map((car) => (
          <SelectItem key={car.id}>
            {car.vehicleType}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>

      



    </>
  );
}


export default Page;


// import React from "react";

// export default function App() {
//   const [values, setValues] = React.useState(new Set([]));

//   const handleSelectionChange = (e) => {
//     setValues(new Set(e.target.value.split(",")));
//   };

//   return (
//     <div className="flex w-full max-w-xs flex-col gap-2">
//       
//     </div>      
//   );
// }





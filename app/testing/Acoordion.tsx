import {Accordion, AccordionItem} from "@nextui-org/react";

import Tablecomponent from './CarBrands'
import CarTypes from './CarTypes'; 


const Accodion: React.FC = () => {

  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  
  return (
    <Accordion variant="shadow" >
      <AccordionItem key="1" aria-label="Accordion 1" title="Explore Vehicles by Brands" >
        <Tablecomponent />
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Explore Vehicles by Type">
        <CarTypes />
      </AccordionItem>
    </Accordion>
            
  );
};

export default Accodion;

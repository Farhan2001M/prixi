import React, { useState, useRef, useEffect } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";

import Tablecomponent from './CarBrands';
import CarTypes from './CarTypes';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const MainComponent: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button color="primary" size="lg" onPress={onOpen} className="text-xl">Explore Vehicles by Brands</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"} backdrop="opaque" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Tablecomponent />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='mx-auto w-[50%]'>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );
};

export default MainComponent;













// import {Accordion, AccordionItem} from "@nextui-org/react";

// import Tablecomponent from './CarBrands'
// import CarTypes from './CarTypes'; 


// const Accodion: React.FC = () => {
  
//   return (
//     <Accordion variant="shadow" >
//       <AccordionItem key="1" aria-label="Accordion 1" title="Explore Vehicles by Brands" >
//         <Tablecomponent />
//       </AccordionItem>
//       {/* <AccordionItem key="2" aria-label="Accordion 2" title="Explore Vehicles by Type">
//         <CarTypes />
//       </AccordionItem> */}
//     </Accordion>
            
//   );
// };

// export default Accodion;

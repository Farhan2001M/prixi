import React, { useState, useRef, useEffect } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";

import Tablecomponent from './CarBrands';
import CarTypes from './CarTypes';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const MainComponent: React.FC = () => {

  const { isOpen: isBrandsModalOpen, onOpen: onOpenBrandsModal, onOpenChange: onOpenChangeBrandsModal } = useDisclosure();
  const { isOpen: isTypesModalOpen, onOpen: onOpenTypesModal, onOpenChange: onOpenChangeTypesModal } = useDisclosure();

  return (
    <>
      <div className='flex gap-8'>
        <Button color="primary" size="md" onPress={onOpenBrandsModal} className="text-base"> Explore Vehicles by Brands </Button>
        {/* <Button color="primary" size="md" onPress={onOpenTypesModal} className="text-base"> Explore Vehicles by Types </Button>   */}
      </div>
      
      {/* Modal for Car Brands */}
      <Modal isOpen={isBrandsModalOpen} onOpenChange={onOpenChangeBrandsModal} size={"5xl"} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody> <Tablecomponent /> </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='mx-auto w-[50%]'> Close </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal for Car Types */}
      <Modal isOpen={isTypesModalOpen} onOpenChange={onOpenChangeTypesModal} size={"5xl"} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody> <CarTypes /> </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='mx-auto w-[50%]'> Close </Button>
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

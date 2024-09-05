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




































// import React, { useState, useRef, useEffect } from 'react';
// import { Accordion, AccordionItem } from "@nextui-org/react";
// import Tablecomponent from './CarBrands';
// import CarTypes from './CarTypes';

// const MainComponent: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalContent, setModalContent] = useState<React.ReactNode>(null);

//   const modalRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       setIsModalOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }
//   }, [isModalOpen]);

//   const openModal = (title: string, content: React.ReactNode) => {
//     setModalTitle(title);
//     setModalContent(content);
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       {/* Buttons to trigger the modal */}
//       <button
//         onClick={() => openModal('Explore Vehicles by Brands', <Tablecomponent /> )}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Show Vehicle Brands
//       </button>
//       <button
//         onClick={() => openModal('Explore Vehicles by Type', <CarTypes />)}
//         className="bg-green-500 text-white px-4 py-2 rounded ml-4"
//       >
//         Show Vehicle Types
//       </button>

//       {/* Modal Component */}
//       {isModalOpen && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
//           <div
//             ref={modalRef}
//             className="fixed inset-0 flex items-center justify-center z-50 p-4"
//           >
//             <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
//               <div className="border-b p-4 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold">{modalTitle}</h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 text-5xl hover:text-red-700"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="p-6">
//                 {modalContent}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default MainComponent;












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

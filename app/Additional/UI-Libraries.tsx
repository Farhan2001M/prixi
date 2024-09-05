"use client"

import React from 'react';

const TestComponent: React.FC = () => {
 
  return (
    <>

      {/* Daisy UI library Components Usage Testing, no need to create files,
      just intall it using ' npm i -D daisyui@latest ' and start using components code, 
      only just add """ require('daisyui'),  """ in the plugins in tailwind.config.ts file*/}
      
      {/* Here i use the different Butttons and Modal component from the Daisy */} 

      {/* <div className='bg-slate-300 h-screen' >

        <div className='ml-8'>

          <button className="btn">Button</button>

          <button className="btn btn-warning">Warning</button>




          <label htmlFor="my_modal_7" className="btn">open my modal</label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Hello!</h3>
              <p className="py-4">This modal works with a hidden checkbox!</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
          </div>


        </div>

        <button className="btn" onClick={() => {
            const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
            }
        }}>open modal</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>


      </div> */}
      





      {/* Next UI library Components Usage Testing, no need to create files,just intall it using 
      ' npm install @nextui-org/react framer-motion ' and start using components code, 
      only just add """ "./node_modules/@nextui-org/theme/dist/**//*.{js,ts,jsx,tsx}", """ // 
      remove 1 slash before the last star and write ''' darkMode: "class", '''  
      before the plugins in tailwind.config.ts file and in the plugins:[] ''' nextui(), '''  
      and you have to import the following statement to the index or page.tsx and then 
      return the app wrapped in the next statement*/}

      {/* import {NextUIProvider} from "@nextui-org/system"; */}
      {/* <NextUIProvider></NextUIProvider> */}

    
      {/* Here i use the accordian and skeleton component from the NextUI*/}

      {/* import {Accordion, AccordionItem} from "@nextui-org/accordion";
      import {Card, Skeleton, Button} from "@nextui-org/react";
      const defaultContent = "Lorem ipsum dolor quat.";
      const [isLoaded, setIsLoaded] = React.useState(false);
      const toggleLoad = () => {
        setIsLoaded(!isLoaded);
      };  */}
      {/* <div className='max-w-5xl mx-auto mt-12'>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className='max-w-5xl mx-auto mt-12'>
        <div className="flex flex-col gap-3">
          <Card className="w-full space-y-5 p-4" radius="lg">
            <Skeleton isLoaded={isLoaded} className="rounded-lg">
              <div className="h-24 rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
              </Skeleton>
            </div>
          </Card>
          <Button size="sm" variant="flat" color="secondary" onPress={toggleLoad}>
            {isLoaded ? "Show" : "Hide"} Skeleton
          </Button>
        </div>
      </div> */}





      {/* Motion-Primitives */}
      {/* Copy Paste Library */}
      {/* https://motion-primitives.com/docs */}



      {/* Animata */}
      {/* Copy Paste Library */}
      {/* https://animata.design/docs */}

      
      {/* Lukacho */}
      {/*Not so Good but foolows Copy Paste Rule */}
      {/* https://ui.lukacho.com/components */}





      {/* Aceternity ui library Components Usage Testing}

      {/* import { TextGenerateEffect } from "@/components/ui/text-generate-effect"; */}
      {/* const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`; */}
      {/* <TextGenerateEffect duration={5} filter={false} words={words} /> */}




    </>
  );
};

export default TestComponent;




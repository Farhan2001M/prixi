"use client"

import React from 'react';
import Link from 'next/link';

import {Accordion, AccordionItem} from "@nextui-org/accordion";

import {Card, Skeleton, Button} from "@nextui-org/react";

const TestComponent: React.FC = () => {

  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };
 
  return (
    <div className='bg-slate-300 h-screen' >

      <h1>Hello</h1><br />

      <Link href = "/login" className='ml-10 mt-8'> Back to login </Link>

      <Link href = "/screen1" className='ml-10 mt-28'>  Screen 1 </Link>
      <br />

      <button className="btn btn-warning">Warning</button>

      <br />
      <hr />
      <br />

      <div className='max-w-5xl mx-auto mt-12'>
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
      </div>
    
    </div>
  );
};

export default TestComponent;




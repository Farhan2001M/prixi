import React from 'react';
import ShinyButton from "../components/MagicUI/ShinyButton";

import { Button } from "../components/ShadeCN/Button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ShadeCN/AlertDialog"

const TestComponent: React.FC = () => {
 
  return (
    <div className='bg-slate-300 h-screen'>
      <h1 className='p-12'>Hello</h1>

      <ShinyButton text="Shiny" className='bg-red-500 hover:bg-red-600' />

      <div className='p-6'>
        <Button className='bg-red-500 hover:bg-red-600'>Button</Button>
        <br /> <br />
        <hr />
        <Button variant="destructive" >Button</Button>
      </div>


      <div className='m-32'>
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent className='bg-red-500'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>


    </div>
  );
};

export default TestComponent;




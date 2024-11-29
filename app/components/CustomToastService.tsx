// CustomToastService.tsx

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a reusable function to trigger success and error toasts
export const CustomToast = {
  success: (message: string) => {

    setTimeout(() => {
      const toastSound = new Audio('/sounds/tap.mp3'); 
      toastSound.play();
    }, 50);  

    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false, 
      draggable: true,
      theme: "dark",
    });
  },

  error: (message: string) => {

    setTimeout(() => {
      const toastSound = new Audio('/sounds/tap.mp3'); 
      toastSound.play();
    }, 50);  
    
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false, 
      draggable: true,
      theme: "dark",
    });
  },
};

// ToastContainer component that you can use anywhere in your app
export const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  );
};

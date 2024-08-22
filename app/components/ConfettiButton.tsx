
import { useImperativeHandle, forwardRef, useRef } from 'react';
import confetti from 'canvas-confetti';

// Define a type for the ref to expose the trigger function
export type ConfettiButtonHandle = {
  triggerConfetti: () => void;
};

const ConfettiButton = forwardRef<ConfettiButtonHandle>((_, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Expose triggerConfetti function to parent component
  useImperativeHandle(ref, () => ({
    triggerConfetti() {
      confetti({
        particleCount: 800,
        angle: 45,  // Throw confetti vertically
        spread: 90, // Width of the confetti spread
        origin: { x: 0, y: 1.4 }, // Center of the screen
        gravity: 0.9, // Gravity affects falling speed
        startVelocity: 120, // Initial speed of confetti
      });

      confetti({
        particleCount: 800,
        angle: 135, // Throw confetti vertically in the opposite direction
        spread: 90, // Width of the confetti spread
        origin: { x: 1, y: 1.4 }, // Center of the screen
        gravity: 0.9, // Gravity affects falling speed
        startVelocity: 120, // Initial speed of confetti
      });
    }
  }));

  return null; // This component does not render any UI
});

export default ConfettiButton;



// https://codepen.io/jonathanbell/pen/OvYVYw
// https://codepen.io/Ranjithkumar10/pen/mdqeoVp
// Can be used also

























































// import { useImperativeHandle, forwardRef, useRef } from 'react';
// import confetti from 'canvas-confetti';

// // Define a type for the ref to expose the trigger function
// export type ConfettiButtonHandle = {
//   triggerConfetti: () => void;
// };

// const ConfettiButton = forwardRef<ConfettiButtonHandle>((_, ref) => {
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   // Expose triggerConfetti function to parent component
//   useImperativeHandle(ref, () => ({
//     triggerConfetti() {


// ////////Side confetti ////////////////


//       // confetti({
//       //   particleCount: 250,
//       //   spread: 110,
//       //   angle: 300,
//       //   origin: { x: -0.15, y: 0.3 },
//       // });   
      
//       // confetti({
//       //   particleCount: 250,
//       //   spread: 110,
//       //   angle: 240,
//       //   origin: { x: 1.15, y: 0.3 },
//       // });

     


// ////////Upper confetti ////////////////

//       // confetti({
//       //   particleCount: 850,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 0.4, y: -0.5 },
//       // });   
      
//       // confetti({
//       //   particleCount: 850,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 0.6, y: -0.5 },
//       // });

//       // confetti({
//       //   particleCount: 250,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 0, y: -0.5 },
//       // });   
      
//       // confetti({
//       //   particleCount: 250,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 1, y: -0.5 },
//       // });

//       // confetti({
//       //   particleCount: 150,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 0.2, y: -0.8 },
//       // });   
      
//       // confetti({
//       //   particleCount: 150,
//       //   spread: 110,
//       //   angle: 270,
//       //   origin: { x: 0.8, y: -0.8 },
//       // });


//       confetti({
//         particleCount: 500,
//         spread: 110,
//         origin: { x: 1, y: 1.15 },
//       });

//       confetti({
//         particleCount: 500,
//         spread: 110,
//         origin: { x: 0, y: 1.15 },
//       });

//     }
//   }));

//   return null; // This component does not render any UI
// });

// export default ConfettiButton;

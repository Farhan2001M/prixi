"use client";

import React, { useState } from 'react';
import ForgotPassScreen from '../components/Logg/ForgotPassScreen';

const TestComponent: React.FC = () => {
  const [showFar, setShowFar] = useState<boolean>(false);

  const handleToggle = () => {
    setShowFar(prev => !prev); // Toggle visibility of Farhan component
  };

  return (
    <div>
      <a href="#" className="text-lg text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); handleToggle(); }}>
        Forgot Password?
      </a>
      {/* Pass showFar state and handleToggle function as props */}
      <ForgotPassScreen show={showFar} onClick={handleToggle} />
    </div>
  );
};

export default TestComponent;




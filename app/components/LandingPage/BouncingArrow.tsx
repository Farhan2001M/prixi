"use client";

import React, { useState } from 'react';

interface BouncingArrowProps {
  onScroll: () => void;
}

const BouncingArrow: React.FC<BouncingArrowProps> = ({ onScroll }) => {
  const [isBouncing, setIsBouncing] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default anchor behavior

    // Stop the bouncing effect
    setIsBouncing(false);

    // Call the onScroll function passed from the parent component
    onScroll();
  };

  return (
    <a
      href="#next-section"
      onClick={handleClick}
      className={`flex items-center justify-center ${isBouncing ? 'animate-bounce' : ''}`}
    >
      <img src="/images/downArrow.png" alt="Down Arrow" className="h-10" />
    </a>
  );
};

export default BouncingArrow;

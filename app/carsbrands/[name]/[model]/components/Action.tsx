// pages/comments/components/Action.tsx
import React from 'react';

interface ActionProps {
  handleClick: () => void;
  type: string | React.ReactNode; // Allow both string and React nodes
  className?: string; // Optional prop
}

const Action: React.FC<ActionProps> = ({ handleClick, type, className }) => {
  return (
    <div className={className} onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;

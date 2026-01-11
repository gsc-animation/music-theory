import React, { useState } from 'react';

export type KeyType = 'white' | 'black';

interface PianoKeyProps {
  note: string;
  type: KeyType;
  label?: string;
  onTriggerNote: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, type, label, onTriggerNote }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault(); // Prevent scrolling/selection
    setIsActive(true);
    onTriggerNote(note);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsActive(false);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsActive(false);
  };

  const baseClasses = "relative flex items-end justify-center pb-2 rounded-b-lg shadow-sm transition-colors duration-75 select-none touch-none";

  const typeClasses = type === 'white'
    ? `h-48 w-full z-0 border border-warmWood/20 ${isActive ? 'bg-bambooGreen/20' : 'bg-ricePaper'}`
    : `h-32 w-2/3 z-10 -mx-[33%] border border-warmWood/40 ${isActive ? 'bg-warmWood/80' : 'bg-warmWood'} text-white`;

  const activeClasses = isActive ? 'scale-[0.98] origin-top' : '';

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${activeClasses}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      aria-label={`Piano key ${note}`}
      style={{ touchAction: 'none' }}
    >
      {label && <span className="text-sm font-bold opacity-80 pointer-events-none">{label}</span>}
    </button>
  );
};

export default PianoKey;

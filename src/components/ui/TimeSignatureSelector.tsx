import React from 'react';
import { useAudioStore } from '../../stores/useAudioStore';

export const TimeSignatureSelector: React.FC = () => {
  const timeSignature = useAudioStore((state) => state.timeSignature);
  const setTimeSignature = useAudioStore((state) => state.setTimeSignature);

  const signatures = ['4/4', '3/4'];

  return (
    <div className="flex gap-2 items-center bg-white/50 p-1 rounded-lg border border-warmWood/20">
      {signatures.map((sig) => (
        <button
          key={sig}
          onClick={() => setTimeSignature(sig)}
          className={`px-3 py-1 text-sm rounded transition-all duration-200 ${
            timeSignature === sig
              ? 'bg-warmWood text-white shadow-md font-medium'
              : 'text-stoneGrey hover:text-warmWood hover:bg-warmWood/10 bg-transparent'
          }`}
          aria-label={`Select ${sig} time signature`}
        >
          {sig}
        </button>
      ))}
    </div>
  );
};

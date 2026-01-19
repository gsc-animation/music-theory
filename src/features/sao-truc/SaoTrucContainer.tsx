import React from 'react';
import SaoTrucVisualizer from './components/SaoTrucVisualizer';

const SaoTrucContainer: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen bg-[#fdf6e3] flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#5c4033] mb-3">Sáo Trúc Practice</h1>
          <div className="h-1 w-24 bg-[#5c4033] mx-auto rounded-full mb-4 opacity-20"></div>
          <p className="text-stone-600 italic">Vietnamese Bamboo Flute Visualization</p>
        </div>

        <div className="flex justify-center">
             <SaoTrucVisualizer />
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-stone-200 shadow-sm text-sm text-stone-700 max-w-lg mx-auto">
          <h4 className="font-bold text-[#5c4033] mb-3 text-lg border-b border-stone-200 pb-2">Legend</h4>
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#fdf6e3] border border-stone-800"></div>
                <span>Open Hole</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-stone-700 border border-stone-800"></div>
                <span>Closed Hole</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-stone-800 relative overflow-hidden bg-[#fdf6e3]">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-stone-700"></div>
                </div>
                <span>Half Hole (H)</span>
             </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-500">
            <p>Play notes on your MIDI keyboard or microphone input to see the corresponding fingering.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaoTrucContainer;

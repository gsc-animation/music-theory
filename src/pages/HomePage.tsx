import React from 'react';
import PianoKeyboard from '../features/piano/components/PianoKeyboard';
import { MusicStaff } from '../features/sheet/components/MusicStaff';
import { useAudioStore } from '../stores/useAudioStore';

export const HomePage: React.FC = () => {
  const triggerNote = useAudioStore((state) => state.triggerNote);

  return (
    <div className="p-4 flex flex-col items-center gap-6 min-h-screen bg-ricePaper">
      <h1 className="text-3xl font-bold text-bamboo font-heading">Music Theory</h1>

      <section className="w-full max-w-md space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">Staff Demo</h2>
        <MusicStaff
          notes={['c4/q', 'd4/q', 'e4/q', 'f4/q']}
          width={350}
          clef="treble"
          timeSignature="4/4"
        />
        <p className="text-stoneGrey text-center text-sm">
          Interactive VexFlow Rendering
        </p>
      </section>

      <section className="w-full max-w-md space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">Piano</h2>
        <div className="bg-white/50 p-4 rounded-xl shadow-inner border border-warmWood/10">
          <PianoKeyboard
            startOctave={4}
            octaves={1}
            onTriggerNote={triggerNote}
          />
        </div>
      </section>
    </div>
  );
};

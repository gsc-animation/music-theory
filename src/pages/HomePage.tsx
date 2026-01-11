import React from 'react';
import PianoKeyboard from '../features/piano/components/PianoKeyboard';
import { MusicStaff } from '../features/sheet/components/MusicStaff';
import { useAudioStore } from '../stores/useAudioStore';
import { NotationToggle } from '../components/ui/NotationToggle';
import { APP_STRINGS } from '../constants/app-strings';

export const HomePage: React.FC = () => {
  const activeNotes = useAudioStore((state) => state.activeNotes);
  const startNote = useAudioStore((state) => state.startNote);
  const stopNote = useAudioStore((state) => state.stopNote);

  // Format active notes as a chord for VexFlow
  // e.g. ['C4', 'E4'] -> ['(c4 e4)/w']
  // This ensures simultaneous notes are rendered together, not sequentially
  const staffNotes = activeNotes.length > 0
    ? [`(${activeNotes.map(n => n.toLowerCase()).join(' ')})/w`]
    : ['b4/w/r'];

  return (
    <div className="p-4 flex flex-col items-center gap-6 min-h-screen bg-ricePaper">
      <header className="w-full max-w-md flex justify-between items-center">
        <h1 className="text-3xl font-bold text-bamboo font-heading">{APP_STRINGS.APP_TITLE}</h1>
        <NotationToggle />
      </header>

      <section className="w-full max-w-md space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">{APP_STRINGS.STAFF_DEMO_TITLE}</h2>
        <MusicStaff
          notes={staffNotes}
          width={350}
          clef="treble"
          timeSignature="4/4"
        />
        <p className="text-stoneGrey text-center text-sm">
          {APP_STRINGS.VEXFLOW_CAPTION}
        </p>
      </section>

      <section className="w-full max-w-md space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">{APP_STRINGS.PIANO_TITLE}</h2>
        <div className="bg-white/50 p-4 rounded-xl shadow-inner border border-warmWood/10">
          <PianoKeyboard
            startOctave={4}
            octaves={1}
            onStartNote={startNote}
            onStopNote={stopNote}
          />
        </div>
      </section>
    </div>
  );
};

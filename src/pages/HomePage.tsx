import React from 'react';
import PianoKeyboard from '../features/piano/components/PianoKeyboard';
import { MusicStaff } from '../features/sheet/components/MusicStaff';
import { useAudioStore } from '../stores/useAudioStore';
import { NotationToggle } from '../components/ui/NotationToggle';
import { TimeSignatureSelector } from '../components/ui/TimeSignatureSelector';
import { APP_STRINGS } from '../constants/app-strings';

export const HomePage: React.FC = () => {
  const recordedNotes = useAudioStore((state) => state.recordedNotes);
  const startNote = useAudioStore((state) => state.startNote);
  const stopNote = useAudioStore((state) => state.stopNote);
  const clearRecordedNotes = useAudioStore((state) => state.clearRecordedNotes);
  const timeSignature = useAudioStore((state) => state.timeSignature);

  // Calculate note limit based on 4 measures (queue behavior)
  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4;
  const maxMeasures = 4;
  const noteLimit = beatsPerMeasure * maxMeasures;

  // Format recorded notes for VexFlow
  // If notes are sequential, VexFlow EasyScore expects comma-separated
  // e.g. "C4, E4, G4"
  const staffNotes = recordedNotes.length > 0
    ? recordedNotes.slice(-noteLimit).map(n => n.toLowerCase() + '/q') // Show last N notes
    : ['b4/w/r'];

  return (
    <div className="p-4 flex flex-col items-center gap-6 min-h-screen bg-ricePaper">
      <header className="w-full max-w-2xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-bamboo font-heading">{APP_STRINGS.APP_TITLE}</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={clearRecordedNotes}
            className="px-3 py-1 text-sm bg-warmWood text-white rounded hover:bg-opacity-90 transition-colors shadow-sm"
            aria-label="Clear staff"
          >
            Clear
          </button>
          <TimeSignatureSelector />
          <NotationToggle />
        </div>
      </header>

      <section className="w-full max-w-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-warmWood font-semibold">{APP_STRINGS.STAFF_DEMO_TITLE}</h2>
        </div>
        <MusicStaff
          notes={staffNotes}
          width={600}
          clef="treble"
          timeSignature={timeSignature}
        />
        <p className="text-stoneGrey text-center text-sm">
          {APP_STRINGS.VEXFLOW_CAPTION}
        </p>
      </section>

      <section className="w-full max-w-4xl space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">{APP_STRINGS.PIANO_TITLE}</h2>
        <div className="bg-white/50 p-4 rounded-xl shadow-inner border border-warmWood/10 overflow-x-auto">
          <PianoKeyboard
            startOctave={3}
            octaves={3}
            onStartNote={startNote}
            onStopNote={stopNote}
          />
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import PianoKeyboard from '../features/piano/components/PianoKeyboard';
import { MusicStaff } from '../features/sheet/components/MusicStaff';
import SaoTrucVisualizer from '../features/sao-truc/components/SaoTrucVisualizer';
import { useAudioStore } from '../stores/useAudioStore';
import { useGameStore } from '../stores/useGameStore';
import { NotationToggle } from '../components/ui/NotationToggle';
import { TimeSignatureSelector } from '../components/ui/TimeSignatureSelector';
import { GameOverlay } from '../features/game/components/GameOverlay';
import { APP_STRINGS } from '../constants/app-strings';

export const HomePage: React.FC = () => {
  const recordedNotes = useAudioStore((state) => state.recordedNotes);
  const startNote = useAudioStore((state) => state.startNote);
  const stopNote = useAudioStore((state) => state.stopNote);
  const clearRecordedNotes = useAudioStore((state) => state.clearRecordedNotes);
  const timeSignature = useAudioStore((state) => state.timeSignature);

  // Game Store
  const isPlaying = useGameStore((state) => state.isPlaying);
  const targetNote = useGameStore((state) => state.targetNote);
  const checkAnswer = useGameStore((state) => state.checkAnswer);

  // Wrap stopNote to check answer in game mode
  const handleStopNote = (note: string) => {
    stopNote(note);
    if (isPlaying) {
      checkAnswer(note);
    }
  };

  // Calculate note limit based on 4 measures (queue behavior)
  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4;
  const maxMeasures = 4;
  const noteLimit = beatsPerMeasure * maxMeasures;

  // Format recorded notes for VexFlow
  // If notes are sequential, VexFlow EasyScore expects comma-separated
  // e.g. "C4, E4, G4"

  // Calculate dropping based on measure alignment (Shift by full measures when full)
  const overflow = Math.max(0, recordedNotes.length - noteLimit);
  const notesToDrop = Math.ceil(overflow / beatsPerMeasure) * beatsPerMeasure;

  const staffNotes = recordedNotes.slice(notesToDrop).length > 0
    ? recordedNotes.slice(notesToDrop).map(n => n.toLowerCase() + '/q') // Show last N notes
    : ['b4/w/r'];

  return (
    <div className="p-4 flex flex-col items-center gap-6 min-h-screen bg-ricePaper relative">
      <GameOverlay />

      <header className="w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-bamboo font-heading">{APP_STRINGS.APP_TITLE}</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={clearRecordedNotes}
            className="px-3 py-1 text-sm bg-warmWood text-white rounded hover:bg-opacity-90 transition-colors shadow-sm"
            aria-label="Clear staff"
          >
            {APP_STRINGS.COMMON.CLEAR}
          </button>
          <TimeSignatureSelector />
          <NotationToggle />
        </div>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-warmWood font-semibold">
              {isPlaying ? APP_STRINGS.GAME.TARGET_NOTE : APP_STRINGS.STAFF_DEMO_TITLE}
            </h2>
          </div>
          <MusicStaff
            notes={staffNotes}
            width={800}
            clef="treble"
            timeSignature={timeSignature}
            highlightNote={isPlaying ? targetNote : null}
          />
          <p className="text-stoneGrey text-center text-sm">
            {isPlaying ? APP_STRINGS.GAME.PLAY_INSTRUCTION : APP_STRINGS.VEXFLOW_CAPTION}
          </p>
        </section>

        <section className="flex justify-center">
          <SaoTrucVisualizer />
        </section>
      </div>

      <section className="w-full max-w-4xl space-y-4">
        <h2 className="text-xl text-warmWood font-semibold">{APP_STRINGS.PIANO_TITLE}</h2>
        <div className="bg-white/50 p-4 rounded-xl shadow-inner border border-warmWood/10 overflow-x-auto">
          <PianoKeyboard
            startOctave={3}
            octaves={3}
            onStartNote={startNote}
            onStopNote={handleStopNote}
          />
        </div>
      </section>
    </div>
  );
};

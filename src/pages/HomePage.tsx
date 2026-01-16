import React from 'react';
import PianoKeyboard from '../features/piano/components/PianoKeyboard';
import { useAudioStore } from '../stores/useAudioStore';
import { useGameStore } from '../stores/useGameStore';
import { NotationToggle } from '../components/ui/NotationToggle';
import { TimeSignatureSelector } from '../components/ui/TimeSignatureSelector';
import { GameOverlay } from '../features/game/components/GameOverlay';
import { APP_STRINGS } from '../constants/app-strings';
import { FeedbackEffects } from '../components/ui/FeedbackEffects';
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion';
import { requestPersistentStorage, getStorageEstimate } from '../services/storage-manager';

const MusicStaff = React.lazy(() => import('../features/sheet/components/MusicStaff').then(module => ({ default: module.MusicStaff })));
const SaoTrucVisualizer = React.lazy(() => import('../features/sao-truc/components/SaoTrucVisualizer'));

export const HomePage: React.FC = () => {
  const recordedNotes = useAudioStore((state) => state.recordedNotes);
  const startNote = useAudioStore((state) => state.startNote);
  const stopNote = useAudioStore((state) => state.stopNote);
  const clearRecordedNotes = useAudioStore((state) => state.clearRecordedNotes);
  const timeSignature = useAudioStore((state) => state.timeSignature);
  const playSuccess = useAudioStore((state) => state.playSuccess);
  const playFailure = useAudioStore((state) => state.playFailure);

  // Game Store
  const isPlaying = useGameStore((state) => state.isPlaying);
  const targetNote = useGameStore((state) => state.targetNote);
  const checkAnswer = useGameStore((state) => state.checkAnswer);
  const streak = useGameStore((state) => state.streak);

  const [lastResult, setLastResult] = React.useState<'success' | 'failure' | null>(null);
  const [resultTimestamp, setResultTimestamp] = React.useState(0);
  const [showConfetti, setShowConfetti] = React.useState(false);

  // Initialize storage durability and log stats in dev
  React.useEffect(() => {
    const initStorage = async () => {
      await requestPersistentStorage();
      if (import.meta.env.DEV) {
        const stats = await getStorageEstimate();
        if (stats) {
          console.log(`Storage Usage: ${(stats.usage / 1024 / 1024).toFixed(2)} MB`);
          console.log(`Storage Quota: ${(stats.quota / 1024 / 1024).toFixed(2)} MB`);
        }
      }
    };
    initStorage();
  }, []);

  // Wrap stopNote to check answer in game mode
  const handleStopNote = (note: string) => {
    stopNote(note);
    if (isPlaying) {
      const isCorrect = checkAnswer(note);
      setLastResult(isCorrect ? 'success' : 'failure');
      setResultTimestamp(Date.now());

      if (isCorrect) {
        playSuccess();
        // Check for streak milestone (multiple of 10)
        // Note: streak is already updated in store by checkAnswer, so we check current value + 1 if we were access previous state,
        // but here we get reactive update. However, checkAnswer updates store immediately.
        // We need to check if the NEW streak is a milestone.
        // Actually checkAnswer runs first. So `streak` from store might not be updated in this render cycle yet?
        // Zustand updates are usually synchronous in actions but React re-render is async.
        // Better to check the return of a modified checkAnswer or logic here.
        // Let's rely on the store update in useEffect or just assume if it was correct and (streak + 1) % 10 === 0
        // But we don't know the exact streak number here reliably without store update.
        // Let's move the milestone check to a useEffect on streak.
      } else {
        playFailure();
      }
    }
  };

  React.useEffect(() => {
    if (isPlaying && streak > 0 && streak % 10 === 0) {
      setShowConfetti(true);
    }
  }, [streak, isPlaying]);

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
      <FeedbackEffects lastResult={lastResult} timestamp={resultTimestamp} />
      <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

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
          <React.Suspense fallback={<div className="w-full h-[150px] flex items-center justify-center text-stoneGrey bg-ricePaper rounded-xl border border-warmWood/20">Loading staff...</div>}>
            <MusicStaff
              notes={staffNotes}
              width={800}
              clef="treble"
              timeSignature={timeSignature}
              highlightNote={isPlaying ? targetNote : null}
            />
          </React.Suspense>
          <p className="text-stoneGrey text-center text-sm">
            {isPlaying ? APP_STRINGS.GAME.PLAY_INSTRUCTION : APP_STRINGS.VEXFLOW_CAPTION}
          </p>
        </section>

        <section className="flex justify-center">
          <React.Suspense fallback={<div className="w-[300px] h-[400px] flex items-center justify-center text-stoneGrey bg-ricePaper/50 rounded-xl border border-warmWood/20">Loading visualizer...</div>}>
            <SaoTrucVisualizer />
          </React.Suspense>
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

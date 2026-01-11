import React from 'react';
import PianoKey, { KeyType } from './PianoKey';

interface PianoKeyboardProps {
  startOctave?: number;
  octaves?: number;
  onTriggerNote: (note: string) => void;
}

const NOTES = [
  { note: 'C', type: 'white' },
  { note: 'C#', type: 'black' },
  { note: 'D', type: 'white' },
  { note: 'D#', type: 'black' },
  { note: 'E', type: 'white' },
  { note: 'F', type: 'white' },
  { note: 'F#', type: 'black' },
  { note: 'G', type: 'white' },
  { note: 'G#', type: 'black' },
  { note: 'A', type: 'white' },
  { note: 'A#', type: 'black' },
  { note: 'B', type: 'white' },
] as const;

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  startOctave = 4,
  octaves = 1,
  onTriggerNote
}) => {
  const renderOctave = (octaveIndex: number) => {
    const currentOctave = startOctave + octaveIndex;

    const whiteKeys = NOTES.filter(n => n.type === 'white').map(n => `${n.note}${currentOctave}`);
    const blackKeys = NOTES.filter(n => n.type === 'black').map(n => `${n.note}${currentOctave}`);

    return (
      <div key={octaveIndex} className="relative flex h-48 w-full max-w-md select-none touch-none" style={{ touchAction: 'none' }}>
        {/* White Keys Layer */}
        {whiteKeys.map((note) => (
          <div key={note} className="flex-1">
            <PianoKey note={note} type="white" onTriggerNote={onTriggerNote} label={note.replace(/[0-9]/g, '')} />
          </div>
        ))}

        {/* Black Keys Layer */}
        {blackKeys.map((note) => {
             const noteName = note.replace(/[0-9]/g, '');

             let left = 0;
             if (noteName === 'C#') left = 9.3;
             if (noteName === 'D#') left = 23.6;
             if (noteName === 'F#') left = 52.1;
             if (noteName === 'G#') left = 66.4;
             if (noteName === 'A#') left = 80.7;

             return (
               <div
                 key={note}
                 className="absolute top-0 w-[10%] h-32 pointer-events-auto z-10"
                 style={{ left: `${left}%` }}
               >
                 <PianoKey note={note} type="black" onTriggerNote={onTriggerNote} />
               </div>
             );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-center w-full px-4" style={{ touchAction: 'none' }}>
      {Array.from({ length: octaves }).map((_, i) => renderOctave(i))}
    </div>
  );
};

export default PianoKeyboard;

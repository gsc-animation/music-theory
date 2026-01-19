import React, { useState } from 'react';
import { Play, Square } from 'lucide-react';
import { lookaheadScheduler } from '../../services/LookaheadScheduler';
import clsx from 'clsx';

interface PlayButtonProps {
  onTick?: (progress: number, beat: number) => void;
  className?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onTick, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (isPlaying) {
      lookaheadScheduler.stop();
      setIsPlaying(false);
    } else {
      if (onTick) {
        // Configure scheduler (optional, can be passed as props if needed)
        // lookaheadScheduler.configure(4, '4/4', 120);
        await lookaheadScheduler.start(onTick);
        setIsPlaying(true);
      }
    }
  };

  // Stop scheduler on unmount if playing
  React.useEffect(() => {
    return () => {
      if (lookaheadScheduler.running) {
        lookaheadScheduler.stop();
      }
    };
  }, []);

  return (
    <button
      onClick={togglePlay}
      className={clsx(
        "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95",
        isPlaying
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-emerald-600 hover:bg-emerald-700 text-white",
        className
      )}
    >
      {isPlaying ? (
        <>
          <Square size={24} fill="currentColor" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Play size={24} fill="currentColor" />
          <span>Start Loop</span>
        </>
      )}
    </button>
  );
};

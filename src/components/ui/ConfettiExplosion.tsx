import React from 'react';
import Confetti from 'react-confetti';

interface ConfettiExplosionProps {
  recycle?: boolean;
  run: boolean;
  onComplete?: () => void;
}

export const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({ run, recycle = false, onComplete }) => {
  // Simple fallback if useWindowSize is not available, or implement basic one
  const [windowDimensions, setWindowDimensions] = React.useState({ width: window.innerWidth, height: window.innerHeight });

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!run) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={recycle}
        numberOfPieces={200}
        onConfettiComplete={onComplete}
      />
    </div>
  );
};

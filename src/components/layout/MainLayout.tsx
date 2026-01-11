import React from 'react';
import AudioUnlocker from '../../features/audio/components/AudioUnlocker';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <AudioUnlocker />
      <main className="min-h-screen bg-ricePaper">
        {children}
      </main>
    </>
  );
};

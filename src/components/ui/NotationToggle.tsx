import React from 'react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { APP_STRINGS } from '../../constants/app-strings';

export const NotationToggle: React.FC = () => {
  const { notationSystem, toggleNotationSystem } = useSettingsStore();

  return (
    <button
      onClick={toggleNotationSystem}
      className="min-w-[48px] min-h-[48px] px-4 py-2 bg-white rounded-lg border-2 border-warm-wood text-stone-grey hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
      aria-label={`${APP_STRINGS.NOTATION.TOGGLE_LABEL_PREFIX} ${notationSystem === 'latin' ? 'Solfège' : 'Latin'} ${APP_STRINGS.NOTATION.TOGGLE_LABEL_SUFFIX}`}
      title={APP_STRINGS.NOTATION.TOGGLE_TITLE}
    >
      <span className={notationSystem === 'latin' ? 'font-bold text-bamboo' : 'opacity-50'}>
        {APP_STRINGS.NOTATION.LATIN_LABEL}
      </span>
      <span className="opacity-30">/</span>
      <span className={notationSystem === 'solfege' ? 'font-bold text-bamboo' : 'opacity-50'}>
        {APP_STRINGS.NOTATION.SOLFEGE_LABEL}
      </span>
    </button>
  );
};

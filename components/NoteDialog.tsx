import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface Props {
  isOpen: boolean;
  onSave: (note: string) => void;
  onSkip: () => void;
  moodName: string;
  language: Language;
}

const NoteDialog: React.FC<Props> = ({ isOpen, onSave, onSkip, moodName, language }) => {
  const [note, setNote] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = UI_TEXT[language].noteDialog;

  useEffect(() => {
    if (isOpen) {
      setNote('');
      // 少し遅延させてフォーカス
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-sm p-6 shadow-2xl transform transition-all scale-100">
        <h3 className="text-xl font-light text-white mb-2">
          {t.title(moodName)}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {t.desc}
        </p>

        <textarea
          ref={inputRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.placeholder}
          className="w-full h-24 bg-white/10 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 resize-none"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            {t.skip}
          </button>
          <button
            onClick={() => onSave(note)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/50"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDialog;
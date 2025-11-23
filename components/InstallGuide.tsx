import React from 'react';
import { ShareIcon, EllipsisVerticalIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const InstallGuide: React.FC<Props> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = UI_TEXT[language].installGuide;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900/90 border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          📱 {t.title}
        </h3>
        <p className="text-white/70 text-sm mb-6 leading-relaxed">
          {t.desc}
        </p>

        <div className="space-y-6">
          {/* iOS Guide */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2 text-sm">
              <span className="text-blue-300">{t.ios.title}</span>
            </h4>
            <ol className="text-white/80 text-sm space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="bg-white/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span>{t.ios.step1} <ShareIcon className="w-4 h-4 inline mx-1 align-text-bottom" /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span>{t.ios.step2} <PlusIcon className="w-4 h-4 inline mx-1 align-text-bottom" /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">3</span>
                <span>{t.ios.step3}</span>
              </li>
            </ol>
          </div>

          {/* Android Guide */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2 text-sm">
              <span className="text-green-300">{t.android.title}</span>
            </h4>
            <ol className="text-white/80 text-sm space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="bg-white/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span>{t.android.step1} <EllipsisVerticalIcon className="w-4 h-4 inline mx-1 align-text-bottom" /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span>{t.android.step2}</span>
              </li>
            </ol>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/10"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default InstallGuide;
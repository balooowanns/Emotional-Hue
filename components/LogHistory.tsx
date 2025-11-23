import React from 'react';
import { MoodLog, Language } from '../types';
import { MOODS, UI_TEXT } from '../constants';

interface Props {
  logs: MoodLog[];
  isNeutral?: boolean;
  language: Language;
}

const LogHistory: React.FC<Props> = ({ logs, isNeutral = false, language }) => {
  if (logs.length === 0) return null;

  const t = UI_TEXT[language];

  // Theme styles
  const titleColor = isNeutral ? 'text-slate-600' : 'text-white/80';
  const itemBg = isNeutral ? 'bg-white hover:bg-slate-50 border-slate-100' : 'bg-white/5 hover:bg-white/10 border-white/5';
  const textColor = isNeutral ? 'text-slate-800' : 'text-white';
  const metaColor = isNeutral ? 'text-slate-400' : 'text-white/40';
  const noteColor = isNeutral ? 'text-slate-600 border-slate-200' : 'text-white/80 border-white/10';
  const noteEmptyColor = isNeutral ? 'text-slate-300' : 'text-white/20';

  const locale = language === 'en' ? 'en-US' : 'ja-JP';

  return (
    <div className="mt-8 space-y-4">
      <h2 className={`${titleColor} font-medium text-lg flex items-center gap-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        {t.logHistoryTitle}
      </h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {logs.map((log) => {
          const mood = MOODS[log.moodId];
          const date = new Date(log.timestamp);
          const dateStr = date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
          const timeStr = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
          const label = language === 'ja' ? mood.label : mood.labelEn;

          return (
            <div 
              key={log.id} 
              className={`group ${itemBg} border rounded-xl p-4 transition-all shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${mood.bgClass} ${isNeutral ? '' : 'shadow-[0_0_8px_rgba(255,255,255,0.3)]'}`} />
                  <span className={`${textColor} font-medium`}>{label}</span>
                </div>
                <div className={`text-xs ${metaColor} font-mono`}>
                  {dateStr} {timeStr}
                </div>
              </div>
              
              {log.note ? (
                <div className={`${noteColor} text-sm leading-relaxed pl-6 border-l-2 mt-2`}>
                  {log.note}
                </div>
              ) : (
                <div className={`${noteEmptyColor} text-xs pl-6 italic mt-1`}>
                  {t.noNote}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogHistory;
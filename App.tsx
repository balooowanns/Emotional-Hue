import React, { useState, useEffect, useRef } from 'react';
import { MOOD_LIST, MOODS, UI_TEXT } from './constants';
import { MoodType, MoodLog, Language } from './types';
import { saveMoodLog, getRecentLogs, clearMoodLogs, updateLogNote } from './services/storageService';
import HistoryChart from './components/HistoryChart';
import LogHistory from './components/LogHistory';
import NoteDialog from './components/NoteDialog';
import InstallGuide from './components/InstallGuide';
import { DevicePhoneMobileIcon, TrashIcon, LanguageIcon, BellIcon } from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [currentMoodId, setCurrentMoodId] = useState<MoodType | null>(null);
  const [logs, setLogs] = useState<MoodLog[]>([]);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('ja');
  
  // Note dialog state
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [activeLogId, setActiveLogId] = useState<string | null>(null);

  // Install Guide state
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);

  // Notification state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const lastNotificationRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    
    // Load logs and restore last mood
    const recent = getRecentLogs();
    setLogs(recent);
    
    // Restore the most recent mood if it exists
    if (recent.length > 0) {
      setCurrentMoodId(recent[0].moodId);
    }
    
    // Attempt to detect browser language, default to JA
    if (navigator.language.startsWith('en')) {
      setLanguage('en');
    }

    // Check saved notification preference
    const savedNotif = localStorage.getItem('emotional_hue_notifications');
    if (savedNotif === 'true' && 'Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  // Timer for notifications
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      
      // Check if we already notified recently (within last 2 minutes to be safe)
      const last = new Date(lastNotificationRef.current);
      if (last.getDate() === now.getDate() && last.getHours() === h && last.getMinutes() === m) {
        return; 
      }

      if ((h === 12 && m === 0) || (h === 19 && m === 0)) {
        const t = UI_TEXT[language].reminder;
        const title = h === 12 ? t.noonTitle : t.eveningTitle;
        const body = h === 12 ? t.noonBody : t.eveningBody;

        try {
           new Notification(title, {
            body,
            icon: 'https://cdn-icons-png.flaticon.com/512/10473/10473618.png',
            tag: 'emotional-hue-reminder' // Replace existing notification
          });
          lastNotificationRef.current = Date.now();
        } catch (e) {
          console.error("Notification failed", e);
        }
      }
    };

    const intervalId = setInterval(checkTime, 10000); // Check every 10s
    return () => clearInterval(intervalId);
  }, [notificationsEnabled, language]);

  const refreshLogs = () => {
    const recent = getRecentLogs();
    setLogs(recent);
  };

  const handleMoodSelect = (moodId: MoodType) => {
    setCurrentMoodId(moodId);
    const newLog = saveMoodLog(moodId);
    
    // Update local state immediately for responsiveness
    setLogs(prev => [newLog, ...prev]);
    
    // Open note dialog
    setActiveLogId(newLog.id);
    setIsNoteDialogOpen(true);
  };

  const handleSaveNote = (note: string) => {
    if (activeLogId && note.trim()) {
      updateLogNote(activeLogId, note);
      refreshLogs(); // Reload to get updated note
    }
    setIsNoteDialogOpen(false);
    setActiveLogId(null);
  };

  const handleSkipNote = () => {
    setIsNoteDialogOpen(false);
    setActiveLogId(null);
  };

  const handleClearHistory = () => {
    if (confirm(UI_TEXT[language].clearHistoryConfirm)) {
      clearMoodLogs();
      setLogs([]);
      setCurrentMoodId(null);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ja' ? 'en' : 'ja');
  };

  const toggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('emotional_hue_notifications', 'true');
        alert(UI_TEXT[language].reminder.success);
      } else {
        alert(UI_TEXT[language].reminder.denied);
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('emotional_hue_notifications', 'false');
    }
  };

  // --- Theme Logic ---
  const isNeutral = !currentMoodId;

  // Define dynamic classes based on whether a mood is selected (Dark Mode) or not (Light/Neutral Mode)
  const theme = {
    bg: isNeutral ? 'bg-slate-50' : MOODS[currentMoodId!].bgClass,
    text: isNeutral ? 'text-slate-800' : 'text-white',
    textMuted: isNeutral ? 'text-slate-500' : 'text-white/70',
    textSubtle: isNeutral ? 'text-slate-400' : 'text-white/40',
    // Cards
    cardBg: isNeutral 
      ? 'bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl' 
      : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl',
    // Buttons
    iconButton: isNeutral
      ? 'text-slate-400 hover:text-slate-800 bg-white hover:bg-slate-100 shadow-sm'
      : 'text-white/30 hover:text-white/80 bg-white/5 hover:bg-white/10',
    // Mood Grid Buttons
    moodButton: {
      base: isNeutral 
        ? 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
        : 'bg-white/5 border-white/10 hover:bg-white/10',
      active: isNeutral 
        ? 'ring-2 ring-slate-400 bg-slate-100' // Won't happen as selecting sets !isNeutral, but for safety
        : 'bg-white/20 scale-105 shadow-lg ring-2 ring-white/50',
      text: isNeutral ? 'text-slate-700' : 'text-white/80',
      textActive: 'text-white', // When selected, it's always dark mode
      desc: isNeutral ? 'text-slate-400' : 'text-white/50'
    }
  };

  if (!mounted) return null;

  const t = UI_TEXT[language];

  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto ${theme.bg}`}
    >
      <div className="max-w-md w-full animate-fade-in-up pb-10 relative">
        
        {/* Top Controls */}
        <div className="absolute top-0 w-full flex justify-between items-center pointer-events-none">
           {/* Language Switcher - Left */}
           <button
             onClick={toggleLanguage}
             className={`pointer-events-auto px-3 py-2 rounded-full backdrop-blur-sm text-xs font-medium flex items-center gap-1 transition-colors ${theme.iconButton}`}
             title="Switch Language"
           >
             <LanguageIcon className="w-4 h-4" />
             {language === 'ja' ? 'EN' : 'JP'}
           </button>

           {/* Right Group: Notification & Install */}
           <div className="flex items-center gap-2 pointer-events-auto">
             <button
               onClick={toggleNotifications}
               className={`p-2 transition-colors rounded-full backdrop-blur-sm ${theme.iconButton}`}
               title={notificationsEnabled ? t.reminder.disable : t.reminder.enable}
             >
               {notificationsEnabled ? (
                 <BellIconSolid className={`w-5 h-5 ${isNeutral ? 'text-yellow-500' : 'text-yellow-300'}`} />
               ) : (
                 <BellIcon className="w-5 h-5" />
               )}
             </button>

             <button
               onClick={() => setIsInstallGuideOpen(true)}
               className={`p-2 transition-colors rounded-full backdrop-blur-sm ${theme.iconButton}`}
               title={t.installTitle}
             >
               <DevicePhoneMobileIcon className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Header */}
        <header className="mb-8 text-center mt-12">
          <h1 className={`text-4xl font-extrabold tracking-tight mb-2 drop-shadow-sm transition-colors duration-1000 ${theme.text}`}>
            {t.appTitle}
          </h1>
          <p className={`text-sm font-light transition-colors duration-1000 ${theme.textMuted}`}>
            {t.appSubtitle}
          </p>
        </header>

        {/* Mood Selector Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {MOOD_LIST.map((mood) => {
            const isSelected = currentMoodId === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`
                  relative h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border
                  ${isSelected ? theme.moodButton.active : theme.moodButton.base}
                  ${!isSelected && 'hover:scale-[1.02]'}
                `}
              >
                <span className={`font-semibold text-lg transition-colors ${isSelected ? theme.moodButton.textActive : theme.moodButton.text}`}>
                  {language === 'ja' ? mood.label : mood.labelEn}
                </span>
                <span className={`text-[10px] uppercase tracking-wider mt-1 transition-colors ${theme.moodButton.desc}`}>
                  {language === 'ja' ? mood.description : mood.descriptionEn}
                </span>
                {isSelected && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Visualization & History Section */}
        <div className={`${theme.cardBg} rounded-3xl p-6 transition-colors duration-1000`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-medium text-lg tracking-wide ${theme.text}`}>
              {t.weeklySpectrum}
            </h2>
            <button 
              onClick={handleClearHistory}
              className={`p-2 transition-colors rounded-full ${theme.iconButton}`}
              title={t.clearHistory}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>

          <HistoryChart logs={logs} isNeutral={isNeutral} language={language} />
          
          <LogHistory logs={logs} isNeutral={isNeutral} language={language} />
        </div>

        <footer className={`mt-12 text-center text-xs font-light ${theme.textSubtle}`}>
          <p>{t.footer}</p>
        </footer>
      </div>
      
      {/* Note Dialog Overlay */}
      <NoteDialog 
        isOpen={isNoteDialogOpen}
        onSave={handleSaveNote}
        onSkip={handleSkipNote}
        moodName={currentMoodId ? (language === 'ja' ? MOODS[currentMoodId].label : MOODS[currentMoodId].labelEn) : ''}
        language={language}
      />

      {/* Install Guide Overlay */}
      <InstallGuide 
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
        language={language}
      />

      {/* Global styles for animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isNeutral ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'}; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isNeutral ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'}; 
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default App;
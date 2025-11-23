import { MoodLog, MoodType } from '../types';

const STORAGE_KEY = 'emotional_hue_logs_v1';

export const saveMoodLog = (moodId: MoodType): MoodLog => {
  const newLog: MoodLog = {
    id: crypto.randomUUID(),
    moodId,
    timestamp: Date.now(),
  };

  const existingLogs = getMoodLogs();
  const updatedLogs = [newLog, ...existingLogs]; // Prepend new log
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  return newLog;
};

export const getMoodLogs = (): MoodLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse logs", e);
    return [];
  }
};

export const clearMoodLogs = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getRecentLogs = (days: number = 7): MoodLog[] => {
  const logs = getMoodLogs();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return logs.filter(log => log.timestamp >= cutoff);
};

export const updateLogNote = (logId: string, note: string): MoodLog[] => {
  const logs = getMoodLogs();
  const updatedLogs = logs.map(log => 
    log.id === logId ? { ...log, note } : log
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  return updatedLogs;
};
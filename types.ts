export enum MoodType {
  FOCUS = 'FOCUS',
  ANXIETY = 'ANXIETY',
  FATIGUE = 'FATIGUE',
  EXCITEMENT = 'EXCITEMENT',
  CALM = 'CALM',
  SADNESS = 'SADNESS',
  ANGER = 'ANGER',
  JOY = 'JOY'
}

export type Language = 'ja' | 'en';

export interface MoodDefinition {
  id: MoodType;
  label: string; // Japanese (Default)
  labelEn: string; // English
  description: string; // Japanese
  descriptionEn: string; // English
  colorHex: string; // For charts
  bgClass: string; // Tailwind class for background
  textClass: string; // Tailwind class for text
  ringClass: string; // Tailwind class for selection ring
}

export interface MoodLog {
  id: string;
  moodId: MoodType;
  timestamp: number;
  note?: string;
}

export interface AnalysisResult {
  summary: string;
  advice: string;
  dominantColor: string;
}
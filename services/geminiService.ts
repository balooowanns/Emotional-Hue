import { GoogleGenAI, Type } from "@google/genai";
import { MoodLog, AnalysisResult } from '../types';
import { MOODS } from '../constants';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeEmotionalTrends = async (logs: MoodLog[]): Promise<AnalysisResult | null> => {
  if (logs.length === 0) return null;

  // Prepare data for the prompt
  const logSummary = logs.map(log => {
    const date = new Date(log.timestamp).toLocaleString('ja-JP');
    const moodName = MOODS[log.moodId].label;
    return `- ${date}: ${moodName}`;
  }).join('\n');

  const prompt = `
    あなたは心理データの専門分析家です。
    ユーザーの最近の感情記録データを分析してください。
    
    データ:
    ${logSummary}
    
    タスク:
    1. 主要な感情の色相（傾向）を特定する。
    2. 感情状態の客観的な要約を提供する（2文以内、日本語で）。
    3. このデータに基づいた具体的で優しいアドバイスを1つ提供する（2文以内、日本語で）。
    
    結果はJSON形式で返してください。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "日本語での要約" },
            advice: { type: Type.STRING, description: "日本語でのアドバイス" },
            dominantColor: { type: Type.STRING, description: "支配的な色/気分を表す単語（例：'青', '赤', 'グレー'など）" }
          },
          required: ["summary", "advice", "dominantColor"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw error;
  }
};
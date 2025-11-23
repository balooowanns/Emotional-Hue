import React, { useState } from 'react';
import { MoodLog, AnalysisResult } from '../types';
import { analyzeEmotionalTrends } from '../services/geminiService';
import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface Props {
  logs: MoodLog[];
}

const InsightPanel: React.FC<Props> = ({ logs }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (logs.length < 3) {
      setError("AI分析を行うには、少なくとも3つの感情を記録してください。");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeEmotionalTrends(logs);
      setAnalysis(result);
    } catch (err) {
      setError("現在、感情分析AIに接続できません。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-light text-white flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-yellow-300" />
          AI感情分析
        </h2>
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-all active:scale-95 backdrop-blur-sm border border-white/10"
          >
            データを分析する
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-3 animate-pulse">
           <ArrowPathIcon className="w-8 h-8 text-white/50 animate-spin" />
           <p className="text-white/60 text-sm">感情パターンを解析中...</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-100 text-sm">
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-black/20 rounded-lg p-4 border border-white/5">
            <span className="text-xs uppercase tracking-widest text-white/40 mb-1 block">分析結果</span>
            <p className="text-white/90 leading-relaxed font-light text-lg">
              "{analysis.summary}"
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-transparent border-l-4 border-yellow-300 pl-4 py-2">
            <span className="text-xs uppercase tracking-widest text-yellow-300 mb-1 block">アドバイス</span>
            <p className="text-white/80 italic">
              {analysis.advice}
            </p>
          </div>

          <button 
            onClick={() => setAnalysis(null)} 
            className="text-xs text-white/40 hover:text-white underline mt-4 w-full text-center"
          >
            分析結果を閉じる
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightPanel;
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MoodLog, Language } from '../types';
import { MOODS, UI_TEXT } from '../constants';

interface Props {
  logs: MoodLog[];
  isNeutral?: boolean;
  language: Language;
}

const HistoryChart: React.FC<Props> = ({ logs, isNeutral = false, language }) => {
  const t = UI_TEXT[language];

  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    
    logs.forEach(log => {
      counts[log.moodId] = (counts[log.moodId] || 0) + 1;
    });

    return Object.entries(counts).map(([moodId, count]) => {
      const moodDef = MOODS[moodId as keyof typeof MOODS];
      return {
        name: language === 'ja' ? moodDef.label : moodDef.labelEn,
        count: count,
        color: moodDef.colorHex,
        moodId
      };
    }).sort((a, b) => b.count - a.count); // Sort by frequency
  }, [logs, language]);

  // Dynamic colors based on theme
  const textColor = isNeutral ? '#475569' : '#fff'; // slate-600 vs white
  const titleColor = isNeutral ? 'text-slate-600' : 'text-white/80';
  const emptyTextColor = isNeutral ? 'text-slate-400' : 'text-white/50';
  const stripBorder = isNeutral ? 'border-slate-200' : 'border-white/10';
  const chartBg = isNeutral ? 'bg-slate-50' : 'bg-white/5';
  const chartBorder = isNeutral ? 'border-slate-100' : 'border-white/10';

  if (logs.length === 0) {
    return (
      <div className={`flex h-40 items-center justify-center ${emptyTextColor} italic`}>
        {t.noData}
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Distribution Bar Chart */}
      <div className={`h-64 w-full rounded-xl p-4 border ${chartBg} ${chartBorder}`}>
        <h3 className={`${titleColor} text-sm font-medium mb-4`}>{t.chartTitle}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={language === 'en' ? 90 : 80} 
              tick={{ fill: textColor, fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ 
                backgroundColor: isNeutral ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.8)', 
                border: isNeutral ? '1px solid #e2e8f0' : 'none', 
                borderRadius: '8px', 
                color: isNeutral ? '#1e293b' : '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Recent History Strip */}
      <div className="space-y-2">
        <h3 className={`${titleColor} text-sm font-medium`}>{t.timelineTitle}</h3>
        <div className={`flex w-full h-8 rounded-full overflow-hidden border ${stripBorder}`}>
          {logs.slice(0, 20).reverse().map((log) => {
             const moodDef = MOODS[log.moodId];
             const label = language === 'ja' ? moodDef.label : moodDef.labelEn;
             return (
               <div 
                 key={log.id} 
                 className="h-full flex-1" 
                 style={{ backgroundColor: moodDef.colorHex }}
                 title={`${label} - ${new Date(log.timestamp).toLocaleDateString()}`}
               />
             );
          })}
        </div>
        <p className={`text-xs ${emptyTextColor} text-right`}>{t.latest} →</p>
      </div>
    </div>
  );
};

export default HistoryChart;
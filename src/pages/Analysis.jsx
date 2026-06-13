import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  MessageSquareWarning, 
  Globe, 
  AlertTriangle,
  Flame,
  Award,
  ChevronRight,
  Smile
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';

export default function Analysis() {
  const { getSelectedAnalysis } = useApp();
  const data = getSelectedAnalysis();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-slate-400">Please upload a WhatsApp chat first to view deep analytics.</p>
      </div>
    );
  }

  // Word Cloud Mock Data
  const wordCloudWords = [
    { text: "Love", size: "text-4xl", color: "text-indigo-400", weight: "font-extrabold" },
    { text: "Family", size: "text-3xl", color: "text-purple-400", weight: "font-bold" },
    { text: "Dinner", size: "text-2xl", color: "text-pink-400", weight: "font-semibold" },
    { text: "Tomorrow", size: "text-3xl", color: "text-indigo-300", weight: "font-bold" },
    { text: "Hahaha", size: "text-4xl", color: "text-purple-300", weight: "font-extrabold" },
    { text: "Thanks", size: "text-xl", color: "text-amber-400", weight: "font-medium" },
    { text: "Planning", size: "text-2xl", color: "text-emerald-400", weight: "font-bold" },
    { text: "Trip", size: "text-2xl", color: "text-pink-300", weight: "font-semibold" },
    { text: "Home", size: "text-xl", color: "text-indigo-200", weight: "font-medium" },
    { text: "Photos", size: "text-3xl", color: "text-sky-400", weight: "font-bold" },
    { text: "Meeting", size: "text-lg", color: "text-rose-400", weight: "font-normal" },
    { text: "Time", size: "text-2xl", color: "text-emerald-300", weight: "font-semibold" },
    { text: "Good", size: "text-xl", color: "text-purple-200", weight: "font-medium" },
    { text: "Night", size: "text-lg", color: "text-slate-500", weight: "font-normal" },
    { text: "See ya", size: "text-2xl", color: "text-indigo-400", weight: "font-semibold" }
  ];

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#10b981', '#14b8a6'];

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white">Deep AI Analytics</h2>
        <p className="text-slate-400 text-sm">Exploratory metrics, language trends, and sentiment breakdown</p>
      </div>

      {/* AI Summary and Metadata Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gemini API Synthesis */}
        <div className="premium-card lg:col-span-2 space-y-4 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.03)] bg-gradient-to-br from-card via-card to-indigo-950/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-base font-bold text-white">Gemini Summary Analysis</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-border">
            {data.ai_insights.ai_summary}
          </p>
          
          {/* Detected Topics Tags */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Topics Detected</span>
            <div className="flex flex-wrap gap-2">
              {data.ai_insights.topics_detected.map((topic, i) => (
                <span key={i} className="px-3 py-1 bg-slate-900 border border-border text-slate-300 text-xs rounded-full font-medium">
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Mini Indicators */}
        <div className="space-y-4">
          {/* Language detection */}
          <div className="premium-card bg-slate-900/40 p-5 flex items-center justify-between border border-border">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Language Detected</span>
              <p className="text-lg font-bold text-white">{data.ai_insights.detected_language}</p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>

          {/* Toxicity Detection */}
          <div className="premium-card bg-slate-900/40 p-5 flex items-center justify-between border border-border">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Toxicity Index</span>
              <p className="text-lg font-bold text-white">{(data.ai_insights.toxicity_score * 100).toFixed(0)}% (Very Low)</p>
            </div>
            <div className={`p-3 rounded-xl ${
              data.ai_insights.toxicity_score > 0.1 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Core Relationship Matrix */}
          <div className="premium-card bg-slate-900/40 p-5 space-y-3 border border-border">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Relationship Scores</span>
            <div className="space-y-2.5">
              {data.ai_insights.relationship_score.map((rel, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950/50 p-2.5 rounded-lg border border-border/60">
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">{rel.pair}</p>
                    <p className="text-[9px] text-slate-500">{rel.status}</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">{rel.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Active Users Bar Chart */}
        <div className="premium-card space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Most Active Users</h3>
            <p className="text-xs text-slate-500">Distribution of messages by user count</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.active_users} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis type="number" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis dataKey="sender_name" type="category" stroke="#475569" fontSize={11} tickLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111115', border: '1px solid #1c1c23', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="message_count" fill="#6366f1" radius={[0, 8, 8, 0]}>
                  {data.active_users.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Activity Spikes Bar Chart */}
        <div className="premium-card space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Daily Activity Spikes</h3>
            <p className="text-xs text-slate-500">Average message patterns by day of week</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.daily_activity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111115', border: '1px solid #1c1c23', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="message_count" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid: Emoji Analysis + Word Cloud Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emoji Distribution Chart */}
        <div className="premium-card lg:col-span-1 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Emoji Analysis</h3>
            <p className="text-xs text-slate-500">Frequency of custom emojis used</p>
          </div>
          <div className="h-56 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.emoji_analysis}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {data.emoji_analysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111115', border: '1px solid #1c1c23', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            {data.emoji_analysis.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-border">
                <span className="text-xl">{item.emoji}</span>
                <p className="text-xs font-bold text-slate-300 mt-1">{item.count}</p>
                <span className="text-[9px] text-slate-500 uppercase">sent</span>
              </div>
            ))}
          </div>
        </div>

        {/* Word Cloud Component */}
        <div className="premium-card lg:col-span-2 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Generated Word Cloud</h3>
            <p className="text-xs text-slate-500">Most frequent vocabulary extracted from text parse</p>
          </div>
          
          <div className="flex-1 min-h-[200px] bg-slate-950/60 border border-border rounded-xl p-6 flex flex-wrap gap-4 items-center justify-center content-center relative">
            {/* Word list mapping representing the Cloud */}
            {wordCloudWords.map((word, index) => (
              <span 
                key={index}
                className={`${word.size} ${word.color} ${word.weight} px-2.5 py-1.5 hover:scale-125 transition-transform duration-200 cursor-default select-none`}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  FileText, 
  Image, 
  Link as LinkIcon, 
  HeartHandshake, 
  ArrowRight,
  TrendingUp,
  Upload,
  CalendarDays
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function Dashboard() {
  const { getSelectedAnalysis, analyses, setSelectedAnalysisId, setCurrentRoute, user } = useApp();
  const activeAnalysis = getSelectedAnalysis();

  if (!activeAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-slate-400">No active analysis found. Please upload a WhatsApp chat first.</p>
        <button 
          onClick={() => setCurrentRoute('upload')}
          className="mt-4 px-6 py-2.5 bg-indigo-600 rounded-xl font-medium text-white hover:bg-indigo-500 transition-all"
        >
          Upload Chat
        </button>
      </div>
    );
  }

  // Calculate high-level metrics
  const cards = [
    { 
      label: 'Total Messages', 
      value: activeAnalysis.total_messages.toLocaleString(), 
      change: '+14% from average', 
      icon: MessageSquare, 
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    { 
      label: 'Total Words', 
      value: activeAnalysis.total_words.toLocaleString(), 
      change: '6.0 words per msg', 
      icon: FileText, 
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    { 
      label: 'Media Shared', 
      value: activeAnalysis.media_shared.toLocaleString(), 
      change: 'Photos, videos, audio', 
      icon: Image, 
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
    { 
      label: 'Links Shared', 
      value: activeAnalysis.links_shared.toLocaleString(), 
      change: 'URL domain distribution', 
      icon: LinkIcon, 
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
    { 
      label: 'Relationship score', 
      value: `${activeAnalysis.ai_insights.relationship_score[0]?.score || 90}%`, 
      change: activeAnalysis.ai_insights.relationship_score[0]?.status || 'Strong Affinity', 
      icon: HeartHandshake, 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Hello, {user.name}</h2>
          <p className="text-slate-400 text-sm">Here is the overview for <span className="text-indigo-400 font-semibold">{activeAnalysis.filename}</span></p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentRoute('upload')}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload New Chat
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="premium-card bg-slate-900/40 p-5 border border-border relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
                <div className={`p-2 rounded-lg ${card.color} ${card.bg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                <p className="text-[10px] text-slate-500 font-medium">{card.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Graph + Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Component */}
        <div className="premium-card lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Monthly Timeline Activity</h3>
              <p className="text-xs text-slate-500">Volume patterns over history scale</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Analyzing</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeAnalysis.monthly_timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1c23" />
                <XAxis dataKey="month_year" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111115', border: '1px solid #1c1c23', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#6366f1', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="message_count" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards inside Dashboard */}
        <div className="space-y-6">
          {/* Quick Analysis Selector */}
          <div className="premium-card space-y-4">
            <h4 className="text-sm font-bold text-white">Active Runs & Datasets</h4>
            <div className="space-y-2.5">
              {analyses.map((run) => (
                <button
                  key={run.id}
                  onClick={() => setSelectedAnalysisId(run.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    activeAnalysis.id === run.id 
                      ? 'bg-indigo-500/10 border-indigo-500/40 text-white' 
                      : 'bg-slate-900/20 border-border text-slate-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-semibold truncate">{run.filename}</p>
                    <p className="text-[10px] text-slate-500">{(run.file_size_bytes/1024).toFixed(1)} KB</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-indigo-400">{run.total_messages.toLocaleString()}</p>
                    <p className="text-[9px] text-slate-500">msgs</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed analysis jump card */}
          <div className="bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-card border border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-between h-44">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">AI Synthesis available</span>
              <h4 className="text-base font-bold text-white mt-1.5">View Deep Analytics</h4>
              <p className="text-xs text-slate-400 mt-1">Check toxic logs, relationship grids, word cloud generation and emoji frequencies.</p>
            </div>
            <button
              onClick={() => setCurrentRoute('analysis')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-white mt-4 transition-colors group"
            >
              Go to Analytics Page
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  MessageSquareCode, 
  PieChart, 
  FileText,
  Lock
} from 'lucide-react';

export default function Landing() {
  const { setCurrentRoute } = useApp();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-500" />
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">WhatsInsight AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentRoute('login')} 
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-all"
          >
            Log In
          </button>
          <button 
            onClick={() => setCurrentRoute('signup')} 
            className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl border border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
          >
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen WhatsApp NLP Parser</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Turn WhatsApp Chats Into <span className="premium-gradient-text">AI Insights</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Upload exported chat transcripts to unlock immediate behavioral timelines, emoji frequencies, topic models, relationship dynamics, and toxicity checks.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentRoute('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentRoute('login')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold bg-slate-900 border border-border hover:border-slate-700 text-slate-300 hover:text-white px-8 py-4 rounded-2xl transition-all"
            >
              View Sandbox Demo
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Interactive Timelines</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore custom line charts, daily activity spikes, and monthly communication maps processed directly via Pandas dataframes.
            </p>
          </div>

          <div className="premium-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Gemini NLP Summary</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leverage Google Gemini API to extract high-accuracy chat summaries, identify core topics, and measure multi-user relationship health.
            </p>
          </div>

          <div className="premium-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Toxicity & Privacy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Identify argument patterns and harmful language levels. Your chat processing occurs dynamically and isolates sensitive user data securely.
            </p>
          </div>
        </div>

        {/* Dynamic Demo Block */}
        <div className="mt-28 premium-card border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.08)] bg-slate-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 rounded-bl-xl border-l border-b border-indigo-500/20 text-indigo-400">
            DEMO PREVIEW
          </div>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-semibold text-indigo-400">Chat Analysis Summary</span>
                <h4 className="text-2xl font-bold text-white">Alice & Bob Dinner Group</h4>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">Toxicity: 3% (Low)</span>
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full">Language: English</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-slate-300">Gemini Generative Synthesis</h5>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This chat revolves around coordinating dinner schedules, sharing old family photographs, and scheduling vacation logistics. The conversation shows positive dynamics and high collaboration levels between Alice and Charlie, indicating supportive friendship circles.
                </p>
              </div>
              <div className="bg-slate-950/60 border border-border p-4 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Key Dashboard Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Total Messages</span>
                    <p className="text-lg font-bold text-white">14,205</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Words Analyzed</span>
                    <p className="text-lg font-bold text-white">85,230</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Emoji Sent</span>
                    <p className="text-lg font-bold text-white">1,489</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Relationship Rating</span>
                    <p className="text-lg font-bold text-indigo-400">96% (High)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 bg-card/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-sm text-white">WhatsInsight AI</span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 WhatsInsight AI Inc. Built for privacy, analytics, and instant NLP.
          </p>
        </div>
      </footer>
    </div>
  );
}

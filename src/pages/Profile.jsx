import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, CreditCard, Key, Sparkles, Check } from 'lucide-react';

export default function Profile() {
  const { user } = useApp();
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4 pb-12">
      <div>
        <h2 className="text-3xl font-extrabold text-white">Account & Settings</h2>
        <p className="text-slate-400 text-sm">Manage subscription status, security credentials, and AI configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Summary Card */}
        <div className="premium-card flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-xl shadow-indigo-500/10">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-400">
              {user.name.charAt(0)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{user.name}</h3>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
            {user.plan}
          </div>
          <div className="w-full border-t border-border pt-4 text-left grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Joined Date</span>
              <span className="font-semibold text-slate-300">{user.joined_date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Chat Analyses Run</span>
              <span className="font-semibold text-slate-300">{user.analyses_count} reports</span>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Sections */}
        <div className="md:col-span-2 space-y-6">
          {/* Subscription Tier Cards */}
          <div className="premium-card space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4.5 h-4.5 text-indigo-400" />
              SaaS Subscription Plan
            </h4>
            <div className="bg-slate-950/60 p-4 border border-indigo-500/20 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Premium Creator Plan</p>
                <p className="text-[10px] text-slate-400">Next renewal: July 13, 2026 ($19.00/month)</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
          </div>

          {/* Gemini AI Settings Panel */}
          <div className="premium-card space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-indigo-400" />
              Google Gemini Credentials
            </h4>
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                By default, WhatsInsight AI queries our shared backend Gemini service. Optionally input your custom Google AI Studio developer API key to boost rate-limits and enable custom tuning models.
              </p>
              <div className="flex gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 bg-slate-900 border border-border focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-border text-slate-300 text-xs rounded-xl font-medium transition-colors"
                >
                  {showKey ? "Hide" : "Show"}
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-xl font-bold transition-all"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

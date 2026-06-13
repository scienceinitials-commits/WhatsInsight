import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Signup() {
  const { signup, setCurrentRoute } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400 mx-auto" onClick={() => setCurrentRoute('landing')}>
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="text-slate-400 text-sm">Start extracting NLP insights from chats today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-border focus:border-indigo-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-900 border border-border focus:border-indigo-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-slate-900 border border-border focus:border-indigo-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all mt-6"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-8">
          Already have an account?{' '}
          <button 
            onClick={() => setCurrentRoute('login')}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  UploadCloud, 
  BarChart3, 
  History, 
  User, 
  LogOut, 
  Sparkles,
  Menu
} from 'lucide-react';

export default function Sidebar() {
  const { currentRoute, setCurrentRoute, logout, user } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Chat', icon: UploadCloud },
    { id: 'analysis', label: 'Deep Analytics', icon: BarChart3 },
    { id: 'history', label: 'Analysis History', icon: History },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Header/Nav */}
      <div className="md:hidden flex items-center justify-between bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2" onClick={() => setCurrentRoute('dashboard')}>
          <Sparkles className="w-6 h-6 text-indigo-500" />
          <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">WhatsInsight AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentRoute('profile')}
            className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-300"
          >
            {user.name.charAt(0)}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border flex justify-around py-2 z-50">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentRoute(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-indigo-400' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Exit</span>
        </button>
      </div>

      {/* Desktop Sidebar Layout */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 select-none">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Sparkles className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white">WhatsInsight</h1>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">AI ENGINE</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-slate-900/60 border border-border rounded-xl p-3 mb-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.plan}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/5 hover:border-red-500/10 border border-transparent transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

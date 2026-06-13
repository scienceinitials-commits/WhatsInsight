import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History as HistoryIcon, Calendar, ArrowRight, Trash2, Search, FileText } from 'lucide-react';

export default function History() {
  const { analyses, setSelectedAnalysisId, setCurrentRoute, setAnalyses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (id) => {
    setSelectedAnalysisId(id);
    setCurrentRoute('dashboard');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    // Allow deleting item
    // (mock state mutation or context override if desired, otherwise just filter)
  };

  const filteredAnalyses = analyses.filter(run => 
    run.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Analysis History</h2>
          <p className="text-slate-400 text-sm">Access and review all your previous chat insights</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transcripts by filename..."
            className="w-full bg-card border border-border focus:border-indigo-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all"
          />
        </div>
      </div>

      {/* History List */}
      <div className="premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-900/30 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="p-4 pl-6">Chat Filename</th>
                <th className="p-4">Analyzed Date</th>
                <th className="p-4">Messages</th>
                <th className="p-4">Words Count</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredAnalyses.length > 0 ? (
                filteredAnalyses.map((run) => (
                  <tr 
                    key={run.id}
                    onClick={() => handleSelect(run.id)}
                    className="hover:bg-slate-800/10 cursor-pointer group transition-colors"
                  >
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {run.filename}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(run.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-300">
                      {run.total_messages.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {run.total_words.toLocaleString()}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => handleSelect(run.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-white transition-colors"
                      >
                        View Insights
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-sm text-slate-500">
                    No analytics reports found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

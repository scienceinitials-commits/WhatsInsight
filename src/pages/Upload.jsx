import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, FileText, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function Upload() {
  const { addAnalysis, setCurrentRoute } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processStep, setProcessStep] = useState('');
  const fileInputRef = useRef(null);

  const steps = [
    'Parsing WhatsApp timestamp syntax...',
    'Analyzing messages, links, and media paths...',
    'Tokenizing words and stripping common stopwords...',
    'Generating emoji distribution counts...',
    'Querying Gemini API for toxic evaluation & relationship affinity score...',
    'Rendering Word Cloud canvas...'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.txt')) {
        setFile(droppedFile);
      } else {
        alert('Only WhatsApp exported .txt files are supported.');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile);
      } else {
        alert('Only WhatsApp exported .txt files are supported.');
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const startProcessing = () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessStep(steps[0]);

    // Simulate analysis timeline
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessStep(steps[currentStep]);
        setProgress((currentStep / steps.length) * 100);
      } else {
        clearInterval(interval);
        setProgress(100);
        setProcessStep('Analysis Complete!');
        
        // Mock new analytics dataset from upload
        const newAnalysis = {
          id: Math.random().toString(36).substring(7),
          filename: file.name,
          file_size_bytes: file.size || 64200,
          total_messages: Math.floor(Math.random() * 8000) + 2000,
          total_words: Math.floor(Math.random() * 50000) + 10000,
          media_shared: Math.floor(Math.random() * 300) + 50,
          links_shared: Math.floor(Math.random() * 100) + 15,
          created_at: new Date().toISOString(),
          active_users: [
            { sender_name: "Me", message_count: 3200, word_count: 18200 },
            { sender_name: "Partner", message_count: 2900, word_count: 16100 }
          ],
          emoji_analysis: [
            { emoji: "❤️", count: 180 },
            { emoji: "😂", count: 154 },
            { emoji: "✨", count: 92 }
          ],
          monthly_timeline: [
            { month_year: "Apr 2026", message_count: 1400 },
            { month_year: "May 2026", message_count: 2200 },
            { month_year: "Jun 2026", message_count: 2500 }
          ],
          daily_activity: [
            { name: "Mon", message_count: 150 },
            { name: "Tue", message_count: 180 },
            { name: "Wed", message_count: 240 },
            { name: "Thu", message_count: 210 },
            { name: "Fri", message_count: 340 },
            { name: "Sat", message_count: 420 },
            { name: "Sun", message_count: 310 }
          ],
          ai_insights: {
            toxicity_score: 0.02,
            detected_language: "English / Spanglish",
            ai_summary: "High-level cooperative dynamic containing daily planning, friendly checks, and visual uploads. Mutual engagement remains balanced and supportive.",
            topics_detected: ["Meetups", "Weekly Scheduling", "Funny Reels"],
            relationship_score: [
              { pair: "Me ↔ Partner", score: 94, status: "High Mutual Affection" }
            ]
          }
        };

        setTimeout(() => {
          addAnalysis(newAnalysis);
          setCurrentRoute('analysis');
        }, 800);
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-4 pb-12">
      <div>
        <h2 className="text-3xl font-extrabold text-white">Upload Chat Transcript</h2>
        <p className="text-slate-400 text-sm">Convert your standard export txt files into rich stats</p>
      </div>

      {!isProcessing ? (
        <div className="space-y-6">
          {/* Drag & Drop Frame */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`premium-card border-2 border-dashed py-14 flex flex-col items-center justify-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-500/5' 
                : 'border-border bg-slate-900/20 hover:border-slate-800'
            }`}
            onClick={onButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleChange}
            />
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold text-base mb-1">Drag and drop WhatsApp .txt file</h4>
            <p className="text-xs text-slate-500 mb-6">Only supports standard export files without media content</p>
            <button
              type="button"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-border rounded-xl text-xs font-semibold text-slate-300 transition-colors"
            >
              Browse Files
            </button>
          </div>

          {/* Selected File Card */}
          {file && (
            <div className="premium-card bg-slate-900/40 p-4 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white truncate max-w-[280px]">{file.name}</p>
                  <p className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                onClick={startProcessing}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                Analyze Now
              </button>
            </div>
          )}

          {/* Export Instruction Box */}
          <div className="bg-slate-900/30 border border-border rounded-2xl p-5 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              How to export chat from WhatsApp
            </h5>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
              <li>Open the chat conversation you want to analyze in WhatsApp.</li>
              <li>Tap the details header / menu button (three vertical dots on Android, contact header on iOS).</li>
              <li>Select <span className="font-semibold text-indigo-400">More</span>, then click <span className="font-semibold text-indigo-400">Export Chat</span>.</li>
              <li>Choose <span className="font-semibold text-white">Without Media</span> to export only the text transcript files.</li>
              <li>Save or share the generated <span className="font-semibold text-indigo-400">_chat.txt</span> or folder to your device.</li>
            </ol>
          </div>
        </div>
      ) : (
        /* Simulated Loader State */
        <div className="premium-card bg-slate-900/60 border border-border p-8 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin" />
            <Sparkles className="w-7 h-7 text-indigo-400 animate-pulse" />
          </div>

          <div className="text-center space-y-2">
            <h4 className="text-lg font-bold text-white">Processing WhatsApp Transcript</h4>
            <p className="text-xs text-indigo-400 font-medium h-4 transition-all">{processStep}</p>
          </div>

          {/* Progress bar container */}
          <div className="w-full bg-slate-950 border border-border rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[10px] font-bold text-slate-500">{Math.round(progress)}% Complete</span>
        </div>
      )}
    </div>
  );
}

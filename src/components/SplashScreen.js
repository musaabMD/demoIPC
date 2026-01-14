'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-pulse"></div>
            
            {/* Progress Ring */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={339.292}
                strokeDashoffset={339.292 * (1 - progress / 100)}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Public Health Dashboard
        </h1>
        <p className="text-blue-300 text-lg mb-8">Surveillance System</p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-slate-400">Loading</span>
            <span className="text-blue-400 font-mono">{progress}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-slate-500 text-sm animate-pulse">
          {progress < 30 && 'Initializing system...'}
          {progress >= 30 && progress < 60 && 'Loading patient data...'}
          {progress >= 60 && progress < 90 && 'Preparing dashboard...'}
          {progress >= 90 && 'Almost ready...'}
        </div>

        {/* Ministry Logo/Text */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-slate-600 text-xs">Ministry of Health</p>
          <p className="text-slate-700 text-xs">Madina Region</p>
        </div>
      </div>
    </div>
  );
}

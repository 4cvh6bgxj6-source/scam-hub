import React from 'react';
import { SAFETY_TIPS, TRANSLATIONS } from '../constants';
import { AlertOctagon, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface SafetyTipsProps {
  language: Language;
}

const SafetyTips: React.FC<SafetyTipsProps> = ({ language }) => {
  const tips = SAFETY_TIPS[language];
  const t = TRANSLATIONS[language].safety;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-20">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <AlertOctagon className="w-8 h-8 text-red-500" />
        <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div key={tip.id} className="glass-panel p-6 rounded-xl hover:bg-slate-800/80 transition-all border border-slate-700/50 hover:border-slate-500">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              {tip.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {tip.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.middlemanTitle}</h3>
            <p className="text-slate-400">{t.middlemanDesc}</p>
          </div>
          <a 
            href="https://discord.gg/jY6cAMuNzm"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg"
          >
            {t.joinDiscord}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5865F2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default SafetyTips;
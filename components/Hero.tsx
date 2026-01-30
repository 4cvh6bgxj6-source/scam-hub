import React from 'react';
import { ShieldCheck, AlertTriangle, FileVideo, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  onOpenReport: () => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onOpenReport, language }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <div className="w-full pt-32 pb-16 px-6 flex flex-col items-center justify-center text-center">
      
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/30 border border-red-500/50 text-sm text-red-400 font-bold mb-8 animate-fade-in-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        {t.alert}
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
        {t.titleStart} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-gradient-x">{t.titleScammed}</span>
      </h1>
      
      <p className="text-slate-300 text-xl max-w-2xl mb-12 font-medium leading-relaxed">
        {language === 'en' ? (
           <>Don't let them get away with your <span className="text-purple-400 font-bold">Brainrots</span> or <span className="text-purple-400 font-bold">Items</span>.<br/>Submit a ticket directly to our staff with video proof.</>
        ) : (
           <>Non fargliela passare liscia con il tuo <span className="text-purple-400 font-bold">Brainrots</span> o i tuoi <span className="text-purple-400 font-bold">Item</span>.<br/>Invia un ticket direttamente al nostro staff con video prova.</>
        )}
      </p>

      {/* Main Giant Button */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <button 
          onClick={onOpenReport}
          className="group relative w-full md:w-auto min-w-[300px] bg-white text-black hover:bg-slate-200 transition-all px-8 py-6 rounded-2xl font-black text-2xl uppercase tracking-widest shadow-[0_0_60px_rgba(255,255,255,0.3)] flex items-center justify-center gap-4 hover:-translate-y-1"
        >
          <AlertTriangle className="w-8 h-8 text-red-600 fill-red-100" />
          {t.openTicket}
          <ChevronRight className="w-8 h-8 opacity-50 group-hover:translate-x-2 transition-transform" />
        </button>

        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
          {t.avgResponse} <span className="text-green-400">{t.time}</span>
        </p>

        {/* Real functional info instead of fake stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center border-l-4 border-l-purple-500 text-center">
            <div className="bg-purple-500/10 p-4 rounded-full mb-4">
              <FileVideo className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.stats.record.title}</h3>
            <p className="text-slate-400 text-sm">{t.stats.record.desc}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center border-l-4 border-l-blue-500 text-center">
            <div className="bg-blue-500/10 p-4 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.stats.review.title}</h3>
            <p className="text-slate-400 text-sm">{t.stats.review.desc}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center border-l-4 border-l-green-500 text-center">
            <div className="bg-green-500/10 p-4 rounded-full mb-4">
              <div className="w-8 h-8 flex items-center justify-center font-black text-green-400 text-xl">ID</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.stats.ban.title}</h3>
            <p className="text-slate-400 text-sm">{t.stats.ban.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
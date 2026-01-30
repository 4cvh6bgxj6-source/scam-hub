
import React from 'react';
import { ShieldAlert, BarChart3, Globe, Skull } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  onOpenReport: () => void;
  onGoHome: () => void;
  onGoBlacklist: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenReport, onGoHome, onGoBlacklist, language, setLanguage }) => {
  const t = TRANSLATIONS[language].nav;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return (
    <nav className="w-full h-16 md:h-20 border-b border-slate-700 bg-slate-900/90 backdrop-blur-xl fixed top-0 left-0 z-50 flex items-center justify-between px-4 md:px-6 shadow-2xl shadow-black/50 transition-all">
      <div 
        className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-700 to-indigo-700 rounded-xl border border-slate-500 flex items-center justify-center shadow-lg shrink-0">
          <BarChart3 className="text-white w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-black italic tracking-tighter text-white uppercase leading-tight">
            Brainrot<span className="text-purple-400">Hub</span>
          </h1>
          <span className="text-[9px] md:text-[10px] text-slate-400 tracking-widest font-bold uppercase hidden xs:block">{t.subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1 md:gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1.5 md:px-3 md:py-2 rounded-lg transition-colors border border-slate-600 font-bold text-xs md:text-sm"
        >
          <Globe className="w-3 h-3 md:w-4 md:h-4" />
          <span>{language === 'en' ? 'EN' : 'IT'}</span>
        </button>

        {/* Blacklist Button - Hidden on mobile, accessible via scroll */}
        <button 
          onClick={onGoBlacklist}
          className="hidden md:flex items-center gap-2 bg-black hover:bg-slate-900 text-slate-200 px-4 py-2 rounded-lg transition-colors border border-red-900/50 hover:border-red-600 font-bold text-sm uppercase"
        >
          <Skull className="w-4 h-4 text-red-500" />
          <span>{t.blacklistBtn}</span>
        </button>

        {/* Report Button */}
        <button 
          onClick={onOpenReport}
          className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white px-3 py-2 md:px-8 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse hover:animate-none border border-red-400 flex items-center gap-2 text-xs md:text-base"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 fill-red-800" />
          <span className="hidden sm:inline">{t.reportBtn}</span>
          <span className="sm:hidden">REPORT</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

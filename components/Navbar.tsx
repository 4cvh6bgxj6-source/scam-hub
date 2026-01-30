
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
    <nav className="w-full h-20 border-b border-slate-700 bg-slate-900/90 backdrop-blur-xl fixed top-0 left-0 z-50 flex items-center justify-between px-6 shadow-2xl shadow-black/50">
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-indigo-700 rounded-xl border border-slate-500 flex items-center justify-center shadow-lg">
          <BarChart3 className="text-white w-7 h-7" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase">
            Brainrot<span className="text-purple-400">Hub</span>
          </h1>
          <span className="text-[10px] text-slate-400 tracking-widest font-bold uppercase">{t.subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-600 font-bold text-sm"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'en' ? 'EN' : 'IT'}</span>
        </button>

        {/* Blacklist Button */}
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
          className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white px-4 md:px-8 py-3 rounded-xl font-black uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse hover:animate-none border border-red-400 flex items-center gap-2 text-sm md:text-base"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 fill-red-800" />
          <span className="hidden md:inline">{t.reportBtn}</span>
          <span className="md:hidden">REPORT</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

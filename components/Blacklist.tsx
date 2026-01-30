
import React from 'react';
import { Skull, AlertTriangle, ShieldAlert } from 'lucide-react';
import { TRANSLATIONS, MOCK_BLACKLIST } from '../constants';
import { Language } from '../types';

interface BlacklistProps {
  language: Language;
  onReportScripter: () => void;
}

const Blacklist: React.FC<BlacklistProps> = ({ language, onReportScripter }) => {
  const t = TRANSLATIONS[language].blacklist;

  return (
    <div className="w-full py-12 md:py-16 px-4 md:px-6 max-w-6xl mx-auto">
      
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-black border-2 border-red-600 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
          <Skull className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase mb-3 md:mb-4">
          {t.title}
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-lg px-2">
          {t.subtitle}
        </p>
      </div>

      <div className="flex justify-center mb-8 md:mb-12">
        <button 
          onClick={onReportScripter}
          className="bg-red-950 hover:bg-red-900 border border-red-600 text-red-100 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-red-900/30"
        >
          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
          {t.reportScripter}
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-red-900/50 min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-red-950/50 text-red-200 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">{t.table.user}</th>
                <th className="px-4 py-3 md:px-6 md:py-4">{t.table.discord}</th>
                <th className="px-4 py-3 md:px-6 md:py-4">{t.table.reason}</th>
                <th className="px-4 py-3 md:px-6 md:py-4">{t.table.date}</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-right">{t.table.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-900/20">
              {MOCK_BLACKLIST.length > 0 ? (
                MOCK_BLACKLIST.map((entry, index) => (
                  <tr key={index} className="hover:bg-red-900/10 transition-colors">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-slate-800 rounded-full flex items-center justify-center text-[10px] md:text-xs shrink-0">
                        {entry.roblox.substring(0, 1)}
                      </div>
                      {entry.roblox}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-slate-400 font-mono text-xs md:text-sm">{entry.discord}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-red-300 text-xs md:text-sm">{entry.reason}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-slate-500 text-xs md:text-sm">{entry.date}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-red-950 text-red-500 border border-red-800 whitespace-nowrap">
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500 italic text-sm md:text-base">
                    {language === 'it' ? 'Nessun utente bannato attualmente visibile.' : 'No active bans currently visible.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blacklist;

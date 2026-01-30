
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SafetyTips from './components/SafetyTips';
import ReportModal from './components/ReportModal';
import Blacklist from './components/Blacklist';
import { ViewState, Language } from './types';
import { CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<Language>('it'); // Default to Italian as requested
  
  // Track if the modal is for a regular report or a scripter report
  const [isScripterModal, setIsScripterModal] = useState(false);

  const t = TRANSLATIONS[language];

  const handleOpenReport = () => {
    setIsScripterModal(false);
    setViewState(ViewState.REPORT);
  };

  const handleOpenScripterReport = () => {
    setIsScripterModal(true);
    setViewState(ViewState.REPORT);
  }

  const handleCloseReport = () => {
    const previousState = isScripterModal ? ViewState.HOME : ViewState.HOME;
    setViewState(previousState);
  };

  const handleSuccess = () => {
    const returnState = ViewState.HOME;
    setViewState(ViewState.SUCCESS);
    // Automatically reset after 4 seconds
    setTimeout(() => {
      setViewState(returnState);
    }, 4000);
  };

  // Generate fire particles once to avoid re-render flickering
  const fireParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 4 + 3, // 3-7s duration
      delay: Math.random() * 5, // random start time
      drift: (Math.random() - 0.5) * 150, // drift left or right
      size: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a0505] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] text-white selection:bg-orange-500/30 overflow-x-hidden relative">
      
      {/* Background Ambience - Intense Fire Theme */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Deep background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-orange-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-900/30 rounded-full blur-[100px] mix-blend-screen"></div>
        
        {/* Fire Particles Layer */}
        {fireParticles.map((p) => (
          <div 
            key={p.id}
            className="fire-particle"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `-${p.delay}s`,
              transform: `scale(${p.size})`,
              '--drift': p.drift
            } as React.CSSProperties}
          />
        ))}

        {/* Bottom Fire Glow Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-red-600/20 via-orange-600/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-red-900/80 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar 
          onOpenReport={handleOpenReport} 
          onGoHome={() => setViewState(ViewState.HOME)} 
          onGoBlacklist={() => setViewState(ViewState.BLACKLIST)}
          language={language}
          setLanguage={setLanguage}
        />
        
        <main className="container mx-auto">
          {viewState === ViewState.HOME && (
            <>
              {/* Passed onOpenReport to Hero so the big button works */}
              <Hero onOpenReport={handleOpenReport} language={language} />
              <Blacklist language={language} onReportScripter={handleOpenScripterReport} />
              <SafetyTips language={language} />
            </>
          )}

          {viewState === ViewState.BLACKLIST && (
            <Blacklist language={language} onReportScripter={handleOpenScripterReport} />
          )}
        </main>
        
        <footer className="w-full py-12 text-center text-slate-600 border-t border-red-900/30 mt-12 bg-slate-900/80 backdrop-blur-sm relative z-20">
          <p className="font-bold text-slate-500">{t.footer.copy}</p>
          <p className="mt-2 text-xs max-w-md mx-auto">{t.footer.disclaimer}</p>
        </footer>
      </div>

      {/* Report Modal */}
      {viewState === ViewState.REPORT && (
        <ReportModal 
          onClose={handleCloseReport} 
          onSuccess={handleSuccess} 
          language={language} 
          isScripterReport={isScripterModal}
        />
      )}

      {/* Success Modal */}
      {viewState === ViewState.SUCCESS && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 border border-green-500/50 rounded-2xl p-10 max-w-sm w-full text-center flex flex-col items-center shadow-[0_0_100px_rgba(34,197,94,0.3)]">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/20 animate-[pulse_2s_infinite]">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase italic">{t.success.title}</h2>
            <p className="text-slate-400 mb-8 font-medium">
              {t.success.desc}
            </p>
            <button 
              onClick={() => setViewState(ViewState.HOME)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all border border-slate-700 hover:border-slate-500"
            >
              {t.success.close}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

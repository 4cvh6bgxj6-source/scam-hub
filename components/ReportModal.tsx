import React, { useState, useRef } from 'react';
import { X, Upload, AlertTriangle, FileVideo, ShieldCheck, Loader2, Trash2, MessageSquare } from 'lucide-react';
import { sendScamReport } from '../services/discordService';
import { ScamReport, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ReportModalProps {
  onClose: () => void;
  onSuccess: () => void;
  language: Language;
}

const MAX_FILE_SIZE_MB = 25; // Discord limit

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onSuccess, language }) => {
  const t = TRANSLATIONS[language].modal;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ScamReport>({
    reporterName: '',
    discordUsername: '',
    scammerName: '',
    scamDate: new Date().toISOString().split('T')[0],
    description: '',
    proofFile: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`File is too large (${fileSizeMB.toFixed(1)}MB). Max size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      // Check file type (Strictly Video)
      if (!file.type.startsWith('video/')) {
        setError(t.errorType);
        return;
      }

      setFormData({
        ...formData,
        proofFile: file
      });
      setError(null);
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, proofFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.scammerName || !formData.description || !formData.discordUsername) {
      setError(t.errorRequired);
      setLoading(false);
      return;
    }

    // Must have a file
    if (!formData.proofFile) {
        setError(t.errorFile);
        setLoading(false);
        return;
    }

    try {
      const success = await sendScamReport(formData);
      if (success) {
        onSuccess();
      } else {
        setError(t.errorFail);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="text-red-500 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.title}</h2>
              <p className="text-xs text-slate-400">{t.team}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-200 text-sm flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form id="scam-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Reporter Info Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t.reporter}</label>
                <input
                  type="text"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t.date}</label>
                <input
                  type="date"
                  name="scamDate"
                  value={formData.scamDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Discord Username (Required) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-indigo-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                   <MessageSquare className="w-3.5 h-3.5" /> {t.discordLabel} <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder="es. user#1234"
                required
                className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
              <p className="text-xs text-indigo-300/70 italic">{t.discordHint}</p>
            </div>

            {/* Scammer Info */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-400 flex items-center gap-1">
                {t.scammer} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="scammerName"
                value={formData.scammerName}
                onChange={handleChange}
                placeholder={t.scammerPlaceholder}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t.desc} <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder={t.descPlaceholder}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 resize-none"
              />
            </div>

            {/* Video Proof Section - File Only */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileVideo className="w-4 h-4 text-purple-400" />
                  {t.proof} <span className="text-red-500">*</span>
                </span>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wide">{t.required}</span>
              </label>
              
              <div className="flex flex-col gap-3">
                {/* Upload Area */}
                {!formData.proofFile ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer bg-slate-950/50 border border-dashed border-slate-700 hover:border-purple-500 hover:bg-slate-900 transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Upload className="w-7 h-7 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-base font-bold text-slate-200">{t.uploadTitle}</p>
                    <p className="text-xs text-slate-500 mt-2">{t.uploadDesc}</p>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="video/*" 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-500/20">
                        <FileVideo className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white truncate">{formData.proofFile.name}</span>
                        <span className="text-xs text-slate-400">{(formData.proofFile.size / (1024 * 1024)).toFixed(2)} MB • {t.ready}</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={removeFile}
                      className="p-3 hover:bg-red-500/20 rounded-xl text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl">
          <button
            type="submit"
            form="scam-form"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                {t.uploading}
              </>
            ) : (
              <>
                <ShieldCheck className="w-6 h-6" />
                {t.submit}
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportModal;
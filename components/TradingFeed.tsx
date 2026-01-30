import React from 'react';
import { RECENT_TRADES } from '../constants';
import { RefreshCw } from 'lucide-react';

const TradingFeed: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Live Market Feed</h2>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 bg-slate-800/50 p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div>User</div>
          <div>Item</div>
          <div>Price</div>
          <div className="text-right">Status</div>
        </div>
        
        <div className="divide-y divide-slate-700/50">
          {RECENT_TRADES.map((trade) => (
            <div key={trade.id} className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                  {trade.user.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-medium text-slate-200 truncate">{trade.user}</span>
              </div>
              <div className="text-purple-300 font-medium truncate">{trade.item}</div>
              <div className="text-emerald-400 font-mono">{trade.price}</div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  trade.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                  trade.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {trade.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-700/50 flex justify-center">
          <button className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <RefreshCw className="w-4 h-4" /> Load More Trades
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingFeed;
import React from 'react';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const TickerTape = () => {
  const { marketData } = useMarket();

  // Duplicate for smooth continuous marquee loop
  const displayItems = marketData.length > 0 ? [...marketData, ...marketData, ...marketData] : [];

  const getAssetBadge = (assetClass) => {
    switch (assetClass) {
      case 'crypto':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'forex':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'commodity':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'us_market':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden py-2 text-xs font-mono select-none relative z-50 shadow-sm">
      <div className="flex items-center">
        
        {/* Fixed Light Mode Live Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-4 py-1 bg-emerald-50 border-r border-slate-200 text-emerald-700 font-bold flex-shrink-0 z-10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="tracking-widest uppercase text-[10px] font-black text-emerald-800">LIVE TICKS</span>
        </div>

        {/* Rolling Marquee Container */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {displayItems.map((item, idx) => {
              const isPos = item.change >= 0;
              const badgeClass = getAssetBadge(item.asset_class);
              return (
                <div 
                  key={`${item.symbol}-${idx}`} 
                  className="inline-flex items-center space-x-2.5 px-6 border-r border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group py-0.5"
                >
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border ${badgeClass}`}>
                    {item.asset_class}
                  </span>
                  <span className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{item.symbol}</span>
                  <span className="text-slate-900 font-mono font-bold">₹{item.price.toLocaleString()}</span>
                  <span className={`inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                    isPos 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {isPos ? <TrendingUp className="w-3 h-3 mr-0.5 text-emerald-600" /> : <TrendingDown className="w-3 h-3 mr-0.5 text-rose-600" />}
                    {isPos ? '+' : ''}{item.percent_change}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TickerTape;

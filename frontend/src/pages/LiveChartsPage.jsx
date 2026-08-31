import React, { useState } from 'react';
import TradingViewChart from '../components/TradingViewChart';
import { BarChart2, Maximize2, Layers, Search, Clock, Compass } from 'lucide-react';

const LiveChartsPage = () => {
  const [symbol, setSymbol] = useState('BSE:SENSEX');
  const [interval, setInterval] = useState('D');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const presetSymbols = [
    { label: 'Sensex', value: 'BSE:SENSEX' },
    { label: 'Nifty 50', value: 'NSE:NIFTY' },
    { label: 'Bank Nifty', value: 'NSE:BANKNIFTY' },
    { label: 'Reliance', value: 'NSE:RELIANCE' },
    { label: 'Bitcoin', value: 'BINANCE:BTCUSDT' },
    { label: 'Ethereum', value: 'BINANCE:ETHUSDT' },
    { label: 'Gold Spot', value: 'TVC:GOLD' },
    { label: 'USD / INR', value: 'FX_IDC:USDINR' },
  ];

  const intervals = [
    { label: '1m', value: '1' },
    { label: '5m', value: '5' },
    { label: '15m', value: '15' },
    { label: '1H', value: '60' },
    { label: '4H', value: '240' },
    { label: '1D', value: 'D' },
    { label: '1W', value: 'W' },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0B0F19] p-4 max-w-none' : ''}`}>
      
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-darkBorder">
        
        {/* Symbol Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center mr-2">
            <BarChart2 className="w-4 h-4 text-emerald-400 mr-1" /> Symbol:
          </span>
          {presetSymbols.map((item) => (
            <button
              key={item.value}
              onClick={() => setSymbol(item.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                symbol === item.value
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-darkCard text-gray-300 border border-darkBorder hover:bg-darkHover'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Timeframe Selector & Fullscreen */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-1 bg-darkCard p-1 rounded-xl border border-darkBorder">
            {intervals.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setInterval(tf.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  interval === tf.value
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-darkCard text-gray-300 hover:text-white border border-darkBorder hover:border-emerald-500/40 transition-all"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Embedded Workstation Widget */}
      <div className="rounded-2xl border border-darkBorder overflow-hidden shadow-2xl">
        <TradingViewChart symbol={symbol} interval={interval} height={isFullscreen ? "calc(100vh - 120px)" : "640px"} />
      </div>

    </div>
  );
};

export default LiveChartsPage;

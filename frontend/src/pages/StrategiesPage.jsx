import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, ShieldCheck, Target, Award, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';

const StrategiesPage = () => {
  const [strategies, setStrategies] = useState([]);
  const [activeStrat, setActiveStrat] = useState(null);

  useEffect(() => {
    axios.get('/api/strategies').then(res => {
      setStrategies(res.data);
      if (res.data.length > 0) setActiveStrat(res.data[0]);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-emerald-600" />
          Institutional SMC & Options Playbooks
        </h1>
        <p className="text-xs text-slate-600 mt-1">Rule-based trading frameworks for Order Blocks, Fair Value Gaps (FVG), and VWAP Momentum Scalps.</p>
      </div>

      {/* Grid: Strategy Selection Cards (4 Cols) + Detail View (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Strategy Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 perspective-1000">
          {strategies.map((strat) => {
            const isSelected = activeStrat?.id === strat.id;
            return (
              <div
                key={strat.id}
                onClick={() => setActiveStrat(strat)}
                className={`p-6 rounded-3xl cursor-pointer transition-all card-3d-tilt ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-600/30'
                    : 'glass-3d-card-light text-slate-900 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                    {strat.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'}`}>
                    {strat.timeframe}
                  </span>
                </div>

                <h3 className="text-lg font-black leading-snug mb-3">{strat.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/20">
                  <div>
                    <span className={`block text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>Win Rate</span>
                    <span className="font-bold text-sm">{strat.win_rate}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>Risk:Reward</span>
                    <span className="font-bold text-sm">{strat.risk_reward}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail & Live Chart View (8 Cols) */}
        {activeStrat && (
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-3d-card-light shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase">
                    {activeStrat.category} Playbook
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">{activeStrat.title}</h2>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono font-bold">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 block">Win Rate</span>
                    <span className="text-emerald-600 text-base">{activeStrat.win_rate}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 block">R : R Ratio</span>
                    <span className="text-indigo-600 text-base">{activeStrat.risk_reward}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">{activeStrat.description}</p>

              {/* Execution Rules List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Step-by-Step Execution Rules</h4>
                <div className="space-y-2">
                  {JSON.parse(activeStrat.rules_json || '[]').map((rule, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Interactive Chart Example */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-900 flex items-center">
                  <Zap className="w-4 h-4 mr-1 text-emerald-600" /> Interactive Execution Chart ({activeStrat.chart_example_symbol})
                </span>
                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-inner bg-slate-900 p-2">
                  <TradingViewChart symbol={activeStrat.chart_example_symbol} height="320px" theme="dark" />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default StrategiesPage;

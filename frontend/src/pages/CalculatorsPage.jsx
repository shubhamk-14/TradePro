import React, { useState } from 'react';
import { Calculator, ShieldCheck, Zap, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const CalculatorsPage = () => {
  const [activeCalc, setActiveCalc] = useState('position');

  // 1. Position Size State
  const [accountBalance, setAccountBalance] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entryPrice, setEntryPrice] = useState(2450);
  const [stopLossPrice, setStopLossPrice] = useState(2400);

  // 2. Risk/Reward State
  const [rrEntry, setRrEntry] = useState(100);
  const [rrSL, setRrSL] = useState(95);
  const [rrTarget, setRrTarget] = useState(115);

  // 3. SIP State
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipReturn, setSipReturn] = useState(14);
  const [sipYears, setSipYears] = useState(10);

  // 4. Brokerage & Tax State
  const [turnover, setTurnover] = useState(500000);

  // Math Calculations
  const riskAmount = accountBalance * (riskPercent / 100);
  const riskPerShare = Math.abs(entryPrice - stopLossPrice);
  const positionQty = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
  const positionValue = positionQty * entryPrice;

  // RR Calc
  const rrRisk = Math.abs(rrEntry - rrSL);
  const rrReward = Math.abs(rrTarget - rrEntry);
  const rrRatio = rrRisk > 0 ? (rrReward / rrRisk).toFixed(2) : 0;

  // SIP Calc
  const monthlyRate = (sipReturn / 100) / 12;
  const totalMonths = sipYears * 12;
  const sipTotalInvested = sipMonthly * totalMonths;
  const sipFutureVal = sipMonthly * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)) * (1 + monthlyRate);
  const sipWealthGain = sipFutureVal - sipTotalInvested;

  const estBrokerage = 40;
  const estSTT = turnover * 0.00025;
  const estTotalTaxes = estBrokerage + estSTT + (turnover * 0.00005);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 flex items-center">
          <Calculator className="w-8 h-8 mr-3 text-emerald-600" />
          Financial & Trading Calculators Suite
        </h1>
        <p className="text-xs text-slate-600 mt-1">Mathematical position sizing, risk-to-reward ratios, brokerage STT tax breakdown & SIP wealth projection.</p>
      </div>

      {/* Calculator Selection Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'position', label: 'Position Size' },
          { id: 'rr', label: 'Risk / Reward' },
          { id: 'brokerage', label: 'Brokerage & Taxes' },
          { id: 'sip', label: 'SIP Calculator' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCalc(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCalc === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. POSITION SIZE CALCULATOR */}
      {activeCalc === 'position' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs font-medium">
            <h3 className="text-base font-bold text-slate-900">Input Account Parameters</h3>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Account Balance (₹)</label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Risk per Trade (%)</label>
              <input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Entry Price (₹)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Stop Loss (₹)</label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs font-mono">
            <h3 className="text-base font-bold text-slate-900 font-sans">Calculated Risk Output</h3>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">Max Recommended Quantity</span>
              <span className="text-3xl font-black text-emerald-700">{positionQty} Shares / Contracts</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Max Capital Risk</span>
                <span className="text-xl font-bold text-rose-600">₹{riskAmount.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Position Capital</span>
                <span className="text-xl font-bold text-slate-900">₹{positionValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. RISK REWARD CALCULATOR */}
      {activeCalc === 'rr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Input Trade Setup Prices</h3>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Planned Entry Price (₹)</label>
              <input
                type="number"
                value={rrEntry}
                onChange={(e) => setRrEntry(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Stop Loss Price (₹)</label>
                <input
                  type="number"
                  value={rrSL}
                  onChange={(e) => setRrSL(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Take Profit Target (₹)</label>
                <input
                  type="number"
                  value={rrTarget}
                  onChange={(e) => setRrTarget(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs font-mono">
            <h3 className="text-base font-bold text-slate-900 font-sans">Risk to Reward Evaluation</h3>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Risk:Reward Ratio</span>
              <span className="text-3xl font-black text-emerald-700">1 : {rrRatio}</span>
              <span className="text-[10px] text-slate-600 block mt-1 font-semibold">
                {parseFloat(rrRatio) >= 2 ? '✓ High Probability Trade Setup' : '⚠️ Low R:R Setup (< 1:2 Target)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. SIP CALCULATOR */}
      {activeCalc === 'sip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Input SIP Investment Plan</h3>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Monthly Investment (₹)</label>
              <input
                type="number"
                value={sipMonthly}
                onChange={(e) => setSipMonthly(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Expected Annual Return (%)</label>
                <input
                  type="number"
                  value={sipReturn}
                  onChange={(e) => setSipReturn(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Investment Horizon (Years)</label>
                <input
                  type="number"
                  value={sipYears}
                  onChange={(e) => setSipYears(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-xs font-mono">
            <h3 className="text-base font-bold text-slate-900 font-sans">Projected Wealth Corpus</h3>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Future Corpus Value</span>
              <span className="text-3xl font-black text-emerald-700">₹{Math.round(sipFutureVal).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Invested</span>
                <span className="text-lg font-bold text-slate-900">₹{sipTotalInvested.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Estimated Wealth Gain</span>
                <span className="text-lg font-bold text-emerald-600">₹{Math.round(sipWealthGain).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CalculatorsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BarChart2, Plus, Trash2, TrendingUp, TrendingDown, BookOpen, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

const JournalPage = () => {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [tradeType, setTradeType] = useState('BUY');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [strategyUsed, setStrategyUsed] = useState('SMC Order Block');
  const [notes, setNotes] = useState('');
  const [mistakes, setMistakes] = useState('None');
  const [lessons, setLessons] = useState('');

  useEffect(() => {
    if (user) fetchJournals();
  }, [user]);

  const fetchJournals = async () => {
    try {
      const res = await axios.get('/api/journal');
      setJournals(res.data);
    } catch (err) {
      console.error('Failed to load journals:', err);
    }
  };

  const handleAddTrade = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to save journal entries.');

    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    const qty = parseFloat(quantity);
    const pnl = tradeType === 'BUY' ? (exit - entry) * qty : (entry - exit) * qty;

    try {
      await axios.post('/api/journal', {
        symbol: symbol.toUpperCase(),
        trade_type: tradeType,
        entry_price: entry,
        exit_price: exit,
        quantity: qty,
        strategy_used: strategyUsed,
        profit_loss: pnl,
        trade_notes: notes,
        mistakes: mistakes,
        lessons_learned: lessons
      });

      setSymbol('');
      setEntryPrice('');
      setExitPrice('');
      setQuantity('');
      setNotes('');
      setLessons('');
      fetchJournals();
    } catch (err) {
      console.error('Failed to add journal:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/journal/${id}`);
      setJournals(journals.filter(j => j.id !== id));
    } catch (err) {
      console.error('Failed to delete journal:', err);
    }
  };

  const totalPnL = journals.reduce((acc, curr) => acc + curr.profit_loss, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <BarChart2 className="w-8 h-8 mr-3 text-emerald-600" />
            Trader Logbook & Journal
          </h1>
          <p className="text-xs text-slate-600 mt-1">Record executions, track win rates, tag mistakes, and review lessons learned.</p>
        </div>

        {user && journals.length > 0 && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-right">
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Total Realized PnL</span>
            <span className={`text-2xl font-black font-mono ${totalPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Log Trade Entry Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-slate-900 flex items-center">
          <Plus className="w-4 h-4 mr-1.5 text-emerald-600" /> Log Executed Trade Entry
        </h3>
        <form onSubmit={handleAddTrade} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs font-medium">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Symbol</label>
            <input
              type="text"
              required
              placeholder="BANKNIFTY"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Trade Action</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="BUY">BUY (Long)</option>
              <option value="SELL">SELL (Short)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Entry Price (₹)</label>
            <input
              type="number"
              step="0.05"
              required
              placeholder="47800"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Exit Price (₹)</label>
            <input
              type="number"
              step="0.05"
              required
              placeholder="48250"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Quantity / Lot Size</label>
            <input
              type="number"
              required
              placeholder="30"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Strategy Used</label>
            <select
              value={strategyUsed}
              onChange={(e) => setStrategyUsed(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="SMC Order Block">SMC Order Block + FVG</option>
              <option value="Liquidity Sweep">Liquidity Sweep (BSL/SSL)</option>
              <option value="VWAP Delta">VWAP Delta Breakout</option>
              <option value="Option Scalping">Options Momentum Scalp</option>
              <option value="Supply Demand">Supply & Demand Zone</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-bold mb-1">Execution Notes & Rational</label>
            <input
              type="text"
              placeholder="Mitigated 15m order block after sweep..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-4 flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md hover:opacity-95 transition-all"
            >
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>

      {/* Journal Entry Logs Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-x-auto">
        {!user ? (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-800 font-bold">Sign in to save and analyze your trading journal history.</p>
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium text-xs">
            No trade executions logged yet. Use the form above to record your first trade!
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-mono border-b border-slate-200">
              <tr>
                <th className="p-4">Symbol / Type</th>
                <th className="p-4">Entry / Exit</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Strategy</th>
                <th className="p-4">PnL (₹)</th>
                <th className="p-4">Trade Notes</th>
                <th className="p-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {journals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-black text-slate-900 text-sm block">{item.symbol}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.trade_type === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.trade_type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-800">
                    ₹{item.entry_price} → ₹{item.exit_price}
                  </td>
                  <td className="p-4 font-mono text-slate-800 font-bold">{item.quantity}</td>
                  <td className="p-4 font-semibold text-slate-700">{item.strategy_used}</td>
                  <td className={`p-4 font-mono font-black text-sm ${item.profit_loss >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.profit_loss >= 0 ? '+' : ''}₹{item.profit_loss.toLocaleString()}
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs">{item.trade_notes}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default JournalPage;

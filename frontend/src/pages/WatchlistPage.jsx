import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Plus, Trash2, TrendingUp, TrendingDown, Search, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchlistPage = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [symbolInput, setSymbolInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [assetClassInput, setAssetClassInput] = useState('stock');

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get('/api/watchlist');
      setWatchlist(res.data);
    } catch (err) {
      console.error('Failed to load watchlist:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to add assets to your watchlist.');
    if (symbolInput && nameInput) {
      try {
        await axios.post('/api/watchlist', {
          symbol: symbolInput.toUpperCase(),
          name: nameInput,
          asset_class: assetClassInput
        });
        setSymbolInput('');
        setNameInput('');
        fetchWatchlist();
      } catch (err) {
        console.error('Error adding symbol:', err);
      }
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/watchlist/${id}`);
      setWatchlist(watchlist.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting symbol:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Bookmark className="w-8 h-8 mr-3 text-emerald-600" />
            Personal Stock & Crypto Watchlist
          </h1>
          <p className="text-xs text-slate-600 mt-1">Track key assets, receive real-time price alerts, and monitor daily change metrics.</p>
        </div>
      </div>

      {/* Add Symbol Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center">
          <Plus className="w-4 h-4 mr-1.5 text-emerald-600" /> Add New Asset to Watchlist
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Symbol (e.g. INFY, BTCUSDT)"
            value={symbolInput}
            onChange={(e) => setSymbolInput(e.target.value)}
            className="bg-slate-50 text-xs text-slate-900 font-semibold placeholder-slate-400 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
          <input
            type="text"
            required
            placeholder="Asset Name (e.g. Infosys Ltd)"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="bg-slate-50 text-xs text-slate-900 font-semibold placeholder-slate-400 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
          <select
            value={assetClassInput}
            onChange={(e) => setAssetClassInput(e.target.value)}
            className="bg-slate-50 text-xs text-slate-900 font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="stock">Equity / Stock</option>
            <option value="index">Market Index</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="forex">Forex Pair</option>
          </select>
          <button
            type="submit"
            className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all"
          >
            Add to Watchlist
          </button>
        </form>
      </div>

      {/* Watchlist Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-x-auto">
        {!user ? (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-700 font-bold">Sign in to view and customize your personal trading watchlist.</p>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium text-xs">
            Your watchlist is currently empty. Use the form above to track stocks & indices!
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-mono border-b border-slate-200">
              <tr>
                <th className="p-4">Symbol / Name</th>
                <th className="p-4">Asset Class</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {watchlist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-black text-slate-900 text-sm block">{item.symbol}</span>
                    <span className="text-xs text-slate-500">{item.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.asset_class}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Remove from Watchlist"
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

export default WatchlistPage;

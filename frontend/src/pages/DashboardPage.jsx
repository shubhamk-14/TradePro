import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import axios from 'axios';
import { 
  TrendingUp, PieChart as PieIcon, Bookmark, BarChart2, 
  Newspaper, Bell, ArrowRight, ShieldCheck, User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { marketData } = useMarket();
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [journals, setJournals] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const stylishMaleShubhamPhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80";

  useEffect(() => {
    if (user) {
      axios.get('/api/portfolio').then(res => setPortfolio(res.data)).catch(() => {});
      axios.get('/api/watchlist').then(res => setWatchlist(res.data)).catch(() => {});
      axios.get('/api/journal').then(res => setJournals(res.data)).catch(() => {});
    }
    axios.get('/api/blogs').then(res => setBlogs(res.data.slice(0, 2))).catch(() => {});
  }, [user]);

  const totalInvested = portfolio.reduce((acc, curr) => acc + (curr.buy_price * curr.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Profile Welcome Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={user?.profile_pic || stylishMaleShubhamPhoto}
            alt={user?.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Welcome Back, {user?.full_name || 'Trader'}!</h1>
            <p className="text-xs text-emerald-700 font-mono font-bold mt-1">Account Role: {user?.role?.toUpperCase() || 'USER'} • Live Session Active</p>
            <p className="text-xs text-slate-500 font-medium">Email: {user?.email}</p>
          </div>
        </div>

        <Link
          to="/charts"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-2"
        >
          <BarChart2 className="w-4 h-4" />
          <span>Launch Workstation</span>
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Portfolio Value</span>
          <span className="text-2xl font-black text-slate-900 block font-mono">₹{totalInvested.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> {portfolio.length} Assets Held
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Watchlist Assets</span>
          <span className="text-2xl font-black text-slate-900 block font-mono">{watchlist.length} Tickers</span>
          <span className="text-[11px] text-emerald-600 font-bold">Active Tracking</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Journal Entries</span>
          <span className="text-2xl font-black text-slate-900 block font-mono">{journals.length} Logged</span>
          <span className="text-[11px] text-emerald-600 font-bold">Win Rate Tracked</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Account Level</span>
          <span className="text-2xl font-black text-emerald-600 block">PRO PLAN</span>
          <span className="text-[11px] text-slate-500 font-medium">Full Terminal Access</span>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;

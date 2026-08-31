import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  TrendingUp, TrendingDown, ShieldCheck, Zap, BarChart2, BookOpen, 
  GraduationCap, Calculator, Award, ArrowRight, CheckCircle2, Star, Send, Play, Sparkles, Activity, Layers, Compass, Flame, Heart, Code, UserCheck, Shield
} from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';
import { useMarket } from '../context/MarketContext';

const HomePage = () => {
  const { marketData } = useMarket();
  const [blogs, setBlogs] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    axios.get('/api/blogs').then(res => setBlogs(res.data.slice(0, 3))).catch(() => {});
    axios.get('/api/strategies').then(res => setStrategies(res.data.slice(0, 3))).catch(() => {});
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSub) {
      setSubSuccess(true);
      setEmailSub('');
      setTimeout(() => setSubSuccess(false), 4000);
    }
  };

  const stylishMaleShubhamPhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="space-y-20 pb-20 bg-[#F8FAFC]">
      
      {/* 1. HERO BANNER */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC] border-b border-slate-200">
        
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[550px] h-[380px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="font-mono uppercase tracking-wider text-[11px] text-emerald-900">
                  Built by Shubham • Institutional SMC Platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Master Markets with <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">
                  Institutional Precision
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                TradePro (Tradivora) is an authentic market terminal engineered for serious option buyers, SMC scalpers, and swing traders. Powered by real-time TradingView charting and institutional order block tracking.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/charts"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Launch Live Workstation</span>
                </Link>
                
                <Link
                  to="/strategies"
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-800 font-bold text-xs border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center space-x-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Explore SMC Playbooks</span>
                </Link>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
                <div className="p-3 rounded-2xl glass-3d-card-light">
                  <span className="block text-2xl sm:text-3xl font-black font-mono text-emerald-600">99.9%</span>
                  <span className="text-slate-600 text-[11px] font-medium">Real-Time Tick Stream</span>
                </div>
                <div className="p-3 rounded-2xl glass-3d-card-light">
                  <span className="block text-2xl sm:text-3xl font-black font-mono text-teal-600">15+</span>
                  <span className="text-slate-600 text-[11px] font-medium">Workspaces</span>
                </div>
                <div className="p-3 rounded-2xl glass-3d-card-light">
                  <span className="block text-2xl sm:text-3xl font-black font-mono text-indigo-600">100%</span>
                  <span className="text-slate-600 text-[11px] font-medium">SMC Aligned</span>
                </div>
              </div>

            </div>

            {/* Right Light Workstation Container */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative bg-white border border-slate-200 rounded-3xl p-4 space-y-3 shadow-2xl">
                  
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold text-slate-800 ml-2 font-mono">BSE:SENSEX Workstation</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold flex items-center px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-ping"></span> LIVE
                    </span>
                  </div>

                  <TradingViewChart symbol="BSE:SENSEX" height="340px" theme="light" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE BENCHMARK MARKETS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Live Benchmark Indices</h2>
            <p className="text-xs text-slate-500 mt-1">Real-time quote streaming across Indian & Global benchmarks.</p>
          </div>
          <Link to="/markets" className="text-xs font-bold text-emerald-600 hover:underline flex items-center self-start sm:self-auto">
            Explore All Market Quotes <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {marketData.slice(0, 4).map((item) => {
            const isPos = item.change >= 0;
            return (
              <div key={item.symbol} className="p-5 rounded-2xl glass-3d-card-light group">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{item.symbol}</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">{item.name}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase ${isPos ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {item.market_status}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-mono font-black text-slate-900">₹{item.price.toLocaleString()}</span>
                  <span className={`text-xs font-mono font-black flex items-center ${isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isPos ? <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" /> : <TrendingDown className="w-3.5 h-3.5 mr-1 text-rose-600" />}
                    {isPos ? '+' : ''}{item.percent_change}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FOUNDER SHUBHAM SPOTLIGHT (STYLISH MALE PHOTO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl glass-3d-card-light border border-emerald-200 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Stylish Male Profile Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl p-1 bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 shadow-xl">
                  <img 
                    src={stylishMaleShubhamPhoto} 
                    alt="Founder Shubham" 
                    className="w-full h-full rounded-[22px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-md">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Founder & Lead Strategist</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase">
                Human Craftsmanship & Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                "Built by a trader, for traders — clean market tools and institutional order flow clarity."
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Hi, I'm <strong className="text-slate-900">Shubham</strong>, founder and architect of TradePro (Tradivora). I built this platform to provide a unified workstation combining real-time TradingView charts, automated risk calculators, trade logging journals, and institutional market structure education.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Verified Platform Architect</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Code className="w-4 h-4 text-teal-600" />
                  <span>FastAPI + React 18 Engine</span>
                </div>
                <Link to="/about" className="text-emerald-600 hover:underline font-bold ml-auto">
                  Read Shubham's Story →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED STRATEGIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold uppercase">
            Order Flow Framework
          </span>
          <h2 className="text-3xl font-black text-slate-900">Institutional Trading Strategies</h2>
          <p className="text-xs text-slate-500">
            Trade Order Blocks, Liquidity Sweeps, and Supply-Demand imbalances over lagging indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategies.map((strat) => (
            <div key={strat.id} className="p-7 rounded-3xl glass-3d-card-light flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest">{strat.category}</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1.5 mb-2 leading-snug">{strat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{strat.description}</p>
              </div>

              <Link to="/strategies" className="inline-flex items-center text-xs font-bold text-emerald-600 hover:underline">
                Read Strategy Playbook →
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;

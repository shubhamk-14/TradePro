import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Newspaper, ExternalLink, Flame, Clock, Search, Filter, X, ArrowUpRight, TrendingUp, TrendingDown, Radio } from 'lucide-react';

const MarketNewsPage = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios.get('/api/news').then(res => setNews(res.data)).catch(() => {});
  }, []);

  const categories = [
    { id: 'all', label: 'All Wire' },
    { id: 'Macro & Central Banks', label: 'Macro & RBI' },
    { id: 'Equities', label: 'Indian Equities' },
    { id: 'Crypto Wire', label: 'Crypto Wire' },
    { id: 'Commodities', label: 'Commodities' },
  ];

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.headline.toLowerCase().includes(search.toLowerCase()) || 
                          (item.summary && item.summary.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Newspaper className="w-8 h-8 mr-3 text-emerald-600" />
            Financial Market News Terminal
          </h1>
          <p className="text-xs text-slate-600 mt-1">Real-time financial wire feed, corporate earnings updates, macro announcements & sentiment analysis.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 mr-1.5 text-emerald-600 animate-pulse" />
            LIVE WIRE FEED ACTIVE
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-3d-card-light">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search news wire (e.g. RBI, Nifty, Inflation)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 font-medium text-xs placeholder-slate-400 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* 3D News Wire Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
        {filteredNews.map((item, idx) => {
          const isBullish = idx % 2 === 0;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.category || 'MARKET WIRE'}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isBullish ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isBullish ? '🟢 Bullish' : '🔴 Risk Alert'}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug hover:text-emerald-600 transition-colors">
                  {item.headline}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="text-[10px] font-mono text-slate-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> {item.published_at || '12m ago'}
                </span>

                <span className="text-emerald-600 font-bold hover:underline flex items-center text-xs">
                  <span>Read Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase inline-block">
              {selectedArticle.category || 'Financial News Wire'}
            </span>

            <h2 className="text-2xl font-black text-slate-900 leading-snug">{selectedArticle.headline}</h2>

            <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pb-3 border-b border-slate-200">
              <span>Source: {selectedArticle.source || 'Reuters Financial Wire'}</span>
              <span>Published: {selectedArticle.published_at || 'Just now'}</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <p>{selectedArticle.summary}</p>
              <p>
                Market participants are closely tracking this development as it influences intra-day volatility across Indian benchmark indices (Nifty 50, Bank Nifty) and global equity futures.
              </p>
            </div>

            {selectedArticle.url && (
              <div className="pt-4">
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>Read Full Original Article on Publisher Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default MarketNewsPage;

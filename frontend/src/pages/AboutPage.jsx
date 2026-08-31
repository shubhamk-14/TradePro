import React from 'react';
import { 
  User, Award, ShieldCheck, TrendingUp, BookOpen, Target, 
  Mail, Phone, MapPin, Globe, Linkedin, Twitter, Youtube, Send
} from 'lucide-react';

const AboutPage = () => {
  const stylishMaleShubhamPhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#F8FAFC]">
      
      {/* Profile & Intro Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Profile Photo Card */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-1000"></div>
            <img
              src={stylishMaleShubhamPhoto}
              alt="Shubham - Lead Analyst"
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl object-cover border-2 border-emerald-500 shadow-2xl"
            />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-4">Shubham</h2>
          <p className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">Founder & Head Trading Strategist</p>
          <span className="mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
            8+ Years Institutional Experience
          </span>
        </div>

        {/* Intro & Bio */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Empowering Retail Traders with <span className="text-emerald-600">Institutional Edge</span>
          </h1>

          <p className="text-slate-700 text-sm leading-relaxed">
            Welcome to TradePro (Tradivora). I am Shubham, an active index futures & options trader, market researcher, and Smart Money Concepts practitioner. Having spent over 8 years analyzing Indian benchmark indices (Nifty, Bank Nifty) and global financial assets, my goal is to strip away retail noise and teach real order-flow dynamics.
          </p>

          <p className="text-slate-600 text-xs leading-relaxed">
            TradePro was built to solve a critical gap in the trading community: providing a unified workstation combining real-time TradingView charts, automated risk calculators, trade logging journals, and institutional market structure education.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="block text-2xl font-black text-slate-900">8+</span>
              <span className="text-slate-500 font-medium">Years Active Trading</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-emerald-600">12,000+</span>
              <span className="text-slate-500 font-medium">Trades Executed</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-900">4.9/5</span>
              <span className="text-slate-500 font-medium">Course Rating</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-emerald-600">NISM</span>
              <span className="text-slate-500 font-medium">Certified Research</span>
            </div>
          </div>
        </div>

      </div>

      {/* Trading Journey Timeline */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 border-l-4 border-emerald-500 pl-3">My Trading Journey</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700">2018 - 2020</span>
            <h4 className="text-base font-bold text-slate-900">Indicator Overload & Early Mistakes</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Started with retail technical indicators (RSI, Stochastic, Moving Averages). Realized lagging indicators fail during sharp market turns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700">2020 - 2023</span>
            <h4 className="text-base font-bold text-slate-900">SMC & Order Block Pivot</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shifted focus to institutional liquidity sweeps, Fair Value Gaps (FVG), order blocks, and VWAP delta profile analysis. Win rate jumped significantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700">2023 - Present</span>
            <h4 className="text-base font-bold text-slate-900">Building TradePro Platform</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Launched TradePro (Tradivora) to provide clean market tools, risk calculators, and structured courses for thousands of aspiring traders.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Bio Info */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="text-lg font-bold text-slate-900">Contact Founder Directly</h4>
          <p className="text-xs text-slate-600">Have questions about SMC strategies or institutional trading courses?</p>
          
          <div className="space-y-2 text-xs font-semibold text-slate-800">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Email: shubham@tradivora.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Phone: +91 00000 00000</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Location: Financial District, Mumbai / Delhi, India</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-3 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
          <h4 className="text-base font-bold text-slate-900">Shubham's Trading Philosophy</h4>
          <p className="text-xs text-slate-700 italic leading-relaxed">
            "Trading is not about predicting the future. It is about identifying high-probability liquidity pools and managing risk with disciplined position sizing."
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;

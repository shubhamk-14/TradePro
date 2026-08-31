import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Mail, Phone, MapPin, Heart, Zap, Award, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-200 border-t border-slate-800 pt-14 pb-8 text-xs font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-[2px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-sans">
                Tradi<span className="text-emerald-400">vora</span>
              </span>
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              Institutional order flow trading station & market analysis platform. Engineered for option buyers, SMC scalpers, and active swing investors.
            </p>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Authored by Founder Shubham</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase font-mono tracking-wider text-emerald-400">Trading Workstation</h4>
            <ul className="space-y-2.5 text-slate-300 font-semibold">
              <li>
                <Link to="/charts" className="hover:text-emerald-400 transition-colors flex items-center">
                  <span>TradingView Live Workstation</span>
                  <ArrowUpRight className="w-3 h-3 ml-1 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/option-chain" className="hover:text-emerald-400 transition-colors flex items-center">
                  <span>Nifty & BankNifty Option Chain</span>
                </Link>
              </li>
              <li>
                <Link to="/markets" className="hover:text-emerald-400 transition-colors flex items-center">
                  <span>Live Market Heatmap & Quotes</span>
                </Link>
              </li>
              <li>
                <Link to="/strategies" className="hover:text-emerald-400 transition-colors flex items-center">
                  <span>SMC Order Block Framework</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytics & Tools */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase font-mono tracking-wider text-emerald-400">Trader Tools & Logbook</h4>
            <ul className="space-y-2.5 text-slate-300 font-semibold">
              <li><Link to="/journal" className="hover:text-emerald-400 transition-colors">Trader Logbook & Win Rate Journal</Link></li>
              <li><Link to="/calculators" className="hover:text-emerald-400 transition-colors">Position Size & Risk Math Suite</Link></li>
              <li><Link to="/watchlist" className="hover:text-emerald-400 transition-colors">Personal Stock & Crypto Watchlist</Link></li>
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Structured SMC Masterclasses</Link></li>
            </ul>
          </div>

          {/* Contact & Desk Support */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase font-mono tracking-wider text-emerald-400">Direct Support Desk</h4>
            <ul className="space-y-3 text-slate-300 font-semibold">
              <li className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:shubham@tradivora.com" className="hover:text-emerald-400 transition-colors">shubham@tradivora.com</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">+91 00000 00000</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Financial District, Mumbai / Delhi NCR, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} Tradivora. Handcrafted with passion by Founder Shubham.</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-emerald-400 transition-colors">About Shubham</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

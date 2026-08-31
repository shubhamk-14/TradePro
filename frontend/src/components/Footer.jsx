import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldAlert, Mail, MapPin, Phone, Github, Twitter, Linkedin, Youtube, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#070A10] border-t border-darkBorder text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white font-sans">
                Trade<span className="text-emerald-400">Pro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              TradePro (Tradivora) is an advanced financial market intelligence platform designed for intraday, swing, crypto, and options traders. Master Smart Money Concepts, analyze real-time charts, and calculate position risk seamlessly.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-darkCard hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 border border-darkBorder transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-darkCard hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 border border-darkBorder transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-darkCard hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 border border-darkBorder transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-darkCard hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 border border-darkBorder transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Market & Tools</h4>
            <ul className="space-y-2.5">
              <li><Link to="/markets" className="hover:text-emerald-400 transition-colors">Live Indices & Quotes</Link></li>
              <li><Link to="/charts" className="hover:text-emerald-400 transition-colors">TradingView Live Workstation</Link></li>
              <li><Link to="/calculators" className="hover:text-emerald-400 transition-colors">Position Size & Risk Calculators</Link></li>
              <li><Link to="/journal" className="hover:text-emerald-400 transition-colors">Trading Journal & Logbook</Link></li>
              <li><Link to="/portfolio" className="hover:text-emerald-400 transition-colors">Portfolio & PnL Analytics</Link></li>
              <li><Link to="/calendar" className="hover:text-emerald-400 transition-colors">RBI & Fed Economic Calendar</Link></li>
            </ul>
          </div>

          {/* Learn & Resources */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Education & Hub</h4>
            <ul className="space-y-2.5">
              <li><Link to="/strategies" className="hover:text-emerald-400 transition-colors">Smart Money Concepts (SMC)</Link></li>
              <li><Link to="/strategies" className="hover:text-emerald-400 transition-colors">ICT Order Blocks & FVG</Link></li>
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Free Trading Courses</Link></li>
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Options Masterclass</Link></li>
              <li><Link to="/news" className="hover:text-emerald-400 transition-colors">Financial Market News</Link></li>
              <li><Link to="/community" className="hover:text-emerald-400 transition-colors">Trader Community Forum</Link></li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Contact & Bio</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Financial District, BKC, Mumbai / Global Online</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support@tradivora.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 00000 00000</span>
              </li>
              <li>
                <Link to="/about" className="inline-block mt-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-medium">
                  Meet Founder & Bio →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="pt-6 border-t border-darkBorder/60 bg-darkCard/30 p-4 rounded-xl mb-8 flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <strong className="text-gray-200">Risk Warning & Financial Disclaimer:</strong> Trading stocks, futures, options, crypto, and forex carries high financial risk and is not suitable for every investor. Leverage can work against you as well as for you. Information provided on TradePro (Tradivora) is strictly for educational and analytical purposes and does not constitute SEBI/SEC registered investment advice.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} TradePro (Tradivora) Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">SEBI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

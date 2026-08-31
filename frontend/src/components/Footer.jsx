import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Mail, Phone, MapPin, Heart, Zap, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-[2px]">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                </div>
              </div>
              <span className="text-xl font-black text-slate-900 font-sans">
                Tradi<span className="text-emerald-600">vora</span>
              </span>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed">
              Institutional order flow trading station & market analysis platform. Built for option buyers, SMC traders, and active swing investors.
            </p>

            <div className="pt-1 flex items-center space-x-1 text-[11px] text-emerald-700 font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authored by Founder Shubham</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase font-mono tracking-wider">Trading Workstation</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li><Link to="/charts" className="hover:text-emerald-600 transition-colors">TradingView Live Charts</Link></li>
              <li><Link to="/option-chain" className="hover:text-emerald-600 transition-colors">Nifty & BankNifty Option Chain</Link></li>
              <li><Link to="/markets" className="hover:text-emerald-600 transition-colors">Live Market Heatmap</Link></li>
              <li><Link to="/strategies" className="hover:text-emerald-600 transition-colors">SMC Order Block Framework</Link></li>
            </ul>
          </div>

          {/* Analytics & Tools */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase font-mono tracking-wider">Trader Tools & Logbook</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li><Link to="/journal" className="hover:text-emerald-600 transition-colors">Trader Logbook & Journal</Link></li>
              <li><Link to="/calculators" className="hover:text-emerald-600 transition-colors">Position Size & Risk Calculators</Link></li>
              <li><Link to="/watchlist" className="hover:text-emerald-600 transition-colors">Personal Asset Watchlist</Link></li>
              <li><Link to="/courses" className="hover:text-emerald-600 transition-colors">Structured Masterclasses</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase font-mono tracking-wider">Direct Desk Support</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <a href="mailto:shubham@tradivora.com" className="hover:underline">shubham@tradivora.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 00000 00000</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Financial District, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Tradivora. Handcrafted with passion by Founder Shubham.</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-emerald-600">About Founder</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-600">Support Desk</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

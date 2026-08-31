import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  TrendingUp, BarChart2, Newspaper, BookOpen, GraduationCap, 
  Bookmark, PieChart, Calculator, Calendar, Users, Mail, User, 
  Search, Bell, Shield, LogOut, Menu, X, Home, Sparkles, Zap, Heart, ChevronDown, Layers, Languages, LogIn
} from 'lucide-react';
import AuthModal from './AuthModal';
import NotificationsDrawer from './NotificationsDrawer';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('markets'), path: '/markets', icon: TrendingUp },
    { name: t('charts'), path: '/charts', icon: BarChart2 },
    { name: t('optionChain'), path: '/option-chain', icon: Layers },
    { name: t('strategies'), path: '/strategies', icon: BookOpen },
  ];

  const secondaryNavLinks = [
    { name: t('news'), path: '/news', icon: Newspaper, desc: 'Real-time market wire & analysis' },
    { name: t('courses'), path: '/courses', icon: GraduationCap, desc: 'Master SMC & options strategies' },
    { name: t('watchlist'), path: '/watchlist', icon: Bookmark, desc: 'Track your favorite tickers' },
    { name: t('portfolio'), path: '/portfolio', icon: PieChart, desc: 'Monitor holdings & returns' },
    { name: t('journal'), path: '/journal', icon: BarChart2, desc: 'Log trades & win rates' },
    { name: t('calculators'), path: '/calculators', icon: Calculator, desc: 'Position size & risk math' },
    { name: t('calendar'), path: '/calendar', icon: Calendar, desc: 'Economic events & alerts' },
    { name: t('community'), path: '/community', icon: Users, desc: 'Trader discussions & ideas' },
    { name: t('about'), path: '/about', icon: User, desc: 'Shubham\'s platform mission' },
    { name: t('contact'), path: '/contact', icon: Mail, desc: 'Get support & feedback' },
  ];

  const isActive = (path) => location.pathname === path;
  const isSecondaryActive = secondaryNavLinks.some(link => isActive(link.path));

  const stylishMalePhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm relative">
        
        {/* Top Accent Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Founder Tag */}
            <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 p-[2px] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:rotate-12 transition-transform duration-300 fill-emerald-600/20" />
                </div>
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 font-sans flex items-center">
                  Tradi<span className="text-emerald-600">vora</span>
                </span>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-emerald-700 font-mono font-bold flex items-center">
                  <span>{t('handcraftedBy')}</span>
                  <Heart className="w-2.5 h-2.5 ml-1 text-rose-500 fill-rose-500 inline" />
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-sans relative z-50">
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      active 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Admin Link Button (If Logged In as Admin) */}
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive('/admin')
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                      : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Desk</span>
                </Link>
              )}

              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSecondaryActive || isMoreOpen 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${isSecondaryActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>More Tools</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-emerald-600' : 'text-slate-500'}`} />
                </button>

                {isMoreOpen && (
                  <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-500">Trading Tools & Resources</span>
                    </div>
                    <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
                      {secondaryNavLinks.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMoreOpen(false)}
                            className={`flex items-start space-x-3 p-2.5 rounded-xl transition-all ${
                              active ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg text-emerald-600 mt-0.5 ${active ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-slate-900">{item.name}</span>
                              <span className="block text-[11px] text-slate-500 font-normal">{item.desc}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0 z-50">
              

              {/* Search */}
              <div className="hidden xl:flex items-center relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 text-xs text-slate-900 placeholder-slate-400 pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 w-32 transition-all"
                />
              </div>

              {/* Notifications */}
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
              </button>

              {/* User Profile & Sign In / Logout */}
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <Link 
                    to="/dashboard"
                    className="flex items-center space-x-1.5 p-1 pr-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-500 transition-all shadow-sm"
                  >
                    <img 
                      src={user.profile_pic || stylishMalePhoto} 
                      alt={user.full_name} 
                      className="w-7 h-7 rounded-lg object-cover border border-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-900 hidden sm:inline">{user.full_name.split(' ')[0]}</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center space-x-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('signIn')}</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* FLOATING MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.profile_pic || stylishMalePhoto} 
                      alt={user.full_name} 
                      className="w-9 h-9 rounded-xl object-cover border border-emerald-500"
                    />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">{user.full_name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register Account</span>
                </button>
              )}
            </div>

            <div>
              <span className="block text-[10px] uppercase font-mono font-bold text-slate-500 mb-2">Platform Navigation</span>
              <div className="grid grid-cols-2 gap-2">
                {primaryNavLinks.concat(secondaryNavLinks).map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive(link.path)
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-150'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <NotificationsDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default Navbar;

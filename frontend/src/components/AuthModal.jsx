import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, fullName);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            {isLogin ? 'Welcome Back to TradePro' : 'Create TradePro Account'}
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            {isLogin ? 'Access your watchlist, trading journal, and portfolio.' : 'Join thousands of active market analysts today.'}
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-1 shadow-sm">
          <p className="font-bold text-emerald-900 flex items-center">
            <span>💡 Demo Login Credentials:</span>
          </p>
          <div className="pt-1 font-mono text-[11px] text-slate-700 space-y-0.5">
            <p><strong className="text-slate-900">Admin:</strong> admin@tradivora.com | <strong>Pass:</strong> admin123</p>
            <p><strong className="text-slate-900">Trader:</strong> trader@tradivora.com | <strong>Pass:</strong> trader123</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shubham"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-semibold text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@tradivora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-semibold text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-semibold text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-lg shadow-emerald-600/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In to TradePro' : 'Create Free Account'}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center text-xs text-slate-600 border-t border-slate-100 pt-4">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className="font-bold text-emerald-600 hover:underline"
              >
                Sign Up Now
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className="font-bold text-emerald-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;

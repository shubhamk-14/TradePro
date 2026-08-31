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
            {isLogin ? 'Welcome Back to Tradivora' : 'Create Tradivora Account'}
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            {isLogin ? 'Access your watchlist, trading journal, and portfolio.' : 'Join thousands of active market analysts today.'}
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 mb-5 font-mono">
          <div className="font-bold">⚡ Quick Demo Login:</div>
          <div>User: <span className="underline">trader@tradivora.com</span> | Pass: <span className="underline">trader123</span></div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          {!isLogin && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Shubham Mehta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 pl-9 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="trader@tradivora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 pl-9 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 pl-9 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <span>Authenticating...</span> : <span>{isLogin ? 'Sign In to Account' : 'Register Account'}</span>}
          </button>
        </form>

        <div className="mt-5 text-center text-xs font-semibold text-slate-600 pt-4 border-t border-slate-100">
          {isLogin ? "Don't have an account?" : "Already registered?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-bold hover:underline ml-1"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;

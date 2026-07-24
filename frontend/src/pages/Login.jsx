import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('alex.morgan@ibm.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [toast, setToast] = useState(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({ message: 'Please provide both email and password.', type: 'error' });
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      setToast({ message: 'Login successful! Redirecting to Dashboard...', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setToast({ message: 'Invalid credentials. Please try again.', type: 'error' });
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setToast({ message: `Password reset link sent to ${resetEmail || email}`, type: 'info' });
    setForgotModalOpen(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Sign in to access your saved career predictions & skill matrix.
          </p>
        </div>

        {/* Card Form */}
        <div className="glass-card p-8 border-slate-200/80 dark:border-slate-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@ibm.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-semibold">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => { setResetEmail(email); setForgotModalOpen(true); }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Demo Login Preset */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-500 font-semibold">Quick Demo Login:</span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => { setEmail('alex.morgan@ibm.com'); setPassword('password123'); }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Candidate User
              </button>
              <button
                type="button"
                onClick={() => { setEmail('admin@ai.com'); setPassword('adminpassword123'); }}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-500 hover:bg-indigo-500/20"
              >
                Admin User
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-card max-w-sm w-full p-6 space-y-4 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 text-indigo-500">
              <HelpCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Password</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="email@example.com"
                className="input-field"
                required
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setForgotModalOpen(false)} className="btn-secondary w-1/2 py-2 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary w-1/2 py-2 text-xs">
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

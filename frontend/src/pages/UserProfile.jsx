import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Shield, Bookmark, Clock, Settings, Moon, Sun, Award } from 'lucide-react';
import { Toast } from '../components/Toast';

export const UserProfile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('saved');
  const [toast, setToast] = useState(null);

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@ibm.com');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setToast({ message: 'Profile settings updated successfully!', type: 'success' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header Profile Card */}
      <div className="glass-card p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white relative overflow-hidden border-indigo-500/30">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 border-2 border-white/20 flex items-center justify-center font-extrabold text-3xl shadow-xl">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold">{user?.name || 'Candidate'}</h1>
            <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4" /> {user?.email || 'candidate@ibm.com'}
            </p>
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-300 border border-white/20">
                {user?.role === 'admin' ? 'System Administrator' : 'Candidate Cohort'}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                IBM SkillsBuild Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4" /> Saved Careers
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" /> Profile Settings
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-500" /> Saved Career Bookmarks
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">AI / ML Engineer</h5>
                  <p className="text-xs text-slate-500">$115,000 - $175,000 / yr</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                  96.4% Match
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Cloud Architect</h5>
                  <p className="text-xs text-slate-500">$125,000 - $185,000 / yr</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold">
                  89.5% Match
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl glass-card p-6 space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-500" /> Profile & Account Settings
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-1"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Theme Preference</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Save Changes
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

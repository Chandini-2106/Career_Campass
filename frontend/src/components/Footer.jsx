import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Heart, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/80 transition-colors duration-300">
      
      {/* SDG 8 Banner Highlight */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-b border-indigo-500/20 py-8 px-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-extrabold text-xl shadow-lg shadow-amber-500/20">
              SDG 8
            </div>
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                UN Sustainable Development Goal 8 Alignment
              </h4>
              <p className="text-slate-300 text-sm max-w-2xl">
                Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all through AI-driven skill matching.
              </p>
            </div>
          </div>
          <Link
            to="/predict"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            Predict Your Path
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gradient">PathFinder AI</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Production-ready AI guidance & job recommendation platform powered by XGBoost classifier models and real-time skill analytics.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500">
              <Award className="w-4 h-4" />
              IBM SkillsBuild Capstone Project
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Platform</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">Dashboard</Link></li>
              <li><Link to="/predict" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">AI Predictor</Link></li>
              <li><Link to="/skill-gap" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">Skill Gap Matrix</Link></li>
              <li><Link to="/analytics" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">ML Analytics</Link></li>
            </ul>
          </div>

          {/* Machine Learning */}
          <div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">AI & Machine Learning</h5>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> XGBoost Classifier (Primary)</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-400" /> Random Forest Benchmark</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-400" /> Decision Tree Benchmark</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-400" /> Logistic Regression</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Tech Stack</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Built with React.js (Vite), Tailwind CSS, Framer Motion, Python Flask, Scikit-Learn, XGBoost, and SQLite database.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe className="w-4 h-4" /> Vercel & Render Ready
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PathFinder AI Guidance System. Developed for IBM Internship Capstone.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for AI & Career Development
          </p>
        </div>
      </div>
    </footer>
  );
};

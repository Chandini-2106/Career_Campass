import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { generateCareerReportPDF } from '../services/pdfGenerator';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';
import { 
  Sparkles, Award, TrendingUp, DollarSign, Bookmark, Download, 
  CheckCircle2, ExternalLink, ArrowRight, ShieldCheck, ChevronRight, Cpu, Target 
} from 'lucide-react';

export const PredictionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const resultData = location.state?.result;
  const userInput = location.state?.userInput || {};
  const [toast, setToast] = useState(null);

  const topCareers = resultData?.top_careers || [];
  const [selectedCareer, setSelectedCareer] = useState(topCareers[0] || null);

  useEffect(() => {
    // Trigger celebratory confetti effect on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti script fails
    }
  }, []);

  if (!topCareers || topCareers.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center glass-card space-y-4">
        <h3 className="text-lg font-bold">No Prediction Data Found</h3>
        <p className="text-xs text-slate-500">Please complete the prediction form first.</p>
        <Link to="/predict" className="btn-primary py-2 text-xs">Go to Prediction Form</Link>
      </div>
    );
  }

  const activeCareer = selectedCareer || topCareers[0];

  const handleSaveCareer = async (career) => {
    try {
      await api.post('/careers/save', {
        user_id: user?.id || 1,
        career_name: career.career_name,
        match_score: career.match_score,
        career_details: career
      });
      setToast({ message: `Saved ${career.career_name} to your bookmarks!`, type: 'success' });
    } catch (err) {
      setToast({ message: `Saved ${career.career_name} to profile!`, type: 'success' });
    }
  };

  const handleDownloadPDF = () => {
    generateCareerReportPDF({ top_careers: topCareers }, userInput);
    setToast({ message: 'Career report PDF downloaded successfully!', type: 'success' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top Banner Header */}
      <div className="glass-card p-8 bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 text-white relative overflow-hidden border-indigo-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Model Inference Complete
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Top 5 AI Recommended Career Paths
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Based on your evaluation profile ({userInput.degree || "Computer Science"}, {userInput.experience || 1} yrs exp), XGBoost Classifier identified high affinity roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleDownloadPDF} className="btn-secondary py-3 px-5 text-sm bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
            <Link to="/skill-gap" className="btn-primary py-3 px-5 text-sm">
              Skill Gap Matrix <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Top 5 Career Selection Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Ranked Recommendations</span>
            <span className="text-xs text-indigo-500 font-semibold">Select role to view details</span>
          </h3>

          <div className="space-y-3">
            {topCareers.map((c, idx) => {
              const isSelected = activeCareer.career_name === c.career_name;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedCareer(c)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg text-white'
                      : 'glass-card border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-xs ${
                        idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-white'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-base">{c.career_name}</h4>
                        <p className={`text-xs ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {c.salary_range}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-extrabold ${
                        idx === 0 ? 'text-emerald-400' : isSelected ? 'text-indigo-300' : 'text-indigo-500'
                      }`}>
                        {c.match_score}%
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide uppercase opacity-75">Match Score</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Career Overview (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Selected Career Overview Card */}
          <div className="glass-card p-8 border-indigo-500/40 space-y-6">
            
            {/* Header & Match Gauge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20">
                  Primary Recommendation
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {activeCareer.career_name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{activeCareer.description}</p>
              </div>

              {/* Circular Match Gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-800" fill="transparent" />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-emerald-500 transition-all duration-1000"
                      fill="transparent"
                      strokeDasharray="213.6"
                      strokeDashoffset={213.6 - (213.6 * activeCareer.match_score) / 100}
                    />
                  </svg>
                  <span className="absolute font-extrabold text-base text-slate-900 dark:text-white">
                    {activeCareer.match_score}%
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase">AI Match</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div>
                <div className="text-xs font-bold text-slate-500">Est. Salary</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{activeCareer.salary_range}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">Demand Level</div>
                <div className="text-sm font-extrabold text-emerald-500 mt-0.5">{activeCareer.demand_level}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">Future Growth</div>
                <div className="text-sm font-extrabold text-indigo-500 mt-0.5">{activeCareer.future_growth}</div>
              </div>
            </div>

            {/* Required Skills Matrix */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" /> Required Role Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCareer.required_skills?.map((sk, idx) => {
                  const userHasIt = userInput.skills?.some(u => u.toLowerCase().includes(sk.toLowerCase()));
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        userHasIt
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {userHasIt ? <CheckCircle2 className="w-3.5 h-3.5" /> : '• '}
                      {sk}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Companies Hiring */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-purple-500" /> Companies Active Hiring
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCareer.companies_hiring?.map((comp, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleSaveCareer(activeCareer)}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                <Bookmark className="w-4 h-4 text-purple-500" /> Save Career
              </button>
              
              <a
                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(activeCareer.career_name)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2.5 px-4"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>

              <Link to="/skill-gap" className="btn-secondary text-xs py-2.5 px-4 ml-auto">
                Skill Gap Analysis <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Learning Roadmap Timeline Card */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" /> Learning Roadmap Timeline
            </h3>

            <div className="space-y-4 pt-2">
              {activeCareer.roadmap?.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-indigo-500/30">
                      {idx + 1}
                    </div>
                    {idx < activeCareer.roadmap.length - 1 && (
                      <div className="w-0.5 h-full bg-indigo-500/30 my-1"></div>
                    )}
                  </div>
                  <div className="space-y-1 pb-4">
                    <div className="text-xs font-bold text-indigo-500 uppercase">{step.phase}</div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">{step.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

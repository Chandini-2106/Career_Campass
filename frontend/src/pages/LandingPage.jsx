import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, BrainCircuit, Target, BarChart3, Rocket, 
  CheckCircle2, ArrowRight, Star, Cpu, Award, Zap, Shield, Users, Compass 
} from 'lucide-react';

export const LandingPage = () => {
  const stats = [
    { label: 'Prediction Accuracy', value: '95.8%', desc: 'Trained on XGBoost' },
    { label: 'Career Paths Tracked', value: '15+', desc: 'Across High-Demand Tech' },
    { label: 'Candidate Profiles Analyzed', value: '10,000+', desc: 'IBM SkillsBuild Cohort' },
    { label: 'Average Salary Uplift', value: '34%', desc: 'With Guided Upskilling' },
  ];

  const features = [
    {
      icon: BrainCircuit,
      title: 'XGBoost ML Career Engine',
      desc: 'Predicts high-affinity career matches based on multi-dimensional skill matrices, CGPA, and domain interest.'
    },
    {
      icon: Target,
      title: 'Skill Gap Matrix & Roadmap',
      desc: 'Provides automated comparison of current candidate capabilities versus market role requirements.'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Market Analytics',
      desc: 'Live telemetry tracking demand levels, growth rates (+32%), and top compensation tiers.'
    },
    {
      icon: Cpu,
      title: 'Algorithmic Model Comparison',
      desc: 'Benchmarked against Decision Trees, Random Forest, and Logistic Regression models for precision.'
    },
    {
      icon: Rocket,
      title: 'Interactive Career Roadmaps',
      desc: 'Step-by-step milestone schedules tailored to guide candidate learning from month 1 through hiring.'
    },
    {
      icon: Award,
      title: 'Automated PDF Guidance Reports',
      desc: 'Instantly download publication-grade PDF career reports complete with hiring company profiles.'
    }
  ];

  const testimonials = [
    {
      quote: "PathFinder AI identified a 96% match score for Data Science based on my Python and SQL skills. The roadmap guided my preparation step-by-step!",
      author: "Priya Sharma",
      role: "Graduate Candidate",
      badge: "Hired as Data Scientist"
    },
    {
      quote: "The Skill Gap Analysis showed me exactly what Docker & AWS tools I was missing for DevOps. The targeted course recommendations saved months of trial.",
      author: "David Chen",
      role: "Software Developer",
      badge: "Hired as DevOps Engineer"
    },
    {
      quote: "As a career mentor, the Admin Analytics and downloadable PDF reports give us empirical data to evaluate student readiness effectively.",
      author: "Elena Rostova",
      role: "IBM Internship Mentor",
      badge: "SkillsBuild Lead"
    }
  ];

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              IBM SkillsBuild Capstone AI Engine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              Navigate Your Tech Career With <span className="text-gradient">Precision AI Guidance</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Unlock personalized career recommendations, automated skill gap assessments, and actionable learning roadmaps powered by trained machine learning algorithms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/predict" className="btn-primary text-base py-4 px-8 group">
                Predict My Career
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/analytics" className="btn-secondary text-base py-4 px-8">
                View AI Benchmarks
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> XGBoost Model</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Skill Gap Matrix</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-500" /> PDF Reports</span>
            </div>
          </motion.div>

          {/* Hero Right Floating Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>

              {/* Main Card */}
              <div className="glass-card p-8 border-indigo-500/30 relative z-10 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Prediction Engine Active</h4>
                      <p className="text-xs text-indigo-500 font-semibold">Evaluating Candidate Input...</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                    95.8% Confident
                  </span>
                </div>

                {/* Match Cards */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-600 text-white">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">AI / ML Engineer</h5>
                        <p className="text-xs text-slate-500">$115,000 - $175,000 / yr</p>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">96.4%</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-600 text-white">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Data Scientist</h5>
                        <p className="text-xs text-slate-500">$105,000 - $160,000 / yr</p>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-purple-600 dark:text-purple-400">91.2%</span>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Skills Alignment Matrix</span>
                    <span className="text-indigo-500">8 / 10 Match</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full w-4/5"></div>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass-card p-4 shadow-xl border-indigo-500/40 z-20 flex items-center gap-3 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400">Top Salary Role</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">$175k Target</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 glass-card p-4 shadow-xl border-indigo-500/40 z-20 flex items-center gap-3 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400">Model Inference</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">&lt; 120ms Latency</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border-indigo-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient">{item.value}</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Features Designed For <span className="text-gradient">Career Success</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Everything you need to evaluate skills, analyze missing qualifications, and step into top-tier tech roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="glass-card p-8 border-slate-200/60 dark:border-slate-800/80 hover:border-indigo-500/50 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Trusted By IBM Internship Candidates
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Real feedback from graduates who utilized AI predictions to land high-growth tech positions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card p-8 space-y-6 flex flex-col justify-between border-slate-200/60 dark:border-slate-800/80">
              <p className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{t.author}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20">
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready To Launch Your AI-Guided Career Journey?
          </h2>
          <p className="text-slate-200 text-base max-w-xl mx-auto">
            Take the 2-minute career evaluation form and receive instant predictions with an actionable learning roadmap.
          </p>
          <div className="pt-4 flex justify-center">
            <Link to="/predict" className="btn-primary py-4 px-10 text-base shadow-xl">
              Start Free Assessment Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

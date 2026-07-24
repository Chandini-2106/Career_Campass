import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, AlertCircle, BookOpen, Clock, ArrowRight, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const SkillGap = () => {
  const [selectedTargetRole, setSelectedTargetRole] = useState('AI / ML Engineer');

  const roleSkillProfiles = {
    'AI / ML Engineer': {
      skills: [
        { name: 'Python Syntax', current: 90, required: 95 },
        { name: 'Machine Learning', current: 85, required: 90 },
        { name: 'SQL Database', current: 80, required: 85 },
        { name: 'Docker / K8s', current: 40, required: 80 },
        { name: 'Data Analysis', current: 75, required: 85 },
        { name: 'Communication', current: 60, required: 75 },
      ],
      missingSkills: ['Docker & Kubernetes Containers', 'MLOps & Model Monitoring', 'PyTorch Neural Networks'],
      courses: [
        { title: 'Docker for Machine Learning Engineers', provider: 'IBM SkillsBuild', duration: '12 Hours', level: 'Intermediate', link: 'https://skillsbuild.org' },
        { title: 'Deep Learning Specialization with PyTorch', provider: 'Coursera / DeepLearning.AI', duration: '40 Hours', level: 'Advanced', link: 'https://coursera.org' },
        { title: 'MLOps: Deploying ML Models to Production', provider: 'Udemy', duration: '20 Hours', level: 'Intermediate', link: 'https://udemy.com' },
      ]
    },
    'Full Stack Developer': {
      skills: [
        { name: 'JavaScript ES6+', current: 90, required: 95 },
        { name: 'React.js', current: 85, required: 90 },
        { name: 'Node.js / Express', current: 70, required: 85 },
        { name: 'PostgreSQL / SQL', current: 75, required: 80 },
        { name: 'Tailwind CSS', current: 90, required: 85 },
        { name: 'CI/CD Pipelines', current: 30, required: 75 },
      ],
      missingSkills: ['GitHub Actions CI/CD', 'TypeScript Architecture', 'GraphQL APIs'],
      courses: [
        { title: 'Full Stack Open 2026 (React & GraphQL)', provider: 'University of Helsinki', duration: '50 Hours', level: 'Advanced', link: 'https://fullstackopen.com' },
        { title: 'Mastering Node.js Microservices', provider: 'IBM SkillsBuild', duration: '18 Hours', level: 'Intermediate', link: 'https://skillsbuild.org' },
      ]
    },
    'Cloud Architect': {
      skills: [
        { name: 'AWS Core Services', current: 60, required: 95 },
        { name: 'Terraform IaC', current: 20, required: 85 },
        { name: 'Linux SysAdmin', current: 75, required: 90 },
        { name: 'Docker / K8s', current: 40, required: 85 },
        { name: 'Networking Security', current: 50, required: 85 },
      ],
      missingSkills: ['Terraform Infrastructure as Code', 'AWS Solutions Architect Curriculum', 'Kubernetes Helm Charts'],
      courses: [
        { title: 'AWS Certified Solutions Architect Associate', provider: 'AWS Training', duration: '35 Hours', level: 'Intermediate', link: 'https://aws.training' },
        { title: 'Terraform for Cloud Automation', provider: 'IBM SkillsBuild', duration: '15 Hours', level: 'Intermediate', link: 'https://skillsbuild.org' },
      ]
    },
    'Frontend Developer': {
      skills: [
        { name: 'HTML/CSS', current: 95, required: 95 },
        { name: 'JavaScript', current: 85, required: 90 },
        { name: 'React/Vue', current: 75, required: 85 },
        { name: 'UI/UX Design', current: 60, required: 70 },
        { name: 'Web Performance', current: 40, required: 80 },
      ],
      missingSkills: ['Advanced State Management', 'Web Performance Optimization'],
      courses: [
        { title: 'Advanced React Patterns', provider: 'Frontend Masters', duration: '10 Hours', level: 'Advanced', link: '#' },
      ]
    },
    'SDE': {
      skills: [
        { name: 'Data Structures', current: 80, required: 95 },
        { name: 'System Design', current: 40, required: 85 },
        { name: 'Java / C++', current: 85, required: 90 },
        { name: 'Database Design', current: 70, required: 85 },
        { name: 'Cloud Basics', current: 50, required: 75 },
      ],
      missingSkills: ['Scalable System Design', 'Distributed Systems'],
      courses: [
        { title: 'Grokking the System Design Interview', provider: 'Educative', duration: '20 Hours', level: 'Advanced', link: '#' },
      ]
    },
    'Data Scientist': {
      skills: [
        { name: 'Python', current: 90, required: 95 },
        { name: 'Statistics', current: 70, required: 85 },
        { name: 'Machine Learning', current: 80, required: 90 },
        { name: 'SQL', current: 85, required: 90 },
        { name: 'Data Visualization', current: 75, required: 85 },
      ],
      missingSkills: ['Advanced Statistical Modeling', 'Deep Learning Basics'],
      courses: [
        { title: 'Applied Data Science with Python', provider: 'Coursera', duration: '35 Hours', level: 'Intermediate', link: '#' },
      ]
    }
  };

  const currentProfile = roleSkillProfiles[selectedTargetRole] || roleSkillProfiles['AI / ML Engineer'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20 mb-2">
            <Target className="w-4 h-4" /> Capability Analysis Engine
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Skill Gap Matrix
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Compare your verified skills against industry benchmarks for target roles.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500">Target Role:</label>
          <select
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
            className="input-field py-2 text-sm w-56 font-bold"
          >
            <option>AI / ML Engineer</option>
            <option>Full Stack Developer</option>
            <option>Cloud Architect</option>
            <option>Frontend Developer</option>
            <option>SDE</option>
            <option>Data Scientist</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Skill Comparison Chart & Progress Bars */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recharts Bar Chart Comparison */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skill Proficiency Comparison (Current vs Required)
            </h3>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProfile.skills}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="current" name="Your Current Level (%)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="required" name="Required Market Level (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Breakdown List */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Individual Skill Gap Breakdown
            </h3>

            <div className="space-y-4">
              {currentProfile.skills.map((s, i) => {
                const gap = s.required - s.current;
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">{s.name}</span>
                      <span className={gap <= 10 ? 'text-emerald-500' : 'text-amber-500'}>
                        {gap <= 0 ? 'Fully Met' : `Gap: -${gap}%`}
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${s.current}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Missing Skills & Recommended Upskilling */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Missing Skill Badges */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> Missing Critical Qualifications
            </h3>

            <div className="space-y-2">
              {currentProfile.missingSkills.map((sk, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  {sk}
                </div>
              ))}
            </div>
          </div>

          {/* Course Recommendations */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Recommended Upskilling Courses
            </h3>

            <div className="space-y-3">
              {currentProfile.courses.map((course, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{course.title}</h5>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[10px] font-bold">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{course.provider}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                  </div>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 pt-1"
                  >
                    Enroll on {course.provider} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

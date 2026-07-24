import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="glass-card max-w-md p-8 space-y-6 border-indigo-500/30">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto text-2xl font-extrabold">
          404
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested career route or resource does not exist or has been relocated.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary py-2.5 px-5 text-xs">
            <Home className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

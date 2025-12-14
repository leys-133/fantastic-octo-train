import React from 'react';
import { ExternalLink } from 'lucide-react';

interface RippleButtonProps {
  label: string;
}

export const RippleButton: React.FC<RippleButtonProps> = ({ label }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <button className="relative w-full bg-white dark:bg-slate-900 ring-1 ring-emerald-900/5 rounded-2xl px-8 py-4 leading-none flex items-center justify-center space-x-2 space-x-reverse shadow-xl">
        <ExternalLink className="w-6 h-6 text-emerald-600 ml-2" />
        <span className="text-xl font-bold text-emerald-900 dark:text-emerald-100 pr-2">
          {label}
        </span>
      </button>
    </div>
  );
};
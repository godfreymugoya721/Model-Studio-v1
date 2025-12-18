
import React from 'react';
import { AnalysisResult } from '../types';

interface CritiqueSectionProps {
  analysis: AnalysisResult;
}

const CritiqueSection: React.FC<CritiqueSectionProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex items-baseline gap-4 border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-serif-high italic text-neutral-200">The Critique</h2>
        <span className="text-[10px] text-neutral-600 tracking-widest uppercase">Senior Photographer Assessment</span>
      </div>
      
      <div className="space-y-6">
        <p className="text-neutral-400 leading-relaxed font-light text-sm italic">
          "{analysis.critique}"
        </p>
        
        <div className="flex flex-wrap gap-3">
          {analysis.prompts.map((tag, i) => (
            <span 
              key={i} 
              className="px-4 py-1.5 border border-neutral-800 text-[9px] uppercase tracking-widest text-neutral-500 bg-neutral-900/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CritiqueSection;


import React from 'react';
import { Plan } from '../types.ts';

interface PlanSelectorProps {
  plans: Plan[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ plans, activeIndex, onSelect }) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center border-b border-zinc-900">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            onClick={() => onSelect(index)}
            className={`flex-1 py-3 text-sm font-bold transition-all duration-300 ${
              activeIndex === index ? 'text-[#c6ff00]' : 'text-zinc-600'
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>
      <div 
        className="absolute bottom-0 h-[3px] bg-[#c6ff00] transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(198,255,0,0.5)]"
        style={{ 
          width: `${(100 / plans.length) * 0.6}%`, 
          left: `${(activeIndex * 100) / plans.length + (100 / plans.length * 0.2)}%` 
        }}
      />
    </div>
  );
};

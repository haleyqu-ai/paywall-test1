
import React from 'react';
import { COMPARISON_DATA, PLANS } from '../constants.ts';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="mt-20 px-6 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Compare Plans</h2>
        <p className="text-zinc-500 text-sm">Get an overview of what's included in each plan.</p>
      </div>

      <div className="space-y-12">
        {COMPARISON_DATA.map((group) => (
          <div key={group.name} className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-2 uppercase tracking-widest text-[11px]">
              {group.name}
            </h3>
            <div className="divide-y divide-zinc-800">
              {group.items.map((item) => (
                <div key={item.name} className="py-4">
                  <div className="text-zinc-400 text-sm mb-3 font-medium">{item.name}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {PLANS.map((plan) => (
                      <div key={plan.id} className="bg-[#111] p-2 rounded-lg text-center">
                        <div className="text-[10px] text-zinc-600 uppercase mb-1">{plan.name}</div>
                        <div className="flex justify-center">
                          {typeof item.values[plan.id] === 'boolean' ? (
                            item.values[plan.id] ? (
                              <svg className="w-4 h-4 text-[#c6ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-zinc-700">—</span>
                            )
                          ) : (
                            <span className={`text-[11px] font-bold ${
                              item.values[plan.id] !== 'Low' && item.values[plan.id] !== '—' ? 'text-[#c6ff00]' : 'text-zinc-500'
                            }`}>
                              {item.values[plan.id]}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

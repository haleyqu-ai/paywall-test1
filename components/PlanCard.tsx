
import React from 'react';
import { Plan, BillingInterval } from '../types';

interface PlanCardProps {
  plan: Plan;
  billing: BillingInterval;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, billing }) => {
  const isFree = plan.id === 'free';
  const isPro = plan.id === 'pro';
  const isStudio = plan.id === 'studio';
  
  const price = billing === BillingInterval.YEARLY ? plan.yearlyPrice : plan.monthlyPrice;
  const originalPrice = billing === BillingInterval.YEARLY ? plan.monthlyPrice : null;

  return (
    <div className={`h-full flex flex-col bg-[#161616] rounded-3xl overflow-hidden border border-zinc-900 relative`}>
      {/* Holiday Offer Header Banner */}
      {plan.holidayOffer && billing === BillingInterval.YEARLY && (
        <div className={`py-2 px-4 text-center text-[10px] font-bold flex items-center justify-center gap-1 ${
          isPro ? 'bg-[#c6ff00] text-black' : 'bg-[#ff4ecd] text-white'
        }`}>
          {plan.holidayOffer}
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-6h-2v6z" />
          </svg>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Badge Area */}
        <div className="flex justify-between items-start mb-4">
          <h2 className={`text-3xl font-bold tracking-tight ${
            isPro ? 'text-blue-400' : isStudio ? 'text-purple-400' : 'text-[#c6ff00]'
          }`}>{plan.name}</h2>
          {plan.badge && (
            <span className="bg-[#c6ff00] text-black text-[9px] font-black px-2 py-0.5 rounded leading-tight">
              {plan.badge}
            </span>
          )}
        </div>

        <p className="text-zinc-400 text-sm mb-6 leading-tight">{plan.tagline}</p>

        {/* Pricing Section */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1.5">
            {originalPrice && price > 0 && (
              <span className="text-zinc-600 line-through text-lg font-medium">
                ${originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-white">${price}</span>
            <span className="text-zinc-500 text-sm">/ month</span>
          </div>
          {!isFree && billing === BillingInterval.YEARLY && (
            <p className="text-xs text-zinc-500 mt-1">
              Billed yearly - ${Math.round(price * 12)} today
            </p>
          )}
        </div>

        <div className="text-xs font-bold text-zinc-300 mb-4 uppercase tracking-wider">
          {isFree ? 'Essentials to get started:' : isPro ? 'Everything in Free, plus:' : 'Everything in Pro, plus:'}
        </div>

        {/* Features List */}
        <div className="space-y-3.5 overflow-y-auto max-h-[45vh] hide-scrollbar">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`mt-0.5 flex-shrink-0 ${feature.highlight ? 'text-[#c6ff00]' : 'text-zinc-500'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-sm leading-snug ${feature.highlight ? 'text-zinc-100 font-medium' : 'text-zinc-400'}`}>
                  {feature.text.split(/(Unlimited|\d[\d,]*)/).map((part, i) => 
                    (part === 'Unlimited' || /\d/.test(part)) ? <span key={i} className="text-[#c6ff00] font-bold">{part}</span> : part
                  )}
                </span>
                <button className="text-zinc-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { BillingInterval } from './types.ts';
import { PLANS, ENTERPRISE_PLAN, CREDIT_PACKAGES } from './constants.ts';
import { PlanCard } from './components/PlanCard.tsx';
import { PlanSelector } from './components/PlanSelector.tsx';
import { ComparisonTable } from './components/ComparisonTable.tsx';

const App: React.FC = () => {
  const [billing, setBilling] = useState<BillingInterval>(BillingInterval.YEARLY);
  const [activePlanIndex, setActivePlanIndex] = useState(1);
  const [selectedCreditPkg, setSelectedCreditPkg] = useState('pkg-1');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const plansSectionRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth * 0.85;
      sliderRef.current.scrollTo({
        left: 1 * (cardWidth + 16),
        behavior: 'instant'
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (plansSectionRef.current) {
      observer.observe(plansSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const cardWidth = width * 0.85;
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    if (newIndex !== activePlanIndex && newIndex < PLANS.length) {
      setActivePlanIndex(newIndex);
    }
  };

  const scrollToPlan = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth * 0.85;
      sliderRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: 'smooth'
      });
      setActivePlanIndex(index);
    }
  };

  const scrollToComparison = () => {
    comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isFooterActive = isSectionVisible && (activePlanIndex === 1 || activePlanIndex === 2);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden pb-20">
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-zinc-900">
        <button 
          onClick={scrollToComparison}
          className="bg-[#111] border border-zinc-800 rounded-full px-4 py-1.5 text-[11px] font-bold text-[#c6ff00] flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Compare Plans
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#111] px-3 py-1.5 rounded-full border border-zinc-800 text-[11px] font-bold">
            <span className="text-zinc-500">Currency</span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-3 bg-red-600 rounded-sm overflow-hidden flex flex-col relative">
                 <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                    <div className="bg-blue-900 w-1/2 h-1/2"></div>
                    <div className="bg-red-600 w-full h-1/2"></div>
                 </div>
              </span>
              USD
            </span>
          </div>
          <button className="bg-zinc-800 p-1.5 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="flex flex-col items-center mt-6">
          <div className="bg-[#141414] p-1.5 rounded-2xl flex items-center border border-zinc-800">
            <button
              onClick={() => setBilling(BillingInterval.MONTHLY)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                billing === BillingInterval.MONTHLY ? 'bg-zinc-800 text-white' : 'text-zinc-500'
              }`}
            >
              Monthly & Quarterly
            </button>
            <button
              onClick={() => setBilling(BillingInterval.YEARLY)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${
                billing === BillingInterval.YEARLY ? 'bg-[#c6ff00] text-black' : 'text-zinc-500'
              }`}
            >
              Yearly
              <span className="ml-2 text-[8px] opacity-70">20% OFF + Holiday Offer</span>
            </button>
          </div>
        </div>

        <div className="mt-8 px-4">
          <PlanSelector 
            plans={PLANS} 
            activeIndex={activePlanIndex} 
            onSelect={scrollToPlan} 
          />
        </div>

        <div ref={plansSectionRef}>
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="mt-6 flex overflow-x-auto snap-x hide-scrollbar px-6 gap-4 pb-12"
          >
            {PLANS.map((plan, index) => (
              <div key={plan.id} className="min-w-[85vw] snap-center">
                <PlanCard 
                  plan={plan} 
                  billing={billing} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 mb-8">
           <div className="bg-[#161616] rounded-3xl p-8 border border-zinc-900">
             <div className="flex flex-col">
               <h2 className="text-3xl font-bold text-orange-400 mb-2">Enterprise</h2>
               <p className="text-zinc-500 text-sm mb-8 leading-snug">{ENTERPRISE_PLAN.tagline}</p>
               
               <button className="w-full py-3 bg-[#222] text-zinc-300 border border-zinc-800 rounded-2xl font-bold mb-8 active:scale-[0.98] transition-transform">
                 Contact Us
               </button>

               <div className="text-xs font-bold text-zinc-300 mb-4 uppercase tracking-wider">
                 Everything in Studio, plus:
               </div>
               
               <div className="grid grid-cols-1 gap-y-3">
                 {ENTERPRISE_PLAN.features.slice(1).map((feature, idx) => (
                   <div key={idx} className="flex items-start gap-3">
                     <div className="mt-0.5 text-[#c6ff00]">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <span className="text-sm text-zinc-400">
                        {feature.text.split(/(Unlimited|\d[\d,]*|Highest|Customizable|Full)/).map((part, i) => 
                          (part === 'Unlimited' || part === 'Highest' || part === 'Customizable' || part === 'Full' || /\d/.test(part)) 
                          ? <span key={i} className="text-[#c6ff00] font-bold">{part}</span> : part
                        )}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>

        <div className="px-6 mb-8">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-3xl p-6 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#ff4ecd]">Meshy Education Plan</h3>
              <p className="text-zinc-500 text-[11px] mt-1">If you are a student or educator, apply for our education program for a discount.</p>
            </div>
            <button className="bg-[#c6ff00] text-black px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition-transform">
              Apply Now
            </button>
          </div>
        </div>

        <div className="px-6 mb-16">
          <div className="bg-[#161616] rounded-3xl p-6 border border-zinc-900">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-white mb-1">Or Purchase Extra Credits (Subscriber only)</h2>
              <p className="text-zinc-500 text-xs">One-time offer: 2x credits. Buy more, get more!</p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {CREDIT_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedCreditPkg(pkg.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    selectedCreditPkg === pkg.id 
                    ? 'bg-[#c6ff00]/5 border-[#c6ff00]' 
                    : 'bg-[#0f0f0f] border-zinc-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedCreditPkg === pkg.id ? 'border-[#c6ff00]' : 'border-zinc-700'
                  }`}>
                    {selectedCreditPkg === pkg.id && <div className="w-2.5 h-2.5 bg-[#c6ff00] rounded-full"></div>}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-white">${pkg.price}</span>
                      <span className="bg-[#ff4ecd] text-white text-[9px] font-black px-2 py-0.5 rounded leading-tight">
                        {pkg.badge}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-300">
                      <span className="text-zinc-100 font-bold">{pkg.credits}</span>{' '}
                      <span className="text-zinc-500">{pkg.subtext}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-6 flex flex-col items-center">
              <p className="text-[10px] text-zinc-500 text-center mb-4 leading-normal">
                Purchased credits do not expire or reset monthly, but you must have an active subscription to purchase and use them.
              </p>
              <button className="w-full sm:w-auto px-8 py-3 bg-[#333] text-zinc-400 rounded-xl text-sm font-bold active:scale-95 transition-transform">
                Subscriber Only
              </button>
            </div>
          </div>
        </div>

        <div ref={comparisonRef}>
          <ComparisonTable />
        </div>
      </main>

      <div 
        className={`fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-40 transition-all duration-300 transform ${
          isFooterActive ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <button 
          className="w-full py-4 rounded-2xl font-bold text-base transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-2xl bg-[#c6ff00] text-black hover:bg-[#d4ff33]"
        >
          {PLANS[activePlanIndex]?.ctaText || 'Subscribe Now'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;

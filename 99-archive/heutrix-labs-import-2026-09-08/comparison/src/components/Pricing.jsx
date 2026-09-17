import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Light',
    price: '$1,500',
    description: 'Perfect for small teams needing basic automation.',
    features: ['Workflow Audit', '2 Core Automations', 'Standard Support', 'Basic Documentation'],
    highlighted: false
  },
  {
    name: 'Standard',
    price: '$3,500',
    description: 'Our most popular tier for growing operations.',
    features: ['Everything in Light', 'Up to 5 Core Automations', 'Custom CRM Setup', 'Priority Support', 'Team Training'],
    highlighted: true
  },
  {
    name: 'Expanded',
    price: '$7,000+',
    description: 'Full-scale operational overhaul and AI integration.',
    features: ['Everything in Standard', 'Unlimited Automations', 'Advanced AI Integration', 'Custom Dashboards', 'Dedicated Operations Manager'],
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-navy">Transparent Pricing</h2>
          <p className="mt-4 text-slate-600">Invest in systems that pay for themselves in hours saved.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-8 bg-white shadow-lg relative ${plan.highlighted ? 'border-2 border-tech-mint transform md:-translate-y-4' : 'border border-background-soft'}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-tech-mint text-slate-navy px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-navy mb-2">{plan.name}</h3>
              <p className="text-slate-500 mb-6 h-12">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-navy">{plan.price}</span>
                {plan.name !== 'Expanded' && <span className="text-slate-500">/one-time</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-slate-700">
                    <Check className="text-tech-mint mr-3 flex-shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded font-bold transition-colors ${plan.highlighted ? 'bg-electric-amber text-slate-navy hover:bg-yellow-400' : 'bg-slate-navy text-white hover:bg-slate-800'}`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Check } from 'lucide-react';

const Registration: React.FC = () => {
  const tiers = [
    {
      name: 'Student',
      price: '$49',
      features: ['Access to all sessions', 'Digital certificate', 'Networking events'],
      color: 'bg-blue-50 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Regular',
      price: '$149',
      features: ['Access to all sessions', 'Digital certificate', 'Networking events', 'Lunch included', 'Conference swag bag'],
      color: 'bg-indigo-50 border-indigo-200',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700',
      popular: true
    },
    {
      name: 'VIP',
      price: '$299',
      features: ['Access to all sessions', 'Digital certificate', 'Networking events', 'Lunch included', 'Conference swag bag', 'VIP Dinner', 'Priority seating'],
      color: 'bg-purple-50 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Attendee Registration</h2>
        <p className="text-slate-500 mt-2">Choose the package that suits you best.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative bg-white rounded-2xl shadow-sm border ${tier.popular ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' : 'border-slate-200'} p-8 flex flex-col`}>
            {tier.popular && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-emerald-500 mr-2 shrink-0" />
                  <span className="text-slate-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-md ${tier.btnColor}`}>
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registration;
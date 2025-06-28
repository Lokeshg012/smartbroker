import React from 'react';
import { BadgeCheck, Wrench } from 'lucide-react';

const upcomingAIs = [
  {
    icon: <BadgeCheck className="w-8 h-8 text-teal-600" />,
    title: "Legal & Compliance AI",
    subtitle: "Verified. Protected. Empowered.",
    description: "From land dispute analysis to KYC & RERA checks, our AI ensures every square foot is legit and hassle-free.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
    title: "Smart Property Optimizer",
    subtitle: "Upgrade Smarter. Live Better.",
    description: "Get personalized suggestions to renovate or optimize your flat, plot, or villa based on modern living trends and value.",
  }
];

const UpcomingAISection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl text-blue-600 font-semibold uppercase mb-2 tracking-wider">
          Coming Soon
        </h3>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Real Estate Reinvented
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Our upcoming AI agents are built to protect your rights and amplify your property's potential.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {upcomingAIs.map((ai, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-gray-100">
                  {ai.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{ai.title}</h4>
                  <p className="text-sm text-gray-500">{ai.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{ai.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAISection;

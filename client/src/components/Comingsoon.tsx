import React from 'react';
import { BadgeCheck, Wrench } from 'lucide-react';

const upcomingAIs = [
  {
    icon: <BadgeCheck className="h-8 w-8 text-purple-600" />,
    title: "Legal & Compliance AI",
    subtitle: "Verified. Protected. Empowered.",
    description:
      "From land dispute analysis to KYC & RERA checks, our AI ensures every square foot is legit and hassle-free.",
  },
  {
    icon: <Wrench className="h-8 w-8 text-orange-500" />,
    title: "Smart Property Optimizer",
    subtitle: "Upgrade Smarter. Live Better.",
    description:
      "Get personalized suggestions to renovate or optimize your flat, plot, or villa based on modern living trends and value.",
  },
];

const UpcomingAISection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wide">
          Coming Soon
        </h3>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          Real Estate Reinvented
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our upcoming AI agents are built to protect your rights and amplify your property's potential.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingAIs.map((ai, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl shadow-xl bg-white border border-gray-100 hover:shadow-2xl hover:border-purple-100 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-full shadow-sm">
                  {ai.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700">
                    {ai.title}
                  </h4>
                  <p className="text-sm text-purple-500">{ai.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{ai.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAISection;

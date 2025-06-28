import React from 'react';
import { ShieldCheck, PhoneOff, Star, Bot, MapPin, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
    title: "No More Fake Listings",
    description: "Our AI verifies every listing and restricts duplicates to maintain authenticity."
  },
  {
    icon: <PhoneOff className="w-6 h-6 text-teal-600" />,
    title: "No More Spam Calls",
    description: "We value your privacy. Your contact details are safe and shared only when you allow."
  },
  {
    icon: <Star className="w-6 h-6 text-teal-600" />,
    title: "Choosy? We Listen.",
    description: "Our recommendation engine adapts to your preferences and style."
  },
  {
    icon: <Bot className="w-6 h-6 text-teal-600" />,
    title: "AI-Backed Suggestions",
    description: "Smarter matches based on your needs, location, and lifestyle."
  },
  {
    icon: <MapPin className="w-6 h-6 text-teal-600" />,
    title: "Location Quality Score",
    description: "Know the livability score before you even step in."
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-teal-600" />,
    title: "One Click Journey",
    description: "From search to sell — everything AI-managed for your ease."
  },
];

const WhyUs = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-blue-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Content */}
        <div>
          <h3 className="text-xl font-medium text-teal-600 uppercase tracking-wider mb-2">Why Us?</h3>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            Finally, a Real Estate Platform That Gets You.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            We’re not just another property portal. We’ve engineered the experience from scratch, putting trust, intelligence, and your peace of mind first.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image / Illustration */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1603367563698-67012943fd67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AI Real Estate Illustration"
            className="w-full h-auto max-w-md mx-auto md:mx-0 rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

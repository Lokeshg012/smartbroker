
import React from 'react';
import Header from '@/components/Layout/Header';
import PropertyCarousel from '@/components/PropertyCarousel';
import { mockProperties, luxuryProperties, trendingProperties } from '@/data/mockProperties';
import { CheckCircle } from 'lucide-react';

const Listings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Your Latest Property Matches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Latest Property Matches</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover new homes tailored to your preferences, intelligently matched by our AI. Your perfect property awaits!
            </p>
          </div>

          {/* Match Insights */}
          <div className="mb-8 p-6 bg-teal-50 rounded-xl border-l-4 border-teal-400">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
              <h3 className="font-semibold text-teal-900">Your Match Insights</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Budget Match', 'Location', 'Property Type', 'School District', 'Commute Time'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-teal-700 text-sm">
              Our AI has analyzed thousands of listings and identified these properties that align perfectly with your budget, preferred location, and essential home features. We prioritize matches with high trust scores.
            </p>
          </div>

          <PropertyCarousel properties={mockProperties} title="Properties Tailored For You" />
        </div>
      </section>

      {/* Luxury Estates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyCarousel properties={luxuryProperties} title="Luxury Estates" />
        </div>
      </section>

      {/* Top Trending Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyCarousel properties={trendingProperties} title="Top Trending Properties" />
        </div>
      </section>
    </div>
  );
};

export default Listings;

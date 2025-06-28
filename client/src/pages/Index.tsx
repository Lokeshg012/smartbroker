
import React from 'react';
import Header from '@/components/Layout/Header';
import PropertyCarousel from '@/components/PropertyCarousel';
import AIChat from '@/components/AIChat';
import { mockProperties, luxuryProperties, trendingProperties } from '@/data/mockProperties';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Perfect Property Journey
              <span className="block text-teal-600">Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              What would you like to do today?
            </p>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {['Buy', 'Sell', 'Rent', 'Invest'].map((action) => (
                <Button
                  key={action}
                  className="bg-teal-500 hover:bg-teal-600 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {action}
                </Button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold">
                Start on WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-gray-600">
                100% secure • No spam • Trusted by 50K+ users.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* AI Assistant Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Broker AI</h2>
              <p className="text-gray-600 mb-8">
                Your personal assistant for property search.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Property Matching</h3>
                    <p className="text-gray-600">Get personalized property recommendations based on your preferences and budget in real-time.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Verified Listings Only</h3>
                    <p className="text-gray-600">All properties are thoroughly verified by our team to ensure accuracy and prevent fraud.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                    <p className="text-gray-600">Connect with verified real estate professionals whenever you need guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <AIChat />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Broker Assistant</h2>
          <p className="text-gray-600 mb-8">Subscribe to our newsletter</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Input your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">English</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">© 2023 Smart Broker Assistant.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

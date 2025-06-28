
import React from 'react';
import Header from '@/components/Layout/Header';
import AIChat from '@/components/AIChat';
import { Zap, Shield, Users } from 'lucide-react';

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* AI Assistant Section */}
      <section className="py-16 bg-white">
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
    </div>
  );
};

export default AIAssistant;

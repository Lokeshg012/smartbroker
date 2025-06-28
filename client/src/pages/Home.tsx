
import React from 'react';
import Header from '@/components/Layout/Header';
import ChatbotCard from '@/components/ChatbotCard';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Premium apartment/skyline video background */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23059669'/%3E%3Cstop offset='100%25' style='stop-color:%232563eb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3C/svg%3E"
          >
            <source src="https://videos.pexels.com/video-files/3843433/3843433-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/4203910/4203910-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback background in case video fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300" 
               style={{opacity: 'var(--fallback-opacity, 0)'}}></div>
        </div>
        
        {/* Content with enhanced text shadow for readability */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl text-shadow-lg">
            Work with our AI to buy or rent your next home — with full trust, no drama.
          </h1>
          
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto drop-shadow-xl text-shadow-md">
            Verified properties, real buyers, and your personal AI assistant to guide every step.
          </p>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <Button 
              onClick={() => navigate('/buy-properties')}
              className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg"
            >
              Buy
            </Button>
            <Button 
              onClick={() => navigate('/sell-properties')}
              className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg"
            >
              Rent
            </Button>
            <Button 
              onClick={() => navigate('/sell-properties')}
              className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg"
            >
              Sell
            </Button>
            <Button 
              onClick={() => navigate('/invest')}
              className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg"
            >
              Invest
            </Button>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Your Personal AI Agents</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <HomeIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Assistant for Buyers</h3>
              <p className="text-gray-600">Find your perfect home with personalized recommendations</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Assistant for Renters</h3>
              <p className="text-gray-600">Discover rental homes that fit your lifestyle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Chatbot Sections with enhanced avatars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format" 
                    alt="Alex AI Assistant"
                    className="w-full h-full object-cover animate-pulse hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Meet Alex - Your Property Assistant</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hi, I'm Alex — your Smart Broker AI. I'll help you list your property today. Verified process, no drama. Ready to begin?
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/chatbot')}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                List Your Property with Alex
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format" 
                    alt="Elvis AI Assistant"
                    className="w-full h-full object-cover animate-bounce hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hey, Elvis Here - Your Rental Guide</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hey there! Elvis here. I'll help you rent a home that fits your vibe, budget, and timeline. Let's get started.
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/chatbot-rent')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Start Renting with Elvis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-medium">
            Trusted by over 10,000 users across India.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
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
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>English</div>
            <div>© 2023 Smart Broker Assistant.</div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-700">Twitter</a>
              <a href="#" className="hover:text-gray-700">LinkedIn</a>
              <a href="#" className="hover:text-gray-700">Instagram</a>
              <a href="#" className="hover:text-gray-700">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

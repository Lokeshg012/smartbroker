import React from 'react';
import Header from '@/components/Layout/Header';
import ChatbotCard from '@/components/ChatbotCard';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropertyCarousel from '../components/PropertyCarousel';
import { mockProperties } from '../data/mockProperties';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative py-24 text-white overflow-hidden">
  {/* Video Background */}
  <div className="absolute inset-0 w-full h-full">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23059669'/%3E%3Cstop offset='100%25' style='stop-color:%232563eb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3C/svg%3E"
    >
      <source src="https://videos.pexels.com/video-files/3773486/3773486-hd_1280_720_60fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] mb-6">
      India's first real estate ecosystem: <span className="text-blue-100">AI Powered</span>
    </h1>
    <p className="text-2xl md:text-3xl text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] mb-12 max-w-3xl mx-auto">
      Where verified homes meet intelligent decisions — guided by your personal AI.
    </p>

    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      <Button onClick={() => navigate('/buy-properties')} className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg">Buy</Button>
      <Button onClick={() => navigate('/sell-properties')} className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg">Rent</Button>
      <Button onClick={() => navigate('/sell-properties')} className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg">Sell</Button>
      <Button onClick={() => navigate('/invest')} className="bg-white text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl drop-shadow-lg">Invest</Button>
    </div>
  </div>
</section>

      <section className="relative py-28 bg-white overflow-hidden">
  {/* Sneaky Bots - Top Left & Right (Different Images, Angles & Sizes) */}
  <img
    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
    alt="Top Left Bot"
    className="hidden md:block absolute left-2 top-4 w-28 h-28 rotate-[-10deg] scale-125 animate-bounce-slow"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/4712/4712040.png"
    alt="Top Right Bot"
    className="hidden md:block absolute right-2 top-6 w-28 h-28 rotate-[12deg] scale-125 animate-bounce-slow"
  />

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
      Meet Our AI Agents
    </h2>
    <p className="text-lg text-gray-600 mb-12">
      Here to help, built for peace of mind.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Alex */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-md border border-gray-200">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format"
              alt="Alex AI Assistant"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Alex – Your Property Assistant
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hi! I'm Alex — I'll help you list your property today. Verified process, no drama. Ready to begin?
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/chatbot')}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          List with Alex
        </Button>
      </div>

      {/* Elvis */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-md border border-gray-200">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format"
              alt="Elvis AI Assistant"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Elvis – Your Rental Guide
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hey there! I'll help you rent a home that fits your vibe, budget, and timeline. Let's get started.
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/chatbot-rent')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          Rent with Elvis
        </Button>
      </div>
    </div>
  </div>

  {/* Sneaky Bots - Bottom Left & Right (New Bots, Rotated Differently) */}
  <img
    src="https://cdn-icons-png.flaticon.com/512/4712/4712032.png"
    alt="Bottom Left Bot"
    className="hidden md:block absolute left-4 bottom-8 w-28 h-28 rotate-[8deg] scale-150 animate-bounce-slow"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/4712/4712022.png"
    alt="Bottom Right Bot"
    className="hidden md:block absolute right-4 bottom-10 w-28 h-28 rotate-[-8deg] scale-150 animate-bounce-slow"
  />
      </section>


      {/* property carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
            Choose Your Preferred Property
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Get AI-powered suggestions that truly match your needs.
          </p>

          <PropertyCarousel
            title="Recommended For You"
            properties={mockProperties}
          />
        </div>
      </section>

      // Add this section below the property carousel and above the trust section
<TestimonialCarousel />

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-medium">Trusted by over 10,000 users across India.</p>
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
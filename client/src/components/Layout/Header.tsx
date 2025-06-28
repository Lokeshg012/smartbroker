
import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBox from '@/components/NotificationBox';
import ChatbotInterface from '@/components/ChatbotInterface';
import DarkModeToggle from '@/components/DarkModeToggle';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSmartBrokerAIClick = () => {
    setShowChatbot(true);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Mock notifications data - replace with real data
  const notifications = [
    {
      id: 1,
      title: "New Property Match",
      message: "Found 3 new properties matching your criteria in Downtown",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      title: "AI Update",
      message: "Your Smart Broker AI has learned new preferences from your recent searches",
      timestamp: "1 day ago",
      unread: true
    },
    {
      id: 3,
      title: "Buyer Interest",
      message: "Someone is interested in your listed property on Oak Street",
      timestamp: "2 days ago",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button onClick={handleLogoClick} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/lovable-uploads/afa73054-d5d4-41a9-b285-02d6381ff8c3.png" 
                  alt="Smart Broker" 
                  className="h-10 w-auto"
                />
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/')}
                className={`font-medium transition-colors ${isActive('/') ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/listings')}
                className={`font-medium transition-colors ${isActive('/listings') ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}
              >
                Listings
              </button>
              <button 
                onClick={() => navigate('/preferences')}
                className={`font-medium transition-colors ${isActive('/preferences') ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}
              >
                Preferences
              </button>
              <button 
                onClick={handleSmartBrokerAIClick}
                className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                Smart Broker AI
              </button>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <DarkModeToggle />
              <div className="relative">
                <button onClick={toggleNotifications} className="relative">
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </div>
                  )}
                </button>
                <NotificationBox 
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                  notifications={notifications}
                />
              </div>
              <button 
                onClick={() => navigate('/login')}
                className="w-8 h-8 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              >
                <User className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chatbot Interface */}
      <ChatbotInterface 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
      />
    </>
  );
};

export default Header;

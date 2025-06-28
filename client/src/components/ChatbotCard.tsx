
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ChatbotCardProps {
  type: 'buy' | 'rent';
  title: string;
  message: string;
  buttonText: string;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({ type, title, message, buttonText }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setDisplayedMessage(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }, 500);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        {/* Floating animation background */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full transform translate-x-6 -translate-y-6 animate-pulse"></div>
        
        {/* Chatbot Avatar */}
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transform transition-transform duration-300 hover:scale-110 ${
            type === 'buy' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-teal-500 to-teal-600'
          }`}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className={`text-sm font-bold ${type === 'buy' ? 'text-blue-500' : 'text-teal-500'}`}>A</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4 relative">
              <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-gray-50 border-r-8 border-r-transparent"></div>
              <p className="text-gray-700 leading-relaxed">
                👋 {displayedMessage}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <Button 
            className={`w-full py-3 font-semibold rounded-xl transform transition-all duration-200 hover:scale-105 ${
              type === 'buy' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {buttonText}
          </Button>
        </div>

        {/* Subtle floating dots */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          <div className={`w-2 h-2 rounded-full animate-bounce ${type === 'buy' ? 'bg-blue-300' : 'bg-teal-300'}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${type === 'buy' ? 'bg-blue-300' : 'bg-teal-300'}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${type === 'buy' ? 'bg-blue-300' : 'bg-teal-300'}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;

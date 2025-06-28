import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ChatbotCardProps {
  onOpenChat?: () => void;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({ onOpenChat }) => {
  const title = "Support ChatBot";
  const message = "👋 Hi! I’m your Support ChatBot. Ask me about website features, how to navigate, your account, or get real-time help. Click below to start!";
  const buttonText = "Open Support Chat";

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
      }, 20);
      return () => clearInterval(typingInterval);
    }, 300);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="bg-gradient-to-br from-white via-blue-50 to-teal-50 border border-blue-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        {/* Floating animation background */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-200 rounded-full transform translate-x-6 -translate-y-6 animate-pulse"></div>
        
        {/* Chatbot Avatar */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-lg">S</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">{title}</h3>
            <div className="bg-white rounded-2xl rounded-tl-sm p-4 relative shadow">
              <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent"></div>
              <p className="text-gray-700 leading-relaxed">
                {displayedMessage}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <Button
            className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:scale-105 transition-transform"
            onClick={onOpenChat}
          >
            {buttonText}
          </Button>
        </div>
        {/* Subtle floating dots */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          <div className="w-2 h-2 rounded-full animate-bounce bg-blue-300" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-teal-300" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-blue-300" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;
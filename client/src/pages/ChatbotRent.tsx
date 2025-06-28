
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Mic, Home, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  quickReplies?: string[];
}

const ChatbotRent = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hey there! I'm Elvis — your Smart Broker AI for renting. Let's find you a perfect home that matches your lifestyle and budget! 🏠✨",
      sender: 'ai',
      timestamp: new Date(),
      quickReplies: ['Get Started', 'Tell me more', 'What do you need from me?']
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    await simulateTyping();
    setIsTyping(false);

    // Generate AI response based on conversation flow
    const aiResponse = generateAIResponse(message, messages.length);
    setMessages(prev => [...prev, aiResponse]);
  };

  const generateAIResponse = (userMessage: string, messageCount: number): ChatMessage => {
    const responses = [
      {
        text: "Perfect! Let's start by understanding what you're looking for. What type of rental property interests you most?",
        quickReplies: ['Apartment', '1-2 BHK', '3+ BHK', 'Studio', 'Villa/House']
      },
      {
        text: "Great choice! Now, what's your preferred monthly rental budget? This helps me find options that fit your financial comfort zone.",
        quickReplies: ['₹10,000-25,000', '₹25,000-50,000', '₹50,000-1,00,000', '₹1,00,000+']
      },
      {
        text: "Excellent! Which area or locality would you prefer? I can suggest properties in prime locations with good connectivity.",
        quickReplies: ['Mumbai Central', 'Bangalore IT Corridor', 'Delhi NCR', 'Pune Tech Parks', 'Other Areas']
      },
      {
        text: "Perfect! How soon are you looking to move in? This helps me prioritize properties based on availability.",
        quickReplies: ['Immediately', 'Within 1 month', '1-3 months', '3+ months', 'Just exploring']
      },
      {
        text: "Awesome! What amenities are most important to you? I'll filter properties that match your lifestyle needs.",
        quickReplies: ['Gym & Pool', 'Parking', 'Security', 'Pet-friendly', 'Furnished']
      },
      {
        text: "Perfect! Based on your preferences, I'm finding some amazing rental options for you. Let me show you properties that match your criteria perfectly! 🎉",
        quickReplies: ['Show me properties', 'Refine my search', 'Contact an agent']
      }
    ];

    const responseIndex = Math.min(messageCount - 1, responses.length - 1);
    const selectedResponse = responses[responseIndex];

    return {
      id: (Date.now() + 1).toString(),
      text: selectedResponse.text,
      sender: 'ai',
      timestamp: new Date(),
      quickReplies: selectedResponse.quickReplies
    };
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl max-w-20">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Elvis - Rental Assistant</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Smart Broker AI</p>
              </div>
            </div>
          </div>
          <img 
            src="/lovable-uploads/afa73054-d5d4-41a9-b285-02d6381ff8c3.png" 
            alt="Smart Broker" 
            className="h-8 w-auto opacity-80"
          />
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div key={message.id} className="animate-fade-in">
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-2xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">E</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Elvis</span>
                    </div>
                  )}
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {/* Quick Replies */}
                  {message.sender === 'ai' && message.quickReplies && index === messages.length - 1 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, replyIndex) => (
                        <Button
                          key={replyIndex}
                          onClick={() => handleQuickReply(reply)}
                          variant="outline"
                          size="sm"
                          className="text-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border-blue-200 dark:border-gray-600 text-blue-700 dark:text-blue-300 hover:border-blue-300 transition-all duration-200 hover:scale-105"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">E</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Elvis</span>
              </div>
              <TypingIndicator />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="pr-12 py-3 text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-200 hover:scale-105"
                disabled={isTyping || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 opacity-5">
          <Home className="h-32 w-32 text-blue-500" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5">
          <MapPin className="h-24 w-24 text-purple-500" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-5">
          <DollarSign className="h-20 w-20 text-teal-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-5">
          <Calendar className="h-28 w-28 text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default ChatbotRent;

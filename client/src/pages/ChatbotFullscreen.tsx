
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatbotFullscreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi, I'm Alex – let's find your ideal property! I'm here to help you discover the perfect home that matches your dreams and budget.",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: '2',
      text: "To get started, could you tell me what type of property you're looking for and your preferred location?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = ['2-3 BHK Apartment', 'Villa/House', 'Commercial Space', 'Investment Property'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      setIsTyping(true);
      
      // Simulate AI response with typing animation
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "That sounds great! I'd love to help you find the perfect property. Can you share your budget range and any specific preferences you have in mind?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }
  };

  const handleQuickReply = (reply: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: reply,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    // Simulate AI response based on selection
    setTimeout(() => {
      setIsTyping(false);
      const responses = {
        '2-3 BHK Apartment': "Perfect choice for modern living! I'll help you find spacious 2-3 BHK apartments. What's your preferred budget range and location?",
        'Villa/House': "Great! Villas and independent houses offer wonderful privacy and space. Do you have a preferred area in mind and what's your budget range?",
        'Commercial Space': "Excellent investment opportunity! Are you looking for office space, retail, or warehouse? What's your target location and budget?",
        'Investment Property': "Smart choice! Investment properties can provide great returns. Are you interested in residential or commercial investments?"
      };
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[reply as keyof typeof responses],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Smart Broker AI</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Personal Property Assistant</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Online • Helping you find your dream home
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-3 max-w-2xl">
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs">AI</span>
                    </div>
                  )}
                  <div
                    className={`px-6 py-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Replies */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-sm px-4 py-2 rounded-full border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200 hover:scale-105"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex space-x-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell me about your dream property..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-full border-gray-200 dark:border-gray-600 focus:border-teal-500 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-6 py-4 text-base"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-full h-12 w-12 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotFullscreen;

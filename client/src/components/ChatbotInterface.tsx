import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, X, Minimize2, Smile, Paperclip, RefreshCcw, ChevronDown } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  attachment?: string;
  suggestions?: string[];
  typing?: boolean;
}

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your Support ChatBot. I can help you explore features, navigate the site, and answer any questions about using our platform.",
      sender: 'ai',
      timestamp: '10:00 AM'
    },
    {
      id: '2',
      text: "How can I assist you today? Try typing your question or select a quick option below.",
      sender: 'ai',
      timestamp: '10:01 AM',
      suggestions: [
        "Website Features",
        "Navigation Help",
        "Account Settings",
        "Contact Support",
        "Site Tour",
        "FAQ"
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [upload, setUpload] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isMinimized]);

  // AI Response Logic (same as AIChat)
  const handleAIResponse = (userText: string) => {
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        text: '',
        sender: 'ai',
        timestamp: '',
        typing: true
      }
    ]);

    setTimeout(() => {
      let aiResp: ChatMessage = {
        id: (Date.now() + 2).toString(),
        text: '',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const lower = userText.toLowerCase();

      if (["website features", "features", "feature"].some(k => lower.includes(k))) {
        aiResp.text = "Our platform offers property search, interactive map, chatbot support, uploading stories, user accounts, and more. Which feature do you want to know about?";
        aiResp.suggestions = ["Map", "Chatbot", "Stories", "Account"];
      } else if (["navigation help", "navigate", "site tour", "tour"].some(k => lower.includes(k))) {
        aiResp.text = "You can navigate using the top bar. Want a guided tour or help finding something?";
        aiResp.suggestions = ["Start Guided Tour", "Find Property", "Go to Account"];
      } else if (["account", "settings", "profile"].some(k => lower.includes(k))) {
        aiResp.text = "In 'Account Settings', you can update your profile, change password, manage notifications, and see your properties.";
        aiResp.suggestions = ["Update Profile", "Change Password", "My Properties"];
      } else if (["contact", "support", "help"].some(k => lower.includes(k))) {
        aiResp.text = "You can reach us via the Contact page, or send your issue here and I'll guide you.";
        aiResp.suggestions = ["Contact Us Page", "Report a Bug", "Ask a Question"];
      } else if (["faq", "questions", "common"].some(k => lower.includes(k))) {
        aiResp.text = "Here are some frequently asked questions:\n- How do I search properties?\n- How do I contact agents?\n- How do I upload my property?\nLet me know if you want details on any.";
        aiResp.suggestions = ["Search Properties", "Contact Agents", "Upload Property"];
      } else if (["start guided tour", "tour"].some(k => lower.includes(k))) {
        aiResp.text = "Welcome to the site tour! This is the homepage. Use the top navigation for Map, Chatbot, and Account. Want to continue?";
        aiResp.suggestions = ["Continue Tour", "End Tour"];
      } else if (["continue tour"].some(k => lower.includes(k))) {
        aiResp.text = "On the Map page, you can find properties visually, view details, and see stories. On the Account page, manage your info and see your activity. Need help with something specific?";
        aiResp.suggestions = ["End Tour", "Show More"];
      } else if (["end tour"].some(k => lower.includes(k))) {
        aiResp.text = "Tour ended! Let me know if you have any other questions or if you'd like to revisit any section.";
        aiResp.suggestions = ["Website Features", "Contact Support", "FAQ"];
      } else if (["map"].some(k => lower.includes(k))) {
        aiResp.text = "On the Map page, you can explore properties visually, filter listings, and click pins for details. Want a demo or help navigating the map?";
        aiResp.suggestions = ["Map Demo", "Filter Properties", "Back"];
      } else if (["stories"].some(k => lower.includes(k))) {
        aiResp.text = "Stories let users upload short videos or images about properties. Click a pin with a story badge to view or upload your own!";
        aiResp.suggestions = ["How to Upload", "View Stories", "Back"];
      } else if (["chatbot"].some(k => lower.includes(k))) {
        aiResp.text = "The Support ChatBot helps you 24/7 with any questions, navigation, and troubleshooting!";
        aiResp.suggestions = ["Website Features", "Navigation Help", "Account Settings"];
      } else if (["upload"].some(k => lower.includes(k))) {
        aiResp.text = "To upload a property or a story, go to the respective section, click 'Upload', and follow the instructions.";
        aiResp.suggestions = ["Upload Property", "Upload Story", "Back"];
      } else if (["bug", "error", "issue"].some(k => lower.includes(k))) {
        aiResp.text = "Oh no! Please describe the issue you encountered, and I'll help you or connect you to support.";
        aiResp.suggestions = ["Home", "Contact Support"];
      } else if (["emoji"].some(k => lower.includes(k))) {
        aiResp.text = "You can use emojis in your messages! 😃🎉🏠";
      } else {
        aiResp.text = "I'm here to help! Please ask about website features, navigation, your account, or contact support.";
        aiResp.suggestions = [
          "Website Features", "Navigation Help", "Account Settings", "Contact Support", "Site Tour", "FAQ"
        ];
      }

      setMessages(prev =>
        prev
          .filter((m) => !m.typing)
          .concat(aiResp)
      );
    }, 900);
  };

  // Send message
  const handleSendMessage = (customValue?: string) => {
    const value = typeof customValue === 'string' ? customValue : inputValue;
    if (value.trim() || upload) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: value,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: upload ? URL.createObjectURL(upload) : undefined
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      setUpload(null);
      setShowEmoji(false);

      handleAIResponse(value);
    }
  };

  // File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUpload(e.target.files[0]);
  };

  // Emoji
  const emojiList = ["😀", "🎉", "🏠", "👍", "😃", "💬", "❓", "🚀", "🏡", "🤖"];
  const handleAddEmoji = (emoji: string) => {
    setInputValue((v) => v + emoji);
    setShowEmoji(false);
  };

  // Voice (demo only)
  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-auto transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div className={`absolute bottom-4 right-4 w-96 pointer-events-auto transform transition-all duration-300 ease-out ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
      }`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">Support ChatBot</h3>
                  <p className="text-xs text-teal-100">Your website assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                  title="Minimize"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 h-8 w-8"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.location.reload()}
                  className="text-white hover:bg-white/20 h-8 w-8"
                  title="Refresh chat"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Chat Content */}
          <div className={`transition-all duration-300 ${isMinimized ? 'h-0' : 'h-96'} overflow-hidden`}>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl transition-colors shadow ${
                      message.sender === 'user'
                        ? 'bg-teal-500 text-white rounded-br-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm border border-blue-100 dark:border-gray-600'
                    }`}
                  >
                    {message.typing ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="bg-blue-200 rounded-full w-2 h-2 animate-bounce"></span>
                        <span className="bg-blue-300 rounded-full w-2 h-2 animate-bounce delay-100"></span>
                        <span className="bg-blue-400 rounded-full w-2 h-2 animate-bounce delay-200"></span>
                        <span className="ml-2 text-xs text-blue-400">typing...</span>
                      </span>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.attachment && (
                          <div className="mt-2">
                            <a
                              href={message.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 underline"
                            >
                              View attachment
                            </a>
                          </div>
                        )}
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-teal-100' : 'text-blue-400 dark:text-blue-300'
                        }`}>
                          {message.timestamp}
                        </p>
                        {message.suggestions && (
                          <div className="inline-flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((s) => (
                              <Button
                                key={s}
                                variant="outline"
                                size="xs"
                                onClick={() => handleSendMessage(s)}
                                className="text-xs rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 transition"
                              >
                                {s}
                              </Button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Quick replies */}
            <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex flex-wrap gap-2">
                {[
                  "Website Features", "Navigation Help", "Account Settings", "Contact Support", "Site Tour", "FAQ"
                ].map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs h-7 px-3 rounded-full border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
            {/* Input area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex space-x-2 items-end">
                {/* Emoji */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-200"
                    onClick={() => setShowEmoji(e => !e)}
                    title="Emoji"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  {showEmoji && (
                    <div className="absolute bottom-12 left-0 z-10 bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-1 w-44 border border-blue-100">
                      {emojiList.map((emoji) => (
                        <button
                          type="button"
                          key={emoji}
                          onClick={() => handleAddEmoji(emoji)}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                      <Button
                        variant="ghost"
                        size="xs"
                        className="absolute top-1 right-1"
                        onClick={() => setShowEmoji(false)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {/* Attach */}
                <label className="flex items-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,video/*,.pdf"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-200"
                    as="span"
                    title="Attach file"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </label>
                {upload && (
                  <span className="text-xs text-blue-500 truncate max-w-[80px]">{upload.name}</span>
                )}
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Type your message..."}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-full border-blue-200 focus:border-teal-500 focus:ring-teal-500"
                  disabled={isListening}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-teal-500 hover:bg-teal-600 rounded-full"
                  title="Send"
                  disabled={isListening}
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  className={`rounded-full border-blue-200 ${isListening ? "animate-pulse bg-teal-100" : ""}`}
                  title="Voice input"
                  onClick={handleMicClick}
                  disabled={isListening}
                >
                  <Mic className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', sender: ChatSender.AI, text: "Hi! I'm Abdulfetah's AI assistant. Ask me anything about his experience, skills, or projects." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    "What are your key skills?",
    "Tell me about the Fetan Digital Platform",
    "What is your experience with AI?",
    "How can I contact you?",
    "What certifications do you have?",
    "Tell me about your work at Sheger Systems",
    "Explain the Customer Churn project",
    "What is your educational background?",
    "Tell me about the OneGov platform",
    "Do you have experience with AWS?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = typeof textOverride === 'string' ? textOverride : input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessagePlaceholder: ChatMessage = {
      id: aiMessageId,
      sender: ChatSender.AI,
      text: ''
    };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    try {
      const stream = sendMessageStream(userMessage.text);
      let fullText = '';
      
      for await (const chunk of stream) {
        if (chunk) {
            fullText += chunk;
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: fullText } : msg
            ));
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: "Sorry, I encountered an error processing your request." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Abdulfetah's AI Assistant</h3>
                <p className="text-xs text-purple-100">Powered by Gemini 3.0 Pro</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition hover:rotate-90 duration-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.sender === ChatSender.USER 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}>
                   {msg.sender === ChatSender.AI && (
                       <div className="flex items-center gap-1 mb-1 opacity-50 text-xs font-bold uppercase tracking-wide">
                           <Bot size={12} className="transition-transform hover:scale-125 hover:rotate-12" /> AI Assistant
                       </div>
                   )}
                   <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                   {msg.text === '' && isLoading && (
                       <div className="flex space-x-1 mt-2">
                           <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                           <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                           <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                       </div>
                   )}
                </div>
              </div>
            ))}
            
            {/* Example Prompts - Show only when there is just the welcome message */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 gap-2 mt-4 px-1 animate-fade-in delay-200">
                <p className="text-xs text-slate-400 font-medium mb-1 ml-1">Suggested questions:</p>
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-sm bg-white border border-slate-200 hover:border-primary hover:text-primary hover:bg-purple-50 text-slate-600 py-2.5 px-3 rounded-xl transition-all shadow-sm hover:shadow-md text-xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my projects..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group/btn"
              >
                <Send size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-purple-800 hover:scale-105 transition-all duration-300"
      >
        {isOpen ? <X size={24} className="transition-transform rotate-0 group-hover:rotate-90" /> : <MessageSquare size={24} className="group-hover:animate-bounce" />}
      </button>
    </div>
  );
};

export default ChatWidget;
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Terminal } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0', 
      sender: ChatSender.AI, 
      text: "Hi! I'm Abdulfetah's Engineering Assistant. Ask me anything about his full-stack systems, .NET 10 APIs, Angular architecture, or engineering journey." 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    "Tell me about the TMS API project",
    "What is Abdulfetah's approach to clean architecture?",
    "How does he build secure APIs with JWT and OAuth?",
    "Explain the Fetan marketplace system",
    "What are his core skills in Angular and .NET 10?",
    "How can I contact Abdulfetah for an engineering role?"
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
        msg.id === aiMessageId ? { ...msg, text: "I apologize, but I encountered an error processing your query. Please feel free to email Abdulfetah directly!" } : msg
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
        <div className="mb-4 w-[92vw] sm:w-[410px] h-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-slide-up transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 dark:from-purple-950 dark:to-slate-900 p-4 flex justify-between items-center text-white border-b border-purple-700/40 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-xs">
                <Terminal size={17} className="text-purple-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-white">.NET Resume Assistant</h3>
                <p className="text-[11px] text-purple-200">Powered by Gemini 2.5 Flash</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 p-1.5 rounded-full transition-colors text-white"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 dark:bg-slate-950 scrollbar-hide text-xs sm:text-sm">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-xs ${
                  msg.sender === ChatSender.USER 
                    ? 'bg-purple-700 dark:bg-purple-600 text-white rounded-br-xs' 
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-xs'
                }`}>
                  {msg.sender === ChatSender.AI && (
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                      <Bot size={13} /> Abdulfetah's AI Representative
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  
                  {msg.text === '' && isLoading && (
                    <div className="flex space-x-1.5 mt-2 py-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="space-y-1.5 mt-3 pt-2 animate-fade-in">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider ml-1">
                  Suggested topics:
                </p>
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/70 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 py-2 px-3 rounded-xl transition-all shadow-2xs font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about .NET, Angular, training..."
                className="w-full pl-3.5 pr-11 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all text-xs text-slate-900 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-purple-700 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-800 dark:hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-purple-700 dark:bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-900/30 hover:bg-purple-800 dark:hover:bg-purple-500 hover:scale-105 transition-all duration-300 active:scale-95"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
};

export default ChatWidget;

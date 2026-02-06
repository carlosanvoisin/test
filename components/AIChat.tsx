/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Pronto a rompere il loop? Chiedimi come possiamo trasformare il tuo brand. 🔴' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-[400px] bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#489FDB] p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-white" />
                <h3 className="font-heading font-bold text-white tracking-[0.2em] text-sm">LOOP STRATEGIST</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:scale-110 transition-transform">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-6 space-y-4 scroll-smooth bg-black/40"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-bold'
                        : 'bg-white/5 text-gray-200 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 flex gap-2">
                    <span className="w-2 h-2 bg-[#489FDB] rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-[#489FDB] rounded-full animate-pulse delay-75" />
                    <span className="w-2 h-2 bg-[#489FDB] rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="La tua sfida creativa..."
                  className="flex-1 bg-transparent text-white placeholder-white/20 text-sm focus:outline-none uppercase tracking-widest font-bold"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#489FDB] p-3 hover:bg-white hover:text-black transition-colors disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-none bg-[#489FDB] flex items-center justify-center shadow-2xl z-50 group"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
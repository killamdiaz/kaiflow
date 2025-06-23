
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface KAIAWelcomeProps {
  userName: string;
  onContinue: () => void;
}

export function KAIAWelcome({ userName, onContinue }: KAIAWelcomeProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  
  const welcomeMessage = `👋 Welcome back, ${userName}. Ready to launch your next campaign?`;
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < welcomeMessage.length) {
        setDisplayText(welcomeMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [welcomeMessage]);
  
  return (
    <div className="min-h-screen bg-dark-bg relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle, #00D9FF 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
      
      {/* Floating Orbs */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-4 text-center">
        {/* KAIA Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-12 h-12 text-dark-bg" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-xl opacity-30 animate-pulse" />
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-dark-bg rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-dark-bg rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 bg-dark-bg rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-dark-card/80 backdrop-blur-xl border border-neon-blue/20 rounded-2xl p-8 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.15)]" />
            
            <div className="relative z-10">
              <p className="text-xl text-dark-text leading-relaxed">
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {!isTyping && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onContinue}
                className="cyber-button flex items-center justify-center space-x-2 px-8 py-4"
              >
                <span>Start a new campaign</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={onContinue}
                className="px-8 py-4 bg-dark-card/50 hover:bg-dark-card border border-dark-border hover:border-neon-blue/50 text-dark-text rounded-lg transition-all duration-300"
              >
                Resume last campaign
              </button>
            </div>
            
            <button
              onClick={onContinue}
              className="text-dark-muted hover:text-neon-blue transition-colors text-sm"
            >
              Skip to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

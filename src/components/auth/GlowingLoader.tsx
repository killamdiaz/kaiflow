
import React from 'react';

interface GlowingLoaderProps {
  message?: string;
  type?: 'ring' | 'orb' | 'shimmer';
}

export function GlowingLoader({ message = "Loading...", type = 'ring' }: GlowingLoaderProps) {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle, #00D9FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
      
      <div className="relative z-10 text-center">
        {/* Loader */}
        {type === 'ring' && (
          <div className="relative">
            <div className="w-32 h-32 border-4 border-dark-border border-t-neon-blue rounded-full animate-spin" />
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-r-neon-purple rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <div className="absolute inset-4 w-24 h-24 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-xl animate-pulse" />
          </div>
        )}
        
        {type === 'orb' && (
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 border-2 border-neon-blue rounded-full animate-ping" />
          </div>
        )}
        
        {type === 'shimmer' && (
          <div className="relative">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-4 h-12 bg-gradient-to-t from-neon-blue to-neon-purple rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Message */}
        <div className="mt-8 space-y-2">
          <p className="text-neon-blue font-medium text-lg">{message}</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

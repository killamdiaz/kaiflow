
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg relative flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="w-full h-full animate-grid-float"
          style={{
            backgroundImage: `radial-gradient(circle, #00D9FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glassmorphic Container */}
        <div className="bg-dark-card/80 backdrop-blur-xl border border-neon-blue/20 rounded-2xl p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 rounded-2xl" />
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.15)]" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-dark-bg rounded-md" />
                </div>
              </div>
              <h1 className="text-2xl font-bold gradient-text mb-2">{title}</h1>
              {subtitle && (
                <p className="text-dark-muted text-sm">{subtitle}</p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

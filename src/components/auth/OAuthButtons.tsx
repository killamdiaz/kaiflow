
import React from 'react';

export function OAuthButtons() {
  return (
    <div className="space-y-3">
      <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-dark-text font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group">
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <span className="text-black text-xs font-bold">G</span>
        </div>
        <span>Continue with Google</span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      
      <button className="w-full bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/30 hover:border-[#0077B5]/50 text-dark-text font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group">
        <div className="w-5 h-5 bg-[#0077B5] rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">in</span>
        </div>
        <span>Continue with LinkedIn</span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}

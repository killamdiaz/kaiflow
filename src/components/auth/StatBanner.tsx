
import React, { useState, useEffect } from 'react';

export function StatBanner() {
  const [count, setCount] = useState(0);
  const targetCount = 22341;
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= targetCount) {
          clearInterval(timer);
          return targetCount;
        }
        return next;
      });
    }, 16);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="text-center py-4 px-6 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg border border-neon-blue/20 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-neon-blue">🚀</span>
        <span className="text-dark-text">
          <span className="font-mono font-bold text-neon-blue">
            {Math.floor(count).toLocaleString()}
          </span>
          <span className="text-dark-muted"> cold campaigns launched this month</span>
        </span>
      </div>
    </div>
  );
}

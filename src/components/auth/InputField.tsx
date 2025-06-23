
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
}

export function InputField({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon, 
  error,
  required 
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="space-y-1">
      <div className={`relative group ${error ? 'animate-shake' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg blur-sm transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted">
              {icon}
            </div>
          )}
          
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${type === 'password' ? 'pr-10' : 'pr-4'} py-3 bg-dark-card/50 border rounded-lg text-dark-text placeholder-dark-muted transition-all duration-300 focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                : 'border-dark-border focus:ring-neon-blue/30 focus:border-neon-blue hover:border-neon-blue/50'
            }`}
          />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-muted hover:text-neon-blue transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-red-400 text-xs ml-1 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

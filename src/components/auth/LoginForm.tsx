
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { InputField } from './InputField';
import { OAuthButtons } from './OAuthButtons';
import { StatBanner } from './StatBanner';

interface LoginFormProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onLogin, onSwitchToSignup, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <AuthLayout 
      title="Welcome back to KaiFlow" 
      subtitle="Launch your next cold email campaign"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          icon={<Mail className="w-4 h-4" />}
          required
        />
        
        <InputField
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          icon={<Lock className="w-4 h-4" />}
          required
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-card checked:bg-neon-blue" />
            <span className="text-dark-muted">Remember me</span>
          </label>
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-neon-blue hover:text-neon-purple transition-colors"
          >
            Forgot password?
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="cyber-button w-full relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-dark-card text-dark-muted">or continue with</span>
          </div>
        </div>
        
        <OAuthButtons />
        
        <div className="text-center text-sm text-dark-muted">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-neon-blue hover:text-neon-purple transition-colors font-medium"
          >
            Sign up
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        <StatBanner />
      </div>
    </AuthLayout>
  );
}

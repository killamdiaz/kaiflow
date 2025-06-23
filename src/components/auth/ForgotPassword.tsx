
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { InputField } from './InputField';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  if (isSuccess) {
    return (
      <AuthLayout 
        title="Check your email" 
        subtitle="Password reset link sent"
      >
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-8 h-8 text-dark-bg" />
          </div>
          
          <div className="space-y-2">
            <p className="text-dark-text">
              We've sent a password reset link to:
            </p>
            <p className="text-neon-blue font-medium">{email}</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-dark-muted">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <button
              onClick={() => setIsSuccess(false)}
              className="text-neon-blue hover:text-neon-purple transition-colors text-sm font-medium"
            >
              Try different email
            </button>
          </div>
          
          <button
            onClick={onBackToLogin}
            className="flex items-center justify-center space-x-2 w-full py-3 text-dark-muted hover:text-neon-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to sign in</span>
          </button>
        </div>
      </AuthLayout>
    );
  }
  
  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your email to receive a reset link"
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
        
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="cyber-button w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
              <span>Sending reset link...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </button>
        
        <button
          type="button"
          onClick={onBackToLogin}
          className="flex items-center justify-center space-x-2 w-full py-3 text-dark-muted hover:text-neon-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sign in</span>
        </button>
      </form>
    </AuthLayout>
  );
}

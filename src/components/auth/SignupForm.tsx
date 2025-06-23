
import React, { useState } from 'react';
import { User, Mail, Lock, Building } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { InputField } from './InputField';
import { OAuthButtons } from './OAuthButtons';

interface SignupFormProps {
  onSignup: (email: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const roles = [
    'Sales Representative',
    'Sales Manager',
    'Marketing Manager',
    'Business Development',
    'Founder/CEO',
    'Other'
  ];
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignup(formData.email);
      setIsLoading(false);
    }, 1500);
  };
  
  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  return (
    <AuthLayout 
      title="Join KaiFlow" 
      subtitle="Start your cold email journey today"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          type="text"
          placeholder="Full name"
          value={formData.fullName}
          onChange={(value) => updateField('fullName', value)}
          icon={<User className="w-4 h-4" />}
          error={errors.fullName}
          required
        />
        
        <InputField
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          icon={<Mail className="w-4 h-4" />}
          error={errors.email}
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            type="text"
            placeholder="Company (optional)"
            value={formData.company}
            onChange={(value) => updateField('company', value)}
            icon={<Building className="w-4 h-4" />}
          />
          
          <div className="relative">
            <select
              value={formData.role}
              onChange={(e) => updateField('role', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-card/50 border border-dark-border hover:border-neon-blue/50 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 rounded-lg text-dark-text transition-all duration-300 focus:outline-none appearance-none"
            >
              <option value="">Select role (optional)</option>
              {roles.map(role => (
                <option key={role} value={role} className="bg-dark-card text-dark-text">
                  {role}
                </option>
              ))}
            </select>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted pointer-events-none" />
          </div>
        </div>
        
        <InputField
          type="password"
          placeholder="Create password"
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          icon={<Lock className="w-4 h-4" />}
          error={errors.password}
          required
        />
        
        <InputField
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(value) => updateField('confirmPassword', value)}
          icon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword}
          required
        />
        
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => updateField('agreeToTerms', e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-dark-border bg-dark-card checked:bg-neon-blue flex-shrink-0"
            />
            <span className="text-sm text-dark-muted">
              I agree to the{' '}
              <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-400 text-xs ml-7">{errors.agreeToTerms}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="cyber-button w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
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
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-neon-blue hover:text-neon-purple transition-colors font-medium"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

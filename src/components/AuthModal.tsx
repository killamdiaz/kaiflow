
import { useState } from "react";
import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/SignupForm";
import { ForgotPassword } from "./auth/ForgotPassword";
import { KAIAWelcome } from "./auth/KAIAWelcome";
import { GlowingLoader } from "./auth/GlowingLoader";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

type AuthState = 'login' | 'signup' | 'forgot' | 'welcome' | 'loading';

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [userEmail, setUserEmail] = useState('');

  if (!isOpen) return null;

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setAuthState('loading');
    
    // Simulate loading then show welcome
    setTimeout(() => {
      setAuthState('welcome');
    }, 2000);
  };

  const handleSignup = (email: string) => {
    setUserEmail(email);
    setAuthState('loading');
    
    // Simulate loading then show welcome
    setTimeout(() => {
      setAuthState('welcome');
    }, 2000);
  };

  const handleWelcomeContinue = () => {
    onLogin(userEmail);
    onClose();
  };

  // Render based on current state
  switch (authState) {
    case 'loading':
      return (
        <div className="fixed inset-0 z-50">
          <GlowingLoader message="KAIA is preparing your dashboard..." type="orb" />
        </div>
      );
      
    case 'welcome':
      return (
        <div className="fixed inset-0 z-50">
          <KAIAWelcome 
            userName={userEmail.split('@')[0]} 
            onContinue={handleWelcomeContinue}
          />
        </div>
      );
      
    case 'login':
      return (
        <div className="fixed inset-0 z-50">
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthState('signup')}
            onForgotPassword={() => setAuthState('forgot')}
          />
        </div>
      );
      
    case 'signup':
      return (
        <div className="fixed inset-0 z-50">
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthState('login')}
          />
        </div>
      );
      
    case 'forgot':
      return (
        <div className="fixed inset-0 z-50">
          <ForgotPassword
            onBackToLogin={() => setAuthState('login')}
          />
        </div>
      );
      
    default:
      return null;
  }
}

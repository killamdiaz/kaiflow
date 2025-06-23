
import { Bell, Search, Settings, User, Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-dark-bg" />
          </div>
          <h1 className="text-xl font-bold gradient-text">KaiFlow</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search campaigns, leads..."
            className="cyber-input pl-10 w-64"
          />
        </div>

        <Button variant="ghost" size="icon" className="hover:bg-dark-bg">
          <Bell className="w-5 h-5 text-dark-muted" />
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-dark-bg">
          <Settings className="w-5 h-5 text-dark-muted" />
        </Button>

        {user ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark-text">{user}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-dark-bg"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-dark-muted" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-dark-bg"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User className="w-5 h-5 text-dark-muted" />
          </Button>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </header>
  );
}

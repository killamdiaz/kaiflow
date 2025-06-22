
import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-dark-border bg-dark-bg/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-dark-text hover:text-neon-blue" />
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search campaigns, leads, templates..."
            className="cyber-input pl-10 w-96"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-dark-card">
          <Bell className="w-5 h-5 text-dark-text" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-blue rounded-full"></span>
        </Button>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-dark-text">John Doe</div>
            <div className="text-xs text-dark-muted">Pro Plan</div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-dark-bg" />
          </div>
        </div>
      </div>
    </header>
  );
}

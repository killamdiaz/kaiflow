
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Mail,
  Users,
  Inbox,
  FileText,
  Settings,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Campaigns", url: "/campaigns", icon: Mail },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Templates", url: "/templates", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "flex items-center space-x-3 w-full text-left transition-all duration-300 hover:bg-neon-blue/10 hover:text-neon-blue";
    return isActive(path) 
      ? `${baseClasses} bg-neon-blue/20 text-neon-blue shadow-neon-blue` 
      : `${baseClasses} text-dark-text`;
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-dark-bg border-r border-dark-border`}>
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-dark-bg" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold gradient-text">ColdFlow</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? 'text-neon-blue' : 'text-dark-muted'}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade prompt */}
        {!collapsed && (
          <div className="mt-auto pt-8">
            <div className="cyber-card p-4 neon-glow">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-dark-text mb-2">Upgrade to Pro</h3>
                <p className="text-xs text-dark-muted mb-3">Unlock unlimited campaigns and advanced features</p>
                <button className="w-full cyber-button py-2 text-sm">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

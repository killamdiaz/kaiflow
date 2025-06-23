
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dark-bg relative">
        {/* Dot/Grid Pattern Background */}
        <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #00D9FF 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0',
            }}
          />
        </div>
        
        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

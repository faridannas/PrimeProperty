"use client";

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

import { NotificationProvider } from './NotificationContext';
import { UserProvider } from './UserContext';

export default function AgentLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Do not show sidebar on login page
  if (pathname === '/agent/login') {
    return <>{children}</>;
  }
  
  return (
    <UserProvider>
      <NotificationProvider>
        <div className="flex h-screen bg-prime-black font-sans text-prime-white overflow-hidden relative">
          {/* Background Ambience (Glassmorphic vibe) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prime-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* Mobile Navbar Header */}
          <div className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-[#111111]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
            <img src="/logo.png" alt="Prime Living Logo" className="h-8 object-contain brightness-200" />
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white hover:text-prime-gold transition">
              <Menu size={24} />
            </button>
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Navigation */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          {/* MAIN CONTENT AREA with Page Transition */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pt-20 p-6 lg:pt-10 lg:p-10 relative z-0 w-full">
             <AnimatePresence mode="wait">
               <motion.div
                 key={pathname}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                 className="min-h-full"
               >
                 {children}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </NotificationProvider>
    </UserProvider>
  );
}

'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto p-6 space-y-12">
          {children}
        </main>
      </div>
    </div>
  );
}

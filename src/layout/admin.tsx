import React, { type PropsWithChildren, lazy } from 'react';

import { useOutlet } from 'react-router-dom';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const AdminSidebar = lazy(() => import('@/components/admin/adminSidebar'));
const AdminHeader = lazy(() => import('@/components/admin/adminHeader'));

export const AdminLayout: React.FC<PropsWithChildren> = () => {
  const outlet = useOutlet();

  return (
    <SidebarProvider defaultOpen={true} style={{ '--sidebar-width': '15rem' } as React.CSSProperties}>
      <div className="flex min-h-screen w-full transition-all duration-300 ease-in-out">
        <AdminSidebar />
        <SidebarInset className="flex-1 transition-all duration-300 ease-in-out">
          <AdminHeader />
          <main className="max-h-[calc(100vh-66px)] flex-1 overflow-y-auto p-10 transition-all duration-300 ease-in-out">
            {outlet}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

import { useMutation } from '@tanstack/react-query';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

import { ROLE, adminNavigationItems, companyNavigationItems } from '@/constants';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';

const AdminSidebar = () => {
  const { open } = useSidebar();
  const { user } = useAuthStore();
  const { logout } = useAuthService();
  const location = useLocation();

  const navigationItems = user?.role === ROLE.ADMIN ? adminNavigationItems : companyNavigationItems;

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  return (
    <Sidebar
      collapsible="icon"
      className="sidebar-container group relative w-[65px] shadow-xl shadow-cyan-700/50 transition-all duration-300 ease-in-out dark:shadow-cyan-700"
    >
      <SidebarHeader className="border-sidebar-border border-b transition-all duration-300">
        <div className="my-3 flex h-[25px] items-center gap-2 px-2 transition-all duration-300">
          <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-lg p-3 transition-all duration-300">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {open && (
            <div className="flex flex-col transition-all duration-300">
              <span className="h-5 text-sm font-semibold">Xin chào, {user?.email.split('@')[0]}</span>
              <span className="text-muted-foreground text-xs">{user?.role}</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="transition-all duration-300">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a
                        href={item.url}
                        className={`flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-300 ${
                          isActive ? 'bg-sidebar-accent font-semibold text-cyan-800' : 'hover:bg-sidebar-accent'
                        }`}
                      >
                        <item.icon size={64} className="transition-all duration-300" />
                        {open && <span className="text-base transition-all duration-300">{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t transition-all duration-300">
        <div className="space-y-2 p-2">
          {user && (
            <SidebarMenuButton
              tooltip="Logout"
              className="hover:bg-sidebar-accent w-full cursor-pointer justify-start transition-all duration-300"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4 transition-all duration-300" />
              {open && <span className="transition-all duration-300">Đăng xuất</span>}
            </SidebarMenuButton>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;

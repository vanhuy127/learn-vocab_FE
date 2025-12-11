import { lazy } from 'react';

import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { Separator } from '../ui/separator';

const ThemeControl = lazy(() => import('@/components/themeControl'));

const AdminHeader = () => {
  return (
    <header className="bg-background flex h-[66px] shrink-0 items-center justify-between gap-2 border-b px-4 transition-all duration-300">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hover:bg-accent transition-all duration-200 hover:scale-105" />
        <Separator orientation="vertical" className="h-4 transition-all duration-300" />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeControl />
      </div>
    </header>
  );
};

export default AdminHeader;

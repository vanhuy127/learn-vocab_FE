import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Menu, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROLE, ROUTE_PATH } from '@/constants';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';

import ThemeControl from './themeControl';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const { logout } = useAuthService();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  const navigationItems = [
    { name: 'Trang chủ', href: ROUTE_PATH.USER.HOME },
    { name: 'Tìm kiếm', href: ROUTE_PATH.USER.SEARCH },
    { name: 'Thư viện của tôi', href: ROUTE_PATH.USER.LIBRARY },
  ];

  const userMenuItems = {
    [ROLE.ADMIN]: [{ name: 'Trang quản trị', href: ROUTE_PATH.ADMIN.DASHBOARD }],
    [ROLE.USER]: [{ name: 'Tài khoản', href: ROUTE_PATH.USER.ACCOUNT }],
  };

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-foreground hidden text-xl font-bold sm:inline">
              Yuh<span className="text-white dark:text-[#31694e]">Nav</span> Learning
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/70 hover:text-primary group relative font-medium transition"
              >
                {item.name}
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeControl />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-30">
                  <DropdownMenuLabel className="text-center">
                    Xin chào, {user.userName ? user.userName : 'user'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems[user.role].map((item) => (
                    <DropdownMenuItem key={item.name} className="flex cursor-pointer items-center justify-center">
                      <Link to={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    className="text-destructive flex cursor-pointer items-center justify-center"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
              >
                <Link to={ROUTE_PATH.AUTH.LOGIN}>Đăng nhập</Link>
              </Button>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeControl />

            <button onClick={() => setIsOpen(!isOpen)} className="bg-muted hover:bg-muted/70 rounded-lg p-2 transition">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-border bg-background/95 animate-in fade-in border-t backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-3 px-4 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/70 hover:text-primary text-center font-medium transition"
                >
                  {item.name}
                </a>
              ))}
              {user ? (
                <Button
                  onClick={() => logoutMutation.mutate()}
                  className="bg-destructive text-destructive-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
                >
                  Đăng xuất
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
                >
                  <Link to={ROUTE_PATH.AUTH.LOGIN} onClick={() => setIsOpen(false)}>
                    Đăng nhập
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

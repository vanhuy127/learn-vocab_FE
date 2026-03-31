import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Menu, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
import AddControl from './user/AddControl';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { user } = useAuthStore();
  const { logout } = useAuthService();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  const navigationItems = [
    { name: 'Trang chủ', href: ROUTE_PATH.USER.HOME },
    { name: 'Tìm kiếm', href: ROUTE_PATH.USER.SEARCH },
    { name: 'Thư viện của tôi', href: ROUTE_PATH.USER.LIBRARY },
    { name: 'Thách đấu', href: ROUTE_PATH.USER.BATTLE.MATCHMAKING },
  ];

  const userMenuItems = {
    [ROLE.ADMIN]: [{ name: 'Trang quản trị', href: ROUTE_PATH.ADMIN.DASHBOARD }],
    [ROLE.USER]: [{ name: 'Tài khoản', href: ROUTE_PATH.USER.ACCOUNT }],
  };

  const isActivePath = (href: string) => {
    if (href === ROUTE_PATH.USER.HOME) {
      return location.pathname === href;
    }

    return location.pathname.startsWith(href);
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

          <nav className="hidden items-center gap-4 md:flex">
            {navigationItems.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative rounded-full px-4 py-2 font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                >
                  {/* 1. Phần chữ hiển thị bên trên */}
                  <span className="relative z-10">{item.name}</span>

                  {/* 2. Phần nền trượt (Chỉ render khi isActive = true) */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="bg-primary/12 shadow-primary/10 absolute inset-0 z-0 rounded-full shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* 3. Phần gạch chân hover */}
                  <span
                    className={`bg-primary absolute -bottom-1 left-4 h-0.5 w-0 transition-all duration-300 ${!isActive && 'group-hover:w-[calc(100%-2rem)]'
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <AddControl />
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
            <AddControl />
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
              {navigationItems.map((item) => {
                const isActive = isActivePath(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-xl px-4 py-3 text-center font-medium transition ${isActive
                      ? 'border-primary/20 bg-primary/12 text-primary border'
                      : 'text-foreground/70 hover:text-primary hover:bg-muted'
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
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

import { lazy, useState } from 'react';

import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { ROUTE_PATH } from '@/constants/router';

const ThemeControl = lazy(() => import('@/components/themeControl'));

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Công việc', href: '/products' },
    { name: 'Đối tác', href: '/services' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Yuh<span className="text-cyan-600 dark:text-cyan-400">nav</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group relative text-sm font-medium text-slate-600 transition-all duration-200 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full dark:bg-cyan-400"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-3 md:flex">
            <Button
              asChild
              className="transform cursor-pointer rounded-lg bg-cyan-600 px-6 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-cyan-700 hover:shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-600"
            >
              <Link to={ROUTE_PATH.AUTH.LOGIN}>Đăng nhập</Link>
            </Button>
            <ThemeControl />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer text-cyan-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-cyan-400 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-slate-200 bg-slate-50 sm:w-[400px] dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="relative mt-4 flex flex-col space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-center text-2xl font-semibold text-cyan-600 dark:text-cyan-400">Menu</span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 dark:text-gray-200 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 dark:hover:text-purple-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col space-y-3 border-t border-purple-200 pt-4 dark:border-purple-700">
                    <Button
                      asChild
                      className="mx-5 mt-4 cursor-pointer rounded-xl bg-cyan-600 font-semibold text-white shadow-lg hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
                    >
                      <Link to={ROUTE_PATH.AUTH.LOGIN} onClick={() => setIsOpen(false)}>
                        Đăng nhập
                      </Link>
                    </Button>
                    <div className="flex justify-center p-5">
                      <ThemeControl />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

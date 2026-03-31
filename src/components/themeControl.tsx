import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/themeProvider';
import { Button } from '@/components/ui/button';

const ThemeControl = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5 text-orange-500" />;
      case 'dark':
        return <Moon className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="bg-muted/50 hover:bg-muted relative h-10 w-10 overflow-hidden rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme} // Key thay đổi sẽ kích hoạt animation
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {getCurrentIcon()}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Chuyển đổi giao diện</span>
    </Button>
  );
};

export default ThemeControl;

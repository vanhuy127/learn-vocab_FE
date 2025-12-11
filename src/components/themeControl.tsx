import { Monitor, Moon, Sun } from 'lucide-react';

import type { Theme } from '@/components/themeProvider';
import { useTheme } from '@/components/themeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Item = {
  value: Theme;
  label: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    value: 'light',
    label: 'Light',
    icon: <Sun />,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <Moon />,
  },
  {
    value: 'system',
    label: 'System',
    icon: <Monitor />,
  },
];

const ThemeControl = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.value} onClick={() => setTheme(item.value)} className="cursor-pointer">
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeControl;

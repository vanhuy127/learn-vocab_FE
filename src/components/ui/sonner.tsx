import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheck className="text-success mt-1" />,
        error: <CircleAlert className="text-error mt-1" />,
        warning: <TriangleAlert className="text-warning mt-1" />,
        info: <Info className="text-info mt-1" />,
      }}
      position="top-center"
      expand
      closeButton
      {...props}
    />
  );
};

export { Toaster };

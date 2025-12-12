'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ROUTE_PATH } from '@/constants';
import { useAuthService } from '@/service/auth.service';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { login } = useAuthService();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get('returnUrl');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: FormData) => login(email, password),
    onSuccess: () => navigate(returnUrl || ROUTE_PATH.USER.HOME, { replace: true }),
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full border border-border bg-card shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-1 pt-3 pb-5 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 font-medium text-foreground">
                <MailIcon className="h-4 w-4 text-accent" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`border-2 py-3 pr-4 pl-4 text-foreground transition-all duration-200 focus:border-primary focus:ring-primary/30 ${errors.email
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                    : 'border-border'
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2 font-medium text-foreground">
                  <LockIcon className="h-4 w-4 text-accent" />
                  Password
                </Label>

                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:text-primary/80"
                  tabIndex={-1}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`border-2 py-3 pr-12 pl-4 text-foreground transition-all duration-200 focus:border-primary focus:ring-primary/30 ${errors.password
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                      : 'border-border'
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-muted-foreground hover:text-accent"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/80 disabled:opacity-50"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* SIGNUP */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {"Don't have an account?"}{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTE_PATH.AUTH.REGISTER);
                  }}
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

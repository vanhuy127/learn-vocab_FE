'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthService } from '@/service/auth.service';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { login } = useAuthService();
  const [showPassword, setShowPassword] = useState(false);

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
  });

  const onSubmit = async (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-1 pt-3 pb-5">
          <div className="pt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-700">
                <MailIcon className="h-4 w-4 text-cyan-500" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={`border-2 py-3 pr-4 pl-4 transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 hover:border-cyan-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2 font-medium text-gray-700">
                  <LockIcon className="h-4 w-4 text-teal-500" />
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-500"
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
                  className={`border-2 py-3 pr-12 pl-4 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-cyan-600"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full transform rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <button type="button" className="font-medium text-cyan-600 transition-colors hover:text-cyan-500">
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

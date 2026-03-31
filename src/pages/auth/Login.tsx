'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ROUTE_PATH } from '@/constants';
import { passwordSchema } from '@/schema/auth.schema';
import { useAuthService } from '@/service/auth.service';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { login } = useAuthService();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || ROUTE_PATH.USER.HOME;

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
    onSuccess: () => navigate(redirect, { replace: true }),
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-border bg-card w-full border shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-1 pt-3 pb-5 text-center">
          <h1 className="text-foreground text-2xl font-bold">YuhNav Learning</h1>
          <p className="text-muted-foreground mt-2 text-sm">Đăng nhập để tiếp tục</p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2 font-medium">
                <MailIcon className="text-accent h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                {...register('email')}
                className={`text-foreground focus:border-primary focus:ring-primary/30 border-2 py-3 pr-4 pl-4 transition-all duration-200 ${
                  errors.email
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                    : 'border-border'
                }`}
              />
              {errors.email && <p className="text-destructive mt-1 text-xs">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2 font-medium">
                  <LockIcon className="text-accent h-4 w-4" />
                  Password
                </Label>

                <button type="button" className="text-primary hover:text-primary/80 text-xs font-medium" tabIndex={-1}>
                  Quên mật khẩu?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu của bạn"
                  {...register('password')}
                  className={`text-foreground focus:border-primary focus:ring-primary/30 border-2 py-3 pr-12 pl-4 transition-all duration-200 ${
                    errors.password
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                      : 'border-border'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-accent absolute top-1/2 right-3 -translate-y-1/2 transform"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>

              {errors.password && <p className="text-destructive mt-1 text-xs">{errors.password.message}</p>}
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/80 w-full rounded-lg py-3 font-medium shadow-md transition-all duration-200 disabled:opacity-50"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Đăng nhập...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </Button>

            {/* SIGNUP */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                {'Bạn chưa có tài khoản?'}{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTE_PATH.AUTH.REGISTER);
                  }}
                  type="button"
                  className="text-primary hover:text-primary/80 cursor-pointer font-medium"
                >
                  Đăng ký
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

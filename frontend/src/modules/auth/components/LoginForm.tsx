"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, AlertCircle, Building2, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, type LoginSchemaType } from '../schemas/login.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError(null);
    const result = await login(data.email, data.password);
    
    if (result.error) {
      setServerError(result.error);
    } else {
      toast.success('Welcome Back 👋', { description: 'Successfully signed in.' });
      router.push('/dashboard');
    }
  };

  const handleDemoLogin = async (role: 'owner' | 'cashier') => {
    setIsDemoLoading(role);
    setServerError(null);
    
    // Auto-fill values to show the user what's happening
    const email = `${role}@nexvelt.com`;
    const password = 'password123'; // demo password
    
    setValue('email', email);
    setValue('password', password);

    const result = await login(email, password);
    
    if (result.error) {
      // It's possible the demo accounts aren't seeded in the DB yet, handle gracefully
      setServerError(`Demo login failed. Make sure demo accounts are seeded. (${result.error})`);
    } else {
      toast.success('Welcome Back 👋', { description: `Signed in as ${role}.` });
      router.push('/dashboard');
    }
    
    setIsDemoLoading(null);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto p-8 rounded-[24px] bg-white shadow-premium border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back 👋</h2>
        <p className="text-sm text-gray-500">Sign in to continue managing your business.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {serverError && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={cn(
                "h-12 bg-gray-50/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#00D9D9]/20 focus-visible:border-[#00D9D9] px-4",
                errors.email && "border-red-500 focus-visible:ring-red-500/20"
              )}
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={cn(
                "h-12 bg-gray-50/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#00D9D9]/20 focus-visible:border-[#00D9D9] px-4 pr-10",
                errors.password && "border-red-500 focus-visible:ring-red-500/20"
              )}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              id="rememberMe" 
              {...register('rememberMe')}
              className="w-4 h-4 text-[#00D9D9] border-gray-300 bg-white rounded focus:ring-[#00D9D9]" 
            />
            <Label htmlFor="rememberMe" className="text-sm font-medium text-gray-600 cursor-pointer">
              Remember Me
            </Label>
          </div>
          <a href="#" className="text-sm font-medium text-[#00D9D9] hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-button-gradient hover:opacity-90 text-[#05080D] rounded-xl shadow-button transition-all border-0"
          disabled={isSubmitting || !!isDemoLoading}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Login &rarr;</>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 text-base font-medium bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
          onClick={() => handleDemoLogin('owner')}
          disabled={isSubmitting || !!isDemoLoading}
        >
          <Building2 className="w-4 h-4 mr-2 text-[#00D9D9]" />
          Demo Login
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-medium tracking-wider">OR</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleDemoLogin('owner')}
          disabled={isSubmitting || !!isDemoLoading}
          className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-[#00D9D9]/50 hover:bg-[#00D9D9]/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#00D9D9]/10 flex items-center justify-center shrink-0">
            {isDemoLoading === 'owner' ? (
              <Loader2 className="w-4 h-4 text-[#00D9D9] animate-spin" />
            ) : (
              <User className="w-5 h-5 text-[#00D9D9]" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">Owner</p>
            <p className="text-[11px] text-gray-500 truncate">owner@nexvelt.com</p>
          </div>
        </button>

        <button
          onClick={() => handleDemoLogin('cashier')}
          disabled={isSubmitting || !!isDemoLoading}
          className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-[#00D9D9]/50 hover:bg-[#00D9D9]/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#00D9D9]/10 flex items-center justify-center shrink-0">
            {isDemoLoading === 'cashier' ? (
              <Loader2 className="w-4 h-4 text-[#00D9D9] animate-spin" />
            ) : (
              <User className="w-5 h-5 text-[#00D9D9]" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">Cashier</p>
            <p className="text-[11px] text-gray-500 truncate">cashier@nexvelt.com</p>
          </div>
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <a href="#" className="font-semibold text-[#00D9D9] hover:underline">Sign up</a>
      </p>
    </div>
  );
}

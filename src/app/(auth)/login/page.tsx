'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';
import { useAuthStore } from '@/store';
import { supabase } from '@/lib/supabase';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithUser } = useAuthStore();
  const [email, setEmail] = useState('admin@stroikefy.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Create user object from Supabase user
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          role: data.user.user_metadata?.role || 'worker',
          avatar: data.user.user_metadata?.avatar_url || '',
          createdAt: new Date(data.user.created_at),
        };
        
        loginWithUser(user);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
    }
  };

  const features = [
    'Project Management',
    'Workforce Tracking',
    'Financial Reports',
    'Inventory Control',
    'Interactive Maps',
    'Document Storage',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Stroikefy</h1>
              <p className="text-sm text-surface-500">Construction Management</p>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-surface-500">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-5 w-5" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-5 w-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-surface-400 hover:text-surface-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-surface-600 dark:text-surface-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              {!isLoading && (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
            <p className="text-sm font-medium text-surface-900 dark:text-white mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-500">Admin:</span>
                <span className="text-surface-700 dark:text-surface-300">admin@stroikefy.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Manager:</span>
                <span className="text-surface-700 dark:text-surface-300">sarah@stroikefy.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Password:</span>
                <span className="text-surface-700 dark:text-surface-300">password</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-surface-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold text-white mb-6">
            Manage Your Construction Projects with Ease
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Stroikefy is the all-in-one platform for construction companies to manage workforce, 
            projects, finances, and more from a single dashboard.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <p className="text-white/80 italic mb-4">
              &quot;Stroikefy has transformed how we manage our construction projects. 
              The real-time tracking and comprehensive reporting have saved us countless hours.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div>
                <p className="text-white font-medium">John Davis</p>
                <p className="text-white/60 text-sm">CEO, BuildRight Construction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Facebook, Twitter, Chrome, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/useAuthStore';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithWeChat, isLoading } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // In a real app, you would show an error message to the user
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // The user will be redirected to Google for authentication
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };
  
  const handleWeChatLogin = async () => {
    try {
      await loginWithWeChat();
      // The user will be redirected to WeChat for authentication
    } catch (error) {
      console.error('WeChat login failed:', error);
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.welcomeBack', 'Welcome Back')}
          </h2>
          <p className="text-gray-600">
            {t('auth.loginToContinue', 'Login to your account to continue')}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t('auth.email')}
              type="email"
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              error={errors.email?.message}
              {...register('email', { 
                required: t('validation.required', 'This field is required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.invalidEmail', 'Invalid email address')
                }
              })}
            />
            
            <Input
              label={t('auth.password')}
              type="password"
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              error={errors.password?.message}
              {...register('password', { 
                required: t('validation.required', 'This field is required'),
                minLength: {
                  value: 6,
                  message: t('validation.passwordLength', 'Password must be at least 6 characters')
                }
              })}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {t('auth.rememberMe', 'Remember me')}
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {t('auth.signIn', 'Sign in')}
          </Button>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('auth.loginWith')}
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                leftIcon={<Chrome className="h-5 w-5 text-red-500" />}
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                leftIcon={<MessageSquare className="h-5 w-5 text-green-500" />}
                onClick={handleWeChatLogin}
              >
                WeChat
              </Button>
            </div>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t('auth.dontHaveAccount')}
            {' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              {t('auth.signUpNow', 'Sign up now')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
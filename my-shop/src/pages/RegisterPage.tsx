import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Chrome, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/useAuthStore';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, loginWithGoogle, loginWithWeChat, isLoading } = useAuthStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
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
            {t('auth.createAccount', 'Create an Account')}
          </h2>
          <p className="text-gray-600">
            {t('auth.joinOurCommunity', 'Join our community of global shoppers')}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t('auth.name')}
              type="text"
              leftIcon={<User className="h-5 w-5 text-gray-400" />}
              error={errors.name?.message}
              {...register('name', { 
                required: t('validation.required', 'This field is required')
              })}
            />
            
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
            
            <Input
              label={t('auth.confirmPassword')}
              type="password"
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { 
                required: t('validation.required', 'This field is required'),
                validate: value => 
                  value === watch('password') || 
                  t('validation.passwordsDoNotMatch', 'Passwords do not match').toString()
              })}
            />
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                {t('auth.agreeToTerms', 'I agree to the')}
                {' '}
                <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('auth.termsAndConditions', 'Terms and Conditions')}
                </Link>
              </label>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {t('auth.createAccount', 'Create Account')}
          </Button>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('auth.registerWith')}
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
            {t('auth.alreadyHaveAccount')}
            {' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              {t('auth.signIn', 'Sign in')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
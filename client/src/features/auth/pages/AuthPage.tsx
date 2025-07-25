import { useEffect, useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { RegisterForm } from '../forms/register/RegisterForm';
import { LoginForm } from '../forms/LoginForm';
import { LogIn, UserPlus } from 'lucide-react';
import { GoogleOauthButton } from '../buttons/GoogleOauthButton';
import { useSearchParams } from 'react-router-dom';

export const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('mode') as 'register' | 'login' | null;
  const [mode, setMode] = useState<'register' | 'login'>(
    param === 'login' ? 'login' : 'register'
  );
  const [registerSteps, setRegisterSteps] = useState<1 | 2>(1);

useEffect(() => {
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set('mode', mode);
  setSearchParams(currentParams);
}, [mode, searchParams, setSearchParams]);


  const showGoogleButton =
    mode === 'login' || (mode === 'register' && registerSteps === 2);
  return (
    <AuthLayout
      title={mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
      desc={
        mode === 'register' && registerSteps === 1
          ? 'What brings you here?'
          : mode === 'register'
          ? 'Join as a freelancer or client to get started.'
          : 'Log in to continue your journey.'
      }
      icon={mode === 'register' ? UserPlus : LogIn}
    >
      <div className="space-y-2">
        {mode === 'register' ? (
          <RegisterForm step={registerSteps} setStep={setRegisterSteps} />
        ) : (
          <LoginForm />
        )}

        {showGoogleButton && (
          <>
            <div className="flex items-center gap-2 text-mutedTxt text-sm font-medium">
              <div className="border flex-1" />
              <span>OR</span>
              <div className="border flex-1" />
            </div>

            <GoogleOauthButton />
          </>
        )}
        <div className="font-medium text-lg w-full flex justify-center gap-1 text-mutedTxt">
          <span>
            {mode === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}
          </span>
          <button
            type="button"
            className="text-linkTxt underline cursor-pointer"
            onClick={() =>
              setMode((prev) => (prev === 'login' ? 'register' : 'login'))
            }
          >
            {mode === 'register' ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

import GoogleLogo from '@assets/svg/Google-logo.svg';
import { useGoogleOauthStore } from '../store/useGoogleOauthStore';
import { useSearchParams } from 'react-router-dom';

export const GoogleOauthButton = () => {
  const { role } = useGoogleOauthStore();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';
  function handleOnClick() {
    if (role) {
      const roles = role.join(',');
      window.location.href = `http://localhost:8000/api/auth/google?role=${roles}&redirectTo=${redirectTo}`;
    } else {
      window.location.href = `http://localhost:8000/api/auth/google?role=NA`;
    }
  }

  return (
    <button
      className="font-inter flex items-center justify-center gap-4 border border-borderHvr rounded-md py-2 w-full px-2 hover:shadow"
      onClick={handleOnClick}
    >
      <img src={GoogleLogo} alt="google logo" className="w-5 h-5" />
      <span className="font-medium text-gray-700">Continue with Google</span>
    </button>
  );
};

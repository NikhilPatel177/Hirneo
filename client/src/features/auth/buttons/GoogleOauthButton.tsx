import GoogleLogo from '@assets/svg/Google-logo.svg';

export const GoogleOauthButton = () => {
  return (
    <button className='font-inter flex items-center justify-center gap-4 border border-borderHvr rounded-md py-2 w-full px-2 hover:shadow'>
      <img src={GoogleLogo} alt="google logo" className='w-5 h-5' />
      <span className='font-medium text-gray-700'>Continue with Google</span>
    </button>
  );
};

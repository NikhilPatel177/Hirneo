
export const LoadingCircle = ({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-y-black border-x-transparent border-primary ${sizeClasses[size]} border-solid`}
    />
  );
};

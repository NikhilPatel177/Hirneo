import { cn } from '@utils/cn';
import defaultUser from '@assets/images/user.jpeg';
import { useState } from 'react';

export const Avatar = ({ className, src }: Props) => {
  const [img, setImg] = useState(src||defaultUser);
  return (
    <img
      src={img}
      alt="Profile image"
      className={cn('rounded-full w-8 h-8', className)}
      onError={() => setImg(defaultUser)}
    />
  );
};

type Props = {
  className?: string;
  src?: string;
};

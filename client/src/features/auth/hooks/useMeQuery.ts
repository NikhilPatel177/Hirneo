import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/common/lib/apiInstance';
import type { AuthUserType } from '@/common/types/authUserType';

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async (): Promise<AuthUserType> => {
      const res = await apiInstance.get('/auth/me');
      return res.data.userData;
    },
    enabled:false,    
  });
};

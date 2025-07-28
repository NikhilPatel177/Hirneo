import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/common/lib/apiInstance';
import type {
  SuccessResponse,
  ErrorResponse,
} from '@/common/types/serverResType';
import { useAuthStore } from '@/common/store/useAuthStore';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore();

  return useMutation<SuccessResponse, AxiosError<ErrorResponse>>({
    mutationKey: ['register'],
    mutationFn: async () => {
      const res = await apiInstance.post('auth/logout');
      return res.data;
    },
    onSuccess: () => {
      clearAuth();

      window.location.reload();
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ||
          'Something went wrong, Please try again later.'
      );
    },
  });
};

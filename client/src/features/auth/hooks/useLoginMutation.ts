import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/common/lib/apiInstance';
import type {
  SuccessResponse,
  ErrorResponse,
} from '@/common/types/serverResType';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/common/store/useAuthStore';
import { toast } from 'react-toastify';
import type { UseFormSetError } from 'react-hook-form';
import { AxiosError } from 'axios';
import type { LoginType } from '../schemas/loginSchema';

export const useLoginMutation = (
  setError: UseFormSetError<LoginType>
) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigateTo = searchParams.get('from') || '/';
  const { setToken, setUser } = useAuthStore();

  return useMutation<SuccessResponse, AxiosError<ErrorResponse>, LoginType>({
    mutationKey: ['register'],
    mutationFn: async (data) => {
      const res = await apiInstance.post('auth/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      setToken(data.accessToken || null);
      setUser(data.userData || null);

      toast.success(data.message || 'User registration successfull', {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(navigateTo);
      }, 1500);
    },
    onError: (error) => {
      const isValidationError = error.response?.data?.errors;

      if (isValidationError) {
        isValidationError.map((e) => {
          setError(e.field as keyof LoginType, {
            message: e.message,
            type: 'serverError',
          });
        });
      } else {
        toast.error(
          error.response?.data.message ||
            'Something went wrong, Please try again later.'
        );
      }
    },
  });
};

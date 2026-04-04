import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { axiosClient, refreshAccessToken } from '@/config/axios';
import { END_POINT, MESSAGE_CODE, ROUTE_PATH } from '@/constants';
import { IResponse, IUserAccount, IUserAccountResponse } from '@/interface';
import { useAuthStore } from '@/store';

export const useAuthService = () => {
  const { clearAuth, setAccessToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const register = async (userName: string, email: string, password: string) => {
    const res: IResponse<IUserAccountResponse> = await axiosClient.post(END_POINT.AUTH.REGISTER, {
      userName,
      email,
      password,
    });
    if (res.success) {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);
      navigate(ROUTE_PATH.AUTH.LOGIN);
    }
  };

  const login = async (email: string, password: string) => {
    const res: IResponse<IUserAccountResponse> = await axiosClient.post(END_POINT.AUTH.LOGIN, { email, password });

    if (res.success && res.data) {
      const { accessToken, id, userName, role } = res.data;
      setAccessToken(accessToken);
      setUser({ id, email, role, userName });
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);
    }
  };

  const logout = async () => {
    const res: IResponse<null> = await axiosClient.get(END_POINT.AUTH.LOGOUT);
    if (res.success) {
      clearAuth();
      toast.success(MESSAGE_CODE.LOGOUT_SUCCESS);
    }
  };

  const getMe = async () => {
    const result: IResponse<IUserAccount> = await axiosClient.get(END_POINT.AUTH.ME, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (result.success && result.data) {
      setUser(result.data);
    }
  };

  const bootstrapAuth = async () => {
    try {
      await refreshAccessToken();
      await getMe();
    } catch {
      clearAuth();
    }
  };

  return {
    register,
    login,
    getMe,
    bootstrapAuth,
    logout,
  };
};

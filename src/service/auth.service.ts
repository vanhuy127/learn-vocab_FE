import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, LOCAL_STORAGE_KEY, MESSAGE_CODE } from '@/constants';
import { IResponse, IUserAccount, IUserAccountResponse } from '@/interface';
import { useAuthStore } from '@/store';
import { removeLocalStorage, setLocalStorage } from '@/utils';

export const useAuthService = () => {
  const { setUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    const res: IResponse<IUserAccountResponse> = await axiosClient.post(END_POINT.AUTH.LOGIN, { email, password });
    if (res.success && res.data) {
      const { accessToken, refreshToken, id, email, userName, role } = res.data;
      setUser({ id, email, role, userName });
      setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      setLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);
    }
  };

  const logout = async () => {
    removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    removeLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
    setUser(null);
    toast.success(MESSAGE_CODE.LOGOUT_SUCCESS);
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

  return {
    login,
    getMe,
    logout,
  };
};

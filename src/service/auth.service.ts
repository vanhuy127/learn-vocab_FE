import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, LOCAL_STORAGE_KEY, MESSAGE_CODE } from '@/constants';
import { IResponse, IUserAccount } from '@/interface';
import { useAuthStore } from '@/store';
import { removeLocalStorage, setLocalStorage } from '@/utils';

export const useAuthService = () => {
  const { setUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    const res = await axiosClient.post(END_POINT.AUTH.LOGIN, { email, password });
    if (res.data) {
      const { accessToken, refreshToken, id, email, role } = res.data;
      setUser({ id, email, role });
      setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      setLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      toast.success(MESSAGE_CODE.LOGIN_SUCCESS);
    }
  };

  const logout = async () => {
    removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    setUser(null);
    toast.success('Logout success');
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

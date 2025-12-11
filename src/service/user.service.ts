import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IParamsBase, IUser } from '@/interface';

export const useUserService = () => {
  const getUsers = async (params?: IParamsBase & { status?: number }) => {
    const res: IListResponse<IUser> = await axiosClient.get(END_POINT.ADMIN.USER.GET_ALL, { params });

    return res.data;
  };

  return {
    getUsers,
  };
};

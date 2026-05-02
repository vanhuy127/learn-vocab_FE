import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import {
  IAdminBattle,
  IAdminTest,
  IAdminTestResult,
  IFolderSearch,
  IListResponse,
  IParamsBase,
  IRefreshTokenRes,
  IResponse,
  IStudySetAdmin,
  IUserRes,
} from '@/interface';

export const useUserService = () => {
  const getAdminUsers = async (params?: IParamsBase) => {
    const res: IListResponse<IUserRes[]> = await axiosClient.get(END_POINT.ADMIN.USER.GET_ALL, { params });

    return res.data;
  };

  const getAdminUserById = async (id: string) => {
    const res: IResponse<IUserRes> = await axiosClient.get(END_POINT.ADMIN.USER.GET_BY_ID(id));

    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getStudySetsByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IStudySetAdmin[]> = await axiosClient.get(
      END_POINT.ADMIN.USER.GET_STUDY_SETS_BY_USER_ID(userId),
      { params },
    );

    return res.data;
  };

  const getFoldersByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IFolderSearch[]> = await axiosClient.get(
      END_POINT.ADMIN.USER.GET_FOLDERS_BY_USER_ID(userId),
      { params },
    );

    return res.data;
  };

  const getHistoryLoginByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IRefreshTokenRes[]> = await axiosClient.get(
      END_POINT.ADMIN.USER.GET_HISTORY_LOGIN_BY_USER_ID(userId),
      { params },
    );

    return res.data;
  };

  const getTestsByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IAdminTest[]> = await axiosClient.get(END_POINT.ADMIN.USER.GET_TESTS_BY_USER_ID(userId), {
      params,
    });

    return res.data;
  };

  const getTestResultsByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IAdminTestResult[]> = await axiosClient.get(
      END_POINT.ADMIN.USER.GET_TEST_RESULTS_BY_USER_ID(userId),
      {
        params,
      },
    );

    return res.data;
  };

  const getHistoryBattlesByUserId = async (userId: string, params?: IParamsBase) => {
    const res: IListResponse<IAdminBattle[]> = await axiosClient.get(
      END_POINT.ADMIN.USER.GET_BATTLES_BY_USER_ID(userId),
      {
        params,
      },
    );

    return res.data;
  };

  return {
    getAdminUsers,
    getAdminUserById,
    getStudySetsByUserId,
    getFoldersByUserId,
    getHistoryLoginByUserId,
    getTestsByUserId,
    getTestResultsByUserId,
    getHistoryBattlesByUserId,
  };
};

import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import { IResponse, ITestExtended, ITestResponse, ITestSearch } from '@/interface';
import { CreateTestPayload } from '@/types';

export const useTestService = () => {
  const getTestCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<ITestSearch[]> = await axiosClient.get(END_POINT.USER.TEST.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  const createTest = async (data: CreateTestPayload) => {
    const res: IResponse<boolean> = await axiosClient.post(END_POINT.USER.TEST.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const getUserTestById = async (id: string) => {
    const res: IResponse<ITestResponse> = await axiosClient.get(END_POINT.USER.TEST.GET_USER_BY_ID(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const editTest = async (id: string, data: CreateTestPayload) => {
    const res: IResponse<ITestExtended> = await axiosClient.put(END_POINT.USER.TEST.EDIT(id), data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const deleteTest = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.delete(END_POINT.USER.TEST.DELETE(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  return {
    getTestCurrent,
    createTest,
    getUserTestById,
    editTest,
    deleteTest,
  };
};

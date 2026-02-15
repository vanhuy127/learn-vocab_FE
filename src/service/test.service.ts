import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import {
  IResponse,
  ITestAttempt,
  ITestExtended,
  ITestHistory,
  ITestOverview,
  ITestResponse,
  ITestResult,
  ITestSearch,
  ITestStats,
} from '@/interface';
import { CreateTestPayload, TestSubmitPayload } from '@/types';

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

  const getTestOverview = async (id: string) => {
    const res: IResponse<ITestOverview> = await axiosClient.get(END_POINT.USER.TEST.OVERVIEW(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const startTest = async (id: string) => {
    const res: IResponse<ITestAttempt> = await axiosClient.post(END_POINT.USER.TEST.START(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getTestAttempt = async (attemptId: string) => {
    const res: IResponse<ITestAttempt> = await axiosClient.get(END_POINT.USER.TEST.ATTEMPT(attemptId));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const submitTest = async (attemptId: string, data: TestSubmitPayload) => {
    const res: IResponse<ITestResult> = await axiosClient.post(END_POINT.USER.TEST.SUBMIT(attemptId), data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const getTestResult = async (attemptId: string) => {
    const res: IResponse<ITestResult> = await axiosClient.get(END_POINT.USER.TEST.RESULT(attemptId));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getTestStats = async (id: string) => {
    const res: IResponse<ITestStats> = await axiosClient.get(END_POINT.USER.TEST.STATS(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getTestHistory = async (id: string) => {
    const res: IResponse<ITestHistory> = await axiosClient.get(END_POINT.USER.TEST.HISTORY(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  return {
    getTestCurrent,
    createTest,
    getUserTestById,
    editTest,
    deleteTest,
    getTestOverview,
    startTest,
    getTestAttempt,
    submitTest,
    getTestResult,
    getTestStats,
    getTestHistory,
  };
};

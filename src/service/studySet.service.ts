import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import {
  IAdminStudySetDetail,
  IAdminStudySetStatisticsResponse,
  IListResponse,
  IParamsBase,
  IQuiz,
  IResponse,
  IStudySetAdmin,
  IStudySetExtended,
  IStudySetSearch,
} from '@/interface';
import { CreateStudySetFormValues } from '@/schema/studySet.schema';
import { ManyAnswer } from '@/types';

export const useStudySetService = () => {
  const getAdminStudySets = async (params?: IParamsBase) => {
    const res: IListResponse<IStudySetAdmin[]> = await axiosClient.get(END_POINT.ADMIN.STUDY_SET.GET_ALL, { params });

    return res.data;
  };

  const getAdminStudySetById = async (id: string) => {
    const res: IResponse<IAdminStudySetDetail> = await axiosClient.get(END_POINT.ADMIN.STUDY_SET.GET_BY_ID(id));

    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getAdminStatisticsStudySetById = async (id: string) => {
    const res: IResponse<IAdminStudySetStatisticsResponse> = await axiosClient.get(
      END_POINT.ADMIN.STUDY_SET.STATISTICS_BY_ID(id),
    );

    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getStudySet = async (params?: IParamsBase) => {
    const res: IListResponse<IStudySetSearch[]> = await axiosClient.get(END_POINT.USER.STUDY_SET.LIST, {
      params,
    });

    return res.data;
  };

  const getStudySetCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<IStudySetSearch[]> = await axiosClient.get(END_POINT.USER.STUDY_SET.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  const createStudySet = async (data: CreateStudySetFormValues) => {
    const res: IResponse<IStudySetExtended> = await axiosClient.post(END_POINT.USER.STUDY_SET.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const getStudySetById = async (id: string, trackingProgress: boolean = false) => {
    const res: IResponse<IStudySetExtended> = await axiosClient.get(END_POINT.USER.STUDY_SET.GET_BY_ID(id), {
      params: {
        trackingProgress,
      },
    });
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const getStudySetByIdForQuiz = async (id: string) => {
    const res: IResponse<IQuiz> = await axiosClient.get(END_POINT.USER.STUDY_SET.GET_BY_ID_FOR_QUIZ(id), {
      params: {},
    });
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const editStudySet = async (id: string, data: CreateStudySetFormValues) => {
    const res: IResponse<IStudySetExtended> = await axiosClient.put(END_POINT.USER.STUDY_SET.EDIT(id), data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const deleteStudySet = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.delete(END_POINT.USER.STUDY_SET.DELETE(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const submitStudyItem = async (id: string, isCorrect: boolean) => {
    const res: IResponse<null> = await axiosClient.post(END_POINT.USER.STUDY_ITEM.SUBMIT(id), {
      isCorrect,
    });
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    }
  };

  const submitManyStudyItem = async (id: string, answers: ManyAnswer) => {
    const res: IResponse<null> = await axiosClient.post(END_POINT.USER.STUDY_ITEM.SUBMIT_MANY_ANSWER(id), {
      answers,
    });
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    }
  };

  return {
    getStudySet,
    getStudySetCurrent,
    createStudySet,
    getStudySetById,
    editStudySet,
    deleteStudySet,
    submitStudyItem,
    submitManyStudyItem,
    getStudySetByIdForQuiz,
    getAdminStudySets,
    getAdminStudySetById,
    getAdminStatisticsStudySetById,
  };
};

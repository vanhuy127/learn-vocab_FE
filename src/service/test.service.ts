import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IResponse, ITestSearch } from '@/interface';

export const useTestService = () => {
  const getTestCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<ITestSearch[]> = await axiosClient.get(END_POINT.USER.TEST.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  return {
    getTestCurrent,
  };
};

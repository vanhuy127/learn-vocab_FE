import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IFolderSearch, IResponse } from '@/interface';

export const useFolderService = () => {
  const getFolderCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<IFolderSearch[]> = await axiosClient.get(END_POINT.USER.FOLDER.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  return {
    getFolderCurrent,
  };
};

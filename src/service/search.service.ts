import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IParamsBase } from '@/interface';
import { FilterType, IUserSearchResponse } from '@/types/search';

export const useSearchService = () => {
  const getUserSearch = async (params?: IParamsBase & { type?: FilterType }) => {
    const res: IListResponse<IUserSearchResponse> = await axiosClient.get(END_POINT.USER.SEARCH, {
      params,
    });

    return res.data;
  };

  return {
    getUserSearch,
  };
};

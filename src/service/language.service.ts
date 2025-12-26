import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IResponse } from '@/interface';
import { ILanguage } from '@/interface/language';

export const useLanguageService = () => {
  const getLanguages = async () => {
    const res: IResponse<ILanguage[]> = await axiosClient.get(END_POINT.SHARED.LANGUAGE.GET_ALL);

    return res.data;
  };

  return {
    getLanguages,
  };
};

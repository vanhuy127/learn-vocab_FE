import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import { IFolder, IFolderSearch, IResponse } from '@/interface';
import { FolderFormValues } from '@/schema/folder.schema';

export const useFolderService = () => {
  const getFolderCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<IFolderSearch[]> = await axiosClient.get(END_POINT.USER.FOLDER.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  const createFolder = async (data: FolderFormValues) => {
    const res: IResponse<IFolder> = await axiosClient.post(END_POINT.USER.FOLDER.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const getFolderById = async (id: string) => {
    const res: IResponse<IFolder> = await axiosClient.get(END_POINT.USER.FOLDER.GET_BY_ID(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const editFolder = async (id: string, data: FolderFormValues) => {
    const res: IResponse<IFolder> = await axiosClient.patch(END_POINT.USER.FOLDER.EDIT(id), data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const deleteFolder = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.delete(END_POINT.USER.FOLDER.DELETE(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  return {
    getFolderCurrent,
    createFolder,
    getFolderById,
    editFolder,
    deleteFolder,
  };
};

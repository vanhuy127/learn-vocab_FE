import { IUser } from './user';

export interface IFolder {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFolderSearch extends IFolder {
  user: IUser;
  _count: {
    studySets: number;
  };
}

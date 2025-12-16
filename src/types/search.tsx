import { IFolderSearch, IStudySetSearch, ITestSearch, IUserSearch } from '@/interface';

export type FilterType = 'study-set' | 'folder' | 'test' | 'user';

export type IUserSearchResponse =
  | { type: 'study-set'; data: IStudySetSearch[] }
  | { type: 'folder'; data: IFolderSearch[] }
  | { type: 'user'; data: IUserSearch[] }
  | { type: 'test'; data: ITestSearch[] };

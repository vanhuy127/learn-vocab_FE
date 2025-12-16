import { IUserSearchResponse } from '@/types/search';

import FolderSearchItem from './FolderSearchItem';
import StudySetSearchItem from './StudySetSearchItem';
import TestSearchItem from './TestSearchItem';
import UserSearchItem from './UserSearchItem';

interface Props {
  data: IUserSearchResponse;
}

const SearchResultList = ({ data }: Props) => {
  switch (data.type) {
    case 'folder':
      return (
        <>
          {data.data.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FolderSearchItem item={item} />
            </div>
          ))}
        </>
      );

    case 'study-set':
      return (
        <>
          {data.data.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StudySetSearchItem item={item} />
            </div>
          ))}
        </>
      );

    case 'test':
      return (
        <>
          {data.data.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestSearchItem item={item} />
            </div>
          ))}
        </>
      );

    case 'user':
      return (
        <>
          {data.data.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UserSearchItem item={item} />
            </div>
          ))}
        </>
      );
  }
};

export default SearchResultList;

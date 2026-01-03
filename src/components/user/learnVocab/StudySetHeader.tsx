import { Clock, Folder, Globe, Lock, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ACCESS_LEVEL_SHOWS, DATE_PATTERN, ROUTE_PATH } from '@/constants';
import { IStudySetExtended } from '@/interface';
import { formatDate } from '@/utils';

interface Props {
  studySet: IStudySetExtended;
}
const StudySetHeader = ({ studySet }: Props) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{studySet.name}</h1>
          <p className="text-muted-foreground">{studySet.description}</p>

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" /> {studySet.language.name}
            </span>
            {studySet?.folder && (
              <span className="flex items-center gap-1">
                <Folder className="h-4 w-4" /> {studySet.folder.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Lock className="h-4 w-4" /> {ACCESS_LEVEL_SHOWS[studySet.accessLevel].value}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {formatDate(studySet.createdAt, DATE_PATTERN.DATE_TIME)}
            </span>
          </div>
        </div>

        <Button onClick={() => navigate(ROUTE_PATH.USER.STUDY_SET.EDIT.LINK(studySet.id))}>
          <Pencil className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudySetHeader;

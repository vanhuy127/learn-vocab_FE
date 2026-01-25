import { BookOpen, Brain, FileQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

import { ROUTE_PATH } from '@/constants';

const LearningModes = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const MODES = [
    { icon: BookOpen, title: 'Thẻ ghi nhớ', link: ROUTE_PATH.USER.STUDY_SET.LEARN_FLASHCARD.LINK(id) },
    { icon: Brain, title: 'Quiz', link: ROUTE_PATH.USER.STUDY_SET.LEARN_QUIZ.LINK(id) },
    { icon: FileQuestion, title: 'Kiểm tra', link: ROUTE_PATH.USER.STUDY_SET.LEARN_REVIEW.LINK(id) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {MODES.map(({ icon: Icon, title, link }) => (
        <Card
          key={title}
          className="cursor-pointer transition-all hover:scale-105 hover:rotate-2 hover:shadow-lg"
          onClick={() => navigate(link)}
        >
          <CardContent className="flex flex-col items-center gap-2 p-6">
            <Icon className="h-8 w-8" />
            <p className="font-medium">{title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LearningModes;

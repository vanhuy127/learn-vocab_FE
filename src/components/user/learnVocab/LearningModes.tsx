import { BookOpen, Brain, FileQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

const MODES = [
  { icon: BookOpen, title: 'Thẻ ghi nhớ', link: '' },
  { icon: Brain, title: 'Học', link: '' },
  { icon: FileQuestion, title: 'Kiểm tra', link: '' },
];

const LearningModes = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {MODES.map(({ icon: Icon, title, link }) => (
        <Card key={title} className="cursor-pointer transition hover:shadow-lg" onClick={() => navigate(link)}>
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

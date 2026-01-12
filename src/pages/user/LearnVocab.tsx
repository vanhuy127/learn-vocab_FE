import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import LearningModes from '@/components/user/learnVocab/LearningModes';
import ListVocab from '@/components/user/learnVocab/ListVocab';
import StudySetHeader from '@/components/user/learnVocab/StudySetHeader';

import { useStudySetService } from '@/service/studySet.service';

const LearnVocab = () => {
  const { id } = useParams();
  const { getStudySetById } = useStudySetService();

  const { data: studySet, isLoading } = useQuery({
    queryKey: ['user-study-set', id],
    queryFn: () => getStudySetById(id!),
    enabled: !!id,
  });

  if (isLoading || !studySet || !id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-6 py-8">
      <StudySetHeader studySet={studySet} />

      <LearningModes id={id} />

      <ListVocab items={studySet?.items || []} />
    </div>
  );
};

export default LearnVocab;

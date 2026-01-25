import { QuizTerm } from '@/interface';
import { cn } from '@/lib/utils';

type Props = {
    questions: QuizTerm[];
    answers: Record<string, any>;
    isSubmitted: boolean;
    onJump: (itemId: string) => void;
};

const QuestionDashboard = ({ questions, answers, isSubmitted, onJump }: Props) => {
    return (
        <div className="hidden md:block sticky top-24 bg-card rounded-lg border p-4 shadow-lg w-64">
            <h3 className="mb-5 text-lg font-bold">Bảng điều khiển</h3>

            <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                    const answered = answers[q.itemId];

                    return (
                        <button
                            key={q.itemId}
                            onClick={() => onJump(q.itemId)}
                            className={cn(
                                'h-9 w-9 rounded-full text-sm font-semibold',
                                !answered && 'bg-muted text-muted-foreground',
                                answered && !isSubmitted && 'bg-primary/50 text-primary',
                                isSubmitted && answered?.isCorrect && 'bg-green-500 text-white',
                                isSubmitted && answered?.isCorrect === false && 'bg-red-500 text-white'
                            )}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionDashboard;

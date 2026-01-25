import { QuizTerm } from "@/interface";

type Props = {
    index: number;
    question: QuizTerm;
    result?: { selected: string | null; isCorrect: boolean | null };
    isSubmitted: boolean;
    onSelect: (answer: string) => void;
    refCallback: (el: HTMLDivElement | null) => void;
};

const QuestionCard = ({
    index,
    question,
    result,
    isSubmitted,
    onSelect,
    refCallback,
}: Props) => {

    return (
        <div ref={refCallback} className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
                Câu {index + 1}: {question.question}
            </h3>

            <div className="space-y-2">
                {question.options.map(({ id, text }: { id: string, text: string }) => {
                    const isSelected = result?.selected === text;
                    const isCorrect = text === question.correctAnswer;

                    return (
                        <button
                            key={id}
                            disabled={isSubmitted}
                            onClick={() => onSelect(text)}
                            className={`
                                w-full rounded-lg border-2 p-3 text-left transition-all
                                ${!isSubmitted && isSelected && 'border-primary bg-primary/10'}
                                ${isSubmitted && isCorrect && 'border-green-500 bg-green-100 dark:bg-green-900/20'}
                                ${isSubmitted && isSelected && !isCorrect && 'border-red-500 bg-red-100 dark:bg-red-900/20'}
                                ${isSubmitted && !isSelected && !isCorrect && 'bg-muted text-muted-foreground'}
                            `}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;

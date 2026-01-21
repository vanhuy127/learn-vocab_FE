import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import FlashcardCard from '@/components/user/learningFlashCard/FlashcardCard';
import FlashcardControls from '@/components/user/learningFlashCard/FlashcardControls';
import FlashcardProgress from '@/components/user/learningFlashCard/FlashcardProgress';

import { useStudySetService } from '@/service/studySet.service';
import { useModalStore } from '@/store';
import { MODAL_TYPE } from '@/constants';

const LearnFlashcard = () => {
    const { getStudySetById, submitStudyItem } = useStudySetService();
    const { openModal } = useModalStore();
    const navigate = useNavigate();

    const [order, setOrder] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [learned, setLearned] = useState<Set<string>>(new Set());
    const [notLearned, setNotLearned] = useState<Set<string>>(new Set());
    const [isShuffled, setIsShuffled] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isTrackingProgress, setIsTrackingProgress] = useState(false);

    const { id } = useParams();

    const { data: studySet, isLoading } = useQuery({
        queryKey: ['user-study-set', id, isTrackingProgress],
        queryFn: () => getStudySetById(id!, isTrackingProgress),
        enabled: !!id,
    });

    useEffect(() => {
        if (studySet?.items) {
            setOrder(studySet.items.map((_, i) => i));
            setCurrentIndex(0);
        }
    }, [studySet]);

    const listVocabulary = studySet?.items || [];
    const currentCard = listVocabulary[order[currentIndex]];

    const mutation = useMutation({
        mutationFn: ({ id, isCorrect }: { id: string; isCorrect: boolean }) => submitStudyItem(id, isCorrect),
        onSuccess: () => { },
    });

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleShowHint = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowHint(!showHint);
    };

    const handleNext = () => {
        if (currentIndex < listVocabulary.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
            setShowHint(false);
        }
        if (currentIndex === listVocabulary.length - 1) {
            const learn = learned.size;
            const notLearn = notLearned.size;
            openModal(MODAL_TYPE.REVIEW_COMPLETE,
                {
                    reviewAgain: (idx: number) => {
                        setIsFlipped(false);
                        setShowHint(false);
                        setLearned(new Set());
                        setNotLearned(new Set());
                        setCurrentIndex(idx)
                    },
                    mastered: learn,
                    notLearning: notLearn,
                });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
            setShowHint(false);
        }
    };

    const handleLearned = () => {
        mutation.mutate({ id: currentCard.id, isCorrect: true });
        const newLearned = new Set(learned);
        newLearned.add(currentCard.id);
        setLearned(newLearned);
        setNotLearned((prev) => {
            const updated = new Set(prev);
            updated.delete(currentCard.id);

            return updated;
        });
        handleNext();
    };

    const handleNotLearned = () => {
        mutation.mutate({ id: currentCard.id, isCorrect: false });
        const newNotLearned = new Set(notLearned);
        newNotLearned.add(currentCard.id);
        setNotLearned(newNotLearned);
        setLearned((prev) => {
            const updated = new Set(prev);
            updated.delete(currentCard.id);

            return updated;
        });
        handleNext();
    };

    const handleShuffle = () => {
        if (!studySet) return;
        setIsShuffled((prev) => {
            const next = !prev;
            if (next) {
                // BẬT TRỘN
                setOrder((prevOrder) => [...prevOrder].sort(() => Math.random() - 0.5));
            } else {
                // TẮT TRỘN → quay về thứ tự gốc
                setOrder(studySet.items.map((_, i) => i));
            }

            return next;
        });

        setCurrentIndex(0);
        setIsFlipped(false);
        setShowHint(false);
    };

    const handleTrackingChange = useCallback((value: boolean) => {
        if (isTrackingProgress) {
            setCurrentIndex(0);
        }
        setIsTrackingProgress(value);
    }, []);

    if (!studySet || isLoading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    if (!currentCard || (isTrackingProgress && studySet && studySet.items.length === 0)) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-xl font-semibold">
                    🎉 Không có từ nào cần ôn ngay bây giờ
                </h2>

                <p className="text-muted-foreground">
                    Tất cả từ vựng đã được ôn đúng lịch. Hãy quay lại sau nhé!
                </p>

                <button
                    className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
                    onClick={() => navigate(-1)}
                >
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-6xl px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-primary mb-3 text-center text-2xl font-bold">{studySet.name}</h1>
                <FlashcardProgress
                    current={currentIndex + 1}
                    total={listVocabulary.length}
                    learned={learned.size}
                    notLearned={notLearned.size}
                />
            </div>

            {/* Flashcard */}
            <div className="mb-8 flex justify-center">
                <FlashcardCard
                    card={currentCard}
                    isFlipped={isFlipped}
                    showHint={showHint}
                    onFlip={handleFlip}
                    onShowHint={handleShowHint}
                />
            </div>

            {/* Controls */}
            <FlashcardControls
                currentIndex={currentIndex}
                onTracking={handleTrackingChange}
                onPrev={handlePrev}
                onNext={handleNext}
                onLearned={handleLearned}
                onNotLearned={handleNotLearned}
                onShuffle={handleShuffle}
                isTracking={isTrackingProgress}
                isShuffled={isShuffled}
                isPrevDisabled={currentIndex === 0}
            />
        </div>
    );
};

export default LearnFlashcard;

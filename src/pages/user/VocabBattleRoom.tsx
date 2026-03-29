import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTE_PATH } from '@/constants';
import type { VocabBattleSocketController } from '@/hooks/useVocabBattleSocket';
import { useAuthStore, useVocabBattleStore } from '@/store';
import type { BattleAnswerOption } from '@/types/vocabBattle';

const VocabBattleRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { submitAnswer } = useOutletContext<VocabBattleSocketController>();
  const { user } = useAuthStore();
  const {
    room,
    currentQuestion,
    questionDeadlineAt,
    submittedQuestionId,
    submittedOption,
    answerResult,
    leaderboard,
    finished,
    opponentLeftMessage,
    battleError,
    connectionStatus,
    resetBattle,
  } = useVocabBattleStore();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 250);

    return () => window.clearInterval(interval);
  }, []);

  const remainingSeconds = useMemo(() => {
    if (!questionDeadlineAt) {
      return 0;
    }

    return Math.max(0, Math.ceil((questionDeadlineAt - currentTime) / 1000));
  }, [currentTime, questionDeadlineAt]);

  const sortedLeaderboard = useMemo(() => {
    return [...leaderboard].sort((a, b) => b.score - a.score);
  }, [leaderboard]);

  const resultText = useMemo(() => {
    if (!finished) {
      return null;
    }
    if (finished.isDraw) {
      return 'Hòa';
    }
    if (finished.winnerId === user?.id) {
      return 'Thắng';
    }

    return 'Thua';
  }, [finished, user?.id]);

  const handleSubmitAnswer = (option: BattleAnswerOption) => {
    if (!room || !currentQuestion) {
      return;
    }
    if (submittedQuestionId === currentQuestion.id) {
      return;
    }

    submitAnswer({
      roomId: room.roomId,
      questionId: currentQuestion.id,
      selectedOption: option,
    });
  };

  const handleBackToQueue = () => {
    resetBattle();
    navigate(ROUTE_PATH.USER.BATTLE.MATCHMAKING);
  };

  if (!room || !roomId || room.roomId !== roomId) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-4 py-12">
        <div className="w-full rounded-xl border p-8">
          <h1 className="text-2xl font-semibold">Không có trận đấu đang hoạt động</h1>
          <p className="text-muted-foreground mt-2">Hãy quay lại trang ghép trận để bắt đầu.</p>
          <Button className="mt-4" onClick={handleBackToQueue}>
            Về trang ghép trận
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="rounded-xl border p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Phòng đấu #{room.roomId}</h1>
            <p className="text-muted-foreground mt-1">Kết nối: {connectionStatus}</p>
          </div>
          <Button variant="outline" onClick={handleBackToQueue}>
            Thoát phòng
          </Button>
        </div>

        {opponentLeftMessage ? <p className="mt-3 text-sm text-red-500">{opponentLeftMessage}</p> : null}
        {battleError ? <p className="mt-3 text-sm text-red-500">{battleError}</p> : null}
      </div>

      {finished ? (
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Kết thúc trận</h2>
          <p className="mt-2">
            Kết quả: <span className="font-semibold">{resultText}</span>
          </p>
          <p className="text-muted-foreground mt-1">Trạng thái trận: {finished.status}</p>
          <Button className="mt-4" onClick={handleBackToQueue}>
            Về ghép trận mới
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border p-6">
          {currentQuestion ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-medium">
                  Câu {currentQuestion.position}/{room.totalQuestions}
                </p>
                <p className="text-lg font-semibold">{remainingSeconds}s</p>
              </div>
              <p className="mt-3 text-xl">{currentQuestion.questionText}</p>
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = submittedOption === option.label;
                  const isDisabled = submittedQuestionId === currentQuestion.id;

                  return (
                    <Button
                      key={option.label}
                      variant={isSelected ? 'default' : 'outline'}
                      disabled={isDisabled}
                      className="h-auto justify-start py-3 text-left whitespace-normal"
                      onClick={() => handleSubmitAnswer(option.label)}
                    >
                      {option.label}. {option.text}
                    </Button>
                  );
                })}
              </div>
              {answerResult?.questionId === currentQuestion.id ? (
                <p className="mt-4 text-sm">
                  {answerResult.isCorrect ? 'Đúng' : 'Sai'} ({answerResult.scoreDelta > 0 ? '+' : ''}
                  {answerResult.scoreDelta} điểm)
                </p>
              ) : null}
            </>
          ) : (
            <p className="text-muted-foreground">Đang chờ câu hỏi từ máy chủ...</p>
          )}
        </div>
      )}

      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Bảng điểm</h2>
        <div className="mt-4 space-y-2">
          {sortedLeaderboard.map((item, index) => (
            <div key={item.userId} className="flex items-center justify-between rounded-md border px-3 py-2">
              <p>
                {index + 1}. {item.userName}
                {item.userId === user?.id ? ' (Bạn)' : ''}
              </p>
              <p className="font-semibold">{item.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabBattleRoom;

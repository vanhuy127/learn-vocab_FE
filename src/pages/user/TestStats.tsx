import { useQuery } from '@tanstack/react-query';
import { BarChart3, CheckCircle, Clock, Eye, FileQuestion } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ROUTE_PATH } from '@/constants';
import { useTestService } from '@/service/test.service';
import { formatDate, formatDuration } from '@/utils';

const TestStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTestStats, getTestHistory } = useTestService();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['test-stats', id],
    queryFn: () => getTestStats(id!),
    enabled: !!id,
  });

  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['test-history', id],
    queryFn: () => getTestHistory(id!),
    enabled: !!id,
  });

  const isLoading = isLoadingStats || isLoadingHistory;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-muted mb-4 h-6 w-2/3 animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!stats || !history) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="bg-card border-border rounded-2xl border p-8 text-center">
            <p className="text-destructive mb-4">Không thể tải thống kê</p>
            <Button onClick={() => navigate(ROUTE_PATH.USER.LIBRARY)}>Quay lại thư viện</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-secondary/20 text-secondary-foreground rounded-xl p-3">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-3xl font-bold">Thống kê tổng quan</h1>
              <p className="text-muted-foreground">Hiệu quả làm bìa của người học</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate(ROUTE_PATH.USER.TEST.OVERVIEW.LINK(stats.testId))}>
            Quay lại tổng quan
          </Button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="border-border rounded-xl border p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <FileQuestion className="h-4 w-4" />
              Số lượt làm bài
            </div>
            <p className="text-foreground text-2xl font-bold">{stats.totalAttempts}</p>
          </div>
          <div className="border-border rounded-xl border p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              Điểm trung bình
            </div>
            <p className="text-foreground text-2xl font-bold">{stats.averageScore.toFixed(1)}</p>
          </div>
          <div className="border-border rounded-xl border p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              Điểm cao nhất
            </div>
            <p className="text-foreground text-2xl font-bold">{stats.highestScore}</p>
          </div>
          <div className="border-border rounded-xl border p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Thời gian trung bình
            </div>
            <p className="text-foreground text-2xl font-bold">{formatDuration(stats.averageTimeSeconds)}</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border p-6">
          <h2 className="text-foreground mb-4 text-xl font-semibold">Lịch sử làm bài</h2>
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-sm">Tổng số lượt nộp bài</p>
              <p className="text-foreground text-2xl font-bold">{history.totalAttempts}</p>
            </div>
            <div className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-sm">Số học viên đã tham gia</p>
              <p className="text-foreground text-2xl font-bold">{history.totalStudents}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Điểm</TableHead>
                <TableHead>Đúng/Tổng</TableHead>
                <TableHead>Thời gian bắt đầu</TableHead>
                <TableHead>Thời gian Kết thúc</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">
                    Chưa có lịch sử làm bài
                  </TableCell>
                </TableRow>
              )}

              {history.rows.map((row) => (
                <TableRow key={row.attemptId}>
                  <TableCell className="font-medium">{row.studentName}</TableCell>
                  <TableCell>{row.studentEmail}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>
                    {row.correctAnswers}/{row.totalQuestions}
                  </TableCell>
                  <TableCell>{formatDate(row.startedAt)}</TableCell>
                  <TableCell>{formatDate(row.finishedAt)}</TableCell>
                  <TableCell>{formatDuration(row.timeSpentSeconds)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(ROUTE_PATH.USER.TEST.RESULT.LINK(history.testId, row.attemptId))}
                      aria-label={`Xem kết quả của ${row.studentName}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-card border-border rounded-2xl border p-6">
          <h2 className="text-foreground mb-4 text-xl font-semibold">Tỷ lệ đúng/sai theo câu hỏi</h2>
          <div className="space-y-4">
            {stats.questions.map((q, index) => (
              <div key={q.id} className="border-border rounded-xl border p-4">
                <div className="mb-2 flex items-start gap-2">
                  <span className="bg-secondary/20 text-secondary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-foreground font-medium">{q.questionText}</p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-500">
                    Đúng: {(q.correctRate * 100).toFixed(0)}%
                  </div>
                  <div className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm font-semibold">
                    Sai: {(q.wrongRate * 100).toFixed(0)}%
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm font-semibold">
                    Chưa trả lời: {(q.skippedRate * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStats;

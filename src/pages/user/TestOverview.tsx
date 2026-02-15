import { useMutation, useQuery } from '@tanstack/react-query';
import { BarChart3, Clock, FileQuestion } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTE_PATH } from '@/constants';
import { useTestService } from '@/service/test.service';
import { useAuthStore } from '@/store';

const TestOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getTestOverview, startTest } = useTestService();

  const { data: test, isLoading } = useQuery({
    queryKey: ['test-overview', id],
    queryFn: () => getTestOverview(id!),
    enabled: !!id,
  });

  const startMutation = useMutation({
    mutationFn: () => startTest(id!),
    onSuccess: (res) => {
      if (!res) return;
      navigate(ROUTE_PATH.USER.TEST.TAKE.LINK(res.testId, res.attemptId));
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-6 py-16">
          <div className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-muted mb-4 h-8 w-2/3 animate-pulse rounded" />
            <div className="bg-muted mb-6 h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-6 py-16">
          <div className="bg-card border-border rounded-2xl border p-8 text-center">
            <p className="text-destructive mb-4">Không tìm thấy bài kiểm tra</p>
            <Button onClick={() => navigate(ROUTE_PATH.USER.LIBRARY)}>Quay lại thư viện</Button>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.id && test.ownerId === user.id;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="bg-card border-border rounded-2xl border p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-foreground mb-3 text-4xl font-bold">{test.title}</h1>
            <p className="text-muted-foreground text-lg">{test.description || 'Không có mô tả'}</p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="border-border flex items-center gap-4 rounded-xl border p-4">
              <div className="bg-secondary/20 text-secondary-foreground rounded-lg p-3">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Thời gian làm bài</p>
                <p className="text-foreground text-lg font-semibold">
                  {test.duration && test.duration > 0 ? `${test.duration} phút` : 'Không giới hạn'}
                </p>
              </div>
            </div>

            <div className="border-border flex items-center gap-4 rounded-xl border p-4">
              <div className="bg-secondary/20 text-secondary-foreground rounded-lg p-3">
                <FileQuestion className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tổng số câu hỏi</p>
                <p className="text-foreground text-lg font-semibold">{test.totalQuestions} câu</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="cursor-pointer"
              disabled={startMutation.isPending}
              onClick={() => startMutation.mutate()}
            >
              {startMutation.isPending ? 'Đang bắt đầu...' : 'Bắt đầu làm bài'}
            </Button>

            {isOwner && (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate(ROUTE_PATH.USER.TEST.STATS.LINK(test.id))}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Thống kê tổng quan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOverview;

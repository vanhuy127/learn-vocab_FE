import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BarChart3, BookOpen } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useQueryParams } from '@/hooks/useQueryParams';
import { useStudySetService } from '@/service/studySet.service';
import { formatDate } from '@/utils';

import StatisticsTab from './components/StatisticsTab';
import VocabTab from './components/VocabTab';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/confirmDialog';
import { cn } from '@/lib/utils';

const StudySetDetails = () => {
  const { id } = useParams();

  const { query, setQueryObject } = useQueryParams();
  const { getAdminStudySetById, getAdminStatisticsStudySetById, restoreStudySet } = useStudySetService();
  const queryClient = useQueryClient();

  const [openConfirm, setOpenConfirm] = useState(false);

  const activeTab = query.tab || 'overview';

  const { data: studySet, isLoading } = useQuery({
    queryKey: ['admin-study-set', id],
    queryFn: () => getAdminStudySetById(id!),
  });

  const { data: statistics } = useQuery({
    queryKey: ['admin-study-set-statistics', id],
    queryFn: () => getAdminStatisticsStudySetById(id!),
    enabled: !!id,
  });

  const handleTabChange = (tabName: string) => {
    setQueryObject({ tab: tabName });
  };

  const restoreMutation = useMutation({
    mutationFn: () => restoreStudySet(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-study-set', id] });
    },
  });

  const handleConfirm = () => {
    restoreMutation.mutate();
    setOpenConfirm(false);
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;
  if (!studySet || !id) return <div className="p-8 text-center text-red-500">Không tìm thấy học phần</div>;

  return (
    <>
      <div className="flex min-h-screen min-w-0 flex-col gap-6 lg:flex-row">
        {/* CỘT TRÁI: THÔNG TIN CƠ BẢN */}
        <div className="w-full space-y-6 lg:w-1/3 lg:shrink-0">
          <div className="h-full rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-accent-foreground text-center text-xl font-bold">{studySet.name}</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Mô tả</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{studySet.description || '-'}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Quyền truy cập</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{studySet.accessLevel}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Ngôn ngữ</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{studySet.language?.name || '-'}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Chủ sở hữu</span>
                </Label>
                <div className="flex gap-2">
                  <p className="bg-muted flex-2 rounded p-3 text-sm">
                    {studySet.user?.userName ? studySet.user.userName : ' - '}
                  </p>
                  <p className="bg-muted flex-5 rounded p-3 text-sm">
                    {studySet.user?.email ? studySet.user.email : '-'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Thư mục</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{studySet.folder?.name || '-'}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Ngày tạo</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{formatDate(studySet.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Cập nhật cuối</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{formatDate(studySet.updatedAt)}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Trạng thái xóa</span>
                </Label>
                <p className={cn("bg-muted rounded p-3 text-sm", studySet.isDeleted && "text-rose-500")}>
                  {studySet.isDeleted ? 'Đã xóa' : 'Chưa xóa'}
                </p>
              </div>
              <Button variant={'destructive'} disabled={!studySet.isDeleted} className="w-full cursor-pointer" onClick={() => setOpenConfirm(true)}>
                Khôi phục
              </Button>
            </div>
          </div>
        </div>
        {/* CỘT PHẢI: NỘI DUNG CHI TIẾT THEO TABS */}
        <div className="w-full min-w-0 lg:w-2/3">
          <div className="flex h-full min-w-0 flex-col rounded-xl border border-gray-100 shadow-sm">
            {/* Tabs Navigation */}
            <div className="flex min-w-0 overflow-x-auto border-b px-4">
              {[
                { id: 'overview', label: 'Thống kê', icon: BarChart3 },
                { id: 'vocabulary', label: 'Danh sách từ vựng', icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tabs Content */}
            <div className="p-6">
              {activeTab === 'overview' && <StatisticsTab statistics={statistics ?? undefined} />}
              {activeTab === 'vocabulary' && studySet?.items && <VocabTab items={studySet.items} />}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        title="Khôi phục học phần"
        description={
          <>
            Bạn có chắc muốn khôi phục học phần này không?
          </>
        }
        confirmText="Khôi phục"
        cancelText="Hủy"
        onConfirm={handleConfirm}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default StudySetDetails;

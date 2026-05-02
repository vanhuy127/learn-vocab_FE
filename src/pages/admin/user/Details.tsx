import { useQuery } from '@tanstack/react-query';
import { BarChart3, BookOpen, GraduationCap, Shield, Sword } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Label } from '@/components/ui/label';

import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';
import { formatDate } from '@/utils';

import HistoryBattlesTab from './components/HistoryBattlesTab';
import HistoryLoginTab from './components/HistoryLoginTab';
import LibraryTab from './components/LibraryTab';
import TestCreatedTab from './components/TestCreatedTab';
import TestResultsTab from './components/TestResultsTab';

const UserDetails = () => {
  const { id } = useParams();

  const { query, setQueryObject } = useQueryParams();
  const { getAdminUserById } = useUserService();

  const activeTab = query.tab || 'overview';

  const { data: user, isLoading } = useQuery({
    queryKey: ['admin-user', id],
    queryFn: () => getAdminUserById(id!),
  });

  const handleTabChange = (tabName: string) => {
    setQueryObject({ tab: tabName });
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;
  if (!user || !id) return <div className="p-8 text-center text-red-500">Không tìm thấy người dùng</div>;

  return (
    <div className="flex min-h-screen min-w-0 flex-col gap-6 lg:flex-row">
      {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
      <div className="w-full space-y-6 lg:w-1/3 lg:shrink-0">
        <div className="h-full rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-accent-foreground text-xl font-bold">{user.userName}</h2>
            <span
              className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${
                user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {user.role}
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Email</span>
              </Label>
              <p className="bg-muted rounded p-3 text-sm">{user.email}</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Ngày tạo</span>
              </Label>
              <p className="bg-muted rounded p-3 text-sm">{formatDate(user.createdAt)}</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Cập nhật cuối</span>
              </Label>
              <p className="bg-muted rounded p-3 text-sm">{formatDate(user.updatedAt)}</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Token làm mới mật khẩu</span>
              </Label>
              <p className="bg-muted overflow-hidden rounded p-3 text-sm text-ellipsis">
                {user.resetPwToken ? user.resetPwToken : '-'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Ngày hết hạn token</span>
              </Label>
              <p className="bg-muted rounded p-3 text-sm">
                {user.resetPwExpireAt ? formatDate(user.resetPwExpireAt) : '-'}
              </p>
            </div>
          </div>

          {/* <Button variant={'destructive'} className='mt-6 w-full'>
                        Khóa tài khoản
                    </Button> */}
        </div>
      </div>

      {/* CỘT PHẢI: NỘI DUNG CHI TIẾT THEO TABS */}
      <div className="w-full min-w-0 lg:w-2/3">
        <div className="flex h-full min-w-0 flex-col rounded-xl border border-gray-100 shadow-sm">
          {/* Tabs Navigation */}
          <div className="flex min-w-0 overflow-x-auto border-b px-4">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'library', label: 'Thư viện', icon: BookOpen },
              { id: 'tests', label: 'Bài kiểm tra đã tạo', icon: GraduationCap },
              { id: 'test-results', label: 'Lịch sử làm bài', icon: GraduationCap },
              { id: 'battles', label: 'Trận đấu', icon: Sword },
              { id: 'history-login', label: 'Lịch sử đăng nhập', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
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
            {activeTab === 'overview' && (
              <div className="animate-fadeIn">
                <h3 className="mb-4 text-lg font-bold">Thống kê học tập</h3>
                {/* <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                                        <p className="text-green-600 text-sm">Mastered</p>
                                        <p className="text-2xl font-bold">128 từ</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                        <p className="text-yellow-600 text-sm">Learning</p>
                                        <p className="text-2xl font-bold">45 từ</p>
                                    </div>
                                </div> */}
                {/* Render Chart Here */}
              </div>
            )}

            {activeTab === 'library' && <LibraryTab userId={id} />}

            {activeTab === 'tests' && <TestCreatedTab userId={id} />}

            {activeTab === 'test-results' && <TestResultsTab userId={id} />}

            {activeTab === 'battles' && <HistoryBattlesTab userId={id} />}

            {activeTab === 'history-login' && <HistoryLoginTab userId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

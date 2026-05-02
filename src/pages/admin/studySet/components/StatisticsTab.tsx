import { AlertCircle, Award, BookOpen, Brain, Target, TrendingUp, Users } from 'lucide-react';

import { DifficultWord, IAdminStudySetStatisticsResponse } from '@/interface/studySet';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
    iconBg: string;
    highlight?: boolean;
}

const StatCard = ({ icon, label, value, color, iconBg, highlight }: StatCardProps) => (
    <div
        className={`rounded-xl border p-5 transition-all hover:shadow-md ${highlight ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card'}`}
    >
        <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-lg ${iconBg}`}>{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-muted-foreground truncate text-xs">{label}</p>
                <p className={`text-2xl font-bold ${highlight ? 'text-destructive' : ''}`}>{value}</p>
            </div>
        </div>
    </div>
);

interface StatusBadgeProps {
    label: string;
    count: number;
    color: string;
    dotColor: string;
}

const StatusBadge = ({ label, count, color, dotColor }: StatusBadgeProps) => (
    <div className={`flex items-center justify-between rounded-lg ${color} px-4 py-3`}>
        <div className="flex items-center gap-2">
            <div className={`size-3 rounded-full ${dotColor}`} />
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-lg font-bold">{count}</span>
    </div>
);

interface StatisticsTabProps {
    statistics: IAdminStudySetStatisticsResponse | undefined;
}

const StatisticsTab = ({ statistics }: StatisticsTabProps) => {
    return (
        <div className="animate-fadeIn space-y-6">
            <h3 className="text-lg font-bold">Thống kê tổng quan</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    icon={<BookOpen size={24} />}
                    label="Tổng số từ vựng"
                    value={statistics?.overview.totalItems ?? 0}
                    color="bg-primary/10 text-primary"
                    iconBg="bg-primary/20"
                />
                <StatCard
                    icon={<Users size={24} />}
                    label="Người dùng đã học"
                    value={statistics?.overview.totalUsersStudied ?? 0}
                    color="bg-accent/10 text-accent"
                    iconBg="bg-accent/20"
                />
                <StatCard
                    icon={<Target size={24} />}
                    label="Tỷ lệ hoàn thành"
                    value={`${(statistics?.progress.completionRate ?? 0).toFixed(1)}%`}
                    color="bg-chart-4/10 text-chart-4"
                    iconBg="bg-chart-4/20"
                />
                <StatCard
                    icon={<Award size={24} />}
                    label="Tỷ lệ chính xác"
                    value={`${typeof statistics?.performance.accuracyRate === 'number'
                        ? statistics.performance.accuracyRate.toFixed(1)
                        : (statistics?.performance.accuracyRate ?? '0')
                        }%`}
                    color="bg-chart-2/10 text-chart-2"
                    iconBg="bg-chart-2/20"
                />
                <StatCard
                    icon={<TrendingUp size={24} />}
                    label="Lượt làm TB/người"
                    value={statistics?.performance.avgAttemptsPerUser ?? 0}
                    color="bg-chart-5/10 text-chart-5"
                    iconBg="bg-chart-5/20"
                />
                <StatCard
                    icon={<AlertCircle size={24} />}
                    label="Từ cần ôn tập lại"
                    value={statistics?.review.overdueItems ?? 0}
                    color="bg-destructive/10 text-destructive"
                    iconBg="bg-destructive/20"
                    highlight
                />
            </div>

            {statistics?.progress.statusDistribution && (
                <div className="border-border rounded-xl border p-6">
                    <h4 className="mb-4 flex items-center gap-2 text-base font-semibold">
                        <TrendingUp size={18} className="text-chart-4" />
                        Phân bố trạng thái học tập
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <StatusBadge
                            label="Mới"
                            count={statistics.progress.statusDistribution.NEW}
                            color="bg-muted text-muted-foreground"
                            dotColor="bg-gray-400"
                        />
                        <StatusBadge
                            label="Đang học"
                            count={statistics.progress.statusDistribution.LEARNING}
                            color="bg-chart-2/15 text-chart-2"
                            dotColor="bg-chart-2"
                        />
                        <StatusBadge
                            label="Đã thuộc"
                            count={statistics.progress.statusDistribution.MASTERED}
                            color="bg-primary/15 text-primary"
                            dotColor="bg-primary"
                        />
                    </div>
                    <div className="mt-4">
                        {/* Progress bar */}
                        <div className="flex h-3 overflow-hidden rounded-full">
                            {(() => {
                                const { NEW, LEARNING, MASTERED } = statistics.progress.statusDistribution;

                                const total = NEW + LEARNING + MASTERED || 1;

                                return (
                                    <>
                                        <div
                                            className="bg-gray-400 transition-all duration-300"
                                            style={{ width: `${(NEW / total) * 100}%` }}
                                            title={`Mới: ${NEW} (${Math.round((NEW / total) * 100)}%)`}
                                        />

                                        <div
                                            className="bg-chart-2 transition-all duration-300"
                                            style={{ width: `${(LEARNING / total) * 100}%` }}
                                            title={`Đang học: ${LEARNING} (${Math.round((LEARNING / total) * 100)}%)`}
                                        />

                                        <div
                                            className="bg-primary transition-all duration-300"
                                            style={{ width: `${(MASTERED / total) * 100}%` }}
                                            title={`Đã thuộc: ${MASTERED} (${Math.round((MASTERED / total) * 100)}%)`}
                                        />
                                    </>
                                );
                            })()}
                        </div>

                        {/* Legend */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                            {(() => {
                                const { NEW, LEARNING, MASTERED } = statistics.progress.statusDistribution;

                                const total = NEW + LEARNING + MASTERED || 1;

                                return (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-gray-400" />
                                            <span className="text-muted-foreground">
                                                Mới ({Math.round((NEW / total) * 100)}%)
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="bg-chart-2 h-3 w-3 rounded-full" />
                                            <span className="text-muted-foreground">
                                                Đang học ({Math.round((LEARNING / total) * 100)}%)
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="bg-primary h-3 w-3 rounded-full" />
                                            <span className="text-muted-foreground">
                                                Đã thuộc ({Math.round((MASTERED / total) * 100)}%)
                                            </span>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {statistics?.content.difficultWords && statistics.content.difficultWords.length > 0 && (
                <div className="border-border rounded-xl border p-6">
                    <h4 className="mb-4 flex items-center gap-2 text-base font-semibold">
                        <Brain size={18} className="text-destructive" />
                        Từ khó (dễ sai nhất)
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">STT</th>
                                    <th className="px-4 py-3 text-left font-medium">Từ</th>
                                    <th className="px-4 py-3 text-left font-medium">Nghĩa</th>
                                    <th className="px-4 py-3 text-center font-medium">Sai</th>
                                    <th className="px-4 py-3 text-center font-medium">Đúng</th>
                                    <th className="px-4 py-3 text-center font-medium">Tỷ lệ sai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statistics.content.difficultWords.map((word: DifficultWord, index: number) => {
                                    const total = word.wrongCount + word.correctCount;
                                    const wrongRate = total > 0 ? ((word.wrongCount / total) * 100).toFixed(1) : '0';

                                    return (
                                        <tr key={word.id} className="hover:bg-muted/50 border-b">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-medium">{word.word}</td>
                                            <td className="px-4 py-3">{word.meaning}</td>
                                            <td className="text-destructive px-4 py-3 text-center font-medium">{word.wrongCount}</td>
                                            <td className="text-primary px-4 py-3 text-center font-medium">{word.correctCount}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${Number(wrongRate) > 50
                                                        ? 'bg-destructive/15 text-destructive'
                                                        : Number(wrongRate) > 30
                                                            ? 'bg-chart-1/15 text-chart-1'
                                                            : 'bg-muted text-muted-foreground'
                                                        }`}
                                                >
                                                    {wrongRate}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticsTab;

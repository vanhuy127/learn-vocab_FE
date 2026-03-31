import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants';
import { useStudySetService } from '@/service/studySet.service';

const Courses = () => {
  const { getStudySet } = useStudySetService();

  const { data: studySets } = useQuery({
    queryKey: ['user-study-set'],
    queryFn: () =>
      getStudySet({
        size: '6',
      }),
  });

  const gradientPresets = [
    'from-blue-500/40 to-cyan-500/40',
    'from-purple-500/40 to-pink-500/40',
    'from-red-500/40 to-orange-500/40',
    'from-yellow-500/40 to-amber-500/40',
    'from-green-500/40 to-emerald-500/40',
    'from-rose-500/40 to-red-500/40',
  ];

  return (
    <section id="courses" className="border-border border-t py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 space-y-4 text-center">
          <h2 className="text-foreground text-4xl font-bold sm:text-5xl">Khóa học phổ biến</h2>
          <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
            Chọn ngôn ngữ yêu thích và bắt đầu hành trình học tập
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studySets?.data &&
            studySets?.data.length > 0 &&
            studySets?.data.map((i, idx) => (
              <div
                key={idx}
                className="bg-card border-border hover:border-primary/50 group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`h-32 bg-linear-to-br ${gradientPresets[idx % gradientPresets.length]} relative overflow-hidden`}
                >
                  <div className="from-card absolute inset-0 bg-linear-to-t to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-semibold">
                      {i.language.name}
                    </span>
                  </div>
                  <h3 className="text-foreground mb-4 text-xl font-bold">{i.name}</h3>
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/60">Từ vựng</span>
                      <span className="text-accent font-semibold">{i._count.items} từ</span>
                    </div>
                  </div>
                  <Link
                    to={ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(i.id)}
                    className="from-primary to-accent text-primary-foreground hover:shadow-primary/30 block w-full transform rounded-lg bg-linear-to-r py-3 text-center font-semibold transition-all hover:scale-105 hover:shadow-lg"
                  >
                    Tham gia ngay
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

import { ArrowRight, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="from-primary/15 via-secondary/5 to-accent/10 pointer-events-none absolute inset-0 bg-linear-to-br" />
      <div className="bg-accent/10 pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-primary/10 pointer-events-none absolute bottom-0 left-10 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-40 lg:px-8">
        <div className="space-y-8 text-center">
          <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Zap className="text-primary h-4 w-4" />
            <span className="text-primary text-sm font-medium">Được tin tưởng bởi 100K+ học viên</span>
          </div>

          <h1 className="text-5xl leading-tight font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Chinh phục{' '}
            <span className="from-primary via-accent to-primary bg-linear-to-r bg-clip-text text-transparent">
              từ vựng ngoại ngữ
            </span>
          </h1>

          <p className="text-foreground/70 mx-auto max-w-3xl text-lg leading-relaxed text-balance sm:text-xl">
            Phương pháp học tập AI-powered kết hợp lặp lại có khoảng cách, trò chơi tương tác và theo dõi tiến độ thông
            minh.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <button className="from-primary to-accent text-primary-foreground hover:shadow-primary/40 flex transform items-center justify-center gap-2 rounded-lg bg-linear-to-r px-8 py-4 font-semibold transition-all hover:scale-105 hover:shadow-lg">
              Bắt đầu miễn phí <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 pt-12">
            {[
              { number: '100K+', label: 'Người dùng hoạt động', icon: '👥' },
              { number: '150+', label: 'Khóa học', icon: '📚' },
              { number: '50K+', label: 'Từ vựng', icon: '✨' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card/50 border-border hover:border-primary/50 hover:bg-card/80 group rounded-xl border p-4 backdrop-blur transition"
              >
                <div className="mb-2 text-2xl">{stat.icon}</div>
                <div className="from-primary to-accent bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent">
                  {stat.number}
                </div>
                <div className="text-foreground/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

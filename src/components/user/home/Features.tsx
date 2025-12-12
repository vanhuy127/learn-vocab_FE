import { BookOpen, Trophy, Users, Zap } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="border-border relative border-t py-20 sm:py-32">
      <div className="from-secondary/30 to-background pointer-events-none absolute inset-0 bg-linear-to-b" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 space-y-4 text-center">
          <h2 className="text-foreground text-4xl font-bold sm:text-5xl">Tại sao chọn VocabMaster?</h2>
          <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
            Công cụ học tập toàn diện với công nghệ AI hiên đại
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Zap className="h-7 w-7" />,
              title: 'Luyện tập thông minh',
              description: 'Hệ thống spaced repetition tối ưu hóa dựa trên AI giúp ghi nhớ lâu dài.',
            },
            {
              icon: <Trophy className="h-7 w-7" />,
              title: 'Trò chơi vui nhộn',
              description: 'Học qua 10+ game tương tác khác nhau để tăng tính tham gia.',
            },
            {
              icon: <Users className="h-7 w-7" />,
              title: 'Cộng đồng sôi động',
              description: 'Kết nối với 100K+ người học khác, chia sẻ kinh nghiệm.',
            },
            {
              icon: <BookOpen className="h-7 w-7" />,
              title: '20+ ngôn ngữ',
              description: 'Từ tiếng Anh, Nhật, Pháp đến Tây Ban Nha và hơn thế nữa.',
            },
            {
              icon: <Zap className="h-7 w-7" />,
              title: 'Theo dõi chi tiết',
              description: 'Dashboard toàn diện để xem tiến độ hàng ngày, tuần, tháng.',
            },
            {
              icon: <Trophy className="h-7 w-7" />,
              title: 'Huy hiệu & phần thưởng',
              description: 'Nhận huy hiệu độc quyền khi hoàn thành thử thách hàng ngày.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-card border-border hover:border-primary/50 hover:shadow-primary/5 group rounded-xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="from-primary/20 to-accent/20 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-foreground mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

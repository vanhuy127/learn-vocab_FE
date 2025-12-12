const Courses = () => {
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
          {[
            {
              name: 'Tiếng Anh cơ bản',
              level: 'Beginner',
              words: 500,
              learners: '12K+',
              color: 'from-blue-500/40 to-cyan-500/40',
            },
            {
              name: 'Tiếng Anh nâng cao',
              level: 'Advanced',
              words: 1000,
              learners: '8K+',
              color: 'from-purple-500/40 to-pink-500/40',
            },
            {
              name: 'Tiếng Nhật',
              level: 'Beginner',
              words: 800,
              learners: '5K+',
              color: 'from-red-500/40 to-orange-500/40',
            },
            {
              name: 'Tiếng Pháp',
              level: 'Intermediate',
              words: 600,
              learners: '4K+',
              color: 'from-yellow-500/40 to-amber-500/40',
            },
            {
              name: 'Tiếng Đức',
              level: 'Beginner',
              words: 700,
              learners: '3K+',
              color: 'from-green-500/40 to-emerald-500/40',
            },
            {
              name: 'Tiếng Tây Ban Nha',
              level: 'Intermediate',
              words: 750,
              learners: '6K+',
              color: 'from-rose-500/40 to-red-500/40',
            },
          ].map((course, idx) => (
            <div
              key={idx}
              className="bg-card border-border hover:border-primary/50 group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`h-32 bg-linear-to-br ${course.color} relative overflow-hidden`}>
                <div className="from-card absolute inset-0 bg-linear-to-t to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-foreground mb-4 text-xl font-bold">{course.name}</h3>
                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60">Từ vựng</span>
                    <span className="text-accent font-semibold">{course.words} từ</span>
                  </div>
                </div>
                <button className="from-primary to-accent text-primary-foreground hover:shadow-primary/30 w-full transform rounded-lg bg-linear-to-r py-3 font-semibold transition-all hover:scale-105 hover:shadow-lg">
                  Tham gia ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

import React from 'react';

import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="border-border relative overflow-hidden border-t py-20 sm:py-32">
      <div className="from-primary/10 via-accent/5 to-primary/10 pointer-events-none absolute inset-0 bg-linear-to-r" />
      <div className="bg-accent/10 pointer-events-none absolute top-10 right-20 h-64 w-64 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">Bạn đã sẵn sàng chưa?</h2>
        <p className="text-foreground/70 mb-8 text-xl leading-relaxed text-balance">
          Hôm nay là ngày hoàn hảo để bắt đầu hành trình học từ vựng của bạn
        </p>
        <button className="from-accent to-primary text-accent-foreground hover:shadow-accent/40 inline-flex transform items-center gap-2 rounded-lg bg-linear-to-r px-10 py-4 text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl">
          Đăng ký miễn phí ngay <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default CTA;

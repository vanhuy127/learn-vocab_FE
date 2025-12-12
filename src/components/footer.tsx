import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-border border-t py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-foreground text-xl font-bold">
                Yuh<span className="text-white dark:text-[#31694e]">Nav</span> Learning
              </span>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Nền tảng học từ vựng giúp bạn nắm vững ngôn ngữ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Khóa học</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Tiếng Anh
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Tiếng Nhật
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Tiếng Pháp
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Tiếng Đức
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Tài nguyên</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Hướng dẫn
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-primary transition">
                  Cộng đồng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-foreground/60">support@vocabmaster.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-foreground/60">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-foreground/60">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-border my-8 border-t" />

        {/* Bottom Footer */}
        <div className="text-foreground/60 flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p>&copy; 2025 VocabMaster. Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-primary transition">
              Điều khoản dịch vụ
            </a>
            <a href="#" className="hover:text-primary transition">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

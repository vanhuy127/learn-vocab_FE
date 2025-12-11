import { Code } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from './ui/badge';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12 text-white transition-colors duration-300 dark:border-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center">
              <Code className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-xl font-bold">DevJobs</span>
              <Badge className="ml-2 border-cyan-500/30 bg-cyan-500/20 text-cyan-300">IT</Badge>
            </div>
            <p className="mb-4 text-gray-400">Nền tảng tuyển dụng IT hàng đầu tại Việt Nam</p>
            <div className="flex space-x-4">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">f</span>
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">in</span>
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">tw</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Dành cho Developers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Tìm việc IT
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Tạo CV Tech
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Lộ trình học
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Salary Calculator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Dành cho Công ty</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Đăng tin tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Tìm IT talent
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Tech hiring solutions
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-cyan-400">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: hello@devjobs.vn</li>
              <li>Hotline: 1900 DEV JOBS</li>
              <li>Địa chỉ: Tech Hub, Q1, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 dark:border-gray-900">
          <p>&copy; 2024 DevJobs. Made with ❤️ for Vietnamese developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

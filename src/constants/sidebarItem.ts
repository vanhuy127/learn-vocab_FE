import { BookOpen, Users } from 'lucide-react';

import { ROUTE_PATH } from './router';

export const adminNavigationItems = [
  // {
  //   title: 'Thống kê',
  //   url: ROUTE_PATH.ADMIN.DASHBOARD,
  //   icon: LayoutDashboard,
  // },
  {
    title: 'Người dùng',
    url: ROUTE_PATH.ADMIN.USERS.LIST,
    icon: Users,
  },
  {
    title: 'Học phần',
    url: ROUTE_PATH.ADMIN.STUDY_SETS.LIST,
    icon: BookOpen,
  },
  // {
  //   title: 'Việc làm',
  //   url: ROUTE_PATH.ADMIN.JOBS.LIST,
  //   icon: Briefcase,
  // },
  // {
  //   title: 'Kỹ năng',
  //   url: ROUTE_PATH.ADMIN.SKILLS.LIST,
  //   icon: Briefcase,
  // },
  // {
  //   title: 'Content',
  //   url: '/admin/content',
  //   icon: FileText,
  // },
  // {
  //   title: 'Settings',
  //   url: '/admin/settings',
  //   icon: Settings,
  // },
];

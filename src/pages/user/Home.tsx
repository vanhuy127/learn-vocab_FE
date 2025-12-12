import { lazy } from 'react';

const Hero = lazy(() => import('@/components/user/home/Hero'));
const Features = lazy(() => import('@/components/user/home/Features'));
const Courses = lazy(() => import('@/components/user/home/Courses'));
const CTA = lazy(() => import('@/components/user/home/CTA'));
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Courses />
      <CTA />
    </div>
  );
}

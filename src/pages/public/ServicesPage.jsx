import React from 'react';
import { Link } from 'react-router-dom';
import service_image from '../../assets/service_image.png';

import {
  Presentation,
  Users,
  Compass,
  FileCode2,
  BookOpen,
  Briefcase,
  ArrowRight,
  UserCheck,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Tv,
  Users2,
  Layers
} from 'lucide-react';

export const ServicesPage = () => {
  const services = [
    {
      id: 'guest-lectures',
      title: 'Guest Lectures',
      description: 'Invite industry experts to deliver insightful sessions and share real-world perspectives with students.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-blue-50 text-[#1D58D8]',
      icon: Tv,
      serviceParam: 'Guest Lectures'
    },
    {
      id: 'workshops',
      title: 'Workshops',
      description: 'Hands-on workshops focused on practical skills, tools, and the latest industry practices.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-emerald-50 text-emerald-600',
      icon: Users2,
      serviceParam: 'Workshops'
    },
    {
      id: 'mentorship',
      title: 'Mentorship',
      description: 'One-on-one or group mentorship to guide students in their academic and career journeys.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-orange-50 text-orange-500',
      icon: Compass,
      serviceParam: 'Mentorship'
    },
    {
      id: 'student-projects',
      title: 'Student Projects',
      description: 'Collaborate on live projects that help students solve real industry problems and build portfolios.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-amber-50 text-amber-600',
      icon: FileCode2,
      serviceParam: 'Student Projects'
    },
    {
      id: 'curriculum-development',
      title: 'Curriculum Development',
      description: 'Partner with experts to design and enhance curriculum aligned with industry needs.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-cyan-50 text-cyan-600',
      icon: BookOpen,
      serviceParam: 'Curriculum Development'
    },
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Access expert consultation for academic, technical, and industry-related initiatives.',
      delivery: 'Delivery: Hybrid / On-Campus / Online',
      iconBg: 'bg-purple-50 text-purple-600',
      icon: Briefcase,
      serviceParam: 'Consultancy'
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-6 sm:space-y-10 animate-fade">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-[#1D58D8] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800">Services</span>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Heading & Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider">
            SERVICES
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
            Academic Engagement <br />
            <span className="text-[#1D58D8]">Services</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
            Standardized collaboration formats designed to integrate industry expertise into higher education programs.
          </p>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center mb-2">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Industry Experts</span>
            </div>

            <div className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Practical Learning</span>
            </div>

            <div className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Student Success</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image with Glassmorphic Overlay */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
            <img
              src={service_image}
              alt="Academic Engagement with Industry"
              className="w-full h-[280px] sm:h-[360px] lg:h-[390px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Glassmorphic Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-white flex items-center gap-3.5 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-blue-200" />
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-snug text-slate-100">
                Empower students with real-world insights and industry exposure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Section Title */}
      <div className="lg:hidden pt-4">
        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Our Services</h2>
      </div>

      {/* ========================================================================= */}
      {/* 3. 6 SERVICES CARDS GRID */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <Link
              key={svc.id}
              to={`/experts?service=${encodeURIComponent(svc.serviceParam)}`}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-6 cursor-pointer"
            >
              <div className="space-y-4">
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${svc.iconBg} flex items-center justify-center shrink-0 border border-current/10 shadow-2xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#0F172A] text-lg sm:text-xl tracking-tight group-hover:text-[#1D58D8] transition-colors">
                    {svc.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Card Footer with Delivery Format & Arrow */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                  {svc.delivery}
                </span>
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D58D8] flex items-center justify-center shrink-0 group-hover:bg-[#1D58D8] group-hover:text-white transition-all group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM BANNER CARD ("Looking for a customized engagement?") */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-indigo-50/40 border border-blue-100/90 rounded-3xl p-6 sm:p-10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Copy & CTA */}
        <div className="space-y-4 text-left max-w-lg relative z-10">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Looking for a customized engagement?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Tell us your requirements and we'll help you connect with the right expert.
          </p>
          <div className="pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              Request an Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Vector Illustration */}
        <div className="relative z-10 flex items-center justify-center shrink-0 w-full md:w-auto max-w-xs">
          <svg viewBox="0 0 320 180" className="w-full h-auto drop-shadow-xs" fill="none">
            {/* Background elements */}
            <rect x="20" y="20" width="280" height="140" rx="20" fill="#EBF3FE" fillOpacity="0.5" />
            <circle cx="270" cy="35" r="16" fill="#DBEAFE" />
            <path d="M264 35h12M270 29v12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            
            {/* Floating Chat bubbles & Chart */}
            <rect x="180" y="40" width="48" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
            <path d="M190 54h6M198 48h6M206 51h6M214 44h6" stroke="#1D58D8" strokeWidth="2" strokeLinecap="round" />
            
            <rect x="235" y="40" width="40" height="26" rx="8" fill="#1D58D8" />
            <circle cx="248" cy="53" r="2" fill="#FFFFFF" />
            <circle cx="255" cy="53" r="2" fill="#FFFFFF" />
            <circle cx="262" cy="53" r="2" fill="#FFFFFF" />

            {/* Left Character (Woman at Laptop) */}
            <circle cx="75" cy="65" r="15" fill="#1E293B" />
            <path d="M68 62c0-8 14-8 14 0v4H68v-4z" fill="#0F172A" />
            <circle cx="75" cy="66" r="10" fill="#FED7AA" />
            <path d="M60 110c0-18 12-24 28-24 16 0 28 6 28 24v20H60v-20z" fill="#1D58D8" />
            
            {/* Center Table & Laptop */}
            <rect x="90" y="115" width="140" height="12" rx="4" fill="#64748B" />
            <rect x="105" y="127" width="8" height="25" fill="#94A3B8" />
            <rect x="207" y="127" width="8" height="25" fill="#94A3B8" />
            
            {/* Laptops */}
            <path d="M110 114l6-16h20l-6 16z" fill="#E2E8F0" stroke="#94A3B8" />
            <path d="M184 114l-6-16h20l6 16z" fill="#FFFFFF" stroke="#94A3B8" />

            {/* Right Character (Man at Laptop) */}
            <circle cx="245" cy="65" r="15" fill="#0F172A" />
            <circle cx="245" cy="67" r="10" fill="#FDE68A" />
            <path d="M230 110c0-18 12-24 28-24 16 0 28 6 28 24v20h-56v-20z" fill="#3B82F6" />

            {/* Plant Accents */}
            <path d="M30 140c-5-15 10-25 15-25s5 15-15 25z" fill="#34D399" fillOpacity="0.7" />
            <path d="M45 140c-2-12 10-20 12-20s2 10-12 20z" fill="#10B981" fillOpacity="0.8" />
            <path d="M285 140c5-15-10-25-15-25s-5 15 15 25z" fill="#34D399" fillOpacity="0.7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
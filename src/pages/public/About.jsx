import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import aboutHeroImg from '../../assets/about1.png';
import storyImg from '../../assets/hero-main.png';
import about2 from '../../assets/about2.png';
import {
  GraduationCap,
  Users,
  Sparkles,
  Tv,
  Users2,
  Compass,
  FileCode2,
  BookOpen,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Award,
  TrendingUp,
  Building2,
  Layers,
  CheckCircle2,
  Handshake
} from 'lucide-react';

export const About = () => {
  useEffect(() => {
    document.title = 'About Us | Real World Integration';
    window.scrollTo(0, 0);
  }, []);

  // Structured statistics data (easy to update or replace later)
  const statsData = [
    {
      id: 'institutions',
      value: 100,
      suffix: '+',
      label: 'Partner Institutions',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 'experts',
      value: 500,
      suffix: '+',
      label: 'Industry Experts',
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      id: 'students',
      value: 10000,
      suffix: '+',
      label: 'Students Reached',
      icon: GraduationCap,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      formatter: (val) => val.toLocaleString()
    },
    {
      id: 'collaborations',
      value: 50,
      suffix: '+',
      label: 'Industry Collaborations',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  // 4 Core Values — icons matching screenshot reference
  const values = [
    {
      id: 'connection',
      title: 'Industry Connection',
      description: 'Bringing institutions and experienced professionals together.',
      icon: Layers,
      iconBg: 'bg-blue-100 text-[#1D58D8]'
    },
    {
      id: 'practical',
      title: 'Practical Learning',
      description: 'Helping students gain knowledge beyond traditional classrooms.',
      icon: Sparkles,
      iconBg: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'Creating meaningful connections between academia and industry.',
      icon: Users2,
      iconBg: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'future-ready',
      title: 'Future Ready',
      description: 'Preparing students with relevant skills and real-world exposure.',
      icon: TrendingUp,
      iconBg: 'bg-blue-100 text-[#1D58D8]'
    }
  ];

  // Collaboration pillars for Our Story
  const collaborationFormats = [
    { title: 'Guest Lectures', desc: 'Real-world insights from active practitioners', icon: Tv, color: 'text-blue-600 bg-blue-50' },
    { title: 'Workshops', desc: 'Hands-on practical tool and skill sessions', icon: Users2, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Mentorship', desc: 'Personal guidance for student career growth', icon: Compass, color: 'text-amber-600 bg-amber-50' },
    { title: 'Student Projects', desc: 'Live problem-solving and portfolio building', icon: FileCode2, color: 'text-cyan-600 bg-cyan-50' },
    { title: 'Curriculum Development', desc: 'Modernizing syllabi for market readiness', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { title: 'Consultancy', desc: 'Strategic advisory for academic excellence', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' }
  ];

  // Animated In-Viewport Counter Hook
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((stat) => Math.floor(easeProgress * stat.value))
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(statsData.map((stat) => stat.value));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-12 sm:space-y-16 lg:space-y-20">
      {/* ========================================================================= */}
      {/* BREADCRUMBS */}
      {/* ========================================================================= */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-[#1D58D8] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">About Us</span>
      </nav>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Main Heading, Supporting Text, 3 Benefit Items */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 animate-slide-up-smooth">
            {/* Eyebrow */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D58D8] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-2xs">
              ABOUT REAL WORLD INTEGRATION
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Bridging Academia <br />
              <span className="text-[#1D58D8]">with Industry</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Real World Integration connects educational institutions with industry professionals to create real-world learning, practical exposure, and meaningful opportunities for students.
            </p>

            {/* Three Benefit Items with Staggered Entrance */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              {/* Item 1 */}
              <div
                className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-300"
                style={{ animation: 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center mb-2.5 shadow-2xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Real-World Learning
                </span>
              </div>

              {/* Item 2 */}
              <div
                className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                style={{ animation: 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Industry Expertise
                </span>
              </div>

              {/* Item 3 */}
              <div
                className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-300"
                style={{ animation: 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Future-Ready Students
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Soft Glow & Floating Badge */}
          <div className="lg:col-span-6 relative">
            {/* Subtle Blue Glow / Gradient behind image */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-blue-600/15 via-sky-400/15 to-indigo-500/10 rounded-[28px] sm:rounded-[32px] blur-2xl pointer-events-none" />

            {/* Container with ~20-24px border radius */}
            <div className="relative rounded-[22px] sm:rounded-[24px] overflow-hidden border border-slate-200/80 bg-white shadow-xl animate-hero-img">
              <img
                src={aboutHeroImg}
                alt="Real World Integration - Bridging Education and Industry"
                className="w-full h-auto object-contain block"
              />

              {/* Small Floating Badge — hidden on mobile so image is fully visible */}
              <div className="hidden sm:flex absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 sm:p-4 shadow-xl items-center gap-3.5 animate-float-badge z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#1D58D8]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    Real-World Expertise
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Learn from industry professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR STORY SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-4 sm:pt-6">
        <div className="bg-gradient-to-b from-slate-50/80 via-blue-50/30 to-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-[22px] sm:rounded-[24px] overflow-hidden border border-slate-200/80 shadow-md bg-white">
                <img
                  src={about2}
                  alt="Connecting Education with Real-World Expertise"
                  className="w-full h-auto object-contain block"
                />
                {/* Floating pill badge on the visual — hidden on mobile so image is fully visible */}
                <div className="hidden sm:flex absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-300" />
                  </div>
                  <p className="text-xs font-medium text-slate-200 leading-snug">
                    <span className="font-bold text-white">Direct Academic Collaboration:</span> Verified practitioners empowering classrooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider">
                OUR STORY
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
                Connecting Education with <br />
                <span className="text-[#1D58D8]">Real-World Expertise</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
                Real World Integration was founded on a straightforward vision: academia provides the vital theoretical foundation, while active industry experts provide the contemporary context. We enable colleges, universities, training institutes, and seasoned industry professionals to seamlessly collaborate through structured, high-impact engagement formats:
              </p>

              {/* Six Collaboration Formats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {collaborationFormats.map((format, idx) => {
                  const Icon = format.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all duration-200"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${format.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                          {format.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                          {format.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1D58D8] hover:text-[#1546B8] group"
                >
                  Explore all academic engagement services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. VALUES SECTION — "What We Stand For" */}
      {/* ========================================================================= */}
      <section className="relative">
        {/* Soft gradient container matching screenshot */}
        <div className="bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-indigo-50/30 border border-blue-100/60 rounded-3xl p-7 sm:p-10 shadow-2xs relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="mb-7 sm:mb-8 relative z-10">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider mb-3">
              OUR VALUES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              What We <span className="text-[#1D58D8]">Stand For</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl">
              Our core values drive everything we do at Real World Integration.
            </p>
          </div>

          {/* 4 horizontal value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.id}
                  className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  {/* Circle Icon */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${val.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                      {val.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STATISTICS SECTION — Light background row matching screenshot */}
      {/* ========================================================================= */}
      <section ref={statsRef} className="relative">
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-slate-200/70">
            {statsData.map((stat, idx) => {
              const Icon = stat.icon;
              const displayCount = counts[idx] || 0;
              const formattedValue = stat.formatter
                ? stat.formatter(displayCount)
                : displayCount.toString();

              return (
                <div
                  key={stat.id}
                  className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-7 sm:py-8 group hover:bg-blue-50/40 transition-colors duration-200"
                >
                  {/* Colored circle icon */}
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {/* Number + Label */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight leading-none">
                      {formattedValue}{stat.suffix}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="relative pb-6">
        <div className="bg-[#0b172b] border border-slate-800 rounded-3xl p-7 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          {/* Subtle accent wave line / glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 sm:gap-5 relative z-10 text-left max-w-xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Handshake className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight">
                Let's Build a Stronger Future Together
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed mt-1">
                Partner with us to create real learning opportunities and industry-ready talent.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 w-full md:w-auto justify-end">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-sm hover:bg-slate-100 transition-transform active:scale-[0.98] cursor-pointer"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
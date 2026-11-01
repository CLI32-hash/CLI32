import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import aboutHeroImg from '../../assets/about1.png';
import about2 from '../../assets/about2.png';
import {
  GraduationCap,
  Users,
  Sparkles,
  Presentation,
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
  Handshake,
  Target,
  Check,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

export const About = () => {
  useEffect(() => {
    document.title = 'About Us | Real World Integration';
    window.scrollTo(0, 0);
  }, []);

  // Structured statistics data
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

  // 4 Core Values
  const values = [
    {
      id: 'connection',
      title: 'Industry Connection',
      description: 'Bringing institutions and experienced professionals together.',
      icon: Layers,
      colorClass: 'bg-blue-50 text-[#1D58D8] border-blue-100'
    },
    {
      id: 'practical',
      title: 'Practical Learning',
      description: 'Helping students gain knowledge beyond traditional classrooms.',
      icon: Sparkles,
      colorClass: 'bg-emerald-50 text-[#059669] border-emerald-100'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'Creating meaningful connections between academia and industry.',
      icon: Handshake,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      id: 'future-ready',
      title: 'Future Ready',
      description: 'Preparing students with relevant skills and real-world exposure.',
      icon: TrendingUp,
      colorClass: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  // Collaboration formats
  const collaborationFormats = [
    {
      title: 'Guest Lectures',
      desc: 'Real-world insights and emerging trends delivered directly to classrooms.',
      icon: Presentation,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      title: 'Workshops & Skill Training',
      desc: 'Hands-on, practical sessions focused on tools and current industry practices.',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Mentorship',
      desc: 'Personal guidance for student career growth, portfolios, and leadership.',
      icon: Compass,
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      title: 'Student Projects',
      desc: 'Advising on capstone projects, live problem-solving, and applied research.',
      icon: FileCode2,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100'
    },
    {
      title: 'Curriculum Co-Design',
      desc: 'Modernizing syllabi and aligning academic coursework with industry requirements.',
      icon: BookOpen,
      color: 'text-teal-600 bg-teal-50 border-teal-100'
    },
    {
      title: 'Internships & Placement',
      desc: 'Connecting students with valuable workplace exposure and recruitment pathways.',
      icon: Briefcase,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    }
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-14 sm:space-y-20 lg:space-y-24 animate-fade">
      {/* ========================================================================= */}
      {/* BREADCRUMB */}
      {/* ========================================================================= */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-[#1D58D8] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">About Us</span>
      </nav>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left animate-slide-up-smooth">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D58D8] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1D58D8]" />
              ABOUT REAL WORLD INTEGRATION
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Bridging Academia <br />
              <span className="text-[#1D58D8]">with Industry</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Real World Integration connects higher education institutions with industry practitioners to deliver practical knowledge, applied learning, and career-defining mentorship into academic environments.
            </p>

            {/* Benefit Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center sm:flex-col sm:items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] border border-blue-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Applied Learning</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Practical classroom focus</p>
                </div>
              </div>

              <div className="flex items-center sm:flex-col sm:items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Industry Experts</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Vetted practitioners</p>
                </div>
              </div>

              <div className="flex items-center sm:flex-col sm:items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-amber-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] border border-amber-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Career Readiness</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Future-ready graduates</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/services"
                className="btn-arrow-animate inline-flex items-center gap-2 px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm"
              >
                Explore Services <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 rounded-full text-xs sm:text-sm font-bold transition-all shadow-2xs"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Column: Visual with Ambient Glow */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/15 via-sky-300/15 to-indigo-500/10 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl w-full">
              <img
                src={aboutHeroImg}
                alt="Bridging Academia with Industry"
                className="w-full h-auto object-cover block"
              />

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 shadow-lg items-center gap-3 animate-float-badge z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#1D58D8]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    Direct Practitioner Engagement
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                    Connecting institutions &amp; verified leaders
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
      <ScrollReveal>
        <section className="bg-gradient-to-b from-slate-50/80 via-blue-50/20 to-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
                <img
                  src={about2}
                  alt="Connecting Education with Real-World Expertise"
                  className="w-full h-auto object-contain block"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-300" />
                  </div>
                  <p className="text-xs font-medium text-slate-200 leading-snug">
                    <span className="font-bold text-white">Direct Academic Collaboration:</span> Verified practitioners empowering classrooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-left">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider">
                OUR STORY
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
                Connecting Education with <br />
                <span className="text-[#1D58D8]">Real-World Expertise</span>
              </h2>

              <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Education provides the foundation. Real-world experience brings it to life. We believe that connecting educational institutions with experienced professionals can make learning more practical, relevant, and impactful.
                </p>
                <p>
                  Yet, finding the right experts to share their knowledge and industry experience with learners isn't always easy. The Real-World Integration Platform was created to make these connections easier — helping institutions access professional expertise while enabling experienced individuals to discover teaching opportunities and contribute to academic development.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/services"
                  className="btn-arrow-animate inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1D58D8] hover:text-[#1546B8] group"
                >
                  Explore all academic engagement services
                  <ArrowRight className="w-4 h-4 arrow-icon" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 3. MISSION & VISION SPOTLIGHT */}
      {/* ========================================================================= */}
      <ScrollReveal>
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#1D58D8]">
              PURPOSE &amp; DIRECTION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Empowering Education Through Meaningful Partnerships
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Guided by a clear mission and vision to bridge academia and industry seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-blue-50/80 via-white to-sky-50/30 border border-blue-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden card-animate-hover">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-[#1D58D8] border border-blue-200 flex items-center justify-center shadow-2xs shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D58D8] block">
                      Our Core Purpose
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">Our Mission</h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  "To bridge the gap between educational institutions and industry by connecting them with experienced professionals, fostering practical learning, and developing industry-ready talent."
                </p>

                <div className="pt-2 border-t border-blue-100 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                    <span>Connect institutions with vetted practitioner talent</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                    <span>Foster hands-on, applied classroom learning</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                    <span>Develop industry-ready, competitive graduates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/30 border border-emerald-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden card-animate-hover">
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#059669] border border-emerald-200 flex items-center justify-center shadow-2xs shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] block">
                      Our Long-Term Aspiration
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">Our Vision</h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  "To become a leading platform connecting industry and academia through real-world expertise and meaningful collaboration."
                </p>

                <div className="pt-2 border-t border-emerald-100 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Build India's premier academic-industry network</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Make real-world expertise accessible to every campus</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Champion continuous, collaborative knowledge exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 4. COLLABORATION FORMATS */}
      {/* ========================================================================= */}
      <ScrollReveal>
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00A86B]">
              HOW WE COLLABORATE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Engagement Formats Tailored to Academic Needs
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Structured collaboration formats designed to seamlessly fit institutional requirements and expert availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {collaborationFormats.map((format, idx) => {
              const Icon = format.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 card-animate-hover h-full"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${format.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A]">{format.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {format.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 5. VALUES SECTION — "What We Stand For" (COMMENTED OUT) */}
      {/* ========================================================================= */}
      {/* 
      <ScrollReveal>
        <section className="bg-gradient-to-br from-blue-50/60 via-sky-50/30 to-indigo-50/20 border border-blue-100/70 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs relative overflow-hidden">
          <div className="mb-8 relative z-10">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
              OUR VALUES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              What We <span className="text-[#1D58D8]">Stand For</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1 max-w-xl">
              The fundamental principles that guide how we build relationships between academia and industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${val.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
      */}

      {/* ========================================================================= */}
      {/* 6. STATISTICS SECTION (COMMENTED OUT) */}
      {/* ========================================================================= */}
      {/* 
      <section ref={statsRef} className="relative">
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-slate-100">
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
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
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
      */}

      {/* ========================================================================= */}
      {/* 7. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <ScrollReveal direction="scale">
        <section className="relative pb-4">
          <div className="bg-[#0b172b] border border-slate-800 rounded-3xl p-7 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
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

            <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto justify-start md:justify-end">
              <Link
                to="/register/institution"
                className="btn-arrow-animate inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white font-bold text-xs sm:text-sm rounded-full shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                Join as Institution <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-sm hover:bg-slate-100 transition-all active:scale-[0.98] cursor-pointer"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

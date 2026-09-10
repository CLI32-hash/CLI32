import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import heroMain from '../../assets/hero-main.png';
import heroThumb from '../../assets/group_profiles.png';
import {
  Building2,
  Users2,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  FileCode,
  GraduationCap,
  Briefcase,
  MapPin,
  CheckCircle,
  Award,
  Search,
  UserPlus,
  UserCheck,
  User,
  ShieldCheck,
  Lock,
  Send,
  Presentation,
  Compass,
  Layers,
  CheckCircle2,
  ArrowDown
} from 'lucide-react';

export const Home = () => {
  const { experts } = useApp();
  const featuredExperts = experts?.slice(0, 4) || [];

  return (
    <div className="space-y-10 sm:space-y-20 lg:space-y-24 pb-12 sm:pb-20 animate-fade">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-white pt-6 sm:pt-14 pb-10 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D58D8] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              INDUSTRY &times; ACADEMIA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12] text-[#0F172A]">
              Bringing Industry Expertise <br />
              <span className="text-[#1D58D8]">Into Education</span>
            </h1>

            {/* Thumbnail + Browse text like the reference design */}
            <div className="flex items-center gap-3 sm:gap-4 py-1">
              <img
                src={heroThumb}
                alt="Trusted Experts"
                className="h-9 sm:h-12 w-auto object-contain shrink-0"
              />
              <p className="text-[11px] sm:text-sm text-slate-600 leading-snug">
                Simply browse through our extensive list of trusted experts,<br className="hidden sm:inline" /> schedule your academic engagement hassle-free.
              </p>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
              Real World Integration connects colleges, universities and training institutes with professionals who can bring real-world knowledge, practical skills and industry experience into the classroom.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
              <Link
                to="/register/institution"
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
              >
                Join as an Institution <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register/expert"
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
              >
                Join as an Industry Expert
              </Link>
            </div>

            {/* Verified & Security Badges (from reference screenshot) */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1 text-[11px] sm:text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00BBA7]" />
                <span>Verified Professionals</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-700">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00BBA7]" />
                <span>Secure &amp; Compliant</span>
              </div>
            </div>

            {/* Trust / Value Line */}
            <p className="text-xs text-slate-400 font-medium pt-0.5">
              Discover experts. Explore services. Start meaningful academic-industry collaborations.
            </p>
          </div>

          {/* Right Hero Image: Original illustration */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-end relative">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl">
              <img
                src={heroMain}
                alt="Real World Integration - Classroom Engagement"
                className="w-full h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE VALUE SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#1D58D8]">
            ONE PLATFORM. TWO COMMUNITIES.
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Connecting Institutions With the Right Industry Expertise
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Real World Integration gives institutions a simple way to discover professionals and gives industry experts a place to showcase their knowledge, experience and services.
          </p>
        </div>

        {/* Two Large Value Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {/* Card 1: For Institutions */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D58D8] flex items-center justify-center font-bold border border-blue-100 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-[#0F172A]">For Institutions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Colleges, Universities &amp; Training Institutes</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Find professionals who can bring practical industry knowledge into your academic environment.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                  <span>Discover experts by industry, expertise and experience</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                  <span>Explore professional profiles and services</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                  <span>Find speakers, mentors and practitioners</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1D58D8] shrink-0 mt-0.5" />
                  <span>Send enquiries directly to experts</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                to="/experts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs font-bold transition-all shadow-xs"
              >
                Explore Experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: For Industry Experts */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center font-bold border border-emerald-100 shrink-0">
                  <Users2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-[#0F172A]">For Industry Experts</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Professionals, Consultants &amp; Specialists</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Share your knowledge, experience and professional expertise with educational institutions.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Create your professional profile</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Showcase your areas of expertise</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>List the services you offer</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Receive enquiries from institutions</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                to="/register/expert"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-slate-850 text-white rounded-full text-xs font-bold transition-all shadow-xs"
              >
                Join as an Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-2 sm:py-4">
        <div className="bg-[#F8FAFC]/80 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 shadow-2xs">
          {/* Header */}
          <div className="text-left space-y-2 mb-8 sm:mb-14">
            <div className="text-[#00BBA7] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              SIMPLE BY DESIGN
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0F172A] leading-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Find the right expertise and start a conversation in just a few steps. Discover each other directly through profiles and search.
            </p>
          </div>

          {/* Stepper Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x divide-slate-200/90">
            {/* Left Flow: FOR INSTITUTIONS */}
            <div className="lg:pr-10 xl:pr-16">
              <div className="text-slate-500 font-bold text-[11px] sm:text-xs tracking-wider uppercase mb-6 sm:mb-10">
                FOR INSTITUTIONS
              </div>

              <div className="relative">
                {/* Connecting vertical line */}
                <div className="absolute left-[5px] top-[24px] bottom-[24px] w-[2px] bg-[#99F6E4]" />

                <div className="space-y-8 sm:space-y-10">
                  {/* Step 01 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0D9488] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <UserPlus className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#0D9488]">01</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Create your profile
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Register your institution and tell us what areas of expertise you are looking for.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0D9488] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <Search className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#0D9488]">02</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Explore experts
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Search professionals by industry, expertise, experience and services.
                      </p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0D9488] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <Briefcase className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#0D9488]">03</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        View expertise
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Review professional profiles and available services.
                      </p>
                    </div>
                  </div>

                  {/* Step 04 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0D9488] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <Send className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#0D9488]">04</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Send an enquiry
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Contact the expert directly with your requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Flow: FOR INDUSTRY EXPERTS */}
            <div className="lg:pl-10 xl:pl-16">
              <div className="text-slate-500 font-bold text-[11px] sm:text-xs tracking-wider uppercase mb-6 sm:mb-10">
                FOR INDUSTRY EXPERTS
              </div>

              <div className="relative">
                {/* Connecting vertical line */}
                <div className="absolute left-[5px] top-[24px] bottom-[24px] w-[2px] bg-[#C4B5FD]" />

                <div className="space-y-8 sm:space-y-10">
                  {/* Step 01 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#7C3AED] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <UserPlus className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#7C3AED]">01</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Create your profile
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Register and showcase your professional background.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#7C3AED] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#7C3AED]">02</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Showcase your expertise
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Add your skills, experience and areas of practice.
                      </p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#7C3AED] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <Layers className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#7C3AED]">03</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        List your services
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Offer guest lectures, workshops, mentorship and other services.
                      </p>
                    </div>
                  </div>

                  {/* Step 04 */}
                  <div className="relative flex items-start">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#7C3AED] shrink-0 mt-[18px] z-10 ring-4 ring-[#F8FAFC]" />
                    <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0 ml-5 sm:ml-6 shadow-2xs">
                      <UserCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="ml-4 pt-1">
                      <div className="text-[11px] font-bold text-[#7C3AED]">04</div>
                      <h4 className="text-base font-extrabold text-[#0F172A] leading-tight">
                        Connect with institutions
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">
                        Receive enquiries from educational institutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#00A86B]">
            WAYS TO COLLABORATE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Bring Industry Experience Into the Classroom
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Institutions can engage professionals in different ways depending on their academic and practical needs.
          </p>
        </div>

        {/* 6 Clean Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Service 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D58D8] flex items-center justify-center border border-blue-100">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Guest Lectures</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bring real-world industry perspectives and practical insights to students.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Workshops</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conduct hands-on sessions focused on practical skills, tools and current industry practices.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center border border-amber-100">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Mentorship</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Guide students through projects, careers and real-world industry expectations.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center border border-indigo-100">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Student Projects</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Support students with practical projects and real-world problem solving.
              </p>
            </div>
          </div>

          {/* Service 5 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center border border-teal-100">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Curriculum Development</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Help institutions strengthen academic content with current industry perspectives.
              </p>
            </div>
          </div>

          {/* Service 6 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center border border-rose-100">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Consultancy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Provide professional expertise for academic, technical and industry-related initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PLATFORM DISCOVERY SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#1D58D8]">
            DISCOVER EXPERTISE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Find Professionals Who Know the Industry
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Search across expertise, industries, experience and services to discover professionals who can contribute to your institution.
          </p>
        </div>

        {/* Large SaaS UI Mockup of Explore Experts Page */}
        <div className="bg-slate-950 rounded-2xl sm:rounded-3xl p-2.5 sm:p-6 shadow-2xl border border-slate-800 text-slate-900">
          <div className="flex items-center justify-between pb-2 sm:pb-3 px-2 sm:px-3 border-b border-slate-800">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
              Explore Industry Experts
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 font-semibold px-1.5 sm:px-2 py-0.5 rounded bg-slate-800 hidden sm:block">
              Live SaaS Platform
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-3 sm:p-8 mt-2 sm:mt-3 space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-500 font-medium">Search by name, expertise or industry...</span>
                <span className="ml-auto text-[10px] font-bold bg-[#1D58D8] text-white px-3 py-1 rounded-md hidden sm:inline">
                  Search
                </span>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 bg-blue-50 text-[#1D58D8] border border-blue-200 rounded-lg font-bold">
                  Artificial Intelligence
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold">
                  Workshop
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold">
                  5+ Years
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold">
                  Chennai
                </span>
              </div>
            </div>

            {/* 3 Expert Cards Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                      alt="Arun Kumar"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Arun Kumar</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Principal AI Architect</p>
                      <p className="text-[11px] text-[#1D58D8] font-bold">Cognitive Labs</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 border-y border-slate-100 py-1.5">
                    <span>Artificial Intelligence</span> • <span>12 Yrs Exp</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">AI/ML</span>
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">LLMs</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Workshops</span>
                  </div>
                </div>
                <Link
                  to="/experts/exp-1"
                  className="w-full text-center py-2 bg-slate-50 hover:bg-[#1D58D8] hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 transition-colors"
                >
                  View Profile →
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                      alt="Priya Sharma"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Priya Sharma</h4>
                      <p className="text-[11px] text-slate-500 font-medium">VP of Brand Strategy</p>
                      <p className="text-[11px] text-[#1D58D8] font-bold">GrowthCraft Media</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 border-y border-slate-100 py-1.5">
                    <span>Digital Marketing</span> • <span>8 Yrs Exp</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">SEO/SEM</span>
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">Strategy</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Mentorship</span>
                  </div>
                </div>
                <Link
                  to="/experts/exp-2"
                  className="w-full text-center py-2 bg-slate-50 hover:bg-[#1D58D8] hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 transition-colors"
                >
                  View Profile →
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                      alt="Ravi Kumar"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Ravi Kumar</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Head of Plant Operations</p>
                      <p className="text-[11px] text-[#1D58D8] font-bold">Apex Auto Dynamics</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 border-y border-slate-100 py-1.5">
                    <span>Manufacturing</span> • <span>15 Yrs Exp</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">Industry 4.0</span>
                    <span className="text-[10px] bg-blue-50 text-[#1D58D8] px-2 py-0.5 rounded font-semibold">Robotics</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Consultancy</span>
                  </div>
                </div>
                <Link
                  to="/experts/exp-3"
                  className="w-full text-center py-2 bg-slate-50 hover:bg-[#1D58D8] hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 transition-colors"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center pt-5 pb-1">
            <Link
              to="/experts"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              Explore Industry Experts →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY REAL WORLD INTEGRATION */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#00A86B]">
            WHY IT MATTERS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Closer to Industry. Closer to Practice.
          </h2>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xs space-y-8 sm:space-y-10">
          {/* Visual Pipeline Flow */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Step 1: Industry */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl w-full md:w-52">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D58D8] flex items-center justify-center font-bold mb-2 border border-blue-100">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Industry</h3>
              <p className="text-[11px] text-slate-500 mt-1">Practitioners, leaders &amp; domain specialists</p>
            </div>

            <div className="text-slate-300 flex items-center justify-center rotate-90 md:rotate-0 py-1 md:py-0">
              <ArrowRight className="w-6 h-6 text-[#1D58D8]" />
            </div>

            {/* Step 2: Real World Integration */}
            <div className="flex flex-col items-center text-center p-4 sm:p-5 bg-[#0F172A] text-white rounded-xl sm:rounded-2xl w-full md:w-60 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold mb-2">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold">Real World Integration</h3>
              <p className="text-[11px] text-slate-300 mt-1">Discovery, direct connection &amp; engagement</p>
            </div>

            <div className="text-slate-300 flex items-center justify-center rotate-90 md:rotate-0 py-1 md:py-0">
              <ArrowRight className="w-6 h-6 text-[#1D58D8]" />
            </div>

            {/* Step 3: Higher Education */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl w-full md:w-52">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center font-bold mb-2 border border-emerald-100">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Higher Education</h3>
              <p className="text-[11px] text-slate-500 mt-1">Colleges, universities &amp; institutes</p>
            </div>

            <div className="text-slate-300 flex items-center justify-center rotate-90 md:rotate-0 py-1 md:py-0">
              <ArrowRight className="w-6 h-6 text-[#059669]" />
            </div>

            {/* Step 4: Students */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl sm:rounded-2xl w-full md:w-52">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center font-bold mb-2">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Students</h3>
              <p className="text-[11px] text-slate-600 mt-1">Future-ready graduates with practical skills</p>
            </div>
          </div>

          {/* 4 Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-100">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                Real-World Knowledge
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                Bring current industry practices into academic environments.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                Practical Exposure
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                Help students understand how knowledge is applied beyond the classroom.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                Industry Collaboration
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                Create opportunities for professionals and institutions to work together.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                Flexible Engagement
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                Choose from lectures, workshops, mentorship, projects and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FEATURED EXPERTS */}
      {/* ========================================================================= */}
      <section className="w-full space-y-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00A86B]">
              MEET THE EXPERTS
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
              Discover Industry Professionals
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Explore professionals across different industries and areas of expertise.
            </p>
          </div>
          <Link
            to="/experts"
            className="text-xs sm:text-sm font-bold text-[#1D58D8] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Browse All Experts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Auto-scrolling horizontal carousel - Full Screen Width */}
        <style>{`
          @keyframes scrollExperts {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .experts-scroll-track {
            display: flex;
            gap: 1.5rem;
            animation: scrollExperts 35s linear infinite;
            width: max-content;
          }
          .experts-scroll-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="w-full overflow-hidden py-3">
          <div className="experts-scroll-track">
            {/* Render cards multiplied into two identical 8-card halves for seamless infinite loop from screen edge to screen edge */}
            {[
              ...featuredExperts,
              ...featuredExperts,
              ...featuredExperts,
              ...featuredExperts
            ].map((exp, idx) => (
              <div
                key={`${exp.id}-${idx}`}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group shrink-0"
                style={{ minWidth: '320px', maxWidth: '340px' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={exp.avatar}
                      alt={exp.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-[#0F172A] text-[15px] leading-snug group-hover:text-[#1D58D8] transition-colors">
                        {exp.name}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">{exp.designation}</div>
                      <div className="text-xs text-[#00A86B] font-semibold mt-0.5">{exp.organization}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 border-y border-slate-100 py-2.5">
                    <span className="font-semibold text-slate-700">{exp.industry}</span>
                    <span>•</span>
                    <span>{exp.experience} Years Experience</span>
                  </div>

                  {/* Skills */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1.5">
                      Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(exp.expertise || []).slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1.5">
                      Services:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(exp.servicesOffered || []).slice(0, 3).map((srv) => (
                        <span
                          key={srv}
                          className="text-[11px] bg-blue-50 text-[#1D58D8] px-2.5 py-1 rounded-md font-semibold"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={`/experts/${exp.id}`}
                    className="w-full text-center py-2.5 bg-slate-50 hover:bg-[#1D58D8] hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    View Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="bg-[#0F172A] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 text-center space-y-5 sm:space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Ready to Connect Industry With Education?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed pt-1">
              Whether you are an institution looking for practical expertise or a professional ready to share your experience, Real World Integration gives you a place to connect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 relative z-10">
            <Link
              to="/register/institution"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
            >
              Join as an Institution
            </Link>
            <Link
              to="/register/expert"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full text-xs sm:text-sm font-bold shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              Join as an Industry Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
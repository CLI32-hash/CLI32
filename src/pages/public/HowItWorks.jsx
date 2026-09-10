import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Sparkles, 
  Layers, 
  Send, 
  Building2, 
  Search, 
  GraduationCap, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const HowItWorks = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  const expertSteps = [
    {
      step: '01',
      title: 'Create your practitioner profile',
      desc: 'Register your background, current enterprise designation, years of experience, and credentials.',
      icon: UserCheck,
      tag: 'Step 1'
    },
    {
      step: '02',
      title: 'Showcase your expertise',
      desc: 'Highlight core industry specializations, technological domains, and practical achievements.',
      icon: Sparkles,
      tag: 'Step 2'
    },
    {
      step: '03',
      title: 'Publish engagement formats',
      desc: 'Define how you can contribute: Guest Lectures, Workshops, Mentorship, Projects, or Advisory.',
      icon: Layers,
      tag: 'Step 3'
    },
    {
      step: '04',
      title: 'Receive institutional enquiries',
      desc: 'Colleges discover your profile directly and submit structured engagement requests for your review.',
      icon: Send,
      tag: 'Step 4'
    }
  ];

  const institutionSteps = [
    {
      step: '01',
      title: 'Set up institution profile',
      desc: 'Register your university or college department, point of contact, and academic focus areas.',
      icon: Building2,
      tag: 'Step 1'
    },
    {
      step: '02',
      title: 'Search & discover experts',
      desc: 'Filter practitioners by specialization, years in enterprise, industry sector, and location.',
      icon: Search,
      tag: 'Step 2'
    },
    {
      step: '03',
      title: 'Review verified credentials',
      desc: 'Evaluate past roles, technical proficiencies, available engagement modes, and bio details.',
      icon: GraduationCap,
      tag: 'Step 3'
    },
    {
      step: '04',
      title: 'Submit direct engagement enquiry',
      desc: 'Submit session invitations detailing preferred dates, batch size, topics, and delivery mode.',
      icon: Send,
      tag: 'Step 4'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16 animate-fade">
      
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          Platform Workflow
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Real World Integration Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          A structured, four-step pathway connecting higher education classrooms with real-world industry expertise.
        </p>
      </div>

      {/* Main Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* ================= FOR INDUSTRY EXPERTS ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">For Industry Experts</h2>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                Practitioner Path
              </span>
            </div>

            {/* Stepper List */}
            <div className="relative pl-10 sm:pl-12 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-100">
              {expertSteps.map((item) => {
                return (
                  <div key={item.step} className="relative group">
                    {/* Node Dot Badge */}
                    <div className="absolute -left-10 sm:-left-12 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-50 shadow-2xs flex items-center justify-center transition-all">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-600 group-hover:text-blue-600">
                        {item.step}
                      </span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-8 mt-8 border-t border-slate-100">
            <Link
              to="/register/expert"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              Join as Industry Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ================= FOR INSTITUTIONS ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">For Institutions</h2>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Colleges &amp; Universities
              </span>
            </div>

            {/* Stepper List */}
            <div className="relative pl-10 sm:pl-12 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-100">
              {institutionSteps.map((item) => {
                return (
                  <div key={item.step} className="relative group">
                    {/* Node Dot Badge */}
                    <div className="absolute -left-10 sm:-left-12 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-slate-200 group-hover:border-emerald-600 group-hover:bg-emerald-50 shadow-2xs flex items-center justify-center transition-all">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-600 group-hover:text-emerald-600">
                        {item.step}
                      </span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-8 mt-8 border-t border-slate-100">
            <Link
              to="/register/institution"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              Join as Institution <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Trust Guarantee Strip */}
      <div className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-5 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>Verified practitioner credentials</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>Direct college-to-expert enquiries</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>Standardized academic delivery formats</span>
        </div>
      </div>

    </div>
  );
};
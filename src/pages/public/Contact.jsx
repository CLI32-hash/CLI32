import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, ArrowRight, ChevronDown, Users,
  CheckCircle2, Sparkles, ShieldCheck, Lock, Clock, Award, Shield,
  BadgeCheck, Building2, GraduationCap, Briefcase
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const TRUST_BADGES = [
    {
      icon: ShieldCheck,
      badge: '100% Verified',
      title: 'Verified Professionals',
      desc: 'Every expert & institution undergoes rigorous credential, experience, and identity verification.',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      icon: Lock,
      badge: '100% Confidential',
      title: 'Strict Data Privacy',
      desc: 'Your contact information and institutional queries remain strictly confidential and protected.',
      iconBg: 'bg-blue-50 text-[#1D58D8] border-blue-100'
    },
    {
      icon: Clock,
      badge: 'Fast Response',
      title: '< 24h SLA Guarantee',
      desc: 'Dedicated institutional response team guarantees a reply to official inquiries within 24 hours.',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      icon: Award,
      badge: 'Institutional Trust',
      title: 'Academic MOU Support',
      desc: 'Standardized agreements and formal MoU templates to streamline university-industry collaborations.',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 xl:px-12 font-sans">
      <div className="max-w-[1360px] mx-auto space-y-12 lg:space-y-16">

        {/* ========================================================================= */}
        {/* TOP HERO SECTION                                                         */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & Contact Quick Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Tag */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FF] border border-blue-100 text-[#1D58D8] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#1D58D8]" />
                Get in Touch
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
              Let’s Build a Stronger{' '}
              <span className="text-[#1D58D8]">Future Together</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
              Have questions about our programs, partnerships, or need support? We’re here to help.
              Reach out to us and we’ll get back to you as soon as possible.
            </p>

            {/* 3 Quick Contact Items (Desktop: Horizontal row | Mobile: Vertical stack) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Email Us */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5 hover:border-blue-200 transition-all min-w-0 h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 border border-blue-100/80 text-[#1D58D8] flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">Email Us</h3>
                  <a
                    href="mailto:support@realworldintegration.org"
                    className="text-[11px] xl:text-xs font-semibold text-[#1D58D8] hover:underline block mt-0.5 truncate"
                    title="support@realworldintegration.org"
                  >
                    support@realworldintegration.org
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    We typically reply within 24 hours.
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5 hover:border-blue-200 transition-all min-w-0 h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 border border-blue-100/80 text-[#1D58D8] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">Call Us</h3>
                  <a
                    href="tel:+919876543210"
                    className="text-[11px] xl:text-xs font-semibold text-[#1D58D8] hover:underline block mt-0.5"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Mon – Fri, 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* Our Location */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5 hover:border-blue-200 transition-all min-w-0 h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 border border-blue-100/80 text-[#1D58D8] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">Our Location</h3>
                  <p className="text-[11px] xl:text-xs font-semibold text-slate-700 mt-0.5 leading-snug">
                    Chennai, Tamil Nadu, India
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    (Remote &amp; On-site Support)
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Photo Card with Floating Badge */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-300/30 via-indigo-200/20 to-blue-400/20 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                alt="Students walking on university campus"
                className="w-full h-[260px] sm:h-[320px] lg:h-[350px] object-cover"
              />

              {/* Floating "We're Here to Help" Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">We’re Here to Help</h4>
                  <p className="text-[10px] font-medium text-slate-500">Reach out anytime</p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* VERIFICATION & TRUST BADGES SECTION                                       */}
        {/* ========================================================================= */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                <BadgeCheck className="w-4 h-4 text-emerald-500" />
                Verified &amp; Certified Platform
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Trusted by Academia &amp; Industry Leaders
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md leading-relaxed">
              Real World Integration maintains strict compliance, identity verification, and security controls across all institutional engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_BADGES.map(({ icon: Icon, badge, title, desc, iconBg }) => (
              <div
                key={title}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/20 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${iconBg} shadow-2xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                    {badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: CONTACT FORM + OTHER WAYS TO REACH US                      */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Contact Form Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              {/* Pill Tag */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FF] border border-blue-100 text-[#1D58D8] text-xs font-bold uppercase tracking-wider">
                  Send Us a Message
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Contact <span className="text-[#1D58D8]">Form</span>
              </h2>

              <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-6">
                Fill out the form below and we’ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 my-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-emerald-950">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. A representative from Real World Integration will review your enquiry and get back to you shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    
                    {/* Left Inputs Column */}
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setField('name', e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white placeholder:text-slate-400"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setField('email', e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white placeholder:text-slate-400"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setField('subject', e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white appearance-none cursor-pointer text-slate-700 pr-10"
                          >
                            <option value="">Select a subject</option>
                            <option value="Institutional Partnership">Institutional Partnership</option>
                            <option value="Industry Expert Onboarding">Industry Expert Onboarding</option>
                            <option value="Guest Lectures & Workshops">Guest Lectures &amp; Workshops</option>
                            <option value="Curriculum & Consultancy">Curriculum &amp; Consultancy</option>
                            <option value="General Enquiry">General Support</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Right Message Textarea Column */}
                    <div className="h-full flex flex-col">
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex-1 flex flex-col">
                        <textarea
                          required
                          rows={6}
                          maxLength={500}
                          value={formData.message}
                          onChange={(e) => setField('message', e.target.value)}
                          placeholder="Tell us how we can help..."
                          className="w-full h-full min-h-[160px] px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white placeholder:text-slate-400 resize-none pb-7"
                        />
                        <span className="absolute bottom-2.5 right-3 text-[10px] font-medium text-slate-400 bg-white/90 px-1.5 py-0.5 rounded border border-slate-100">
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex justify-start">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Micro Trust & Security Bar inside Form Card */}
            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Verified Profiles</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Lock className="w-4 h-4 text-[#1D58D8] shrink-0" />
                <span> Data Privacy</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Priority &lt;24h Response</span>
              </div>
            </div>

          </div>

          {/* Right Column: Institutional Partnership & Engagement Desk Sidebar Card */}
          <div className="lg:col-span-5 bg-[#F4F7FF] border border-blue-100/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1D58D8] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  Partnership Concierge
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                  Institutional Engagement Desk
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  Dedicated assistance for Higher Education Institutions &amp; Senior Industry Practitioners.
                </p>
              </div>

              {/* Business Value Cards (For Institutions & For Experts) */}
              <div className="space-y-3.5">
                
                {/* For Higher Education Institutions */}
                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900">For Colleges &amp; Universities</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-9">
                    Instant access to 500+ verified industry leaders, turnkey MOUs, guest lecture scheduling &amp; Board of Studies advisory.
                  </p>
                </div>

                {/* For Industry Experts */}
                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900">For Industry Experts</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-9">
                    Deliver guest talks, conduct weekend workshops, mentor capstones, and build lasting academic influence.
                  </p>
                </div>

              </div>

              {/* Impact Metrics Grid */}
              <div className="pt-2">
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
                  Platform Scale &amp; Impact
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/80 border border-blue-100 text-center">
                    <div className="text-lg font-black text-[#1D58D8]">200+</div>
                    <div className="text-[10px] font-bold text-slate-600">Partner Campuses</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-blue-100 text-center">
                    <div className="text-lg font-black text-emerald-600">500+</div>
                    <div className="text-[10px] font-bold text-slate-600">Verified Experts</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-blue-100 text-center">
                    <div className="text-lg font-black text-indigo-600">2,000+</div>
                    <div className="text-[10px] font-bold text-slate-600">Sessions Delivered</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-blue-100 text-center">
                    <div className="text-lg font-black text-purple-600">50+</div>
                    <div className="text-[10px] font-bold text-slate-600">Domains Covered</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Graphic Widget (Pan-India Network) */}
            <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-4">
                
                {/* Location Icon & Text */}
                <div className="flex items-center gap-3 z-10">
                  <div className="w-9 h-9 rounded-full bg-[#1D58D8] text-white flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Pan-India Network</div>
                    <div className="text-[10px] font-medium text-slate-500">Connecting 200+ Campuses</div>
                  </div>
                </div>

                {/* Handwritten style accent tag */}
                <div className="z-10 text-right">
                  <span className="inline-block text-[12px] sm:text-[13px] font-bold text-[#1D58D8] italic font-serif leading-tight">
                    We’re across India<br />&amp; beyond ~
                  </span>
                </div>

              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Official MOU Templates
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Lock className="w-3.5 h-3.5 text-[#1D58D8]" />
                  Verified Institutional Portal
                </span>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};
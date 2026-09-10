import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { institutionService } from '../../services/institutionService';
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, User, Mail,
  MapPin, Globe, FileText, ShieldCheck, CheckCircle, Lock,
  Eye, EyeOff, ChevronDown, GraduationCap, Users,
} from 'lucide-react';

const INST_TYPES = ['College', 'University', 'Training Institute', 'Polytechnic', 'School of Management'];

const FEATURES = [
  {
    icon: Users,
    title: 'Access Industry Experts',
    desc: 'Browse and connect with verified professionals across 50+ domains.',
  },
  {
    icon: GraduationCap,
    title: 'Enhance Student Outcomes',
    desc: 'Bring real-world expertise into classrooms through guest lectures & workshops.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Trusted',
    desc: 'Every expert is verified. Your data is fully protected.',
  },
];

const STATS = [
  { value: '200+', label: 'Institutions' },
  { value: '500+', label: 'Industry Experts' },
  { value: '2000+', label: 'Sessions Done' },
];

export const RegisterInstitution = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1 = account, 2 = details
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'College',
    contactPerson: '',
    email: '',
    phone: '',
    location: 'Chennai',
    website: '',
    description: '',
    password: '',
  });

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newInst = await institutionService.createInstitution(formData);
    login('INSTITUTION', formData.email, { id: newInst.id, name: newInst.name });
    navigate('/institution/dashboard');
  };

  const handleBack = () => {
    if (step === 2) { setStep(1); return; }
    window.history.length > 1 ? navigate(-1) : navigate('/');
  };

  /* ── Shared input styles ── */
  const inputCls = (hasIcon = true) =>
    `w-full ${hasIcon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-sm border border-slate-200 rounded-xl outline-none transition-all bg-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100`;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">

      {/* ════════════════════════════════════════
          LEFT PANEL — Branding
          ════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[46%] bg-gradient-to-br from-[#1D58D8] via-[#1a4fc2] to-[#0F172A] relative overflow-hidden flex-col justify-between p-10 xl:p-14">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 right-14 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-24 w-1.5 h-1.5 bg-white/15 rounded-full" />
        <div className="absolute bottom-1/4 right-8 w-1 h-1 bg-white/20 rounded-full" />

        {/* Logo + Back */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-white/15 backdrop-blur-sm text-white p-2 rounded-xl border border-white/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Real World <span className="text-blue-200">Integration</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-blue-200/70 text-xs font-bold tracking-widest uppercase mb-3">Join as Institution</p>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Bridge the Gap<br />
              <span className="text-blue-200">Between Worlds.</span>
            </h1>
            <p className="text-blue-100/75 text-sm leading-relaxed max-w-sm mt-4">
              Connect your institution with India's top industry experts. Transform your curriculum with real-world expertise.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-blue-200" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-snug">{title}</p>
                  <p className="text-blue-100/65 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex gap-6 pt-2">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-white text-xl font-black">{value}</p>
                <p className="text-blue-200/70 text-[11px] font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom image / illustration placeholder */}
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <div className="h-36 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center gap-4 px-6">
            {['AI / ML', 'Workshops', 'Mentorship', 'Guest Lectures', 'Research'].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-semibold whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — Form
          ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen">



        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto flex items-start justify-center px-5 py-8 sm:py-12">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">Institution Registration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Create your account
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Join hundreds of institutions connecting with industry experts.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-7">
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step > s ? 'bg-emerald-500 text-white' : step === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-[11px] font-semibold hidden sm:block ${step >= s ? 'text-slate-700' : 'text-slate-400'}`}>
                      {s === 1 ? 'Account Details' : 'Institution Info'}
                    </span>
                  </div>
                  {s < 2 && <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── STEP 1: Account ── */}
              {step === 1 && (
                <div className="space-y-4 animate-fade">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Contact Person / Head <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        required type="text"
                        value={formData.contactPerson}
                        onChange={e => set('contactPerson', e.target.value)}
                        className={inputCls()}
                        placeholder="Dr. S. Ramanathan (Dean)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Official Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        required type="email"
                        value={formData.email}
                        onChange={e => set('email', e.target.value)}
                        className={inputCls()}
                        placeholder="dean@university.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={e => set('password', e.target.value)}
                        className={inputCls() + ' pr-11'}
                        placeholder="Min. 8 characters"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.contactPerson || !formData.email || !formData.password) return;
                      setStep(2);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer active:scale-[0.98] mt-2"
                    style={{ borderRadius: '12px' }}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Institution Details ── */}
              {step === 2 && (
                <div className="space-y-4 animate-fade">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Institution Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        required type="text"
                        value={formData.name}
                        onChange={e => set('name', e.target.value)}
                        className={inputCls()}
                        placeholder="e.g. Apex Technical University"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={e => set('type', e.target.value)}
                          className="w-full pl-3.5 pr-8 py-3 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 bg-white appearance-none cursor-pointer transition-all"
                        >
                          {INST_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          required type="text"
                          value={formData.location}
                          onChange={e => set('location', e.target.value)}
                          className={inputCls()}
                          placeholder="Chennai"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={e => set('website', e.target.value)}
                        className={inputCls()}
                        placeholder="https://institute.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Brief Description</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={e => set('description', e.target.value)}
                        className={inputCls() + ' resize-none !pl-11 py-3'}
                        placeholder="Brief details about your institution, departments, and goals..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                    style={{ borderRadius: '12px' }}
                  >
                    {loading
                      ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating Account…</>
                      : <>Create Institution Account <ArrowRight className="w-4 h-4" /></>
                    }
                  </button>
                </div>
              )}

              {/* Login link */}
              <p className="text-center text-sm text-slate-500 pt-1">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-blue-600 hover:underline">Log in</Link>
              </p>
            </form>

            {/* Trust bar */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
                {[
                  { icon: ShieldCheck, label: 'Secure & Compliant' },
                  { icon: CheckCircle, label: 'No credit card required' },
                  { icon: CheckCircle, label: 'Free to register' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Register as expert link */}
            <p className="text-center text-xs text-slate-400 mt-4">
              Are you an industry expert?{' '}
              <Link to="/register/expert" className="font-bold text-blue-600 hover:underline">Register as Expert →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
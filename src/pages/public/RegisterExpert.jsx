import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import { availableServiceCategories } from '../../data/services';
import {
  ArrowLeft, ArrowRight, BookOpen, User, Mail, Briefcase,
  Building2, MapPin, Globe, Layers, ShieldCheck, CheckCircle,
  Lock, Eye, EyeOff, Star, Award, TrendingUp, ChevronDown,
  Hash,
} from 'lucide-react';

const EXP_LEVELS = ['1 year','2 years','3 years','5 years','8 years','10 years','12+ years','15+ years'];

const FEATURES = [
  {
    icon: Star,
    title: 'Reach 200+ Institutions',
    desc: 'Get discovered by colleges and universities actively looking for your expertise.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Impact',
    desc: 'Mentor students, deliver guest lectures, and shape curricula in your domain.',
  },
  {
    icon: Award,
    title: 'Verified Expert Profile',
    desc: 'Your credentials are reviewed and a verified badge boosts your credibility.',
  },
];

const STATS = [
  { value: '500+', label: 'Industry Experts' },
  { value: '2000+', label: 'Sessions Done' },
  { value: '50+', label: 'Domains Covered' },
];

export const RegisterExpert = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1 = account, 2 = professional, 3 = services
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    designation: '',
    organization: '',
    industry: 'Information Technology',
    experience: '5 years',
    location: 'Chennai',
    expertise: '',
    servicesOffered: [],
    about: '',
    linkedin: '',
  });

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  const toggleService = (srv) =>
    setFormData(p => ({
      ...p,
      servicesOffered: p.servicesOffered.includes(srv)
        ? p.servicesOffered.filter(s => s !== srv)
        : [...p.servicesOffered, srv],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newExpert = await expertService.createExpert({
      ...formData,
      expertise: formData.expertise.split(',').map(s => s.trim()).filter(Boolean),
      experience: parseInt(formData.experience) || 5,
    });
    login('EXPERT', formData.email, { id: newExpert.id, name: newExpert.name });
    navigate('/expert/dashboard');
  };

  const handleBack = () => {
    if (step > 1) { setStep(s => s - 1); return; }
    window.history.length > 1 ? navigate(-1) : navigate('/');
  };

  const inputCls = (hasIcon = true) =>
    `w-full ${hasIcon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-sm border border-slate-200 rounded-xl outline-none transition-all bg-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100`;

  const TOTAL_STEPS = 3;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">

      {/* ════════════════════════════════════════
          LEFT PANEL — dark branded
          ════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[46%] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex-col justify-between p-10 xl:p-14">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/8 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/10 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white/10 rounded-full" />
        <div className="absolute bottom-1/4 right-6 w-1 h-1 bg-white/15 rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-[#0f172a] text-white p-2 rounded-xl border border-white/20 shadow-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Real World <span className="text-blue-400">Integration</span>
            </span>
          </Link>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-blue-400/80 text-xs font-bold tracking-widest uppercase mb-3">Expert Registration</p>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Share Your<br />
              <span className="text-blue-400">Expertise.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-4">
              Join India's fastest-growing academic-industry bridge. Connect with institutions eager to learn from your real-world experience.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-snug">{title}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-2">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-white text-xl font-black">{value}</p>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise domain tags */}
        <div className="relative z-10 rounded-2xl border border-white/8 overflow-hidden shadow-xl">
          <div className="h-36 bg-gradient-to-br from-white/5 to-white/3 flex flex-wrap items-center justify-center gap-2 px-6 py-4">
            {['AI / ML', 'Cloud', 'Cybersecurity', 'Finance', 'Operations', 'Marketing', 'Research', 'DevOps'].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/12 text-white text-[11px] font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — Form
          ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Back Button (Top Right of page, not in nav bar) */}
        <div className="absolute top-4 right-5 sm:top-6 sm:right-8 z-20">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/60 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" /> Back
          </button>
        </div>



        <div className="flex-1 overflow-y-auto flex items-start justify-center px-5 py-8 sm:py-12">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/5 border border-slate-900/10 rounded-full mb-4">
                <User className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Industry Expert Registration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">Create your profile</h2>
              <p className="text-sm text-slate-500 mt-1.5">Get discovered by 200+ institutions looking for your expertise.</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-7">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step > s ? 'bg-emerald-500 text-white' : step === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block whitespace-nowrap ${step >= s ? 'text-slate-700' : 'text-slate-400'}`}>
                      {s === 1 ? 'Account' : s === 2 ? 'Professional' : 'Services'}
                    </span>
                  </div>
                  {s < TOTAL_STEPS && <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── STEP 1: Account ── */}
              {step === 1 && (
                <div className="space-y-4 animate-fade">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="text" value={formData.name} onChange={e => set('name', e.target.value)} className={inputCls()} placeholder="Your full name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="email" value={formData.email} onChange={e => set('email', e.target.value)} className={inputCls()} placeholder="you@company.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={e => set('password', e.target.value)}
                          className={inputCls() + ' pr-11'}
                          placeholder="Min. 6 characters"
                          minLength={6}
                        />
                        <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (!formData.name || !formData.email || !formData.password) return; setStep(2); }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98] mt-2"
                    style={{ borderRadius: '12px' }}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Professional ── */}
              {step === 2 && (
                <div className="space-y-4 animate-fade">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Current Designation <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="text" value={formData.designation} onChange={e => set('designation', e.target.value)} className={inputCls()} placeholder="e.g. Principal Architect" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Organization <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="text" value={formData.organization} onChange={e => set('organization', e.target.value)} className={inputCls()} placeholder="Company name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Industry <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="text" value={formData.industry} onChange={e => set('industry', e.target.value)} className={inputCls()} placeholder="IT, Finance…" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Experience</label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                        <select value={formData.experience} onChange={e => set('experience', e.target.value)} className={inputCls() + ' pr-8 appearance-none'}>
                          {EXP_LEVELS.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Location <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input required type="text" value={formData.location} onChange={e => set('location', e.target.value)} className={inputCls()} placeholder="Chennai" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">LinkedIn URL</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input type="url" value={formData.linkedin} onChange={e => set('linkedin', e.target.value)} className={inputCls()} placeholder="https://linkedin.com/in/…" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Areas of Expertise <span className="text-red-500">*</span></label>
                    <input
                      required type="text" value={formData.expertise} onChange={e => set('expertise', e.target.value)}
                      className={inputCls(false)}
                      placeholder="e.g. AI/ML, Python, Cloud Architecture"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Separate multiple skills with commas</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (!formData.designation || !formData.organization) return; setStep(3); }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98] mt-2"
                    style={{ borderRadius: '12px' }}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── STEP 3: Services + Bio ── */}
              {step === 3 && (
                <div className="space-y-4 animate-fade">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Services You Can Offer</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableServiceCategories.map(svc => {
                        const active = formData.servicesOffered.includes(svc);
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => toggleService(svc)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold text-left cursor-pointer transition-all ${
                              active ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/30'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-blue-600' : 'border-slate-300'}`}>
                              {active && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                            </div>
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Professional Bio <span className="text-red-500">*</span></label>
                    <textarea
                      required rows={4}
                      value={formData.about}
                      onChange={e => set('about', e.target.value)}
                      className={inputCls(false) + ' resize-none'}
                      placeholder="A brief summary of your professional background and what value you bring to academic institutions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                    style={{ borderRadius: '12px' }}
                  >
                    {loading
                      ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating Profile…</>
                      : <>Create Expert Profile <ArrowRight className="w-4 h-4" /></>
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
                  { icon: CheckCircle, label: 'Profile reviewed in 24h' },
                  { icon: CheckCircle, label: 'Free to register' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              Registering an institution?{' '}
              <Link to="/register/institution" className="font-bold text-blue-600 hover:underline">Join as Institution →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
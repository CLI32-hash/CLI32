import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import {
  User, MapPin, Briefcase, GraduationCap, Globe, CheckCircle2,
  Save, Camera, Phone, Mail, Lock, Clock, Heart, Link2, Zap,
  Eye, ArrowLeft, ArrowRight, ChevronRight, ChevronDown, Layers,
  ExternalLink, Share2,
} from 'lucide-react';

/* ══════════════════════════════════════════════
   REUSABLE COMPONENTS
══════════════════════════════════════════════ */

/** Animated SVG ring for profile completion */
const CompletionRing = ({ pct = 80, size = 88, stroke = 8 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#2563EB' : pct >= 50 ? '#F59E0B' : '#EF4444';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EFF6FF" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-black text-slate-900 leading-none">{pct}%</span>
      </div>
    </div>
  );
};

/** Styled label */
const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] sm:text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
    {children}{required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

/** Input with left icon */
const IconInput = ({ icon: Icon, type = 'text', readOnly, className = '', inputClass = '', ...props }) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />}
    <input
      type={type}
      readOnly={readOnly}
      className={`w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-3 text-sm border rounded-xl outline-none transition-all bg-white
        ${readOnly ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200' : 'border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-3 focus:ring-blue-100'}
        ${inputClass}`}
      {...props}
    />
  </div>
);

/** Select with left icon */
const IconSelect = ({ icon: Icon, children, className = '', ...props }) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />}
    <select
      className={`w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-9 py-3 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 bg-white text-slate-800 appearance-none cursor-pointer transition-all`}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  </div>
);

/** Textarea with optional icon */
const FieldTextarea = ({ rows = 4, icon: Icon, className = '', ...props }) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />}
    <textarea
      rows={rows}
      className={`w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-3 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 bg-white text-slate-800 resize-none transition-all`}
      {...props}
    />
  </div>
);

/* ══════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════ */
const TABS = [
  { id: 'basic',        label: 'Basic Info',     shortLabel: 'Basic',     icon: User },
  { id: 'professional', label: 'Professional',    shortLabel: 'Pro',       icon: Briefcase },
  { id: 'services',     label: 'Services',        shortLabel: 'Services',  icon: Layers },
  { id: 'availability', label: 'Availability',    shortLabel: 'Time',      icon: Clock },
  { id: 'social',       label: 'Social Links',    shortLabel: 'Social',    icon: Link2 },
];

const DESIGNATIONS = [
  'Clinical Specialist','Principal Engineer','Senior Consultant','Product Manager',
  'Research Scientist','Data Scientist','AI/ML Engineer','Software Architect',
  'Professor','Industry Mentor','Other',
];
const SPECIALIZATIONS = [
  'Cardiology','Artificial Intelligence','Machine Learning','Data Science',
  'Cloud Computing','Cybersecurity','Operations','Finance','Marketing',
  'Biomedical Engineering','Robotics','Other',
];
const EXP_OPTIONS = [
  '1 year','2 years','3 years','5 years','8 years','10 years',
  '12+ years','15+ years','20+ years',
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export const ExpertProfileEdit = () => {
  const { user } = useAuth();
  const [profile, setProfile]     = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving]       = useState(false);
  const [savedOk, setSavedOk]     = useState(false);
  const tabBarRef                  = useRef(null);

  const [fd, setFd] = useState({
    name: '', avatar: '', designation: 'Clinical Specialist',
    organization: '', industry: '', experience: '8 years',
    location: '', expertiseStr: '', about: '', education: '',
    linkedin: '', phone: '', email: '',
    profileStatus: 'Published', specialization: 'Cardiology',
    availability: 'Monday–Friday', website: '', twitter: '',
  });

  useEffect(() => {
    expertService.getExpertById(user?.id || 'exp-1').then((res) => {
      if (!res) return;
      setProfile(res);
      setFd({
        name:          res.name        || '',
        avatar:        res.avatar      || '',
        designation:   res.designation || 'Clinical Specialist',
        organization:  res.organization|| '',
        industry:      res.industry    || '',
        experience:    res.experience  ? `${res.experience} years` : '8 years',
        location:      res.location    || '',
        expertiseStr:  Array.isArray(res.expertise) ? res.expertise.join(', ') : '',
        about:         res.about       || '',
        education:     res.education   || '',
        linkedin:      res.linkedin    || '',
        phone:         res.phone       || '+91 98401 23456',
        email:         user?.email     || 'arun@expert.com',
        profileStatus: res.profileStatus || 'Published',
        specialization:res.specialization|| 'Cardiology',
        availability:  res.availability  || 'Monday–Friday',
        website:       res.website       || '',
        twitter:       res.twitter       || '',
      });
    });
  }, [user]);

  const set = (k, v) => setFd((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    const updated = await expertService.updateExpert(profile.id, {
      ...profile,
      name:          fd.name,
      avatar:        fd.avatar,
      designation:   fd.designation,
      organization:  fd.organization,
      industry:      fd.industry,
      experience:    parseInt(fd.experience) || 8,
      location:      fd.location,
      expertise:     fd.expertiseStr.split(',').map(s => s.trim()).filter(Boolean),
      about:         fd.about,
      education:     fd.education,
      linkedin:      fd.linkedin,
      phone:         fd.phone,
      profileStatus: fd.profileStatus,
      specialization:fd.specialization,
    });
    setProfile(updated);
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 3000);
  };

  /* Scroll active tab into view */
  const goTab = (id) => {
    setActiveTab(id);
    if (tabBarRef.current) {
      const btn = tabBarRef.current.querySelector(`[data-tab="${id}"]`);
      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  /* Completion */
  const completionItems = [
    { label: 'Basic Information',   done: !!(fd.name && fd.location && fd.phone) },
    { label: 'Professional Details',done: !!(fd.designation && fd.organization) },
    { label: 'Specialization',      done: !!fd.specialization },
    { label: 'Services & Expertise',done: !!fd.expertiseStr },
    { label: 'Availability',        done: !!fd.availability },
    { label: 'Social Links',        done: !!(fd.linkedin || fd.website) },
  ];
  const pct = Math.round(
    (completionItems.filter(i => i.done).length / completionItems.length) * 100
  );
  const userInitials = (fd.name || 'E').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

  /* ── Tab panel content ── */
  const renderPanel = () => {
    const panelClass = 'space-y-5 animate-fade';
    switch (activeTab) {

      /* ─ BASIC ─ */
      case 'basic': return (
        <div className={panelClass}>
          {/* Avatar row */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative shrink-0">
              {fd.avatar
                ? <img src={fd.avatar} alt={fd.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md" />
                : <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">{userInitials}</div>
              }
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{fd.name || 'Your Name'}</p>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{fd.designation || 'Designation'}</p>
              <label className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
                <Camera className="w-3 h-3" />
                Change Photo
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <IconInput icon={User} value={fd.name} onChange={e => set('name', e.target.value)} placeholder="Arun Kumar" required />
              </div>
              <div>
                <FieldLabel>Email Address</FieldLabel>
                <div className="relative">
                  <IconInput icon={Mail} value={fd.email} readOnly />
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <FieldLabel required>Phone Number</FieldLabel>
                <IconInput icon={Phone} value={fd.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98401 23456" />
              </div>
              <div>
                <FieldLabel required>Location</FieldLabel>
                <IconInput icon={MapPin} value={fd.location} onChange={e => set('location', e.target.value)} placeholder="Chennai, Tamil Nadu" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Professional Summary</h3>
              <span className="text-[11px] text-slate-400">{fd.about.length}/500</span>
            </div>
            <FieldTextarea
              rows={4}
              value={fd.about}
              onChange={e => { if (e.target.value.length <= 500) set('about', e.target.value); }}
              placeholder="Tell institutions about your background and expertise..."
            />
          </div>
        </div>
      );

      /* ─ PROFESSIONAL ─ */
      case 'professional': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Field of Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel required>Professional Title</FieldLabel>
              <IconSelect icon={User} value={fd.designation} onChange={e => set('designation', e.target.value)}>
                {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
              </IconSelect>
            </div>
            <div>
              <FieldLabel required>Specialization</FieldLabel>
              <IconSelect icon={Heart} value={fd.specialization} onChange={e => set('specialization', e.target.value)}>
                {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
              </IconSelect>
            </div>
            <div>
              <FieldLabel required>Years of Experience</FieldLabel>
              <IconSelect icon={Clock} value={fd.experience} onChange={e => set('experience', e.target.value)}>
                {EXP_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </IconSelect>
            </div>
            <div>
              <FieldLabel required>Organization</FieldLabel>
              <IconInput icon={Briefcase} value={fd.organization} onChange={e => set('organization', e.target.value)} placeholder="e.g. Cognitive Labs" />
            </div>
            <div>
              <FieldLabel required>Industry Domain</FieldLabel>
              <IconInput icon={Layers} value={fd.industry} onChange={e => set('industry', e.target.value)} placeholder="e.g. Artificial Intelligence" />
            </div>
            <div>
              <FieldLabel>Education / Certifications</FieldLabel>
              <IconInput icon={GraduationCap} value={fd.education} onChange={e => set('education', e.target.value)} placeholder="M.Tech in AI, IIT Madras" />
            </div>
          </div>
          <div>
            <FieldLabel>Bio / About Me</FieldLabel>
            <FieldTextarea rows={4} value={fd.about} onChange={e => set('about', e.target.value)} placeholder="Experienced specialist with a strong background and a passion for education and research." />
          </div>
        </div>
      );

      /* ─ SERVICES ─ */
      case 'services': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & Expertise</h3>
          <div className="space-y-3">
            <div>
              <FieldLabel required>Industry Domain</FieldLabel>
              <IconInput icon={Layers} value={fd.industry} onChange={e => set('industry', e.target.value)} placeholder="e.g. Artificial Intelligence" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <FieldLabel required>Skills & Expertise Tags</FieldLabel>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">Enter comma-separated tags</p>
              <FieldTextarea
                rows={3}
                icon={Zap}
                value={fd.expertiseStr}
                onChange={e => set('expertiseStr', e.target.value)}
                placeholder="AI/ML, Deep Learning, Python, Research..."
              />
              {fd.expertiseStr && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {fd.expertiseStr.split(',').map(s => s.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Service type quick select */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Services You Offer</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Guest Lectures','Workshops','Mentorship','Curriculum Dev','Student Projects','Research Guidance'].map(srv => {
                  const active = fd.expertiseStr?.toLowerCase().includes(srv.toLowerCase().slice(0, 5));
                  return (
                    <button
                      key={srv} type="button"
                      onClick={() => {
                        if (!fd.expertiseStr.includes(srv)) {
                          set('expertiseStr', fd.expertiseStr ? `${fd.expertiseStr}, ${srv}` : srv);
                        }
                      }}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        active ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mb-1.5 ${active ? 'bg-blue-500' : 'bg-slate-300'}`} />
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );

      /* ─ AVAILABILITY ─ */
      case 'availability': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Availability Preferences</h3>
          <p className="text-xs text-slate-500">Let institutions know when you're available for engagements</p>
          <div className="grid grid-cols-2 gap-3">
            {['Monday–Friday','Weekends Only','Flexible','Evenings Only','On Request','Full Time'].map(opt => (
              <button
                key={opt} type="button"
                onClick={() => set('availability', opt)}
                className={`p-3.5 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  fd.availability === opt
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${fd.availability === opt ? 'border-blue-600' : 'border-slate-300'}`}>
                  {fd.availability === opt && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                {opt}
              </button>
            ))}
          </div>

          <div>
            <FieldLabel>Additional Availability Notes</FieldLabel>
            <FieldTextarea
              rows={3}
              placeholder="e.g. Available for sessions on 2nd and 4th Saturdays each month..."
            />
          </div>
        </div>
      );

      /* ─ SOCIAL ─ */
      case 'social': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Social & Professional Links</h3>
          <div className="space-y-3">
            {[
              { field: 'linkedin', label: 'LinkedIn Profile URL', icon: Link2,        placeholder: 'https://linkedin.com/in/username' },
              { field: 'website',  label: 'Personal Website',     icon: Globe,        placeholder: 'https://yourwebsite.com' },
              { field: 'twitter',  label: 'Twitter / X Handle',   icon: Share2,       placeholder: '@username' },
            ].map(({ field, label, icon, placeholder }) => (
              <div key={field}>
                <FieldLabel>{label}</FieldLabel>
                <IconInput icon={icon} value={fd[field]} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
              </div>
            ))}
          </div>

          {/* Profile status */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Profile Visibility</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 'Published', label: 'Published', sub: 'Visible to institutions', color: 'emerald' },
                { val: 'Incomplete', label: 'Draft', sub: 'Hidden from search', color: 'amber' },
              ].map(opt => (
                <button
                  key={opt.val} type="button"
                  onClick={() => set('profileStatus', opt.val)}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    fd.profileStatus === opt.val
                      ? `border-${opt.color}-500 bg-${opt.color}-50`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${fd.profileStatus === opt.val ? `border-${opt.color}-600` : 'border-slate-300'}`}>
                      {fd.profileStatus === opt.val && <div className={`w-2 h-2 rounded-full bg-${opt.color}-600`} />}
                    </div>
                    <span className={`text-xs font-bold ${fd.profileStatus === opt.val ? `text-${opt.color}-700` : 'text-slate-700'}`}>{opt.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 pl-6">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      default: return null;
    }
  };

  /* Loading */
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-9 h-9 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Loading profile…</p>
      </div>
    );
  }

  /* ─── RENDER ─── */
  return (
    <div className="animate-fade pb-24 sm:pb-6" style={{ maxWidth: 1200 }}>

      {/* ── Mobile sticky save bar (hidden on desktop) ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-xl">
        {savedOk && (
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold flex-1 min-w-0">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Saved!
          </div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold shadow-lg transition-all cursor-pointer active:scale-95"
          style={{ borderRadius: '12px' }}
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-4">
        <Link to="/expert/dashboard" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs shrink-0">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">Edit Profile</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Update your professional info, expertise &amp; availability</p>
        </div>
      </div>

      {/* Desktop success toast */}
      {savedOk && (
        <div className="hidden sm:flex items-center gap-2 mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Profile saved successfully!
        </div>
      )}

      {/* ── Mobile: Compact progress bar ── */}
      <div className="sm:hidden mb-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-4">
          <CompletionRing pct={pct} size={60} stroke={6} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 mb-1">Profile Completion</p>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">{completionItems.filter(i => i.done).length} of {completionItems.length} sections complete</p>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-4 items-start">

        {/* ── Left: tab editor ── */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">

          {/* Scrollable tab pills */}
          <div
            ref={tabBarRef}
            className="flex gap-1 p-2 border-b border-slate-100 overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  type="button"
                  onClick={() => goTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    active ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                  style={{ borderRadius: '10px' }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  <span className="xs:hidden sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Tab body */}
          <div className="p-4 sm:p-6">
            {renderPanel()}

            {/* Desktop save button inside panel */}
            <div className="hidden sm:flex justify-end mt-6 pt-5 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-7 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                style={{ borderRadius: '12px' }}
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right sidebar (desktop only) ── */}
        <div className="hidden lg:flex flex-col gap-4">

          {/* Profile Completion */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Profile Completion</h3>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <CompletionRing pct={pct} size={88} stroke={8} />
              <div className="flex-1 space-y-1.5 pt-1">
                <p className="text-[10px] text-slate-400 font-medium mb-2">Complete all sections for more visibility</p>
                {completionItems.map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.done
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 shrink-0" />
                    }
                    <span className={`text-[11px] font-medium leading-tight ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {pct === 100 && (
              <div className="flex items-center gap-1.5 py-2 px-3 bg-blue-50 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold text-blue-700">Profile ready · Visible to institutions</span>
              </div>
            )}
            <Link
              to="/experts"
              className="mt-3 flex items-center gap-2 px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              style={{ borderRadius: '10px' }}
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span className="flex-1">View Full Profile</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Profile Preview */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Eye className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Your Profile Preview</h3>
                <p className="text-[10px] text-slate-400">How institutions see you</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                {fd.avatar
                  ? <img src={fd.avatar} alt="" className="w-11 h-11 rounded-xl object-cover border border-white shadow-sm" />
                  : <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">{userInitials}</div>
                }
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-slate-900 truncate">{fd.name || 'Your Name'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{fd.designation || 'Designation'}</p>
                  {fd.location && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />{fd.location}
                    </div>
                  )}
                </div>
              </div>
              <Link
                to="/experts"
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                style={{ borderRadius: '10px' }}
              >
                View Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>
            </div>
            <div className="space-y-1">
              {[
                { icon: Briefcase, label: 'Manage Services',    to: '/expert/services',  bg: 'bg-blue-50',   color: 'text-blue-600' },
                { icon: Clock,     label: 'Update Availability',to: '/expert/services',  bg: 'bg-emerald-50', color: 'text-emerald-600' },
                { icon: Mail,      label: 'View Enquiries',     to: '/expert/enquiries', bg: 'bg-indigo-50', color: 'text-indigo-600' },
              ].map(action => (
                <Link key={action.label} to={action.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center shrink-0`} style={{ borderRadius: '8px' }}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 flex-1">{action.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* ── Mobile: sidebar content stacked below form ── */}
      <div className="lg:hidden mt-4 space-y-4">

        {/* Quick Actions on mobile */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Briefcase, label: 'Services',    to: '/expert/services',  bg: 'bg-blue-50',    color: 'text-blue-600' },
              { icon: Mail,      label: 'Enquiries',   to: '/expert/enquiries', bg: 'bg-indigo-50',  color: 'text-indigo-600' },
              { icon: Eye,       label: 'View Profile',to: '/experts',          bg: 'bg-emerald-50', color: 'text-emerald-600' },
            ].map(action => (
              <Link key={action.label} to={action.to}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-center"
              >
                <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center`} style={{ borderRadius: '10px' }}>
                  <action.icon className={`w-4.5 h-4.5 ${action.color}`} />
                </div>
                <span className="text-[10px] font-semibold text-slate-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile completion list */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4">
          <h3 className="text-sm font-bold text-slate-900 mb-3">What's Missing?</h3>
          <div className="space-y-2">
            {completionItems.filter(i => !i.done).map(item => (
              <div key={item.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 shrink-0" />
                <span className="text-[11px] font-semibold text-amber-700">{item.label}</span>
              </div>
            ))}
            {completionItems.filter(i => !i.done).length === 0 && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-emerald-700">Profile complete! ✨</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
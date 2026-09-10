import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { institutionService } from '../../services/institutionService';
import {
  Building2, MapPin, Mail, Phone, Globe, CheckCircle2,
  Save, Camera, Lock, Link2, Zap, Eye, ArrowLeft, ArrowRight,
  ChevronRight, ChevronDown, Layers, BookOpen, Users, Calendar,
  Inbox, User, FileText, Share2, ExternalLink,
} from 'lucide-react';

/* ══════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════ */

const CompletionRing = ({ pct = 80, size = 88, stroke = 8 }) => {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off  = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#2563EB' : pct >= 50 ? '#F59E0B' : '#EF4444';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EFF6FF" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base font-black text-slate-900 leading-none">{pct}%</span>
      </div>
    </div>
  );
};

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] sm:text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
    {children}{required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const IconInput = ({ icon: Icon, readOnly, inputClass = '', className = '', ...props }) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />}
    <input
      readOnly={readOnly}
      className={`w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-3 text-sm rounded-xl outline-none transition-all
        ${readOnly
          ? 'border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
          : 'border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-3 focus:ring-blue-100'}
        ${inputClass}`}
      {...props}
    />
  </div>
);

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

const FieldTextarea = ({ icon: Icon, rows = 4, className = '', ...props }) => (
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
  { id: 'basic',        label: 'Basic Info',       shortLabel: 'Basic',    icon: Building2 },
  { id: 'academic',     label: 'Academic',          shortLabel: 'Academic', icon: BookOpen },
  { id: 'requirements', label: 'Requirements',      shortLabel: 'Req.',     icon: Layers },
  { id: 'contact',      label: 'Contact & Links',   shortLabel: 'Contact',  icon: Link2 },
];

const INST_TYPES = ['College','University','Training Institute','Polytechnic','School of Management','Research Center'];

const SERVICES = [
  'Guest Lectures','Workshops','Mentorship','Curriculum Development',
  'Industry Projects','Research Guidance','Placement Support','Hackathons',
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export const InstitutionProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile]     = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving]       = useState(false);
  const [savedOk, setSavedOk]     = useState(false);
  const tabBarRef                  = useRef(null);

  const [fd, setFd] = useState({
    name: '', type: 'College', contactPerson: '', email: '',
    phone: '', location: '', website: '', description: '',
    areasOfInterestStr: '', requirementsNote: '',
    linkedin: '', twitter: '', charCount: 0,
  });
  const [selectedServices,  setSelectedServices]  = useState([]);
  const [selectedDomains,   setSelectedDomains]   = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('');

  const toggleService = (srv) =>
    setSelectedServices(p => p.includes(srv) ? p.filter(s => s !== srv) : [...p, srv]);
  const toggleDomain = (d) =>
    setSelectedDomains(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);

  useEffect(() => {
    institutionService.getInstitutionById(user?.id || 'inst-1').then((res) => {
      if (!res) return;
      setProfile(res);
      setFd({
        name:              res.name            || '',
        type:              res.type            || 'College',
        contactPerson:     res.contactPerson   || '',
        email:             res.email           || user?.email || '',
        phone:             res.phone           || '',
        location:          res.location        || '',
        website:           res.website         || '',
        description:       res.description     || '',
        areasOfInterestStr:Array.isArray(res.areasOfInterest) ? res.areasOfInterest.join(', ') : '',
        requirementsNote:  res.requirementsNote|| '',
        linkedin:          res.linkedin        || '',
        twitter:           res.twitter         || '',
      });
    });
  }, [user]);

  const set = (k, v) => setFd(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    const updated = await institutionService.updateInstitution(profile.id, {
      ...profile,
      name:          fd.name,
      type:          fd.type,
      contactPerson: fd.contactPerson,
      email:         fd.email,
      phone:         fd.phone,
      location:      fd.location,
      website:       fd.website,
      description:   fd.description,
      areasOfInterest: fd.areasOfInterestStr
        ? fd.areasOfInterestStr.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      requirementsNote: fd.requirementsNote,
      linkedin:      fd.linkedin,
    });
    setProfile(updated);
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 3000);
  };

  const goTab = (id) => {
    setActiveTab(id);
    if (tabBarRef.current) {
      const btn = tabBarRef.current.querySelector(`[data-tab="${id}"]`);
      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  /* Completion */
  const completionItems = [
    { label: 'Basic Information',   done: !!(fd.name && fd.location) },
    { label: 'Institution Details', done: !!(fd.type && fd.contactPerson) },
    { label: 'Description',         done: fd.description.length > 20 },
    { label: 'Areas of Interest',   done: !!fd.areasOfInterestStr },
    { label: 'Requirements',        done: !!fd.requirementsNote },
    { label: 'Contact & Links',     done: !!(fd.phone && fd.email) },
  ];
  const pct = Math.round(
    (completionItems.filter(i => i.done).length / completionItems.length) * 100
  );

  const instInitials = (fd.name || 'IN').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

  /* ── Tab Panels ── */
  const renderPanel = () => {
    const panelClass = 'space-y-5 animate-fade';

    switch (activeTab) {

      /* ─ BASIC ─ */
      case 'basic': return (
        <div className={panelClass}>
          {/* Logo / Branding section */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{fd.name || 'Institution Name'}</p>
              <p className="text-xs text-slate-500 mt-0.5">{fd.type} · {fd.location || 'Location'}</p>
              <label className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
                <Camera className="w-3 h-3" />
                Change Logo
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Institution Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <FieldLabel required>Institution Name</FieldLabel>
                <IconInput icon={Building2} value={fd.name} onChange={e => set('name', e.target.value)} placeholder="Apex Institute of Technology" required />
              </div>
              <div>
                <FieldLabel required>Institution Type</FieldLabel>
                <IconSelect icon={BookOpen} value={fd.type} onChange={e => set('type', e.target.value)}>
                  {INST_TYPES.map(t => <option key={t}>{t}</option>)}
                </IconSelect>
              </div>
              <div>
                <FieldLabel required>Location</FieldLabel>
                <IconInput icon={MapPin} value={fd.location} onChange={e => set('location', e.target.value)} placeholder="Chennai, Tamil Nadu" required />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Institution Overview</h3>
              <span className="text-[10px] text-slate-400">{fd.description.length}/500</span>
            </div>
            <FieldTextarea
              rows={4}
              value={fd.description}
              onChange={e => { if (e.target.value.length <= 500) set('description', e.target.value); }}
              placeholder="Autonomous engineering institution focused on industry-ready technical education, modern computing labs, and multidisciplinary research."
            />
          </div>
        </div>
      );

      /* ─ ACADEMIC ─ */
      case 'academic': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <FieldLabel required>Contact Person / Head</FieldLabel>
              <IconInput icon={User} value={fd.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder="Dr. S. Ramanathan (Dean)" required />
            </div>
          </div>

          <div>
            <FieldLabel required>Areas of Interest</FieldLabel>
            <p className="text-[10px] text-slate-400 mb-2">Comma-separated subjects / domains your institution focuses on</p>
            <FieldTextarea
              rows={3}
              icon={Layers}
              value={fd.areasOfInterestStr}
              onChange={e => set('areasOfInterestStr', e.target.value)}
              placeholder="Artificial Intelligence, Cloud Computing, Cybersecurity, Data Science"
            />
            {fd.areasOfInterestStr && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {fd.areasOfInterestStr.split(',').map(s => s.trim()).filter(Boolean).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold">
                    {tag}
                    <button type="button" className="ml-0.5 text-blue-400 hover:text-blue-700 cursor-pointer"
                      onClick={() => {
                        const tags = fd.areasOfInterestStr.split(',').map(s => s.trim()).filter(Boolean).filter(t => t !== tag);
                        set('areasOfInterestStr', tags.join(', '));
                      }}
                    >×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick domain chips — true toggle */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Popular Domains (tap to toggle)</h3>
            <div className="flex flex-wrap gap-2">
              {['AI / ML','Web Development','Data Science','Cloud Computing','Cybersecurity','IoT','Blockchain','Digital Marketing'].map(domain => {
                const active = selectedDomains.includes(domain);
                return (
                  <button key={domain} type="button"
                    onClick={() => {
                      toggleDomain(domain);
                      // also sync into the textarea string
                      setFd(p => {
                        const existing = p.areasOfInterestStr
                          ? p.areasOfInterestStr.split(',').map(s => s.trim()).filter(Boolean)
                          : [];
                        const updated = active
                          ? existing.filter(t => t !== domain)
                          : [...existing, domain];
                        return { ...p, areasOfInterestStr: updated.join(', ') };
                      });
                    }}
                    className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all cursor-pointer ${
                      active ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    {active ? '✓ ' : ''}{domain}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );

      /* ─ REQUIREMENTS ─ */
      case 'requirements': return (
        <div className={panelClass}>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Engagement Requirements</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Describe the types of expert services your institution regularly seeks</p>
            <FieldTextarea
              rows={5}
              icon={FileText}
              value={fd.requirementsNote}
              onChange={e => set('requirementsNote', e.target.value)}
              placeholder="Describe what services your departments regularly seek (e.g. guest lectures on AI/ML, syllabus review for Computer Science, workshops on Cloud Computing, industry mentorship for final year students)..."
            />
          </div>

          {/* Service quick-add grid — true toggle */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Common Services (tap to toggle)</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {SERVICES.map(srv => {
                const active = selectedServices.includes(srv);
                return (
                  <button key={srv} type="button"
                    onClick={() => toggleService(srv)}
                    className={`p-3 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      active
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {srv}
                  </button>
                );
              })}
            </div>
            {selectedServices.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedServices.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-lg text-[11px] font-semibold text-blue-700">
                    {s}
                    <button type="button" onClick={() => toggleService(s)} className="text-blue-400 hover:text-blue-700 cursor-pointer ml-0.5">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Frequency preference — true toggle (single select) */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Engagement Frequency</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Monthly','Per Semester','Annually','On Demand'].map(freq => {
                const active = selectedFrequency === freq;
                return (
                  <button key={freq} type="button"
                    onClick={() => setSelectedFrequency(active ? '' : freq)}
                    className={`p-2.5 rounded-xl border-2 text-[11px] font-semibold text-center transition-all cursor-pointer ${
                      active
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                    }`}
                  >
                    {freq}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );

      /* ─ CONTACT ─ */
      case 'contact': return (
        <div className={panelClass}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel required>Official Email</FieldLabel>
              <div className="relative">
                <IconInput icon={Mail} value={fd.email} readOnly />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <IconInput icon={Phone} value={fd.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 44 2345 6789" />
            </div>
            <div>
              <FieldLabel>Official Website</FieldLabel>
              <IconInput icon={Globe} type="url" value={fd.website} onChange={e => set('website', e.target.value)} placeholder="https://apexinstitute.edu" />
            </div>
            <div>
              <FieldLabel>LinkedIn Page</FieldLabel>
              <IconInput icon={Link2} type="url" value={fd.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/school/apex" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Twitter / X Handle</FieldLabel>
              <IconInput icon={Share2} value={fd.twitter} onChange={e => set('twitter', e.target.value)} placeholder="@apexinstitute" />
            </div>
          </div>
        </div>
      );

      default: return null;
    }
  };

  /* ── Loading ── */
  if (!profile) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-9 h-9 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-slate-400 font-medium">Loading profile…</p>
    </div>
  );

  /* ── RENDER ── */
  return (
    <div className="animate-fade pb-24 sm:pb-6" style={{ maxWidth: 1200 }}>

      {/* ── Mobile sticky save bar ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-xl">
        {savedOk && (
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold flex-1">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Saved!
          </div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-bold shadow-lg transition-all cursor-pointer active:scale-95"
          style={{ borderRadius: '12px' }}
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to="/institution/dashboard"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">Edit Profile</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Update your institution information, requirements and contact details</p>
        </div>
      </div>

      {/* Desktop success toast */}
      {savedOk && (
        <div className="hidden sm:flex items-center gap-2 mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Institution profile updated successfully!
        </div>
      )}

      {/* Mobile: compact progress */}
      <div className="sm:hidden mb-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-4">
          <CompletionRing pct={pct} size={60} stroke={6} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 mb-1">Profile Completion</p>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              {completionItems.filter(i => i.done).length} of {completionItems.length} sections complete
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-4 items-start">

        {/* ── Left: Tab editor ── */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">

          {/* Scrollable tab pills */}
          <div
            ref={tabBarRef}
            className="flex gap-1 p-2 border-b border-slate-100 overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {TABS.map(tab => {
              const Icon  = tab.icon;
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

          {/* Panel body */}
          <div className="p-4 sm:p-6">
            {renderPanel()}

            {/* Desktop save */}
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

        {/* ── Right sidebar (desktop) ── */}
        <div className="hidden lg:flex flex-col gap-4">

          {/* Completion card */}
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
                <p className="text-[10px] text-slate-400 font-medium mb-2">Complete all sections to attract experts</p>
                {completionItems.map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.done
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 shrink-0" />
                    }
                    <span className={`text-[11px] font-medium leading-tight ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {pct === 100 && (
              <div className="flex items-center gap-1.5 py-2 px-3 bg-blue-50 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold text-blue-700">Profile ready · Visible to experts</span>
              </div>
            )}
          </div>

          {/* Institution Preview */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Eye className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Profile Preview</h3>
                <p className="text-[10px] text-slate-400">How experts see your institution</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm shrink-0" style={{ borderRadius: '10px' }}>
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-slate-900 truncate">{fd.name || 'Institution Name'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{fd.type}</p>
                  {fd.location && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />{fd.location}
                    </div>
                  )}
                </div>
              </div>
              <Link
                to="/institution/experts"
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                style={{ borderRadius: '10px' }}
              >
                Explore Experts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>
            </div>
            <div className="space-y-1">
              {[
                { icon: Users,   label: 'Explore Experts', to: '/institution/experts',   bg: 'bg-blue-50',    color: 'text-blue-600' },
                { icon: Calendar,label: 'View Sessions',   to: '/institution/dashboard', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                { icon: Inbox,   label: 'View Enquiries', to: '/institution/enquiries',  bg: 'bg-indigo-50',  color: 'text-indigo-600' },
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

      {/* ── Mobile: stacked section below form ── */}
      <div className="lg:hidden mt-4 space-y-4">

        {/* Quick actions grid on mobile */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Users,    label: 'Experts',   to: '/institution/experts',   bg: 'bg-blue-50',    color: 'text-blue-600' },
              { icon: Inbox,    label: 'Enquiries', to: '/institution/enquiries', bg: 'bg-indigo-50',  color: 'text-indigo-600' },
              { icon: Calendar, label: 'Sessions',  to: '/institution/dashboard', bg: 'bg-emerald-50', color: 'text-emerald-600' },
            ].map(action => (
              <Link key={action.label} to={action.to}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-center"
              >
                <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center`} style={{ borderRadius: '10px' }}>
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="text-[10px] font-semibold text-slate-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Missing sections on mobile */}
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

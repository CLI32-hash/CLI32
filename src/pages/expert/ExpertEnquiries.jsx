import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import messegeImage from '../../assets/Messegeimage.png';
import {
  Clock,
  CheckCircle2,
  X,
  Send,
  Building2,
  Calendar,
  Mail,
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  Cpu,
  Database,
  Eye,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Landmark,
  Layers,
  Inbox,
  MapPin,
  User,
  FileText,
  Settings,
  MessageSquare
} from 'lucide-react';

export const ExpertEnquiries = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [responseNote, setResponseNote] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadEnquiries = async () => {
    const expertId = user?.id || 'exp-1';
    let data = await enquiryService.getEnquiriesByExpert(expertId);
    if (!data || data.length === 0) {
      data = await enquiryService.getEnquiries();
    }
    setEnquiries(data);
  };

  useEffect(() => {
    loadEnquiries();
  }, [user]);

  const handleOpenDetails = async (enq) => {
    setSelectedEnquiry(enq);
    setResponseNote(enq.responseMessage || '');
    if (enq.status === 'NEW') {
      await enquiryService.markAsViewed(enq.id);
      loadEnquiries();
    }
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    await enquiryService.respondToEnquiry(selectedEnquiry.id, responseNote);
    setFeedback(`Response successfully sent to ${selectedEnquiry.institutionName}.`);
    setSelectedEnquiry(null);
    loadEnquiries();
    setTimeout(() => setFeedback(''), 4000);
  };

  const handleClose = async (enqId) => {
    await enquiryService.closeEnquiry(enqId);
    setFeedback('Enquiry marked as Closed.');
    setSelectedEnquiry(null);
    loadEnquiries();
    setTimeout(() => setFeedback(''), 4000);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NEW') return e.status === 'NEW' || e.status === 'VIEWED';
    return e.status === activeFilter;
  });

  const counts = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === 'NEW' || e.status === 'VIEWED').length,
    RESPONDED: enquiries.filter((e) => e.status === 'RESPONDED').length,
    CLOSED: enquiries.filter((e) => e.status === 'CLOSED').length
  };

  const getInstitutionTheme = (index) => {
    const themes = [
      { bg: 'bg-[#EBF2FF]', text: 'text-[#1D58D8]', border: 'border-[#D6E4FF]' },
      { bg: 'bg-[#F5EEFE]', text: 'text-[#8B5CF6]', border: 'border-[#DDD6FE]' },
      { bg: 'bg-[#E8F8F0]', text: 'text-[#10B981]', border: 'border-[#A7F3D0]' },
      { bg: 'bg-[#FFF2EB]', text: 'text-[#F97316]', border: 'border-[#FED7AA]' },
    ];
    return themes[index % themes.length];
  };

  const getServiceIcon = (serviceType = '') => {
    const s = serviceType.toLowerCase();
    if (s.includes('lecture') || s.includes('guest')) return <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    if (s.includes('workshop')) return <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    if (s.includes('curriculum')) return <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    if (s.includes('mentor')) return <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    return <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
  };

  const getTopicIcon = (topic = '') => {
    const t = topic.toLowerCase();
    if (t.includes('data') || t.includes('science')) return <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    if (t.includes('project') || t.includes('case')) return <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    return <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
  };

  const getTopicDisplay = (enq) => {
    if (enq.topic) {
      if (enq.topic.toLowerCase().includes('data science')) return 'Data Science';
      if (enq.topic.toLowerCase().includes('ai specialization')) return 'AI Specialization';
      if (enq.topic.toLowerCase().includes('ai')) return 'AI & ML';
      if (enq.topic.toLowerCase().includes('student project')) return 'Student Project';
      return enq.topic;
    }
    return 'AI & ML';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade pb-10">
      
      {/* ══════════════════════════════════════════════════════════════
          1. TOP HERO / BANNER SECTION
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#F0F5FF] via-[#F6F9FF] to-white border border-blue-100/80 p-6 sm:p-8 lg:p-10 shadow-2xs overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-48 h-48 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />

        {/* Left Copy */}
        <div className="space-y-2 max-w-xl relative z-10">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#1D58D8]">
            MY ENQUIRIES
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F172A] tracking-tight leading-[1.2]">
            Track Your <span className="text-[#1D58D8]">Enquiries</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Review and respond to engagement requests submitted by academic institutions. Stay connected and take the next step.
          </p>
        </div>

        {/* Right Illustration Image (Desktop) */}
        <div className="hidden md:flex items-center justify-end relative shrink-0 max-w-sm lg:max-w-[420px] xl:max-w-[460px] z-10">
          <img
            src={messegeImage}
            alt="New opportunities await!"
            className="w-full h-auto object-contain max-h-36 sm:max-h-40 lg:max-h-44 pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Feedback Alert if any */}
      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade">
          <span>✓ {feedback}</span>
          <button onClick={() => setFeedback('')} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2. FILTER PILLS
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-1">
        {[
          { key: 'ALL', label: 'All Enquiries', mobileLabel: 'All', count: counts.ALL },
          { key: 'NEW', label: 'New / Viewed', mobileLabel: 'New', count: counts.NEW },
          { key: 'RESPONDED', label: 'Responded', mobileLabel: 'Responded', count: counts.RESPONDED },
          { key: 'CLOSED', label: 'Closed', mobileLabel: 'Closed', count: counts.CLOSED }
        ].map((tab) => {
          const active = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] ${
                active
                  ? 'bg-[#1D58D8] text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.mobileLabel}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold transition-colors ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. ENQUIRIES LIST / CARDS
          ══════════════════════════════════════════════════════════════ */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D58D8] flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">No Enquiries Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {activeFilter === 'ALL'
              ? 'You have not received any institution enquiries yet.'
              : `No enquiries found with status "${activeFilter}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredEnquiries.map((enq, index) => {
            const theme = getInstitutionTheme(index);
            const isNewOrViewed = enq.status === 'NEW' || enq.status === 'VIEWED';
            const isResponded = enq.status === 'RESPONDED';
            const isClosed = enq.status === 'CLOSED';

            return (
              <div
                key={enq.id}
                className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
              >
                {/* ── Left Content Block ── */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Institution Rounded Icon */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${theme.bg} ${theme.text} ${theme.border} border flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    <Landmark className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>

                  {/* Body details */}
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Name + Badge */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-[17px] tracking-tight group-hover:text-[#1D58D8] transition-colors">
                        {enq.institutionName}
                      </h3>

                      {isNewOrViewed && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2FF] text-[#1D58D8] border border-blue-100 font-bold text-[10px] sm:text-[11px]">
                          New
                        </span>
                      )}
                      {isResponded && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-emerald-100 font-bold text-[10px] sm:text-[11px]">
                          Responded
                        </span>
                      )}
                      {isClosed && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-bold text-[10px] sm:text-[11px]">
                          Closed
                        </span>
                      )}
                    </div>

                    {/* Meta Row: [Service Icon] Service | [Topic Icon] Topic | [Calendar Icon] Date */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5">
                        {getServiceIcon(enq.serviceType || enq.serviceRequired)}
                        <span>{enq.serviceType || enq.serviceRequired || 'Guest Lectures'}</span>
                      </div>

                      <span className="text-slate-300 font-normal">|</span>

                      <div className="flex items-center gap-1.5">
                        {getTopicIcon(enq.topic)}
                        <span>{getTopicDisplay(enq)}</span>
                      </div>

                      <span className="text-slate-300 font-normal hidden sm:inline">|</span>

                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{enq.preferredDate || enq.date || '2026-09-15'}</span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-3xl line-clamp-2">
                      {enq.message || enq.additionalInfo || 'Department invites you for an academic engagement and industry session with students.'}
                    </p>

                    {/* Mobile Only: Status + relative time line */}
                    <div className="lg:hidden flex items-center justify-between pt-1">
                      {isNewOrViewed && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D58D8]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Viewed</span>
                          <span className="text-slate-400 font-normal">• 2 hours ago</span>
                        </div>
                      )}
                      {isResponded && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Replied</span>
                          <span className="text-slate-400 font-normal">• 1 day ago</span>
                        </div>
                      )}
                      {isClosed && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Closed</span>
                          <span className="text-slate-400 font-normal">• 4 days ago</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Right Action Block (Desktop layout) ── */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  
                  {/* Top Status & 3-dots Menu (Desktop) */}
                  <div className="hidden lg:flex items-center gap-4">
                    {isNewOrViewed && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D58D8]">
                        <Eye className="w-4 h-4 text-[#1D58D8]" />
                        <span>Viewed</span>
                        <span className="text-slate-400 font-normal text-[11px] ml-1">2 hours ago</span>
                      </div>
                    )}
                    {isResponded && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Replied</span>
                        <span className="text-slate-400 font-normal text-[11px] ml-1">1 day ago</span>
                      </div>
                    )}
                    {isClosed && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Closed</span>
                        <span className="text-slate-400 font-normal text-[11px] ml-1">4 days ago</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenDetails(enq)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary Action Button (View Details ->) */}
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(enq)}
                      className="btn-arrow-animate inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-full shadow-xs transition-all active:scale-[0.98] cursor-pointer w-full lg:w-auto whitespace-nowrap"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                    </button>

                    {/* Mobile 3-dots */}
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(enq)}
                      className="lg:hidden p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          4. EXACT "VIEW DETAILS" MODAL & MOBILE DETAIL VIEW
          ══════════════════════════════════════════════════════════════ */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 animate-fade">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 border border-slate-100 max-h-[92vh] overflow-y-auto">
            
            {/* Mobile Back Button */}
            <div className="sm:hidden flex items-center justify-between pb-1 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D58D8]"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="text-xs font-extrabold text-slate-900">Enquiry Details</span>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Header (Institution + Status Badge + Close Button) */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Institution Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                  <Landmark className="w-6 h-6 stroke-[1.8]" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      {selectedEnquiry.institutionName}
                    </h2>
                    {selectedEnquiry.status === 'RESPONDED' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-emerald-100 text-[11px] font-bold">
                        Responded
                      </span>
                    ) : selectedEnquiry.status === 'CLOSED' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
                        Closed
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2FF] text-[#1D58D8] border border-blue-100 text-[11px] font-bold">
                        Viewed
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Requested Service:{' '}
                    <span className="text-[#1D58D8] font-bold">
                      {selectedEnquiry.serviceType || selectedEnquiry.serviceRequired || 'Guest Lectures'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Close Button */}
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="hidden sm:flex w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 items-center justify-center cursor-pointer transition-colors shrink-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Section 1: 4 Key Info Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Institution Type */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">Institution Type</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug mt-0.5">
                    {selectedEnquiry.institutionType || 'College'}
                  </div>
                </div>
              </div>

              {/* Card 2: Location */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">Location</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug mt-0.5">
                    {selectedEnquiry.institutionLocation || selectedEnquiry.location || 'Chennai'}
                  </div>
                </div>
              </div>

              {/* Card 3: Contact Person */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <User className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">Contact Person</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug mt-0.5 break-words">
                    {selectedEnquiry.contactPerson || 'Dr. S. Ramanathan'}
                  </div>
                </div>
              </div>

              {/* Card 4: Contact Email / Phone */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">Contact Email / Phone</div>
                  <div className="text-xs sm:text-[12px] font-bold text-slate-900 leading-snug mt-0.5 break-all">
                    {selectedEnquiry.contactEmail || 'dean.cs@citchennai.edu'}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 2: Topic / Requirement Card ── */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              {/* Soft Ambient wave glow */}
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-100/30 rounded-full blur-xl pointer-events-none" />

              {/* Topic */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Topic / Requirement
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {selectedEnquiry.topic || 'Guest Lecture on AI'}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Preferred Date: <span className="font-bold text-slate-800">{selectedEnquiry.preferredDate || selectedEnquiry.date || '2026-09-15'}</span>
                  </div>
                </div>
              </div>

              {/* Mode */}
              <div className="flex items-center gap-2.5 relative z-10 pl-12 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mode</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                    {selectedEnquiry.mode || 'In Person'}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 3: Requirements & Scope Details Card ── */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs sm:text-[13px] font-extrabold text-slate-900">
                  Requirements &amp; Scope Details
                </div>
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
                  {selectedEnquiry.message || selectedEnquiry.additionalInfo || 'Department of Computer Science invites you for an executive talk on LLMs, generative AI architectures, and enterprise applications for our 3rd and 4th-year engineering students.'}
                </p>
              </div>
            </div>

            {/* ── Section 4: Send Response to Institution (or Sent Message) ── */}
            {selectedEnquiry.status === 'RESPONDED' ? (
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 sm:p-4.5 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your Sent Response:</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed pl-6">
                  {selectedEnquiry.responseMessage || 'Thank you for reaching out. I would be pleased to conduct the workshop on the scheduled date.'}
                </p>
              </div>
            ) : selectedEnquiry.status !== 'CLOSED' ? (
              <form onSubmit={handleRespond} className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Send Response to Institution
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Share your confirmation, proposed timing, or preferred communication coordinates...
                    </div>
                  </div>
                </div>

                {/* Textarea container */}
                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={500}
                    required
                    placeholder="Write your message here..."
                    value={responseNote}
                    onChange={(e) => setResponseNote(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 pb-7 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1D58D8] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                  />
                  <span className="absolute bottom-2.5 right-3.5 text-[10px] text-slate-400 font-medium">
                    {responseNote.length}/500
                  </span>
                </div>

                {/* Footer Action Bar */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => handleClose(selectedEnquiry.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Close Enquiry</span>
                  </button>

                  <button
                    type="submit"
                    className="btn-arrow-animate px-7 py-2.5 sm:py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Response</span>
                    <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 italic text-center">
                This enquiry is closed.
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
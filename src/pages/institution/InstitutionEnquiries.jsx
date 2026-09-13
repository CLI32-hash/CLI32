import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Landmark,
  Layers,
  Inbox,
  User,
  ChevronRight,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const InstitutionEnquiries = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const loadEnquiries = async () => {
    const instId = user?.id || 'inst-1';
    let data = await enquiryService.getEnquiriesByInstitution(instId);
    if (!data || data.length === 0) {
      data = await enquiryService.getEnquiries();
    }
    setEnquiries(data || []);
  };

  useEffect(() => {
    loadEnquiries();
  }, [user]);

  const filteredEnquiries = enquiries.filter((e) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NEW') return e.status === 'NEW' || e.status === 'VIEWED';
    return e.status === activeFilter;
  });

  const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    if (sortBy === 'title') {
      return (a.topic || a.expertName || '').localeCompare(b.topic || b.expertName || '');
    }
    return 0;
  });

  const counts = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === 'NEW' || e.status === 'VIEWED').length,
    RESPONDED: enquiries.filter((e) => e.status === 'RESPONDED').length,
    CLOSED: enquiries.filter((e) => e.status === 'CLOSED').length
  };

  const getServiceIcon = (serviceType = '') => {
    const s = serviceType.toLowerCase();
    if (s.includes('lecture') || s.includes('guest')) return <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />;
    if (s.includes('workshop') || s.includes('bootcamp')) return <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />;
    if (s.includes('curriculum') || s.includes('advisory')) return <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />;
    if (s.includes('mentor')) return <Users className="w-4 h-4 text-slate-400 shrink-0" />;
    return <Layers className="w-4 h-4 text-slate-400 shrink-0" />;
  };

  const getTopicIcon = (topic = '') => {
    const t = topic.toLowerCase();
    if (t.includes('data') || t.includes('science')) return <Database className="w-4 h-4 text-slate-400 shrink-0" />;
    if (t.includes('cloud') || t.includes('system')) return <Cpu className="w-4 h-4 text-slate-400 shrink-0" />;
    return <Cpu className="w-4 h-4 text-slate-400 shrink-0" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Sent to Expert
          </span>
        );
      case 'VIEWED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Viewed by Expert
          </span>
        );
      case 'RESPONDED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Expert Responded
          </span>
        );
      case 'CLOSED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center gap-1.5 shadow-2xs">
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            My Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Track invitations and requirement enquiries submitted to industry experts.
          </p>
        </div>
        <Link
          to="/institution/experts"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <span>Explore Experts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ─── Top 3 Stat Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Total Enquiries */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
            <Send className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Total Enquiries Sent</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
              {enquiries.length}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Invitations to industry leaders
            </div>
          </div>
        </div>

        {/* Card 2: Responses Received */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Responses Received</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5 text-emerald-600">
              {counts.RESPONDED}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Experts accepted & replied
            </div>
          </div>
        </div>

        {/* Card 3: Engagement Rate */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Engagement Health</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
              95%
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              High expert response turnaround
            </div>
          </div>
        </div>
      </div>

      {/* ─── Filter Tabs & Sort Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { key: 'ALL', label: 'All Enquiries' },
            { key: 'NEW', label: 'Sent / Viewed' },
            { key: 'RESPONDED', label: 'Responded' },
            { key: 'CLOSED', label: 'Closed' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === tab.key
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeFilter === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[tab.key] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="px-3.5 py-2 bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort by: {sortBy === 'latest' ? 'Latest' : 'Title (A-Z)'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-2xl shadow-lg py-1.5 z-30 animate-fade">
              <button
                onClick={() => { setSortBy('latest'); setIsSortDropdownOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-xs font-bold ${sortBy === 'latest' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Latest
              </button>
              <button
                onClick={() => { setSortBy('title'); setIsSortDropdownOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-xs font-bold ${sortBy === 'title' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Title (A-Z)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Enquiries List ─── */}
      {sortedEnquiries.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 bg-blue-50 text-[#1D58D8] rounded-3xl flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">No Enquiries Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {activeFilter === 'ALL'
              ? 'You have not submitted any enquiries yet. Browse industry experts to request sessions.'
              : `No enquiries currently matching status "${activeFilter}".`}
          </p>
          <Link
            to="/institution/experts"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Browse Experts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {sortedEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all space-y-4 sm:space-y-5 relative overflow-hidden group"
            >
              {/* Top Header Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-[#EBF2FF] text-[#1D58D8] inline-block">
                    {enq.serviceType || enq.serviceRequired || 'GUEST LECTURE'}
                  </span>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 stroke-[2]" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors hidden sm:block" />
                </div>
              </div>

              {/* Title & Organization / Expert Details */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                  {enq.expertName || 'Industry Expert'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {enq.topic || enq.requirementTitle || 'Academic Engagement Session'}
                </p>
              </div>

              {/* 3 Attributes Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
                {/* Service */}
                <div className="flex items-center gap-2.5">
                  {getServiceIcon(enq.serviceType || enq.serviceRequired)}
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Service</span>
                    <span className="font-bold text-slate-800">{enq.serviceType || enq.serviceRequired || 'Session'}</span>
                  </div>
                </div>

                {/* Target Date */}
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Target Date</span>
                    <span className="font-bold text-slate-800 truncate block max-w-[200px]">
                      {enq.preferredDate || enq.date || 'Flexible'}
                    </span>
                  </div>
                </div>

                {/* Delivery Mode */}
                <div className="flex items-center gap-2.5">
                  <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Delivery Mode</span>
                    <span className="font-bold text-slate-800 truncate block max-w-[200px]">
                      {enq.mode || 'In Person'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expert Response Preview If Responded */}
              {enq.status === 'RESPONDED' && enq.responseMessage && (
                <div className="p-3.5 sm:p-4 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl text-xs space-y-1 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Response from Expert:</span>
                  </div>
                  <p className="text-emerald-950 font-medium leading-relaxed pl-6">
                    "{enq.responseMessage}"
                  </p>
                </div>
              )}

              {/* Footer Row: Submission date + Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Submitted on</span>
                  <span className="font-bold text-slate-700">
                    {enq.date || '15 Sep 2026'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <button
                    onClick={() => setSelectedEnquiry(enq)}
                    className="px-5 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Background Decorative Element (Bottom Right) ─── */}
      <div className="pointer-events-none fixed bottom-0 right-0 w-80 h-80 z-0 opacity-40 overflow-hidden hidden lg:block">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <path
            d="M 50,280 C 150,240 200,180 250,90"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path
            d="M 0,300 Q 150,220 300,280 L 300,300 Z"
            fill="url(#softBlueGradInst)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="softBlueGradInst" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-16 right-12 text-[#1D58D8] transform rotate-12 animate-pulse">
          <Send className="w-8 h-8 fill-blue-500/20 stroke-[1.5]" />
        </div>
      </div>

      {/* ─── Enquiry Details Modal ─── */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="relative bg-white rounded-[28px] sm:rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100/90 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Top soft ambient glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl bg-[#EBF3FF] border border-blue-100/80 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                      {selectedEnquiry.expertName || 'Industry Expert'}
                    </h2>
                    {getStatusBadge(selectedEnquiry.status)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Service: <strong className="text-slate-800">{selectedEnquiry.serviceType || selectedEnquiry.serviceRequired}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="relative space-y-5">
              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-medium block text-[11px]">Preferred Date / Schedule</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {selectedEnquiry.preferredDate || selectedEnquiry.date || 'Flexible Date'}
                  </span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-medium block text-[11px]">Delivery Mode</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {selectedEnquiry.mode || 'In Person'}
                  </span>
                </div>
              </div>

              {/* Topic Box */}
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">
                  Topic / Engagement Focus
                </span>
                <p className="font-extrabold text-slate-900 text-sm">
                  {selectedEnquiry.topic || selectedEnquiry.requirementTitle || 'Academic Engagement Session'}
                </p>
              </div>

              {/* Requirements Note */}
              {(selectedEnquiry.message || selectedEnquiry.additionalInfo) && (
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">
                    Your Submitted Requirements
                  </span>
                  <p className="text-slate-700 leading-relaxed text-xs font-medium">
                    {selectedEnquiry.message || selectedEnquiry.additionalInfo}
                  </p>
                </div>
              )}

              {/* Expert Response If Available */}
              {selectedEnquiry.status === 'RESPONDED' && selectedEnquiry.responseMessage && (
                <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200/90 rounded-2xl text-xs space-y-2">
                  <div className="font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Response from Expert:</span>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100 text-emerald-950 font-medium leading-relaxed">
                    {selectedEnquiry.responseMessage}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-6 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-full text-xs font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
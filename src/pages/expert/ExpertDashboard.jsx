import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { expertService } from '../../services/expertService';
import {
  ArrowRight, Users, Send, MessageSquare, Clock,
  Briefcase, Mail, UserCheck, Calendar, ChevronDown,
  Star, TrendingUp, CheckCircle2, X, Building2, MapPin,
  ExternalLink, Eye, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import expertHero from '../../assets/expert.png';

/* ────────────────────────────────────────────────────────
   Canvas Line Chart — fully responsive with resize observer
   ──────────────────────────────────────────────────────── */
const MiniLineChart = ({ data, color = '#3B82F6', height = 160 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const max = Math.max(...data, 1);
      const pad = { top: 20, bottom: 30, left: 28, right: 8 };
      const plotW = w - pad.left - pad.right;
      const plotH = h - pad.top - pad.bottom;

      // grid lines
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
      }

      // y-axis labels
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const val = Math.round(max - (max / 4) * i);
        const y = pad.top + (plotH / 4) * i;
        ctx.fillText(val, pad.left - 5, y + 3);
      }

      // x-axis labels
      const labels = ['Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16', 'Sep 17', 'Sep 18'];
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94A3B8';
      for (let i = 0; i < data.length; i++) {
        const x = pad.left + (plotW / (data.length - 1)) * i;
        ctx.fillText(labels[i] || '', x, h - 6);
      }

      const points = data.map((v, i) => ({
        x: pad.left + (plotW / (data.length - 1)) * i,
        y: pad.top + plotH - (v / max) * plotH,
      }));

      // area fill
      const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
      gradient.addColorStop(0, color + '20');
      gradient.addColorStop(1, color + '02');
      ctx.beginPath();
      ctx.moveTo(points[0].x, pad.top + plotH);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, pad.top + plotH);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      // dots
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [data, color, height]);

  return <canvas ref={canvasRef} style={{ width: '100%', height }} />;
};

/* ────────────────────────────────────────────────────────
   Donut / Ring Chart
   ──────────────────────────────────────────────────────── */
const DonutChart = ({ percentage = 75, size = 90, strokeWidth = 8, color = '#22C55E' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm sm:text-base font-bold text-slate-800">{percentage}%</span>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   MAIN EXPERT DASHBOARD COMPONENT
   ════════════════════════════════════════════════════════ */
export const ExpertDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [responseNote, setResponseNote] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const loadDashboardData = async () => {
    const expertId = user?.id || 'exp-1';
    const prof = await expertService.getExpertById(expertId);
    setProfile(prof);

    let enqs = await enquiryService.getEnquiriesByExpert(expertId);
    if (!enqs || enqs.length === 0) {
      enqs = await enquiryService.getEnquiries();
    }
    setEnquiries(enqs);
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleOpenDetails = async (enq) => {
    setSelectedEnquiry(enq);
    setResponseNote(enq.responseMessage || '');
    if (enq.status === 'NEW') {
      await enquiryService.markAsViewed(enq.id);
      loadDashboardData();
    }
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    await enquiryService.respondToEnquiry(selectedEnquiry.id, responseNote);
    setActionSuccess(`Response successfully sent to ${selectedEnquiry.institutionName}`);
    setSelectedEnquiry(null);
    loadDashboardData();
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleClose = async (enqId) => {
    await enquiryService.closeEnquiry(enqId);
    setActionSuccess('Enquiry marked as Closed.');
    setSelectedEnquiry(null);
    loadDashboardData();
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // Metrics
  const servicesList = profile?.services || [];
  const servicesCount = servicesList.length > 0 ? servicesList.length : (profile?.servicesOffered?.length || 4);
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const respondedCount = enquiries.filter((e) => e.status === 'RESPONDED').length;
  const responseRate = enquiries.length > 0 ? Math.round((respondedCount / enquiries.length) * 100) : 75;
  const profileCompletionPct = profile?.profileStatus === 'Published' ? 100 : 80;

  const expertName = profile?.name || user?.name || 'Industry Expert';
  const firstName = expertName.split(' ')[0];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'GOOD MORNING';
    if (h < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const getStatusBadge = (status) => {
    const styles = {
      NEW: 'bg-amber-50 text-amber-700 border-amber-200',
      VIEWED: 'bg-blue-50 text-blue-700 border-blue-200',
      RESPONDED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      CLOSED: 'bg-slate-100 text-slate-600 border-slate-200',
    };
    const labels = { NEW: 'New', VIEWED: 'Viewed', RESPONDED: 'Responded', CLOSED: 'Closed' };
    return (
      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${styles[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
        {labels[status] || status}
      </span>
    );
  };

  /* mock chart trend for enquiries & engagement */
  const chartData = [1, 2, 1, 3, 2, 4, 3];

  /* quick actions config */
  const quickActions = [
    { icon: UserCheck, label: 'Edit Profile', to: '/expert/profile', bg: 'bg-blue-50', text: 'text-blue-600' },
    { icon: Briefcase, label: 'Manage Services', to: '/expert/services', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Mail, label: 'View Enquiries', to: '/expert/enquiries', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { icon: Eye, label: 'Public Directory', to: '/experts', bg: 'bg-violet-50', text: 'text-violet-600' },
  ];

  /* Unique partner institutions from enquiries */
  const partnerInstitutions = enquiries.slice(0, 4).map((enq) => ({
    name: enq.institutionName,
    location: enq.institutionLocation || 'Tamil Nadu',
    service: enq.serviceType || enq.serviceRequired || 'Guest Lectures',
    date: enq.date || enq.preferredDate,
    status: enq.status,
  }));

  return (
    <div className="animate-fade" style={{ maxWidth: 1280 }}>

      {/* Success Notification Alert */}
      {actionSuccess && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════
          WELCOME BANNER + PROFILE READINESS CARD
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 mb-5 sm:mb-6">
        {/* Welcome Banner */}
        <div
          className="lg:col-span-3 rounded-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 40%, #f5f7ff 100%)',
            minHeight: 170,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-stretch h-full">
            {/* Text content — always on top on mobile */}
            <div className="p-5 sm:p-8 flex flex-col justify-center flex-1 z-10">
              <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-blue-600 uppercase">
                  {getGreeting()}, {firstName}
                </span>
                <span className="text-sm sm:text-base">👋</span>
              </div>
              <h1 className="text-xl sm:text-[28px] font-extrabold text-slate-900 leading-tight">
                Welcome back to your<br />
                <span className="text-blue-700">Expert Portal</span>
              </h1>
              <p className="text-[11px] sm:text-[13px] text-slate-500 mt-1.5 sm:mt-2 max-w-sm leading-relaxed">
                Manage your specialized services, respond to institution invitations, and mentor future professionals.
              </p>
            </div>

            {/* Hero Illustration — below text on mobile, right side on sm+ */}
            <div className="flex items-end justify-center sm:justify-end px-4 sm:pr-4 pb-2 sm:pb-0 relative shrink-0 sm:min-w-[280px]">
              <img
                src={expertHero}
                alt="Industry expert illustration"
                className="max-h-[130px] sm:max-h-[180px] w-auto object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))' }}
              />
            </div>
          </div>
        </div>

        {/* Profile Readiness Card — hidden on mobile (shows in stat row) */}
        <div className="hidden lg:flex bg-white border border-slate-200/80 rounded-2xl p-5 flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Profile Readiness</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Live
            </span>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-black text-slate-900">{profileCompletionPct}%</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Verified
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Visible to 50+ colleges</span>
            </div>
          </div>
          <Link to="/expert/profile" className="self-end mt-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors cursor-pointer" title="Edit Profile">
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </div>
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STATS ROW — 2×2 on mobile, 4 cols on lg
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {[
          {
            icon: UserCheck, label: 'Profile Completion', value: `${profileCompletionPct}%`,
            sub: 'Profile ready & published', bg: 'bg-emerald-50', text: 'text-emerald-600',
            hoverBg: 'group-hover:bg-emerald-50', hoverText: 'group-hover:text-emerald-600',
            to: '/expert/profile',
          },
          {
            icon: Briefcase, label: 'Active Services', value: servicesCount,
            sub: 'Offered to institutions', bg: 'bg-blue-50', text: 'text-blue-600',
            hoverBg: 'group-hover:bg-blue-50', hoverText: 'group-hover:text-blue-600',
            to: '/expert/services',
          },
          {
            icon: Mail, label: 'Enquiries Received', value: enquiries.length,
            sub: 'Direct invitations & requests', bg: 'bg-purple-50', text: 'text-purple-600',
            hoverBg: 'group-hover:bg-purple-50', hoverText: 'group-hover:text-purple-600',
            to: '/expert/enquiries',
          },
          {
            icon: Clock, label: 'Pending Action',
            value: newEnquiriesCount,
            sub: 'Awaiting your response', bg: 'bg-orange-50', text: 'text-orange-500',
            hoverBg: 'group-hover:bg-orange-50', hoverText: 'group-hover:text-orange-500',
            to: '/expert/enquiries',
          },
        ].map((card) => (
          <div key={card.label} className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm flex items-start justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-1 sm:space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                  <card.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${card.text}`} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 leading-tight">{card.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 pl-0.5">{card.value}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">{card.sub}</div>
            </div>
            <Link to={card.to}>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-slate-50 ${card.hoverBg} flex items-center justify-center transition-colors mt-0.5 sm:mt-1 cursor-pointer`}>
                <ArrowRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 ${card.hoverText} transition-colors`} />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          ENQUIRY CHART + DONUT + (Desktop: Quick Actions column)
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
        {/* Chart Card — spans 2 cols on desktop */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <div>
              <h2 className="text-[13px] sm:text-sm font-extrabold text-slate-900">Institutional Enquiries & Engagement Overview</h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Track your invitation volume and response cadence over time</p>
            </div>
            <button className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0">
              Last 7 Days <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 sm:gap-5 mb-3 text-[10px] sm:text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 inline-block" /> Enquiries Received
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 inline-block" /> Responses Sent
            </div>
          </div>

          {/* Chart + Donut side by side */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Chart area */}
            <div className="flex-1 min-w-0">
              <MiniLineChart data={chartData} color="#3B82F6" height={170} />
            </div>

            {/* Response Rate Donut */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2 shrink-0" style={{ minWidth: 100 }}>
              <DonutChart percentage={responseRate} size={76} strokeWidth={6} color="#22C55E" />
              <div className="text-center">
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Response Rate</div>
                <div className="text-base sm:text-lg font-black text-slate-800 mt-0.5">
                  {respondedCount} / {enquiries.length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Requests answered</div>
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600">Active Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Right Column: Quick Actions + Upcoming Engagements */}
        <div className="hidden lg:flex flex-col gap-5">
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-4">
              <span className="text-base">⚡</span> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}>
                    <action.icon className={`w-4 h-4 ${action.text}`} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">{action.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 ml-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions / Engagements */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" /> Upcoming Sessions
              </h3>
              <Link to="/expert/enquiries" className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {enquiries.filter(e => e.status === 'RESPONDED' || e.status === 'VIEWED').length > 0 ? (
              <div className="space-y-2.5">
                {enquiries.filter(e => e.status === 'RESPONDED' || e.status === 'VIEWED').slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.topic || item.serviceType}</p>
                      <p className="text-[11px] text-slate-500 truncate">{item.institutionName}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold whitespace-nowrap">
                      {item.preferredDate || item.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 font-medium">No upcoming sessions.</p>
                <p className="text-[11px] text-slate-400">Scheduled institutional sessions will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE ONLY: Quick Actions (full width, 2×2)
          ═══════════════════════════════════════ */}
      <div className="lg:hidden mb-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4">
          <h3 className="text-[13px] font-extrabold text-slate-900 flex items-center gap-1.5 mb-3">
            <span className="text-sm">⚡</span> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group cursor-pointer"
              >
                <div className={`w-7 h-7 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}>
                  <action.icon className={`w-3.5 h-3.5 ${action.text}`} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 leading-tight flex-1">{action.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RECENT ENQUIRIES TABLE
          ═══════════════════════════════════════ */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden mb-5 sm:mb-6">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-slate-900 text-[13px] sm:text-sm">Recent Enquiries</h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Institutional session requests and invitations</p>
          </div>
          <Link
            to="/expert/enquiries"
            className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            View All Enquiries <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" style={{ minWidth: 700 }}>
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Date</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Institution</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Service Requested</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Topic / Requirement</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Mode</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Status</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No enquiries received yet. When institutions reach out, they will appear here.
                  </td>
                </tr>
              ) : (
                enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 sm:px-5 py-3 font-medium text-slate-500 whitespace-nowrap text-[11px]">
                      {enq.date || enq.preferredDate}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 font-bold text-[10px]">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{enq.institutionName}</div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {enq.institutionLocation || 'Tamil Nadu'} • {enq.contactPerson || 'Department'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                        {enq.serviceType || enq.serviceRequired}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-slate-600 whitespace-nowrap text-[11px] max-w-[200px] truncate">
                      {enq.topic || enq.requirementTitle || 'Session Request'}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${enq.mode === 'Online' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                        {enq.mode || 'In Person'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleOpenDetails(enq)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-[11px] font-bold border border-slate-200 hover:border-blue-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM: Partner Institutions + Active Services Preview
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Partner Institutions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h3 className="text-[13px] sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" /> Partner Institutions
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Colleges & universities requesting collaboration</p>
            </div>
            <Link
              to="/expert/enquiries"
              className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {partnerInstitutions.map((inst, idx) => (
              <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                    {inst.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{inst.name}</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {inst.location} • <span className="text-blue-600 font-medium">{inst.service}</span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                  {inst.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Services Preview */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h3 className="text-[13px] sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" /> Active Services
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Offerings open for institutional booking</p>
            </div>
            <Link
              to="/expert/services"
              className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {servicesList.length > 0 ? (
              servicesList.slice(0, 3).map((srv) => (
                <div key={srv.id} className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 truncate">{srv.title || srv.serviceType}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                        {srv.mode || 'In Person'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{srv.description || srv.targetAudience}</p>
                  </div>
                  <Link to="/expert/services" className="shrink-0 text-slate-400 hover:text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            ) : (
              ['Workshops', 'Guest Lectures', 'Curriculum Development', 'Student Projects'].map((srv, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">{srv}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ENQUIRY DETAILS MODAL
          ═══════════════════════════════════════ */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-xl space-y-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    {selectedEnquiry.institutionName}
                  </h3>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Requested Service: <strong className="text-slate-800 font-bold">{selectedEnquiry.serviceType || selectedEnquiry.serviceRequired}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Institution Context */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Location:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.institutionLocation || selectedEnquiry.location || 'Chennai'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Preferred Date:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.preferredDate || selectedEnquiry.date}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Delivery Mode:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.mode || 'In Person'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Contact Details:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.contactPerson || 'Department Coordinator'} ({selectedEnquiry.contactEmail || 'dean@citchennai.edu'})</span>
              </div>
            </div>

            {/* Topic & Requirements Message */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Topic / Requirement:</span>
                <p className="font-bold text-slate-800 text-sm">{selectedEnquiry.topic || selectedEnquiry.requirementTitle || 'Industry Engagement'}</p>
              </div>

              {(selectedEnquiry.message || selectedEnquiry.additionalInfo) && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Institution Message / Scope:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedEnquiry.message || selectedEnquiry.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Expert Response Section */}
            {selectedEnquiry.status === 'RESPONDED' ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Your Response Sent:
                </span>
                <p className="text-emerald-900 leading-relaxed">{selectedEnquiry.responseMessage}</p>
              </div>
            ) : selectedEnquiry.status !== 'CLOSED' ? (
              <form onSubmit={handleRespond} className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  Send Response to Institution:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write your response message (e.g. confirming availability, topic customization, or contact preference)..."
                  value={responseNote}
                  onChange={(e) => setResponseNote(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 outline-none focus:border-slate-900 transition-colors"
                />
                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => handleClose(selectedEnquiry.id)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                  >
                    Close Enquiry
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Response
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-500 italic text-center">
                This enquiry is closed.
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
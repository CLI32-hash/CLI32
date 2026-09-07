import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { expertService } from '../../services/expertService';
import {
  ArrowRight, Users, Send, MessageSquare, Clock,
  Search, Mail, UserCog, Calendar, ChevronDown, Star, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import institutionsHero from '../../assets/institutions.png';

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
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
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
const DonutChart = ({ percentage = 20, size = 90, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="#22C55E" strokeWidth={strokeWidth}
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
   MAIN DASHBOARD COMPONENT
   ════════════════════════════════════════════════════════ */
export const InstitutionDashboard = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [experts, setExperts] = useState([]);
  const [totalExpertsCount, setTotalExpertsCount] = useState(0);

  const loadData = async () => {
    const instId = user?.id || 'inst-1';
    let enqs = await enquiryService.getEnquiriesByInstitution(instId);
    if (!enqs || enqs.length === 0) {
      enqs = await enquiryService.getEnquiries();
    }
    setEnquiries(enqs);

    const exps = await expertService.getExperts();
    setExperts(exps);
    setTotalExpertsCount(exps.length);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const respondedCount = enquiries.filter((e) => e.status === 'RESPONDED').length;
  const responseRate = enquiries.length > 0 ? Math.round((respondedCount / enquiries.length) * 100) : 0;
  const userName = user?.name?.split(' ')[0] || 'Arun';
  const institutionName = user?.name || 'Apex Institute';

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

  /* mock chart data */
  const sentData = [0, 1, 2, 3, 2, 1, 1];

  /* top experts */
  const topExperts = experts.slice(0, 3).map((exp, i) => ({
    ...exp,
    rating: [4.8, 4.7, 4.6][i],
    sessions: [13, 10, 8][i],
    shortTitle: ['AI & Machine Learning', 'Plant Operations', 'Marketing'][i],
  }));

  /* quick actions config */
  const quickActions = [
    { icon: Search, label: 'Explore Experts', to: '/institution/experts', bg: 'bg-blue-50', text: 'text-blue-600' },
    { icon: Send, label: 'Send Enquiry', to: '/institution/experts', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Mail, label: 'View All Enquiries', to: '/institution/enquiries', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { icon: UserCog, label: 'Manage Experts', to: '/institution/experts', bg: 'bg-violet-50', text: 'text-violet-600' },
  ];

  return (
    <div className="animate-fade" style={{ maxWidth: 1280 }}>

      {/* ═══════════════════════════════════════
          WELCOME BANNER + TOTAL ENQUIRIES CARD
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
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-blue-600 uppercase">{getGreeting()}, {userName}</span>
                <span className="text-sm sm:text-base">👋</span>
              </div>
              <h1 className="text-xl sm:text-[28px] font-extrabold text-slate-900 leading-tight">
                Welcome back to<br />
                <span className="text-blue-700">{institutionName}</span>
              </h1>
              <p className="text-[11px] sm:text-[13px] text-slate-500 mt-1.5 sm:mt-2 max-w-sm leading-relaxed">
                Manage experts, track enquiries and help students achieve their career goals.
              </p>
            </div>

            {/* Hero Illustration — below text on mobile, right side on sm+ */}
            <div className="flex items-end justify-center sm:justify-end px-4 sm:pr-2 pb-2 sm:pb-0 relative shrink-0 sm:min-w-[320px]">
              <img
                src={institutionsHero}
                alt="Institution dashboard illustration"
                className="max-h-[130px] sm:max-h-[180px] w-auto object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))' }}
              />
            </div>
          </div>
        </div>

        {/* Total Enquiries Card — hidden on mobile (shows in stat row instead) */}
        <div className="hidden lg:flex bg-white border border-slate-200/80 rounded-2xl p-5 flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Enquiries</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-black text-slate-900">{enquiries.length}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> 100%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">vs last 7 days</span>
            </div>
          </div>
          <Link to="/institution/enquiries" className="self-end mt-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors cursor-pointer">
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
            icon: Users, label: 'Industry Experts Available', value: totalExpertsCount,
            sub: 'Ready across multiple domains', bg: 'bg-blue-50', text: 'text-blue-600',
            hoverBg: 'group-hover:bg-blue-50', hoverText: 'group-hover:text-blue-600',
            to: '/institution/experts',
          },
          {
            icon: Send, label: 'Enquiries Sent', value: enquiries.length,
            sub: 'Submitted to industry experts', bg: 'bg-emerald-50', text: 'text-emerald-600',
            hoverBg: 'group-hover:bg-emerald-50', hoverText: 'group-hover:text-emerald-600',
            to: '/institution/enquiries',
          },
          {
            icon: MessageSquare, label: 'Responses Received', value: respondedCount,
            sub: 'Direct confirmations', bg: 'bg-purple-50', text: 'text-purple-600',
            hoverBg: 'group-hover:bg-purple-50', hoverText: 'group-hover:text-purple-600',
            to: '/institution/enquiries',
          },
          {
            icon: Clock, label: 'Pending / Upcoming',
            value: enquiries.filter((e) => e.status === 'NEW' || e.status === 'VIEWED').length,
            sub: 'Awaiting expert response', bg: 'bg-orange-50', text: 'text-orange-500',
            hoverBg: 'group-hover:bg-orange-50', hoverText: 'group-hover:text-orange-500',
            to: '/institution/enquiries',
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
              <h2 className="text-[13px] sm:text-sm font-extrabold text-slate-900">Enquiry & Response Overview</h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Track your progress and engagement over time</p>
            </div>
            <button className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0">
              Last 7 Days <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 sm:gap-5 mb-3 text-[10px] sm:text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 inline-block" /> Enquiries Sent
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 inline-block" /> Responses Received
            </div>
          </div>

          {/* Chart + Donut side by side */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Chart area */}
            <div className="flex-1 min-w-0">
              <MiniLineChart data={sentData} color="#3B82F6" height={170} />
            </div>

            {/* Response Rate Donut — visible on mobile too */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2 shrink-0" style={{ minWidth: 100 }}>
              <DonutChart percentage={responseRate} size={76} strokeWidth={6} />
              <div className="text-center">
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Response Rate</div>
                <div className="text-base sm:text-lg font-black text-slate-800 mt-0.5">
                  {respondedCount} / {enquiries.length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Enquiries responded</div>
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600">5% than last week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Right Column: Quick Actions + Upcoming Sessions */}
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

          {/* Upcoming Sessions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" /> Upcoming Sessions
              </h3>
              <span className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5">
                View All <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-xs text-slate-400 font-medium">No upcoming sessions.</p>
              <p className="text-[11px] text-slate-400">Check back later for scheduled sessions.</p>
            </div>
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
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Latest enquiries from students</p>
          </div>
          <Link
            to="/institution/enquiries"
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
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Student Name</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Expert Recipient</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Service</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Topic / Requirement</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px]">Status</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-[11px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No enquiries submitted yet. Explore experts to send your first enquiry!
                  </td>
                </tr>
              ) : (
                enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 sm:px-5 py-3 font-medium text-slate-500 whitespace-nowrap text-[11px]">
                      {enq.date || enq.preferredDate}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <div>
                        <div className="text-xs font-bold text-slate-800">{enq.contactPerson || enq.expertName}</div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          ({enq.institutionType || 'B.Tech - CSE'})
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 shrink-0">
                          {(enq.expertName || 'E')[0]}{(enq.expertName || 'E').split(' ').pop()?.[0] || ''}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800">{enq.expertName || 'Industry Expert'}</div>
                          <div className="text-[10px] text-slate-400">Industry Expert</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                        {enq.serviceType || enq.serviceRequired}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-slate-600 whitespace-nowrap text-[11px]">
                      {enq.topic || enq.requirementTitle}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap text-right">
                      <Link
                        to="/institution/enquiries"
                        className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5 justify-end cursor-pointer"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM: Upcoming Sessions + Top Experts
          Side by side on mobile, stacked on desktop (in right col)
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Upcoming Sessions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-[13px] sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" /> Upcoming Sessions
            </h3>
            <span className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5">
              View All <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 sm:py-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-2 sm:mb-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">No upcoming sessions.</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Check back later for scheduled sessions.</p>
          </div>
        </div>

        {/* Top Experts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h3 className="text-[13px] sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" /> Top Experts
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Based on recent engagement</p>
            </div>
            <Link
              to="/institution/experts"
              className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex justify-between gap-2 sm:gap-3">
            {topExperts.map((exp) => (
              <div key={exp.id} className="flex flex-col items-center text-center flex-1 min-w-0">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm mb-1.5 sm:mb-2"
                />
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-tight truncate w-full">{exp.name}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 leading-tight truncate w-full">{exp.shortTitle}</div>
                <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-700">{exp.rating}</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">({exp.sessions} sessions)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
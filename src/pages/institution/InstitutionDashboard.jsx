import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { expertService } from '../../services/expertService';
import { Search, Send, ArrowRight, CheckCircle2, Clock, Users, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InstitutionDashboard = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [totalExpertsCount, setTotalExpertsCount] = useState(0);

  const loadData = async () => {
    const instId = user?.id || 'inst-1';
    let enqs = await enquiryService.getEnquiriesByInstitution(instId);
    if (!enqs || enqs.length === 0) {
      enqs = await enquiryService.getEnquiries();
    }
    setEnquiries(enqs);

    const experts = await expertService.getExperts();
    setTotalExpertsCount(experts.length);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">New</span>;
      case 'VIEWED':
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">Viewed</span>;
      case 'RESPONDED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">Responded</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-medium">Closed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade max-w-6xl">
      {/* Header with primary CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institution Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome, <strong className="text-slate-800 font-bold">{user?.name || 'Academic Institution'}</strong>. Discover industry experts and track departmental session enquiries.
          </p>
        </div>

        {/* Primary Action CTA */}
        <Link
          to="/institution/experts"
          className="px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-[0.98] self-start sm:self-auto cursor-pointer"
        >
          Explore Experts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Row: Experts Viewed/Available, Enquiries Sent, Active Engagements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">Industry Experts Available</div>
            <div className="text-3xl font-black text-slate-900">{totalExpertsCount}</div>
            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Ready across multiple domains
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">Enquiries Sent</div>
            <div className="text-3xl font-black text-slate-900">{enquiries.length}</div>
            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Submitted to industry experts
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">Responses Received</div>
            <div className="text-3xl font-black text-slate-900">
              {enquiries.filter((e) => e.status === 'RESPONDED').length}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold pt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct confirmations
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm">Recent Enquiries</h2>
            <p className="text-[11px] text-slate-500">Status of invitations sent to industry practitioners</p>
          </div>
          <Link
            to="/institution/enquiries"
            className="text-xs text-[#1D58D8] font-bold hover:underline flex items-center gap-1"
          >
            View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/50">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Expert Recipient</th>
                <th className="px-6 py-3.5">Service</th>
                <th className="px-6 py-3.5">Topic / Requirement</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No enquiries submitted yet. Explore experts to send your first enquiry!
                  </td>
                </tr>
              ) : (
                enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                      {enq.date || enq.preferredDate}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      {enq.expertName || 'Industry Expert'}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#1D58D8] whitespace-nowrap">
                      {enq.serviceType || enq.serviceRequired}
                    </td>
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {enq.topic || enq.requirementTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to="/institution/enquiries"
                        className="text-xs text-[#1D58D8] font-bold hover:underline"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { expertService } from '../../services/expertService';
import { CheckCircle2, X, Send, Eye, Clock, MessageSquare, Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    setActionSuccess(`Response sent to ${selectedEnquiry.institutionName}`);
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
  const servicesCount = profile?.services?.length || profile?.servicesOffered?.length || 0;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const profileCompletionPct = profile?.profileStatus === 'Published' ? 100 : 80;

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
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Industry Expert Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your professional profile, services, and enquiries from institutions.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span>✓ {actionSuccess}</span>
          <button onClick={() => setActionSuccess('')} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Row: Profile Completion, Services Added, New Enquiries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Profile Completion */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">Profile Completion</div>
            <div className="text-3xl font-black text-slate-900">{profileCompletionPct}%</div>
            <div className="text-xs text-[#00A86B] font-bold flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
              Profile ready
            </div>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs text-slate-900 shrink-0 bg-emerald-50/50">
            {profileCompletionPct}%
          </div>
        </div>

        {/* Card 2: Services Added */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">Services Added</div>
            <div className="text-3xl font-black text-slate-900">{servicesCount}</div>
            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Active services
            </div>
          </div>
          <Link
            to="/expert/services"
            className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors shrink-0"
            title="Manage Services"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Card 3: New Enquiries */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500">New Enquiries</div>
            <div className="text-3xl font-black text-slate-900">{newEnquiriesCount}</div>
            <div className="text-[11px] text-amber-600 font-bold pt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Need attention
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm">Recent Enquiries</h2>
            <p className="text-[11px] text-slate-500">Institutional session requests and invitations</p>
          </div>
          <Link to="/expert/enquiries" className="text-xs text-[#1D58D8] font-bold hover:underline flex items-center gap-1">
            View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/50">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Institution</th>
                <th className="px-6 py-3.5">Service</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No enquiries received yet.
                  </td>
                </tr>
              ) : (
                enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                      {enq.date || enq.preferredDate}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      {enq.institutionName}
                    </td>
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap font-medium">
                      {enq.serviceType || enq.serviceRequired || enq.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleOpenDetails(enq)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Details Modal */}
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
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
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
                <span className="font-bold text-slate-800">{selectedEnquiry.contactPerson || 'Department Coordinator'} ({selectedEnquiry.contactEmail || 'dean@apextech.edu'})</span>
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
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 outline-none focus:border-slate-900"
                />
                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => handleClose(selectedEnquiry.id)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Close Enquiry
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
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
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
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
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import {
  Inbox,
  Clock,
  CheckCircle2,
  X,
  Send,
  Building2,
  MapPin,
  Calendar,
  Mail,
  Phone,
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

  const counts = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === 'NEW' || e.status === 'VIEWED').length,
    RESPONDED: enquiries.filter((e) => e.status === 'RESPONDED').length,
    CLOSED: enquiries.filter((e) => e.status === 'CLOSED').length
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review and respond to engagement requests submitted by academic institutions.
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span>✓ {feedback}</span>
          <button onClick={() => setFeedback('')} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold overflow-x-auto">
        {[
          { key: 'ALL', label: 'All Enquiries' },
          { key: 'NEW', label: 'New / Viewed' },
          { key: 'RESPONDED', label: 'Responded' },
          { key: 'CLOSED', label: 'Closed' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === tab.key
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {counts[tab.key] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-2 shadow-2xs">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No Enquiries Found</h3>
          <p className="text-xs text-slate-400">
            {activeFilter === 'ALL'
              ? 'You have not received any institution enquiries yet.'
              : `No enquiries with status "${activeFilter}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {enq.institutionName}
                  </h3>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">Service:</span>{' '}
                    <span className="font-bold text-slate-800">
                      {enq.serviceType || enq.serviceRequired || 'Guest Lecture'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Topic:</span>{' '}
                    <span className="font-semibold text-slate-800">
                      {enq.topic || enq.requirementTitle || 'General Session'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Date:</span>{' '}
                    <span className="font-medium text-slate-700">
                      {enq.preferredDate || enq.date}
                    </span>
                  </div>
                </div>

                {(enq.message || enq.additionalInfo) && (
                  <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                    {enq.message || enq.additionalInfo}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button
                  onClick={() => handleOpenDetails(enq)}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl space-y-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    {selectedEnquiry.institutionName}
                  </h3>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Requested Service: <strong className="text-slate-800">{selectedEnquiry.serviceType || selectedEnquiry.serviceRequired}</strong>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Institution Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Institution Type:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.institutionType || 'College / University'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Location:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.institutionLocation || selectedEnquiry.location || 'Chennai'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Contact Person:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.contactPerson || 'Department Head'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Contact Email / Phone:</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedEnquiry.contactEmail || 'contact@institute.edu'}
                </span>
              </div>
            </div>

            {/* Service & Message Details */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Topic / Requirement:</span>
                  <span className="text-slate-500 font-medium">Mode: <strong>{selectedEnquiry.mode || 'In Person'}</strong></span>
                </div>
                <p className="font-bold text-slate-800 text-sm">{selectedEnquiry.topic || selectedEnquiry.requirementTitle}</p>
                <p className="text-slate-500 text-[11px]">Preferred Date: <strong>{selectedEnquiry.preferredDate || selectedEnquiry.date}</strong></p>
              </div>

              {(selectedEnquiry.message || selectedEnquiry.additionalInfo) && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Requirements &amp; Scope Details:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedEnquiry.message || selectedEnquiry.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Action or Responded status */}
            {selectedEnquiry.status === 'RESPONDED' ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Your Response:
                </span>
                <p className="text-emerald-900 leading-relaxed">{selectedEnquiry.responseMessage}</p>
              </div>
            ) : selectedEnquiry.status !== 'CLOSED' ? (
              <form onSubmit={handleRespond} className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  Send Response to Institution:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your confirmation, proposed timing, or preferred communication coordinates..."
                  value={responseNote}
                  onChange={(e) => setResponseNote(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 outline-none focus:border-slate-900"
                />
                <div className="flex justify-between items-center pt-1">
                  <button
                    type="button"
                    onClick={() => handleClose(selectedEnquiry.id)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Close Enquiry
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
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
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { Inbox, CheckCircle2, Clock, X, UserCheck, Calendar, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InstitutionEnquiries = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const loadEnquiries = async () => {
    const instId = user?.id || 'inst-1';
    let data = await enquiryService.getEnquiriesByInstitution(instId);
    if (!data || data.length === 0) {
      data = await enquiryService.getEnquiries();
    }
    setEnquiries(data);
  };

  useEffect(() => {
    loadEnquiries();
  }, [user]);

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
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">Viewed by Expert</span>;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track invitations and requirement enquiries submitted to industry experts.
          </p>
        </div>
        <Link
          to="/institution/experts"
          className="px-5 py-2.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs self-start sm:self-auto cursor-pointer"
        >
          Explore Experts <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold overflow-x-auto">
        {[
          { key: 'ALL', label: 'All Enquiries' },
          { key: 'NEW', label: 'Sent / Viewed' },
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
              ? 'You have not submitted any enquiries yet. Explore experts to get started.'
              : `No enquiries matching status "${activeFilter}".`}
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
                    {enq.expertName || 'Industry Expert'}
                  </h3>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">Service:</span>{' '}
                    <span className="font-bold text-[#1D58D8]">
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
                    <span className="text-slate-400">Target Date:</span>{' '}
                    <span className="font-medium text-slate-700">
                      {enq.preferredDate || enq.date}
                    </span>
                  </div>
                </div>

                {enq.status === 'RESPONDED' && enq.responseMessage && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center gap-2 max-w-2xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate"><strong>Expert Response:</strong> {enq.responseMessage}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button
                  onClick={() => setSelectedEnquiry(enq)}
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
                    {selectedEnquiry.expertName || 'Industry Expert'}
                  </h3>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Service: <strong className="text-slate-800">{selectedEnquiry.serviceType || selectedEnquiry.serviceRequired}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Preferred Date:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.preferredDate || selectedEnquiry.date}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Mode:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.mode || 'In Person'}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Topic / Requirement:</span>
              <p className="font-bold text-slate-800 text-sm">{selectedEnquiry.topic || selectedEnquiry.requirementTitle}</p>
            </div>

            {(selectedEnquiry.message || selectedEnquiry.additionalInfo) && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1 text-xs">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Your Requirements Message:</span>
                <p className="text-slate-700 leading-relaxed">{selectedEnquiry.message || selectedEnquiry.additionalInfo}</p>
              </div>
            )}

            {/* Expert Response If Available */}
            {selectedEnquiry.status === 'RESPONDED' && selectedEnquiry.responseMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1.5">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Response Received from Expert:
                </div>
                <p className="text-emerald-950 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-emerald-100">
                  {selectedEnquiry.responseMessage}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
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
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { useApp } from '../../context/AppContext';
import { availableServiceCategories } from '../../data/services';
import { X, CheckCircle2, Send, Building2, User } from 'lucide-react';

export const EnquiryModal = ({ expert, isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { refreshData } = useApp();

  const [formData, setFormData] = useState({
    institutionName: user?.name || 'Chennai Institute of Technology',
    serviceType: expert?.servicesOffered?.[0] || availableServiceCategories[0],
    topic: '',
    preferredDate: '',
    mode: 'In Person',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !expert) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const institutionId = user?.id && user?.role === 'INSTITUTION' ? user.id : 'inst-1';
    const institutionName = formData.institutionName || user?.name || 'Academic Institution';

    await enquiryService.createEnquiry({
      expertId: expert.id,
      expertName: expert.name,
      institutionId,
      institutionName,
      institutionType: 'College',
      institutionLocation: expert.location || 'Chennai',
      contactPerson: user?.name || 'Department Coordinator',
      contactEmail: user?.email || 'coordinator@institute.edu',
      contactPhone: '+91 98401 00000',
      serviceType: formData.serviceType,
      topic: formData.topic,
      preferredDate: formData.preferredDate,
      mode: formData.mode,
      message: formData.message
    });

    setLoading(false);
    setSubmitted(true);
    refreshData();
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-fade">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-extrabold text-slate-900 text-base">Send Enquiry</h2>
            <p className="text-xs text-slate-500">
              To: <strong className="text-slate-800">{expert.name}</strong> ({expert.designation})
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Enquiry sent successfully.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Your enquiry has been dispatched to {expert.name}. You can track this in <strong>My Enquiries</strong>.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-850 cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] text-xs sm:text-sm">
            {/* Institution Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Institution Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Chennai Institute of Technology"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>

            {/* Expert Field (Read-only display) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Industry Expert
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800">
                {expert.name} • {expert.designation}, {expert.organization}
              </div>
            </div>

            {/* Service Type & Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Service Type *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
                >
                  {(expert.servicesOffered || availableServiceCategories).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Mode *
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
                >
                  <option value="In Person">In Person (On Campus)</option>
                  <option value="Online">Online (Virtual Session)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Topic / Requirement & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Topic / Requirement *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Guest Lecture on Generative AI"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Preferred Date *
                </label>
                <input
                  required
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Requirements / Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Detail target audience (e.g. 3rd-year engineering students), session objectives, expected outcomes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? 'Submitting...' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { availableServiceCategories, serviceDescriptions } from '../../data/services';
import { expertService } from '../../services/expertService';
import { institutionService } from '../../services/institutionService';
import { enquiryService } from '../../services/enquiryService';
import {
  Users,
  Building,
  Briefcase,
  Inbox,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { experts, institutions, enquiries, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState('experts');
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionFeedback, setActionFeedback] = useState('');

  const handleExpertStatus = async (expertId, newStatus) => {
    await expertService.updateExpert(expertId, { status: newStatus });
    setActionFeedback(`Expert status updated to ${newStatus}`);
    refreshData();
    setTimeout(() => setActionFeedback(''), 3500);
  };

  const handleInstitutionStatus = async (institutionId, newStatus) => {
    await institutionService.updateInstitution(institutionId, { status: newStatus });
    setActionFeedback(`Institution status updated to ${newStatus}`);
    refreshData();
    setTimeout(() => setActionFeedback(''), 3500);
  };

  const handleEnquiryStatus = async (enquiryId, newStatus) => {
    await enquiryService.updateEnquiryStatus(enquiryId, newStatus);
    setActionFeedback(`Enquiry status updated to ${newStatus}`);
    refreshData();
    setTimeout(() => setActionFeedback(''), 3500);
  };

  const getStatusBadge = (status) => {
    if (status === 'Approved' || status === 'Active' || status === 'RESPONDED') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
          {status}
        </span>
      );
    }
    if (status === 'Pending' || status === 'NEW' || status === 'VIEWED') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
          {status}
        </span>
      );
    }
    if (status === 'Rejected' || status === 'Inactive' || status === 'CLOSED') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-medium">
          {status}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Platform Administration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, approve, and moderate platform participants, services, and enquiries.
        </p>
      </div>

      {actionFeedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span>✓ {actionFeedback}</span>
          <button onClick={() => setActionFeedback('')} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Experts</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{experts.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Practitioners</div>
        </div>
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Institutions</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{institutions.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Colleges &amp; Universities</div>
        </div>
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Services</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{availableServiceCategories.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Core engagement types</div>
        </div>
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Enquiries</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{enquiries.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Total requests</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-2 text-xs font-bold overflow-x-auto">
        {[
          { key: 'experts', label: 'Manage Experts', count: experts.length },
          { key: 'institutions', label: 'Manage Institutions', count: institutions.length },
          { key: 'services', label: 'Manage Services', count: availableServiceCategories.length },
          { key: 'enquiries', label: 'Manage Enquiries', count: enquiries.length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-3 capitalize transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.key
                ? 'border-b-2 border-slate-950 text-slate-950 font-black'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content Tables */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xs overflow-hidden">
        {/* Manage Experts */}
        {activeTab === 'experts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {experts.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                      {exp.name}
                      <div className="text-[11px] text-slate-500 font-normal">{exp.designation}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">{exp.organization}</td>
                    <td className="p-4 whitespace-nowrap">{exp.industry}</td>
                    <td className="p-4 whitespace-nowrap">{exp.location}</td>
                    <td className="p-4 whitespace-nowrap">{getStatusBadge(exp.status || 'Active')}</td>
                    <td className="p-4 whitespace-nowrap text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedItem({ type: 'expert', data: exp })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        View
                      </button>
                      {exp.status !== 'Approved' && exp.status !== 'Active' && (
                        <button
                          onClick={() => handleExpertStatus(exp.id, 'Approved')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      {exp.status !== 'Rejected' && (
                        <button
                          onClick={() => handleExpertStatus(exp.id, 'Rejected')}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                      {exp.status === 'Active' && (
                        <button
                          onClick={() => handleExpertStatus(exp.id, 'Inactive')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Manage Institutions */}
        {activeTab === 'institutions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4">Institution Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Contact Person</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {institutions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap">{inst.name}</td>
                    <td className="p-4 whitespace-nowrap">{inst.type}</td>
                    <td className="p-4 whitespace-nowrap">
                      {inst.contactPerson}
                      <div className="text-[11px] text-slate-500 font-normal">{inst.email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">{inst.location}</td>
                    <td className="p-4 whitespace-nowrap">{getStatusBadge(inst.status || 'Active')}</td>
                    <td className="p-4 whitespace-nowrap text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedItem({ type: 'institution', data: inst })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        View
                      </button>
                      {inst.status !== 'Approved' && inst.status !== 'Active' && (
                        <button
                          onClick={() => handleInstitutionStatus(inst.id, 'Approved')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      {inst.status !== 'Rejected' && (
                        <button
                          onClick={() => handleInstitutionStatus(inst.id, 'Rejected')}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                      {inst.status === 'Active' && (
                        <button
                          onClick={() => handleInstitutionStatus(inst.id, 'Inactive')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Manage Services */}
        {activeTab === 'services' && (
          <div className="p-6 space-y-4">
            <div className="text-xs text-slate-500">
              Standardized engagement services supported across the Faculty of Practice platform.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableServiceCategories.map((svc) => (
                <div
                  key={svc}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{svc}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {serviceDescriptions[svc] || 'Core platform engagement format for industry-academia collaboration.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4">From Institution</th>
                  <th className="p-4">To Expert</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Topic / Requirement</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap">{enq.institutionName}</td>
                    <td className="p-4 whitespace-nowrap">{enq.expertName}</td>
                    <td className="p-4 font-medium text-[#1D58D8] whitespace-nowrap">
                      {enq.serviceType || enq.serviceRequired}
                    </td>
                    <td className="p-4 text-slate-700 whitespace-nowrap">{enq.topic || enq.requirementTitle}</td>
                    <td className="p-4 whitespace-nowrap">{getStatusBadge(enq.status)}</td>
                    <td className="p-4 whitespace-nowrap text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedItem({ type: 'enquiry', data: enq })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        View Details
                      </button>
                      {enq.status !== 'CLOSED' && (
                        <button
                          onClick={() => handleEnquiryStatus(enq.id, 'CLOSED')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Close
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin View Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base capitalize">
                {selectedItem.type} Details
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-2.5">
              {Object.entries(selectedItem.data)
                .filter(([k]) => k !== 'avatar' && k !== 'services')
                .map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">{k}:</span>
                    <span className="text-slate-800 font-medium break-words">
                      {Array.isArray(v) ? v.join(', ') : String(v)}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-850"
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
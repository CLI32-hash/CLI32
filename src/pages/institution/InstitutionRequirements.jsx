import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { institutionService } from '../../services/institutionService';
import { availableServiceCategories } from '../../data/services';
import { Plus } from 'lucide-react';

export const InstitutionRequirements = () => {
  const { user } = useAuth();
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    serviceType: availableServiceCategories[0],
    expertiseRequired: '',
    preferredDate: '',
    duration: '2 Hours',
    location: 'Chennai Campus',
    studentCount: '60'
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    institutionService.getRequirements(user?.id || 'inst-1').then(setRequirements);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReq = await institutionService.createRequirement({
      ...formData,
      institutionId: user?.id || 'inst-1',
      institutionName: user?.name || 'Apex Institute'
    });
    setRequirements([newReq, ...requirements]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Department Requirements</h1>
          <p className="text-xs text-slate-500">Record academic requirements for institutional tracking.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Requirement
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800">New Academic Need Entry</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Workshop on Cloud Architecture"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Format</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none bg-slate-50"
              >
                {availableServiceCategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Expertise Required</label>
              <input
                required
                type="text"
                placeholder="e.g. AWS, Kubernetes"
                value={formData.expertiseRequired}
                onChange={(e) => setFormData({ ...formData, expertiseRequired: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Date</label>
              <input
                required
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Count</label>
              <input
                type="text"
                value={formData.studentCount}
                onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Scope Details</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800"
            >
              Create Requirement
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.map((req) => (
          <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-800 text-sm">{req.title}</h3>
              <span className="text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded font-medium">{req.serviceType}</span>
            </div>
            <p className="text-xs text-slate-600">{req.description}</p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Domain: <strong>{req.expertiseRequired}</strong></span>
              <span>Target: <strong>{req.preferredDate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
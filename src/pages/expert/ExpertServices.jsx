import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import { availableServiceCategories } from '../../data/services';
import { Plus, Edit3, Trash2, X, CheckCircle2, Save, Layers, Monitor, MapPin } from 'lucide-react';

export const ExpertServices = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [formData, setFormData] = useState({
    serviceType: availableServiceCategories[0],
    title: '',
    description: '',
    mode: 'Online',
    targetAudience: '',
    relevantExpertise: ''
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const loadServices = async () => {
    const expertId = user?.id || 'exp-1';
    const prof = await expertService.getExpertById(expertId);
    setProfile(prof);
    if (prof) {
      setServices(prof.services || []);
    }
  };

  useEffect(() => {
    loadServices();
  }, [user]);

  const handleOpenAddModal = () => {
    setEditingServiceId(null);
    setFormData({
      serviceType: availableServiceCategories[0],
      title: '',
      description: '',
      mode: 'Online',
      targetAudience: '',
      relevantExpertise: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (srv) => {
    setEditingServiceId(srv.id);
    setFormData({
      serviceType: srv.serviceType || availableServiceCategories[0],
      title: srv.title || '',
      description: srv.description || '',
      mode: srv.mode || 'Online',
      targetAudience: srv.targetAudience || '',
      relevantExpertise: srv.relevantExpertise || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to remove this service?')) return;
    const expertId = user?.id || 'exp-1';
    await expertService.deleteService(expertId, serviceId);
    setFeedbackMessage('Service removed successfully.');
    loadServices();
    setTimeout(() => setFeedbackMessage(''), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expertId = user?.id || 'exp-1';
    if (editingServiceId) {
      await expertService.updateService(expertId, editingServiceId, formData);
      setFeedbackMessage('Service updated successfully.');
    } else {
      await expertService.addService(expertId, formData);
      setFeedbackMessage('Service added successfully.');
    }
    setIsModalOpen(false);
    loadServices();
    setTimeout(() => setFeedbackMessage(''), 3500);
  };

  if (!profile) {
    return <div className="text-xs text-slate-500 py-10 text-center">Loading services...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the engagement offerings you provide to colleges, universities and institutes.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMessage}</span>
          </div>
          <button onClick={() => setFeedbackMessage('')} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No Services Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add your first service (e.g. Guest Lectures, Workshops, Mentorship) so academic institutions can discover your offerings.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-slate-850"
          >
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1D58D8] border border-blue-100 inline-block mb-1.5">
                      {srv.serviceType}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <span className="font-semibold text-slate-500">Mode:</span>
                    <span className="font-bold text-slate-800">{srv.mode}</span>
                  </div>

                  {srv.targetAudience && (
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-500">Target Audience:</span>{' '}
                      <span className="text-slate-800">{srv.targetAudience}</span>
                    </div>
                  )}

                  {srv.relevantExpertise && (
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-500">Relevant Expertise:</span>{' '}
                      <span className="text-slate-800 font-medium">{srv.relevantExpertise}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEditModal(srv)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteService(srv.id)}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl space-y-5 border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-900 text-base">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Service Type *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
                >
                  {availableServiceCategories.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Generative AI Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what the service covers, practical hands-on exercises, etc..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Delivery Mode *
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
                  >
                    <option value="Online">Online</option>
                    <option value="In Person">In Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3rd & 4th Year Undergraduates"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Relevant Expertise / Prerequisites
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python, Transformers, PyTorch"
                  value={formData.relevantExpertise}
                  onChange={(e) => setFormData({ ...formData, relevantExpertise: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  {editingServiceId ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
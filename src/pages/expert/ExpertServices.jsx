import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import { enquiryService } from '../../services/enquiryService';
import { availableServiceCategories } from '../../data/services';
import {
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Globe,
  Users,
  Star,
  Clock,
  LayoutGrid,
  Eye,
  Landmark,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Send,
  Layers
} from 'lucide-react';

export const ExpertServices = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
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
    try {
      const enquiries = await enquiryService.getEnquiriesByExpert(expertId);
      setEnquiryCount(enquiries ? enquiries.length : 0);
    } catch (e) {
      setEnquiryCount(0);
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
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    if (editingServiceId) {
      await expertService.updateService(expertId, editingServiceId, {
        ...formData,
        updatedAt: formattedDate
      });
      setFeedbackMessage('Service updated successfully.');
    } else {
      await expertService.addService(expertId, {
        ...formData,
        updatedAt: formattedDate,
        createdAt: formattedDate
      });
      setFeedbackMessage('Service added successfully.');
    }
    setIsModalOpen(false);
    loadServices();
    setTimeout(() => setFeedbackMessage(''), 3500);
  };

  // Sort services based on selection
  const sortedServices = [...services].sort((a, b) => {
    if (sortBy === 'title') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0; // Default order
  });

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-120px)] max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            My Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage the engagement offerings you provide to colleges, universities and institutes.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Service</span>
        </button>
      </div>

      {/* ─── Feedback Alert ─── */}
      {feedbackMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs animate-fade">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
          <button onClick={() => setFeedbackMessage('')} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─── Top 3 Stat Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Active Services */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
            <LayoutGrid className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Active Services</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
              {services.length}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Currently live and available
            </div>
          </div>
        </div>

        {/* Card 2: Total Enquiries */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Total Enquiries</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
              {enquiryCount}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              {enquiryCount === 0 ? 'No new enquiries yet' : `${enquiryCount} total institution requests`}
            </div>
          </div>
        </div>

        {/* Card 3: Profile Visibility */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-500">Profile Visibility</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
              Public
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Visible to all institutions
            </div>
          </div>
        </div>
      </div>

      {/* ─── Your Services Section Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Your Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Services you've created and currently offer.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="px-3.5 py-2 bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort by: {sortBy === 'latest' ? 'Latest' : 'Title (A-Z)'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-2xl shadow-lg py-1.5 z-30 animate-fade">
              <button
                onClick={() => { setSortBy('latest'); setIsSortDropdownOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-xs font-bold ${sortBy === 'latest' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Latest
              </button>
              <button
                onClick={() => { setSortBy('title'); setIsSortDropdownOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-xs font-bold ${sortBy === 'title' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Title (A-Z)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Services List ─── */}
      {sortedServices.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 bg-blue-50 text-[#1D58D8] rounded-3xl flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">No Services Added Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Add your first service (e.g. Guest Lectures, Workshops, Mentorship) so academic institutions can discover and engage with you.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Service</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {sortedServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all space-y-4 sm:space-y-5 relative overflow-hidden group"
            >
              {/* Top Row: Tags + Institution icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-[#EBF2FF] text-[#1D58D8] inline-block">
                    {srv.serviceType || 'GUEST LECTURES'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF2FF] text-[#1D58D8] flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5 stroke-[2]" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors hidden sm:block" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {srv.description || 'No description provided.'}
                </p>
              </div>

              {/* 3 Attributes Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
                {/* Mode */}
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Mode</span>
                    <span className="font-bold text-slate-800">{srv.mode || 'Online'}</span>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Target Audience</span>
                    <span className="font-bold text-slate-800 truncate block max-w-[200px]">
                      {srv.targetAudience || 'General Audience'}
                    </span>
                  </div>
                </div>

                {/* Relevant Expertise */}
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium block text-[11px]">Relevant Expertise</span>
                    <span className="font-bold text-slate-800 truncate block max-w-[200px]">
                      {srv.relevantExpertise || 'Domain Expertise'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Row: Last updated + Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last updated</span>
                  <span className="font-bold text-slate-700">
                    {srv.updatedAt || '15 Sep 2026'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEditModal(srv)}
                    className="px-4 py-2 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/90 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="px-4 py-2 bg-[#FFF1F2] hover:bg-red-100 border border-red-200/80 text-red-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Background Decorative Element (Bottom Right) ─── */}
      <div className="pointer-events-none fixed bottom-0 right-0 w-80 h-80 z-0 opacity-40 overflow-hidden hidden lg:block">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <path
            d="M 50,280 C 150,240 200,180 250,90"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path
            d="M 0,300 Q 150,220 300,280 L 300,300 Z"
            fill="url(#softBlueGrad)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="softBlueGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-16 right-12 text-[#1D58D8] transform rotate-12 animate-pulse">
          <Send className="w-8 h-8 fill-blue-500/20 stroke-[1.5]" />
        </div>
      </div>

      {/* ─── Add / Edit Service Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="relative bg-white rounded-[28px] sm:rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100/90 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Top soft ambient glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl bg-[#EBF3FF] border border-blue-100/80 text-[#1D58D8] flex items-center justify-center shrink-0">
                  <Landmark className="w-6 h-6 stroke-[2]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1D58D8] text-white rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-white shadow-xs">
                    +
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    {editingServiceId ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {editingServiceId
                      ? 'Update this service offering so institutions have accurate details.'
                      : 'Create a service that institutions can discover and enquire about.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Service Type */}
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium outline-none focus:bg-white focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-10"
                  >
                    {availableServiceCategories.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                  Select the type of service you are offering.
                </p>
              </div>

              {/* Service Title */}
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Generative AI Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all"
                />
                <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                  Give your service a clear and concise title.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what the service covers, practical hands-on exercises, etc..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all resize-y min-h-[90px]"
                />
                <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                  Provide a detailed description so institutions understand the value of your service.
                </p>
              </div>

              {/* 2-Column: Delivery Mode & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Delivery Mode */}
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                    Delivery Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium outline-none focus:bg-white focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="Online">Online</option>
                      <option value="In Person">In Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                    How will you deliver this service?
                  </p>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3rd & 4th Year Undergraduates"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                    Who is this service for?
                  </p>
                </div>
              </div>

              {/* Relevant Expertise / Prerequisites */}
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-[#0F172A] mb-1.5">
                  Relevant Expertise / Prerequisites <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python, Transformers, PyTorch"
                  value={formData.relevantExpertise}
                  onChange={(e) => setFormData({ ...formData, relevantExpertise: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none focus:border-[#1D58D8] focus:ring-3 focus:ring-blue-100 transition-all"
                />
                <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                  Mention the key skills or prerequisites required for this service.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-600 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#0A192F] hover:bg-[#152844] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingServiceId ? 'Save Changes' : 'Add Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
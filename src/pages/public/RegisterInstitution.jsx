import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { institutionService } from '../../services/institutionService';
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  MapPin,
  Globe,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export const RegisterInstitution = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    type: 'College',
    contactPerson: '',
    email: '',
    phone: '',
    location: 'Chennai',
    website: '',
    description: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInst = await institutionService.createInstitution(formData);
    login('INSTITUTION', formData.email, { id: newInst.id, name: newInst.name });
    navigate('/institution/dashboard');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all bg-white placeholder:text-slate-400';
  const inputClassNoIcon =
    'w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all bg-white placeholder:text-slate-400';
  const selectClass =
    'w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all bg-white appearance-none cursor-pointer';
  const labelClass = 'block text-sm font-semibold text-slate-800 mb-1.5';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-fade">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#1D58D8] transition-colors mb-6 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1D58D8] to-[#1546B8] px-6 sm:px-8 py-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Join as an Institution</h1>
              <p className="text-blue-100/80 text-xs sm:text-sm mt-0.5">Register your university, college, or institute to connect with industry experts</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 sm:px-8 py-6 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row: Name + Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Institution Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Apex Technical University"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Institution Type <span className="text-red-400">*</span></label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={selectClass}
                >
                  <option value="College">College</option>
                  <option value="University">University</option>
                  <option value="Training Institute">Training Institute</option>
                </select>
              </div>
            </div>

            {/* Row: Contact + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Contact Person / Head <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Dean / HOD Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Official Email <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="dean@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Row: Location + Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location (City) <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Chennai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Website URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Globe className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://institute.edu"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Institution Description</label>
              <textarea
                rows={3}
                placeholder="Brief details about your department, student base, and academic programs..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClassNoIcon + ' resize-none'}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-1" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Join as Institution <ArrowRight className="w-4 h-4" />
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#1D58D8] hover:underline">Login</Link>
            </p>
          </form>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
              <span className="font-semibold text-slate-700">Verified Platform</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#00A86B]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#00A86B]" />
              <span>Free to register</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
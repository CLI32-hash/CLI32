import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import { availableServiceCategories } from '../../data/services';
import {
  ArrowLeft,
  User,
  Mail,
  Briefcase,
  Building2,
  MapPin,
  Globe,
  Hash,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export const RegisterExpert = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    designation: '',
    organization: '',
    industry: 'Information Technology',
    experience: 5,
    location: 'Chennai',
    expertise: 'Cloud Computing, DevOps',
    servicesOffered: ['Guest Lecture'],
    about: '',
    linkedin: ''
  });

  const handleCheckboxChange = (service) => {
    setFormData((prev) => {
      const exists = prev.servicesOffered.includes(service);
      return {
        ...prev,
        servicesOffered: exists
          ? prev.servicesOffered.filter((s) => s !== service)
          : [...prev.servicesOffered, service]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpert = await expertService.createExpert({
      ...formData,
      expertise: formData.expertise.split(',').map((s) => s.trim())
    });
    login('EXPERT', formData.email, { id: newExpert.id, name: newExpert.name });
    navigate('/expert/dashboard');
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
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-6 sm:px-8 py-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Join as an Industry Expert</h1>
              <p className="text-slate-300/80 text-xs sm:text-sm mt-0.5">Publish your professional credentials to collaborate with colleges</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 sm:px-8 py-6 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section: Personal Info */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Personal Information</h3>
              <div className="border-b border-slate-100" />
            </div>

            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section: Professional Info */}
            <div className="space-y-1 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Professional Details</h3>
              <div className="border-b border-slate-100" />
            </div>

            {/* Row: Designation + Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Current Designation <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Principal Architect"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Organization <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Company / Enterprise name"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Row: Industry + Experience + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Industry</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Layers className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="IT, Finance..."
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Experience (Years)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Hash className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    required
                    type="number"
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Location (City)</label>
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
            </div>

            {/* Expertise */}
            <div>
              <label className={labelClass}>Areas of Expertise <span className="text-red-400">*</span></label>
              <input
                required
                type="text"
                placeholder="e.g. Distributed Systems, Spring Boot, PostgreSQL"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                className={inputClassNoIcon}
              />
              <p className="text-[11px] text-slate-400 mt-1">Separate multiple skills with commas</p>
            </div>

            {/* Services Offered */}
            <div>
              <label className={labelClass}>Services You Can Offer</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {availableServiceCategories.map((svc) => (
                  <label
                    key={svc}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.servicesOffered.includes(svc)
                        ? 'bg-blue-50 border-[#1D58D8] text-[#1D58D8] font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.servicesOffered.includes(svc)}
                      onChange={() => handleCheckboxChange(svc)}
                      className="sr-only"
                    />
                    <CheckCircle
                      className={`w-4 h-4 shrink-0 ${
                        formData.servicesOffered.includes(svc) ? 'text-[#1D58D8]' : 'text-slate-300'
                      }`}
                    />
                    <span className="text-xs sm:text-sm">{svc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className={labelClass}>Professional Bio <span className="text-red-400">*</span></label>
              <textarea
                required
                rows={3}
                placeholder="A brief summary of your professional background and what you bring to academia..."
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className={inputClassNoIcon + ' resize-none'}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Globe className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-1" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Join as Industry Expert <ArrowRight className="w-4 h-4" />
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
              <span>Profile reviewed within 24 hours</span>
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
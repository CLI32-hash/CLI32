import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { institutionService } from '../../services/institutionService';
import { Building2, MapPin, Mail, Phone, Globe, Edit3, CheckCircle2, Save, X, BookOpen, Layers, ArrowLeft } from 'lucide-react';

export const InstitutionProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'College',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    description: '',
    areasOfInterestStr: '',
    requirementsNote: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    institutionService.getInstitutionById(user?.id || 'inst-1').then((res) => {
      if (res) {
        setProfile(res);
        setFormData({
          name: res.name || '',
          type: res.type || 'College',
          contactPerson: res.contactPerson || '',
          email: res.email || '',
          phone: res.phone || '',
          location: res.location || '',
          website: res.website || '',
          description: res.description || '',
          areasOfInterestStr: Array.isArray(res.areasOfInterest) ? res.areasOfInterest.join(', ') : '',
          requirementsNote: res.requirementsNote || ''
        });
      }
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await institutionService.updateInstitution(profile.id, {
      ...profile,
      name: formData.name,
      type: formData.type,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      website: formData.website,
      description: formData.description,
      areasOfInterest: formData.areasOfInterestStr
        ? formData.areasOfInterestStr.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      requirementsNote: formData.requirementsNote
    });
    setProfile(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  if (!profile) {
    return <div className="text-xs text-slate-500 py-10 text-center">Loading institution profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade">
      {/* Back to Dashboard */}
      <div>
        <Link
          to="/institution/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institution Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your educational institution details, departmental contacts, and engagement requirements.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Institution profile updated successfully.</span>
        </div>
      )}

      {/* Edit Form or View Card */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Edit Institution Information</h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Institution Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Institution Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
              >
                <option value="College">College</option>
                <option value="University">University</option>
                <option value="Training Institute">Training Institute</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Contact Person / Head *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. S. Ramanathan (Dean)"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Official Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Location (City / Campus) *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Website URL
              </label>
              <input
                type="url"
                placeholder="https://institute.edu"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Areas of Interest (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Artificial Intelligence, Cloud Computing, Cybersecurity, Data Science"
              value={formData.areasOfInterestStr}
              onChange={(e) => setFormData({ ...formData, areasOfInterestStr: e.target.value })}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Institution Overview
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Academic Requirements &amp; Engagement Goals
            </label>
            <textarea
              rows={3}
              placeholder="Describe what services your departments regularly seek (e.g. guest lectures, syllabus review, workshops)..."
              value={formData.requirementsNote}
              onChange={(e) => setFormData({ ...formData, requirementsNote: e.target.value })}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Main Overview Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-black text-2xl shrink-0">
                  <Building2 className="w-8 h-8 text-[#1D58D8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{profile.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {profile.status || 'Active'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1.5">
                    <span className="font-semibold text-slate-700">{profile.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}
                    </span>
                    {profile.website && (
                      <>
                        <span>•</span>
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1D58D8] hover:underline flex items-center gap-1 font-medium"
                        >
                          <Globe className="w-3.5 h-3.5" /> {profile.website.replace(/^https?:\/\//, '')}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {profile.description && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About Institution</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{profile.description}</p>
              </div>
            )}

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-0.5 border border-slate-100">
                <div className="text-slate-400 font-semibold text-[11px]">Primary Contact Person</div>
                <div className="font-bold text-slate-900 text-sm">{profile.contactPerson || 'Not specified'}</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-0.5 border border-slate-100">
                <div className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Official Email
                </div>
                <div className="font-bold text-slate-900 truncate">{profile.email}</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-0.5 border border-slate-100">
                <div className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone
                </div>
                <div className="font-bold text-slate-900">{profile.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>

          {/* Areas of Interest & Academic Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1D58D8]" />
                <h3 className="text-sm font-bold text-slate-900">Areas of Interest</h3>
              </div>
              <p className="text-xs text-slate-500">Domains and industry technologies your students and departments focus on.</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {profile.areasOfInterest && profile.areasOfInterest.length > 0 ? (
                  profile.areasOfInterest.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-[#1D58D8] border border-blue-100 rounded-lg text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No specific areas added yet.</span>
                )}
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00A86B]" />
                <h3 className="text-sm font-bold text-slate-900">Academic Requirements &amp; Notes</h3>
              </div>
              <p className="text-xs text-slate-500">Summary of engagement models preferred by your institution.</p>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                {profile.requirementsNote || 'No specific requirements notes added yet. Click Edit Profile to add.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

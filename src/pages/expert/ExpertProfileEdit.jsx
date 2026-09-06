import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { expertService } from '../../services/expertService';
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const ExpertProfileEdit = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    designation: '',
    organization: '',
    industry: '',
    experience: 0,
    location: '',
    expertiseStr: '',
    about: '',
    education: '',
    linkedin: '',
    profileStatus: 'Published'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    expertService.getExpertById(user?.id || 'exp-1').then((res) => {
      if (res) {
        setProfile(res);
        setFormData({
          name: res.name || '',
          avatar: res.avatar || '',
          designation: res.designation || '',
          organization: res.organization || '',
          industry: res.industry || '',
          experience: res.experience || 0,
          location: res.location || '',
          expertiseStr: Array.isArray(res.expertise) ? res.expertise.join(', ') : '',
          about: res.about || '',
          education: res.education || '',
          linkedin: res.linkedin || '',
          profileStatus: res.profileStatus || 'Published'
        });
      }
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await expertService.updateExpert(profile.id, {
      ...profile,
      name: formData.name,
      avatar: formData.avatar,
      designation: formData.designation,
      organization: formData.organization,
      industry: formData.industry,
      experience: Number(formData.experience),
      location: formData.location,
      expertise: formData.expertiseStr.split(',').map((s) => s.trim()).filter(Boolean),
      about: formData.about,
      education: formData.education,
      linkedin: formData.linkedin,
      profileStatus: formData.profileStatus
    });
    setProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleToggleStatus = async () => {
    const nextStatus = profile.profileStatus === 'Published' ? 'Incomplete' : 'Published';
    const updated = await expertService.updateExpert(profile.id, {
      profileStatus: nextStatus
    });
    setProfile(updated);
    setFormData((prev) => ({ ...prev, profileStatus: nextStatus }));
  };

  if (!profile) {
    return <div className="text-xs text-slate-500 py-10 text-center">Loading profile credentials...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade">
      {/* Back to Dashboard */}
      <div>
        <Link
          to="/expert/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Professional Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            This profile is presented to colleges, universities and institutes to evaluate your credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge with toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">Profile Status:</span>
            <button
              onClick={handleToggleStatus}
              title="Click to toggle status"
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                profile.profileStatus === 'Published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {profile.profileStatus === 'Published' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Published
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Incomplete
                </>
              )}
            </button>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* View Mode or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Edit Practitioner Information</h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Full Name *
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
                Profile Photo URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Current Designation *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Principal AI Architect"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Organization / Enterprise *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cognitive Labs"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Industry Domain *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Artificial Intelligence"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Years of Experience *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Location (City) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chennai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Skills &amp; Expertise Tags (Comma-separated) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI/ML, Deep Learning, Python, System Design"
              value={formData.expertiseStr}
              onChange={(e) => setFormData({ ...formData, expertiseStr: e.target.value })}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Professional Bio *
            </label>
            <textarea
              rows={4}
              required
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Education / Certifications
              </label>
              <input
                type="text"
                placeholder="e.g. M.Tech in AI, IIT Madras"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Profile Publishing Status
            </label>
            <select
              value={formData.profileStatus}
              onChange={(e) => setFormData({ ...formData, profileStatus: e.target.value })}
              className="w-full sm:w-64 text-xs sm:text-sm border border-slate-300 rounded-xl p-2.5 outline-none bg-slate-50 focus:border-slate-900"
            >
              <option value="Published">Published (Discoverable by Colleges)</option>
              <option value="Incomplete">Incomplete (Draft Mode)</option>
            </select>
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
          {/* Main Profile Overview Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs ring-2 ring-white"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-black text-2xl shrink-0">
                    {profile.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{profile.name}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                    {profile.designation} at <span className="text-slate-900 font-bold">{profile.organization}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {profile.industry}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-700">{profile.experience} Years Experience</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professional Bio</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{profile.about}</p>
            </div>

            {/* Expertise Tags */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills &amp; Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.expertise?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 text-[#1D58D8] border border-blue-100 rounded-lg text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-1 border border-slate-100">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-500" /> Education &amp; Credentials
                </span>
                <p className="font-bold text-slate-800 text-sm">{profile.education || 'Credentials on file'}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl space-y-1 border border-slate-100">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-slate-500" /> Professional Profiles
                </span>
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#1D58D8] hover:underline block truncate text-sm"
                  >
                    Verified LinkedIn Profile →
                  </a>
                ) : (
                  <span className="text-slate-400 italic">No public profile linked</span>
                )}
              </div>
            </div>
          </div>

          {/* Services Offered Section */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Services Offered to Institutions</h3>
                <p className="text-xs text-slate-500">Formats you are actively open to conduct with higher education</p>
              </div>
              <a
                href="/expert/services"
                className="text-xs font-bold text-[#1D58D8] hover:underline"
              >
                Manage Services →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(profile.servicesOffered || []).map((srv) => (
                <div
                  key={srv}
                  className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2.5 text-xs font-bold text-slate-800"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
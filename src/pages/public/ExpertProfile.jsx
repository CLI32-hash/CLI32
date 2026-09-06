import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { expertService } from '../../services/expertService';
import { useAuth } from '../../context/AuthContext';
import { EnquiryModal } from '../../components/forms/EnquiryModal';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Send,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Layers,
  Lock,
  ArrowRight
} from 'lucide-react';

const fallbackAvatars = {
  'exp-1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  'exp-2': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  'exp-3': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
  'exp-4': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
};

export const ExpertProfile = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [expert, setExpert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    expertService.getExpertById(id).then((data) => {
      setExpert(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto py-20 text-center text-xs text-slate-500">Loading expert credentials...</div>;
  }

  if (!expert) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-3">
        <p className="text-slate-600 font-bold">Expert profile not found.</p>
        <Link to="/experts" className="text-xs font-semibold text-[#1D58D8] hover:underline">
          Back to Directory
        </Link>
      </div>
    );
  }

  const avatarUrl = expert.avatar || fallbackAvatars[expert.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';

  // If user is not registered / not authenticated, gate the profile details!
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 animate-fade">
        <Link
          to="/experts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore Experts
        </Link>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
          {/* Circular WhatsApp thumbnail with lock indicator */}
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={avatarUrl}
              alt={expert.name}
              className="w-24 h-24 rounded-full object-cover border-3 border-slate-200 shadow-md ring-2 ring-white"
              onError={(e) => {
                e.currentTarget.src = fallbackAvatars[expert.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#1D58D8] text-white flex items-center justify-center border-2 border-white shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{expert.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {expert.designation} • {expert.organization}
            </p>
            <div className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {expert.industry} • {expert.experience} Years Experience • {expert.location}
            </div>
          </div>

          {/* Locked Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-[#1D58D8]" /> Registration Required to View Full Profile
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Full background credentials, detailed service offerings, and direct session enquiry options are available exclusively to registered institutions and academic partners.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/register/institution"
              className="w-full sm:w-auto px-7 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-full text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              Join as an Institution <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 rounded-full text-xs sm:text-sm font-bold shadow-2xs cursor-pointer"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user IS authenticated, display the full profile
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fade">
      <Link
        to="/experts"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore Experts
      </Link>

      {/* Header Card with Circular WhatsApp Avatar */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-5">
            <img
              src={avatarUrl}
              alt={expert.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-slate-200 shrink-0 shadow-2xs ring-2 ring-white"
              onError={(e) => {
                e.currentTarget.src = fallbackAvatars[expert.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';
              }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {expert.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                {expert.designation} at <span className="text-slate-900 font-bold">{expert.organization}</span>
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {expert.industry}
                </span>
                <span>•</span>
                <span className="font-medium text-slate-700">{expert.experience} Years Experience</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {expert.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Send Enquiry →
          </button>
        </div>
      </div>

      {/* Main Grid: About & Core Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Bio & Skills */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Professional Background
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {expert.about}
            </p>
          </div>

          {/* Structured Services Offered */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Services Offered
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {(expert.services || []).length} structured engagement formats
              </span>
            </div>

            <div className="space-y-3">
              {(expert.services || []).length > 0 ? (
                expert.services.map((svc) => (
                  <div
                    key={svc.id || svc.title}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {svc.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1D58D8] border border-blue-100">
                        {svc.serviceType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                      <div>
                        <strong className="text-slate-700">Mode:</strong> {svc.mode || 'In Person / Online'}
                      </div>
                      <div>
                        <strong className="text-slate-700">Target Audience:</strong> {svc.targetAudience || 'Undergraduates'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-4 text-center">
                  No specific engagement formats listed yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Credentials Sidebar */}
        <div className="space-y-6">
          {/* Areas of Expertise */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Relevant Expertise
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(expert.expertise || []).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1D58D8] font-semibold text-xs border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Education &amp; Credentials
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{expert.education || 'Master of Engineering / Industry Practitioner'}</span>
            </div>
          </div>

          {/* Public Profile Link */}
          {expert.linkedin && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Professional Links
              </h3>
              <a
                href={expert.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1D58D8] hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Globe className="w-3.5 h-3.5" /> View LinkedIn Profile
              </a>
            </div>
          )}

          {/* Send Enquiry CTA Card */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Engage Expert
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coordinate guest lectures, workshops, mentorship, or student project guidance directly with {expert.name}.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        expert={expert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
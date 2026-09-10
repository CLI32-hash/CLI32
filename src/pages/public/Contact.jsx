import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Send, ArrowLeft } from 'lucide-react';

export const Contact = () => {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade space-y-6">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      </div>
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact Support</h1>
        <p className="text-slate-650 text-xs sm:text-sm">Need help onboarding your department or verified expert account?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-6 md:border-r border-slate-100 md:pr-6">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              support@realworldintegration.org
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Location</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Chennai, India
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-250 rounded-xl p-6 text-center text-emerald-800 text-xs sm:text-sm">
              Your enquiry has been submitted successfully. We will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Name</label>
                <input required type="text" className="w-full text-sm border border-slate-350 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-slate-905" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Official Email</label>
                <input required type="email" className="w-full text-sm border border-slate-355 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-slate-905" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Message / Query</label>
                <textarea required rows={4} className="w-full text-sm border border-slate-355 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-slate-905"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-slate-800 flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
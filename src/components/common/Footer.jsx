import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-brand-500" />
            Faculty of Practice
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Faculty of Practice connects colleges, universities and training institutes with professionals, consultants, freelancers and industry experts for guest lectures, workshops, mentorship, consultancy and practical learning opportunities.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Quick Links</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/experts" className="hover:text-white">Experts Directory</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Portals & Access</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/register/expert" className="hover:text-white">Join as Industry Expert</Link></li>
            <li><Link to="/register/institution" className="hover:text-white">Join as Institution</Link></li>
            <li><Link to="/login" className="hover:text-white">Account Login</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Contact</div>
          <p className="text-xs text-slate-400 mb-2 leading-relaxed">Have questions about institutional onboarding?</p>
          <p className="text-xs text-white font-mono">contact@facultyofpractice.org</p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Faculty of Practice. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
          <Link to="/terms-of-use" className="hover:text-slate-300">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};
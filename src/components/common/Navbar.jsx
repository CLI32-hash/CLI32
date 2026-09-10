import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, BookOpen, LogOut, LayoutDashboard, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'EXPERT') return '/expert/dashboard';
    if (user.role === 'INSTITUTION') return '/institution/dashboard';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0c1938] text-white shadow-sm flex items-center justify-center shrink-0">
                <BookOpen className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0c1938]">
                Real World <span className="text-[#1D58D8]">Integration</span>
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6 text-sm font-medium text-slate-600">
              <Link to="/" className="hover:text-brand-600 py-2">Home</Link>
              <Link to="/about" className="hover:text-brand-600 py-2">About</Link>
              {/* <Link to="/how-it-works" className="hover:text-brand-600 py-2">How It Works</Link> */}
              <Link to="/services" className="hover:text-brand-600 py-2">Services</Link>
              <Link to="/experts" className="hover:text-brand-600 py-2">Experts</Link>
              <Link to="/contact" className="hover:text-brand-600 py-2">Contact</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded-md hover:bg-brand-100"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-600">
                  Login
                </Link>
                <Link
                  to="/register/institution"
                  className="px-3.5 py-2 text-sm font-medium text-brand-600 border border-brand-600 rounded-lg hover:bg-brand-50"
                >
                  Join as Institution
                </Link>
                <Link
                  to="/register/expert"
                  className="px-3.5 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                >
                  Join as Expert
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">About</Link>
          <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">How It Works</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Services</Link>
          <Link to="/experts" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Experts</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Contact</Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-brand-600">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-left py-2 text-sm font-medium text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Login</Link>
                <Link to="/register/expert" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-brand-600">Join as Expert</Link>
                <Link to="/register/institution" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-brand-600">Join as Institution</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
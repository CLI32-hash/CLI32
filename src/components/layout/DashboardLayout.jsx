import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Inbox,
  LogOut,
  Search,
  Building,
  Menu,
  X
} from 'lucide-react';

export const DashboardLayout = ({ role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinks = () => {
    if (role === 'EXPERT') {
      return [
        { name: 'Dashboard', path: '/expert/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', path: '/expert/profile', icon: User },
        { name: 'My Services', path: '/expert/services', icon: Briefcase },
        { name: 'My Enquiries', path: '/expert/enquiries', icon: Inbox },
      ];
    }
    if (role === 'INSTITUTION') {
      return [
        { name: 'Dashboard', path: '/institution/dashboard', icon: LayoutDashboard },
        { name: 'Explore Experts', path: '/institution/experts', icon: Search },
        { name: 'My Profile', path: '/institution/profile', icon: Building },
        { name: 'My Enquiries', path: '/institution/enquiries', icon: Inbox },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      ];
    }
    return [];
  };

  const navLinks = getLinks();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-950 text-white px-2 py-1 rounded-md font-black text-xs">
            FP
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900 leading-tight">Faculty of Practice</div>
            <div className="text-[9px] font-bold uppercase text-[#1D58D8] tracking-wider">{role} PORTAL</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop fixed/sticky, Mobile drawer) */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-10 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 shadow-2xs transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen overflow-y-auto`}
      >
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-slate-950 text-white px-2.5 py-2 rounded-lg font-black text-xs tracking-tight shadow-xs">
                FP
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900 leading-tight">Faculty of Practice</div>
                <div className="text-[10px] font-bold uppercase text-[#1D58D8] tracking-wider mt-0.5">{role} PORTAL</div>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="p-4 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#EBF3FF] text-[#1D58D8] rounded-full shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1D58D8]' : 'text-slate-500'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100 space-y-4">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Signed in as:</div>
            <div className="text-xs font-bold text-slate-800 truncate mt-0.5">{user?.email || 'user@example.com'}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors pt-2 cursor-pointer w-full text-left"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
};
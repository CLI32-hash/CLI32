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
  BookOpen,
  Menu,
  X,
  Users,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Command,
  HelpCircle,
  ArrowRight,
  Mail,
  ChevronDown,
  ChevronRight
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

  /* ─── Nav links ─── */
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
        { name: 'My Enquiries', path: '/institution/enquiries', icon: Mail },
        { name: 'Students', path: '/institution/dashboard', icon: GraduationCap },
        { name: 'Experts', path: '/institution/experts', icon: Users },
        { name: 'Sessions', path: '/institution/dashboard', icon: Calendar },
        { name: 'Reports', path: '/institution/dashboard', icon: BarChart3 },
        { name: 'Settings', path: '/institution/profile', icon: Settings },
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
  const userName = user?.name || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const isActiveLink = (linkName) => {
    if (linkName === 'Dashboard' && location.pathname.endsWith('/dashboard')) return true;
    if (linkName === 'Explore Experts' && location.pathname.endsWith('/experts')) return true;
    if (linkName === 'My Enquiries' && location.pathname.endsWith('/enquiries')) return true;
    if (linkName === 'My Profile' && location.pathname.endsWith('/profile')) return true;
    if (linkName === 'My Services' && location.pathname.endsWith('/services')) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">

      {/* ═══════════════════════════════════════════════════
          MOBILE: Top Header — Hamburger + Logo + Bell + Avatar
          ═══════════════════════════════════════════════════ */}
      <div className="md:hidden bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between px-3 py-2.5">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-[#0f172a] flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[14px] tracking-tight text-slate-800">
                Real World<span className="text-blue-600"> Integration</span>
              </span>
            </Link>
          </div>

          {/* Right: Bell + Avatar */}
          <div className="flex items-center gap-1.5">
            <button className="relative p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <Bell className="w-[17px] h-[17px] text-slate-500" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white" />
            </button>
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
              {userInitials}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE: Slide-down menu drawer (overlay)
          ═══════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer — slides from left */}
          <div className="md:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl overflow-y-auto"
            style={{ animation: 'slideInLeft 0.25s ease-out' }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-[15px] tracking-tight text-slate-800">
                  Real World<span className="text-blue-600"> Integration</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                {userInitials}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{userName}</div>
                <div className="text-[11px] text-slate-400 font-medium">{user?.email || 'admin@institution.edu'}</div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-3 py-3 space-y-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActiveLink(link.name);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="flex-1">{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-slate-300'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer — Need Help + Sign Out */}
            <div className="mt-auto px-4 py-4 border-t border-slate-100 space-y-3">
              {/* Need Help */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-[12px] font-bold text-slate-800">Need Help?</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">Our team is here to support you.</p>
                <button className="mt-2 text-[11px] font-bold text-blue-600 flex items-center gap-1 cursor-pointer">
                  Contact Support <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Sign Out */}
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-red-600 hover:bg-red-50 w-full transition-colors cursor-pointer"
              >
                <LogOut className="w-[18px] h-[18px] text-red-500" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════
          DESKTOP: Sidebar (hidden on mobile)
          ═══════════════════════════════════════════════════ */}
      <aside className="hidden md:flex fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-10 w-[220px] bg-white border-r border-slate-200/80 flex-col justify-between shrink-0 shadow-2xs h-screen overflow-y-auto">
        <div>
          {/* Real World Integration Logo */}
          <div className="px-5 py-5 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0f172a] flex items-center justify-center shadow-sm">
                <BookOpen className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900 leading-tight">
                  Real World
                  <span className="text-blue-600"> Integration</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-4 space-y-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActiveLink(link.name);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700 rounded-xl'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Need Help? Card */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-[13px] font-bold text-slate-800">Need Help?</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Our team is here to support you.</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Mail className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium">admin@apexinstitute.edu</span>
            </div>
            <button className="mt-3 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer">
              Contact Support <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between bg-white border-b border-slate-200/80 px-6 py-3 sticky top-0 z-20">
          {/* Search */}
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl flex-1 hover:border-slate-300 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search experts, students, topics..."
                className="bg-transparent text-xs text-slate-700 placeholder-slate-400 flex-1 outline-none"
              />
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/60 text-[10px] font-bold text-slate-500">
                <Command className="w-3 h-3" /> K
              </div>
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <Bell className="w-[18px] h-[18px] text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-bold text-blue-700">
                {userInitials}
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">{userName}</div>
                <div className="text-[10px] text-slate-400 font-medium">Admin</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-5 md:p-8 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
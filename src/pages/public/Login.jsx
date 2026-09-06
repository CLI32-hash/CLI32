import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import loginIllustration from '../../assets/login-illustration.jpg';
import {
  BookOpen,
  Building2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Users2,
  Shield,
  Target,
  CheckCircle
} from 'lucide-react';

export const Login = () => {
  const [role, setRole] = useState('INSTITUTION');
  const [email, setEmail] = useState('dean@apextech.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'EXPERT') {
      setEmail('arun.kumar@mock.com');
    } else if (selectedRole === 'INSTITUTION') {
      setEmail('dean@apextech.edu');
    } else {
      setEmail('admin@facultyofpractice.org');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email);
    if (role === 'EXPERT') navigate('/expert/dashboard');
    else if (role === 'INSTITUTION') navigate('/institution/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* ================================================================ */}
      {/* LEFT PANEL — Branding (hidden on mobile, shown on lg+)           */}
      {/* ================================================================ */}
      <div className="hidden lg:flex lg:w-[48%] bg-gradient-to-br from-[#1D58D8] via-[#1a4fc2] to-[#0F172A] relative overflow-hidden flex-col justify-between p-10 xl:p-14">
        {/* Decorative dots / circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white/15 rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-white/15 backdrop-blur-sm text-white p-2 rounded-xl border border-white/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Faculty of <span className="text-blue-200">Practice</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/15 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        {/* Welcome Copy */}
        <div className="relative z-10 space-y-5 -mt-8">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Welcome<br />
            <span className="text-blue-200">Back!</span>
          </h1>
          <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
            Login to your account and continue building meaningful academic-industry connections.
          </p>

          {/* Trust Points */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-200" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Trusted Platform</h4>
                <p className="text-blue-200/70 text-xs leading-relaxed mt-0.5">
                  Secure, verified, and built for academic-industry collaboration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Users2 className="w-4.5 h-4.5 text-blue-200" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">For Institutions & Experts</h4>
                <p className="text-blue-200/70 text-xs leading-relaxed mt-0.5">
                  One platform. Two communities. Endless opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Target className="w-4.5 h-4.5 text-blue-200" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Meaningful Impact</h4>
                <p className="text-blue-200/70 text-xs leading-relaxed mt-0.5">
                  Bringing real-world expertise into education.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Photo / Illustration */}
        <div className="relative z-10">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
            alt="Industry professionals collaborating"
            className="rounded-2xl object-cover w-full h-48 xl:h-56 shadow-2xl border border-white/10"
          />
        </div>
      </div>

      {/* ================================================================ */}
      {/* RIGHT PANEL — Login Form                                          */}
      {/* ================================================================ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header with Back Button (visible only on mobile) */}
        <div className="lg:hidden px-5 pt-6 pb-2 flex items-center justify-between border-b border-slate-100">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#1D58D8] py-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#1D58D8] text-white p-1.5 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-slate-800">
              Faculty of <span className="text-[#1D58D8]">Practice</span>
            </span>
          </Link>
        </div>

        {/* Desktop Top Bar with Back Button */}
        <div className="hidden lg:flex items-center justify-start px-8 pt-8 pb-2">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#1D58D8] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
          </button>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-6 lg:py-8">
          <div className="w-full max-w-md space-y-6">
            {/* Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight">
                Login to your account
              </h2>
              <p className="text-slate-500 text-sm">
                Choose your account type to continue.
              </p>
            </div>

            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-0 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleSelect('INSTITUTION')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  role === 'INSTITUTION'
                    ? 'bg-[#1D58D8] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Institution
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('EXPERT')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  role === 'EXPERT'
                    ? 'bg-[#1D58D8] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                Industry Expert
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-16 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#1D58D8] text-xs font-bold hover:text-[#1546B8] transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#1D58D8] focus:ring-[#1D58D8]"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold text-[#1D58D8] hover:text-[#1546B8] transition-colors">
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                Login <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#F8FAFC] px-3 text-slate-400 font-medium">or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Create Account Link */}
            <div className="text-center text-sm text-slate-500 pt-1">
              New to Faculty of Practice?{' '}
              <Link to="/register/institution" className="font-bold text-[#1D58D8] hover:text-[#1546B8] hover:underline transition-colors">
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="border-t border-slate-200 bg-white/80 backdrop-blur-sm px-5 sm:px-8 py-4">
          <div className="max-w-md mx-auto lg:max-w-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#1D58D8] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Secure & Compliant</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Your data is protected with enterprise-grade security.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users2 className="w-5 h-5 text-[#1D58D8] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Verified Professionals</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Connect with experienced and verified industry professionals.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="w-5 h-5 text-[#1D58D8] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Privacy Protected</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">We respect your privacy and never share your information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
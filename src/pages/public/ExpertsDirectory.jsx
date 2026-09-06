import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { availableServiceCategories } from '../../data/services';
import expertHeroImg from '../../assets/expert.png';
import {
  Search,
  MapPin,
  X,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building2,
  CheckCircle2,
  SlidersHorizontal,
  Bookmark,
  Clock,
  Briefcase,
  LayoutGrid,
  List,
  ShieldCheck,
  Users2,
  Handshake,
  Sparkles,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

const fallbackAvatars = {
  'exp-1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  'exp-2': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  'exp-3': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
  'exp-4': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
};

export const ExpertsDirectory = () => {
  const { experts } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [minExp, setMinExp] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [savedBookmarks, setSavedBookmarks] = useState({});

  // Auth gate modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique filter lists from data
  const industries = useMemo(() => [...new Set(experts.map((e) => e.industry).filter(Boolean))], [experts]);
  const locations = useMemo(() => [...new Set(experts.map((e) => e.location).filter(Boolean))], [experts]);
  const allSkills = useMemo(() => {
    const set = new Set();
    experts.forEach((e) => {
      (e.expertise || []).forEach((skill) => set.add(skill));
    });
    return [...set];
  }, [experts]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setSavedBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredExperts = useMemo(() => {
    let result = experts.filter((exp) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        exp.name?.toLowerCase().includes(query) ||
        exp.industry?.toLowerCase().includes(query) ||
        exp.designation?.toLowerCase().includes(query) ||
        exp.organization?.toLowerCase().includes(query) ||
        (exp.expertise || []).some((skill) => skill.toLowerCase().includes(query));

      const matchesIndustry = !selectedIndustry || exp.industry === selectedIndustry;
      const matchesSkill = !selectedSkill || (exp.expertise || []).includes(selectedSkill);
      const matchesLocation = !selectedLocation || exp.location === selectedLocation;
      const matchesService =
        !selectedService ||
        (exp.servicesOffered || []).some((s) =>
          s.toLowerCase().includes(selectedService.toLowerCase().replace(/s$/, ''))
        ) ||
        (exp.services || []).some((s) =>
          s.serviceType?.toLowerCase().includes(selectedService.toLowerCase().replace(/s$/, ''))
        );
      const matchesExp = !minExp || exp.experience >= Number(minExp);

      return matchesSearch && matchesIndustry && matchesSkill && matchesLocation && matchesService && matchesExp;
    });

    if (sortBy === 'exp-desc') {
      result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    } else if (sortBy === 'exp-asc') {
      result.sort((a, b) => (a.experience || 0) - (b.experience || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return result;
  }, [experts, searchQuery, selectedIndustry, selectedSkill, selectedLocation, selectedService, minExp, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedSkill('');
    setSelectedLocation('');
    setSelectedService('');
    setMinExp('');
  };

  const handleViewProfile = (exp) => {
    if (!isAuthenticated) {
      setSelectedExpert(exp);
      setShowAuthModal(true);
    } else {
      navigate(`/experts/${exp.id}`);
    }
  };

  const popularIndustries = [
    { name: 'Technology', count: 32 },
    { name: 'Manufacturing', count: 24 },
    { name: 'Marketing', count: 18 },
    { name: 'Finance', count: 14 },
    { name: 'Healthcare', count: 12 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-fade">
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION WITH VECTOR ARTWORK */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 pt-1">
        <div className="max-w-2xl space-y-1.5 sm:space-y-2.5">
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
            Explore <span className="text-[#1D58D8]">Industry</span> Experts
          </h1>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Discover professionals across industries, expertise and services. Connect directly with practitioners who can bring real-world knowledge to your students.
          </p>
        </div>

        {/* Right Illustration Graphic from user upload */}
        <div className="hidden lg:flex items-center justify-end max-w-sm xl:max-w-md">
          <img
            src={expertHeroImg}
            alt="Explore Industry Experts"
            className="w-full h-auto object-contain max-h-48"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & FILTER TOOLBAR */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-3 sm:space-y-4">
        {/* Row 1: Search Bar (Desktop has side buttons, Mobile has full width search) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 top-3 sm:top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, expertise or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-[#F8FAFC] sm:bg-white text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Desktop Search & Filter Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              className="px-8 py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Mobile Row 2: Side-by-Side [Filters] and [Sort] Buttons */}
        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`py-2.5 px-3 bg-white border text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs ${
              showMobileFilters ? 'border-[#1D58D8] text-[#1D58D8] bg-blue-50/50' : 'border-slate-200 text-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 pl-8 pr-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl appearance-none cursor-pointer outline-none shadow-2xs"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="exp-desc">Sort: Exp (High-Low)</option>
              <option value="exp-asc">Sort: Exp (Low-High)</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Filter Select Dropdowns (Desktop & expandable on mobile) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 ${showMobileFilters ? 'grid' : 'hidden lg:grid'}`}>
          {/* Industry */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Industry
            </label>
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Expertise / Skills */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Expertise / Skills
            </label>
            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="">All Skills</option>
                {allSkills.map((sk) => (
                  <option key={sk} value={sk}>{sk}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Services
            </label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="">All Services</option>
                {availableServiceCategories.map((srv) => (
                  <option key={srv} value={srv}>{srv}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Experience
            </label>
            <div className="relative">
              <select
                value={minExp}
                onChange={(e) => setMinExp(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="">Any Experience</option>
                <option value="5">5+ Years</option>
                <option value="8">8+ Years</option>
                <option value="10">10+ Years</option>
                <option value="15">15+ Years</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Location
              </label>
              {(searchQuery || selectedIndustry || selectedSkill || selectedLocation || selectedService || minExp) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#1D58D8] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1D58D8]/20 focus:border-[#1D58D8] outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RESULTS STATUS BAR (Single Row on Both Mobile & Desktop) */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="text-sm sm:text-base font-extrabold text-slate-900">
          {filteredExperts.length} Experts Found
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Sort Dropdown */}
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer pr-1"
            >
              <option value="relevance">Relevance</option>
              <option value="exp-desc">Experience: High to Low</option>
              <option value="exp-asc">Experience: Low to High</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#1D58D8] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#1D58D8] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN LAYOUT: EXPERTS GRID + SIDEBAR */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left 9 Cols: Expert Cards */}
        <div className="lg:col-span-9">
          {filteredExperts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No experts found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria, clearing filters, or browsing other sectors.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#1D58D8] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredExperts.map((exp) => {
                const avatar = exp.avatar || fallbackAvatars[exp.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';
                const isBookmarked = savedBookmarks[exp.id];

                return (
                  <div
                    key={exp.id}
                    className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-3 sm:space-y-4"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {/* Top Row: Available Status Badge + Bookmark */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Available
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(exp.id, e)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isBookmarked ? 'text-[#1D58D8] bg-blue-50' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-50'
                          }`}
                          title="Bookmark Expert"
                        >
                          <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      {/* Avatar + Name + Designation + Org */}
                      <div className="flex items-center gap-3.5">
                        <img
                          src={avatar}
                          alt={exp.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-2xs shrink-0 ring-2 ring-slate-50"
                        />
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-[15px] leading-snug group-hover:text-[#1D58D8] transition-colors">
                            {exp.name}
                          </h3>
                          <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                            {exp.designation}
                          </div>
                          <div className="text-xs text-[#1D58D8] font-bold mt-0.5">
                            {exp.organization}
                          </div>
                        </div>
                      </div>

                      {/* Metadata Row: Experience • Location • Industry */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 border-y border-slate-100 py-2.5">
                        <span className="font-medium text-slate-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {exp.experience} Years Exp.
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {exp.location}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700 truncate">{exp.industry}</span>
                      </div>

                      {/* Expertise Section */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Expertise
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(exp.expertise || []).slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] bg-blue-50 text-[#1D58D8] font-semibold px-2.5 py-1 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                          {(exp.expertise || []).length > 3 && (
                            <span className="text-[11px] bg-slate-100 text-slate-500 font-medium px-2 py-1 rounded-lg">
                              +{(exp.expertise || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Services Section */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Services
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(exp.servicesOffered || []).slice(0, 3).map((srv) => (
                            <span
                              key={srv}
                              className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg"
                            >
                              {srv}
                            </span>
                          ))}
                          {(exp.servicesOffered || []).length > 3 && (
                            <span className="text-[11px] bg-slate-100 text-slate-500 font-medium px-2 py-1 rounded-lg">
                              +{(exp.servicesOffered || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Profile Action */}
                    <div className="pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleViewProfile(exp)}
                        className="w-full py-2.5 border border-[#1D58D8]/30 hover:border-[#1D58D8] text-[#1D58D8] hover:bg-[#1D58D8] hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer group"
                      >
                        {!isAuthenticated && <Lock className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />}
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 3 Cols: Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sidebar Card 1: Refine Your Search */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Refine Your Search
            </h3>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Popular Industries
              </div>
              <div className="space-y-1.5">
                {popularIndustries.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedIndustry(item.name === selectedIndustry ? '' : item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      selectedIndustry === item.name
                        ? 'bg-blue-50 text-[#1D58D8] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedIndustry('')}
                className="text-xs font-bold text-[#1D58D8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Sidebar Card 2: Can't find the right expert? */}
          <div className="bg-[#0F172A] text-white rounded-3xl p-6 space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <h4 className="text-base font-extrabold tracking-tight">
                Can't find the right expert?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tell us your requirements and we'll help connect your department with verified specialists.
              </p>
            </div>

            <Link
              to="/contact"
              className="block w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs text-center rounded-xl shadow-xs transition-colors relative z-10 cursor-pointer"
            >
              Request an Expert
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM TRUST BAR */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Verified Professionals</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                All profiles are reviewed for quality and authenticity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Diverse Expertise</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Experts from multiple industries, sectors and domains.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Direct Engagement</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Connect directly and discuss customized requirements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D58D8] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Secure & Private</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Your institutional data and dialogues remain protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. REGISTRATION REQUIRED MODAL (Auth Gate) */}
      {/* ========================================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-5">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D58D8] flex items-center justify-center mx-auto border border-blue-100 shadow-2xs">
                <Lock className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                Registration Required
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Full expert profiles, contact details, and booking enquiries are reserved for registered educational institutions.
              </p>
            </div>

            {selectedExpert && (
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3 text-left">
                <img
                  src={selectedExpert.avatar || fallbackAvatars[selectedExpert.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'}
                  alt={selectedExpert.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{selectedExpert.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{selectedExpert.designation}</div>
                  <div className="text-[10px] text-[#1D58D8] font-semibold">{selectedExpert.organization}</div>
                </div>
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <Link
                to="/register/institution"
                className="w-full py-3 bg-[#1D58D8] hover:bg-[#1546B8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4" /> Register as Institution
              </Link>
              <Link
                to="/login"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center transition-colors"
              >
                Already registered? Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
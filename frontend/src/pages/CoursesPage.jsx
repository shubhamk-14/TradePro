import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  GraduationCap, Star, Clock, BookOpen, ShieldCheck, CheckCircle2, 
  Play, X, ChevronDown, ChevronUp, UserCheck, Award, Lock, Sparkles 
} from 'lucide-react';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLessonModal, setActiveLessonModal] = useState(null);
  const [expandedModule, setExpandedModule] = useState(0);

  const stylishMalePhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";

  useEffect(() => {
    axios.get('/api/courses').then(res => setCourses(res.data)).catch(() => {});
  }, []);

  const categories = [
    { id: 'all', label: 'All Masterclasses' },
    { id: 'SMC Trading', label: 'Smart Money Concepts' },
    { id: 'Options Trading', label: 'Options Scalping' },
    { id: 'Risk Management', label: 'Risk & Psychology' },
  ];

  const filteredCourses = courses.filter(c => activeCategory === 'all' || c.category === activeCategory);

  const sampleCurriculum = [
    {
      moduleTitle: "Module 1: Foundations of Smart Money Structure",
      lessons: [
        { title: "Lesson 1.1: Break of Structure (BOS) vs Change of Character (CHoCH)", duration: "18 mins", free: true },
        { title: "Lesson 1.2: Identifying High-Probability Liquidity Sweeps (BSL & SSL)", duration: "24 mins", free: true },
        { title: "Lesson 1.3: Mapping Premium vs Discount Pricing Zones", duration: "20 mins", free: false },
      ]
    },
    {
      moduleTitle: "Module 2: Order Block & Fair Value Gap (FVG) Playbooks",
      lessons: [
        { title: "Lesson 2.1: Validating Bullish & Bearish Order Blocks", duration: "30 mins", free: false },
        { title: "Lesson 2.2: Fair Value Gap (FVG) Imbalance Retest Strategy", duration: "25 mins", free: false },
        { title: "Lesson 2.3: Multi-Timeframe Alignment (HTF to LTF Execution)", duration: "35 mins", free: false },
      ]
    },
    {
      moduleTitle: "Module 3: Intra-Day Options Delta Scalping",
      lessons: [
        { title: "Lesson 3.1: VWAP Delta Volume Profile Crossovers", duration: "22 mins", free: false },
        { title: "Lesson 3.2: Managing Position Size & Max Drawdown Limits", duration: "15 mins", free: false },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>INSTITUTIONAL TRADING ACADEMY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">Structured Courses & Video Masterclasses</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Master Smart Money Concepts, Order Block execution, and Options Scalping with video masterclasses designed by Founder Shubham.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3D Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="p-8 rounded-3xl glass-3d-card-light card-3d-tilt flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase">
                  {c.category || 'SMC Masterclass'}
                </span>
                <span className="flex items-center text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  {c.rating || 4.9} / 5.0 Rating
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.short_description || c.description}</p>

              {/* Course Specs */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Duration</span>
                  <span className="font-bold text-slate-900">{c.duration || '12 Hours'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Modules</span>
                  <span className="font-bold text-slate-900">{c.modules_count || 8} Modules</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Instructor</span>
                  <span className="font-bold text-emerald-600">{c.instructor || 'Shubham'}</span>
                </div>
              </div>
            </div>

            {/* Actions & Pricing */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block font-bold">Lifetime Access Fee</span>
                <span className="text-2xl font-black text-slate-900 font-mono">₹{c.price ? c.price.toLocaleString() : '4,999'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedCourse(c)}
                  className="px-4 py-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-xs border border-slate-200 transition-all"
                >
                  View Curriculum
                </button>

                <button
                  onClick={() => setActiveLessonModal({ title: c.title, lessonName: "Lesson 1.1: Demo Preview" })}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Course</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructor Spotlight Card */}
      <div className="p-8 rounded-3xl glass-3d-card-light border border-emerald-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-3 flex justify-center">
          <img
            src={stylishMalePhoto}
            alt="Shubham Instructor"
            className="w-36 h-36 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg"
          />
        </div>

        <div className="md:col-span-9 space-y-2">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Masterclass Author & Lead Instructor</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">Learn Direct from Founder Shubham</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every module is crafted with step-by-step chart examples, live Nifty & Bank Nifty order book breakdowns, and risk management blueprints refined over 8+ years of active market trading.
          </p>
        </div>
      </div>

      {/* Curriculum Detail Drawer / Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase">
                Detailed Course Syllabus
              </span>
              <h3 className="text-2xl font-black text-slate-900">{selectedCourse.title}</h3>
              <p className="text-xs text-slate-600">{selectedCourse.description}</p>

              {/* Module Accordion */}
              <div className="space-y-3 pt-2">
                {sampleCurriculum.map((mod, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-slate-900 hover:bg-slate-100"
                    >
                      <span>{mod.moduleTitle}</span>
                      {expandedModule === idx ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {expandedModule === idx && (
                      <div className="p-4 pt-0 space-y-2 border-t border-slate-200 bg-white">
                        {mod.lessons.map((les, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs">
                            <div className="flex items-center space-x-2">
                              {les.free ? <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                              <span className="font-semibold text-slate-800">{les.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setActiveLessonModal({ title: selectedCourse.title, lessonName: "Lesson 1.1: Demo Preview" });
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Video Masterclass Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal Demo */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-3xl shadow-2xl p-6 relative overflow-hidden">
            <button
              onClick={() => setActiveLessonModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">Interactive Video Masterclass Demo</span>
                <h3 className="text-lg font-black text-slate-900">{activeLessonModal.title} - {activeLessonModal.lessonName}</h3>
              </div>

              {/* HTML5 Embedded Video Player Frame */}
              <div className="relative w-full aspect-video rounded-2xl bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="Video Lesson Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Instructor: Shubham</span>
                <span className="text-emerald-600 font-bold">✓ Full HD 1080p Stream</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CoursesPage;

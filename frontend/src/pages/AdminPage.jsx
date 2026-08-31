import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, BookOpen, GraduationCap, Mail, BarChart2, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Form State for creating new Blog
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Indian Market');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogSuccess, setBlogSuccess] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      axios.get('/api/admin/stats').then(res => setStats(res.data)).catch(() => {});
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 bg-[#F8FAFC]">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-md mx-auto space-y-4">
          <Shield className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Admin Privileges Required</h2>
          <p className="text-xs text-slate-600">Please sign in as admin (<span className="font-mono font-bold text-slate-900">admin@tradivora.com</span>) to access the management portal.</p>
        </div>
      </div>
    );
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const slug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await axios.post('/api/blogs', {
        title: blogTitle,
        slug,
        category: blogCategory,
        excerpt: blogExcerpt,
        content: blogContent,
        author: user.full_name
      });
      setBlogSuccess(true);
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogContent('');
      setTimeout(() => setBlogSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-amber-500" />
            Tradivora Admin Control Portal
          </h1>
          <p className="text-xs text-slate-600 mt-1">Platform management, content creation, analytics, and contact submissions.</p>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 perspective-1000">
        <div className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Registered Users</span>
          <div className="text-3xl font-black font-mono text-slate-900">{stats?.users_count || 2} Users</div>
        </div>

        <div className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Published Articles</span>
          <div className="text-3xl font-black font-mono text-emerald-600">{stats?.blogs_count || 3} Blogs</div>
        </div>

        <div className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Active Courses</span>
          <div className="text-3xl font-black font-mono text-slate-900">{stats?.courses_count || 3} Courses</div>
        </div>

        <div className="p-6 rounded-3xl glass-3d-card-light card-3d-tilt space-y-1">
          <span className="text-[11px] text-slate-500 uppercase font-mono font-bold">Inquiries Received</span>
          <div className="text-3xl font-black font-mono text-amber-600">{stats?.messages_count || 0} Messages</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {['overview', 'create_blog'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
              activeTab === tab
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="p-8 rounded-3xl glass-3d-card-light space-y-4">
          <h3 className="text-lg font-black text-slate-900">Platform Control Status</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All system services are operational. You are logged in with full Administrative Rights (<strong className="text-slate-900">{user.email}</strong>).
          </p>
        </div>
      )}

      {/* Tab 2: Create Blog */}
      {activeTab === 'create_blog' && (
        <div className="p-8 rounded-3xl glass-3d-card-light space-y-6">
          <h3 className="text-lg font-black text-slate-900">Publish New Market Analysis Article</h3>

          {blogSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <span>Article published successfully to Tradivora Blog!</span>
            </div>
          )}

          <form onSubmit={handleCreateBlog} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Article Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Bank Nifty 15m Liquidity Breakdown"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Category</label>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="SMC Strategy">SMC Strategy</option>
                <option value="Options Trading">Options Trading</option>
                <option value="Macro Economy">Macro Economy</option>
                <option value="Psychology">Trading Psychology</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Short Excerpt</label>
              <input
                type="text"
                required
                placeholder="Brief summary for article cards..."
                value={blogExcerpt}
                onChange={(e) => setBlogExcerpt(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Content</label>
              <textarea
                rows="6"
                required
                placeholder="Write full article body here..."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-all"
            >
              Publish Article Now
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminPage;

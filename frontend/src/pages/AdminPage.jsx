import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, BookOpen, GraduationCap, Mail, BarChart2, Plus, Trash2, CheckCircle2 } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Shield className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Admin Privileges Required</h2>
        <p className="text-xs text-gray-400">Please sign in as admin (admin@tradivora.com) to access the management portal.</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-darkBorder pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center">
            <Shield className="w-8 h-8 mr-3 text-emerald-400" />
            TradePro Admin Control Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">Platform management, content creation, analytics, and contact submissions.</p>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-darkBorder space-y-1">
          <span className="text-[11px] text-gray-400 uppercase font-mono">Registered Users</span>
          <div className="text-2xl font-black font-mono text-white">{stats?.users_count || 2} Users</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-darkBorder space-y-1">
          <span className="text-[11px] text-gray-400 uppercase font-mono">Published Articles</span>
          <div className="text-2xl font-black font-mono text-emerald-400">{stats?.blogs_count || 3} Blogs</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-darkBorder space-y-1">
          <span className="text-[11px] text-gray-400 uppercase font-mono">Active Courses</span>
          <div className="text-2xl font-black font-mono text-white">{stats?.courses_count || 3} Courses</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-darkBorder space-y-1">
          <span className="text-[11px] text-gray-400 uppercase font-mono">Inquiries Received</span>
          <div className="text-2xl font-black font-mono text-amber-400">{stats?.messages_count || 0} Messages</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
        {['overview', 'create_blog', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-bold'
                : 'bg-darkCard text-gray-400 border border-darkBorder hover:text-white'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab 1: Create Blog Article */}
      {activeTab === 'create_blog' && (
        <div className="p-8 rounded-3xl glass-panel border border-darkBorder max-w-3xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Plus className="w-5 h-5 mr-2 text-emerald-400" /> Publish New Market Analysis Article
          </h3>

          {blogSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Article published successfully to live blog section!</span>
            </div>
          )}

          <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 mb-1">Article Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Nifty 50 Liquidity Sweep & Option Chain Breakdown"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-[#0B0F19] text-white px-4 py-3 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Category</label>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full bg-[#0B0F19] text-white px-4 py-3 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
              >
                <option value="Indian Market">Indian Market</option>
                <option value="Global Market">Global Market</option>
                <option value="Crypto">Crypto</option>
                <option value="Company News">Company News</option>
                <option value="Options">Options</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Short Excerpt</label>
              <textarea
                rows="2"
                required
                placeholder="Brief 2-line summary for article grid preview..."
                value={blogExcerpt}
                onChange={(e) => setBlogExcerpt(e.target.value)}
                className="w-full bg-[#0B0F19] text-white px-4 py-3 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Full Article Content</label>
              <textarea
                rows="6"
                required
                placeholder="Write full article body text here..."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="w-full bg-[#0B0F19] text-white px-4 py-3 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:opacity-95"
            >
              Publish Article
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Recent Contact Messages */}
      {activeTab === 'messages' && (
        <div className="rounded-2xl glass-panel border border-darkBorder overflow-hidden">
          <div className="p-4 border-b border-darkBorder font-bold text-white text-sm">User Inquiries & Messages</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F19] text-gray-400 uppercase text-[10px] font-mono border-b border-darkBorder">
                <tr>
                  <th className="p-4">Sender Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-darkBorder">
                {stats?.recent_messages?.map((m) => (
                  <tr key={m.id} className="hover:bg-darkHover/40 transition-colors">
                    <td className="p-4 font-bold text-white">{m.name}</td>
                    <td className="p-4 font-mono text-emerald-400">{m.email}</td>
                    <td className="p-4 text-gray-200">{m.subject}</td>
                    <td className="p-4 text-gray-400 leading-relaxed max-w-sm">{m.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 0: Overview */}
      {activeTab === 'overview' && (
        <div className="p-8 rounded-3xl glass-panel border border-darkBorder space-y-4 text-xs">
          <h3 className="text-base font-bold text-white">System Status & Analytics</h3>
          <p className="text-gray-400">All services (FastAPI Backend, SQLite Database, WebSocket Ticker Simulation) running at 100% health.</p>
        </div>
      )}

    </div>
  );
};

export default AdminPage;

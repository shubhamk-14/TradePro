import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Search, Clock, Tag, Share2, MessageSquare, User, Send, Check } from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBlog, setActiveBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'Siddharth M.', text: 'Outstanding explanation of liquidity sweeps before market open!', time: '2 hours ago' },
    { id: 2, name: 'Priya Verma', text: 'Order block mitigation timing is crystal clear now.', time: '5 hours ago' }
  ]);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Indian Market', 'Global Market', 'Crypto', 'Company News', 'Options', 'Risk Management'];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs', {
        params: { category: selectedCategory, search: searchTerm }
      });
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), name: 'You (Trader)', text: commentInput, time: 'Just now' }
      ]);
      setCommentInput('');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-darkBorder pb-6">
        <h1 className="text-3xl font-black text-white flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-emerald-400" />
          TradePro Market Blog & Research
        </h1>
        <p className="text-xs text-gray-400 mt-1">Deep dives into market structure, quantitative models, and trading psychology.</p>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-darkCard text-gray-400 border border-darkBorder hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search blogs or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-darkCard text-xs text-white placeholder-gray-500 pl-9 pr-4 py-2.5 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="rounded-2xl glass-panel border border-darkBorder overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {blog.category}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-emerald-400" /> {blog.read_time}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{blog.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{blog.excerpt}</p>

                {blog.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {blog.tags.split(',').map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-darkCard text-gray-400 border border-darkBorder">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveBlog(blog)}
                className="w-full py-2.5 rounded-xl bg-darkCard text-emerald-400 font-bold text-xs border border-darkBorder hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
              >
                Read Full Article →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#131A2A] border border-darkBorder w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-darkBorder pb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">
                {activeBlog.category}
              </span>
              <button onClick={() => setActiveBlog(null)} className="px-3 py-1 rounded-lg bg-darkCard text-gray-400 hover:text-white text-xs">
                Close Article ✕
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">{activeBlog.title}</h2>

            <div className="flex items-center justify-between text-xs text-gray-400 border-y border-darkBorder/60 py-3">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1.5 text-emerald-400" /> By {activeBlog.author}
              </span>
              <div className="flex items-center space-x-4">
                <span>{activeBlog.read_time}</span>
                <button onClick={handleShare} className="text-emerald-400 flex items-center hover:underline">
                  {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Share2 className="w-3.5 h-3.5 mr-1" />}
                  {copied ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>

            <img src={activeBlog.image_url} alt={activeBlog.title} className="w-full h-64 object-cover rounded-2xl" />

            <div className="text-sm text-gray-300 space-y-4 leading-relaxed font-sans">
              <p>{activeBlog.content}</p>
              <p>
                In trading, timing is the ultimate differentiator between institutional order flow execution and retail stop outs. Always wait for displacement before claiming an Order Block is active.
              </p>
            </div>

            {/* Comments Section */}
            <div className="pt-6 border-t border-darkBorder space-y-4">
              <h4 className="text-base font-bold text-white flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" /> Comments & Trader Discussion ({comments.length})
              </h4>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Share your technical analysis or thoughts..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 bg-[#0B0F19] text-xs text-white placeholder-gray-500 px-4 py-2.5 rounded-xl border border-darkBorder focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="px-4 py-2.5 bg-emerald-500 text-white font-bold text-xs rounded-xl hover:opacity-90">
                  Post
                </button>
              </form>

              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-[#0B0F19] border border-darkBorder text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-300 font-semibold">
                      <span>{c.name}</span>
                      <span className="text-[10px] text-gray-500">{c.time}</span>
                    </div>
                    <p className="text-gray-400">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default BlogPage;

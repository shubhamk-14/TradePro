import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, MessageSquare, ThumbsUp, Send, Vote, Plus, MessageCircle } from 'lucide-react';

const CommunityPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pollVotes, setPollVotes] = useState({ bull: 68, bear: 32 });
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/community/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to join community discussions.');
    try {
      await axios.post('/api/community/posts', { title, content, category: 'General' });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleVote = (type) => {
    if (!voted) {
      setPollVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setVoted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 flex items-center">
          <Users className="w-8 h-8 mr-3 text-emerald-600" />
          Trader Community & Discussion Forum
        </h1>
        <p className="text-xs text-slate-600 mt-1">Connect with active market analysts, discuss trade ideas, and participate in daily sentiment polls.</p>
      </div>

      {/* Grid: Main Forum Posts (8 Cols) + Sentiment Poll & Live Chat (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Forum Posts (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Create Post Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <Plus className="w-4 h-4 mr-1.5 text-emerald-600" /> Start Discussion Topic
            </h3>
            <form onSubmit={handleCreatePost} className="space-y-3 text-xs font-medium">
              <input
                type="text"
                required
                placeholder="Topic Title (e.g. Bank Nifty 15m Liquidity Setup)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <textarea
                rows="3"
                required
                placeholder="Describe your trade thesis, chart levels, or question..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-md hover:opacity-95"
              >
                Post Discussion Topic
              </button>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-emerald-500 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-xs">{p.author_name || 'Trader'}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {p.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{p.created_at || 'Just now'}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.content}</p>

                <div className="flex items-center space-x-4 pt-2 text-xs font-semibold text-slate-500 border-t border-slate-100">
                  <button className="flex items-center space-x-1 hover:text-emerald-600">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{p.upvotes || 14} Upvotes</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-emerald-600">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{p.comment_count || 5} Comments</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar Poll (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <Vote className="w-4 h-4 mr-2 text-emerald-600" /> Daily Nifty Sentiment Poll
            </h3>
            <p className="text-xs text-slate-600">What is your outlook for Nifty 50 on today's session?</p>

            <div className="space-y-3 text-xs font-bold">
              <button
                onClick={() => handleVote('bull')}
                className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between hover:bg-emerald-100 transition-all"
              >
                <span>Bullish (Expect Rally)</span>
                <span className="font-mono">{pollVotes.bull}%</span>
              </button>

              <button
                onClick={() => handleVote('bear')}
                className="w-full p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between hover:bg-rose-100 transition-all"
              >
                <span>Bearish (Expect Fall)</span>
                <span className="font-mono">{pollVotes.bear}%</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CommunityPage;

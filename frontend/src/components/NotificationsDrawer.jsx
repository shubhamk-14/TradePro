import React from 'react';
import { X, Bell, TrendingUp, AlertTriangle, BookOpen, Check } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Market Alert: Nifty 50 Sweeps 22,500 Liquidity",
    desc: "Nifty index breached 22,510 high with strong institutional buying.",
    time: "10m ago",
    type: "market"
  },
  {
    id: 2,
    title: "RBI Policy Announcement Complete",
    desc: "Repo rate remains at 6.50%. Financial indices stabilizing.",
    time: "45m ago",
    type: "news"
  },
  {
    id: 3,
    title: "New Course Module Published!",
    desc: "Lesson 3 on Fair Value Gap (FVG) Refinement is now available in SMC Masterclass.",
    time: "2h ago",
    type: "course"
  }
];

const NotificationsDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#131A2A] border-l border-darkBorder shadow-2xl p-5 flex flex-col">
          
          <div className="flex items-center justify-between pb-4 border-b border-darkBorder mb-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Notifications</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-darkHover">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="p-3 rounded-xl bg-[#0B0F19] border border-darkBorder hover:border-emerald-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-xs text-gray-200">{n.title}</span>
                  <span className="text-[10px] text-gray-500">{n.time}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-snug">{n.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="mt-4 w-full py-2 bg-darkCard text-xs font-semibold text-gray-300 hover:text-white rounded-xl border border-darkBorder">
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDrawer;

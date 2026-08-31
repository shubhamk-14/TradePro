import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Flag, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/calendar').then(res => setEvents(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-emerald-600" />
          Global Economic Calendar & Earnings Timeline
        </h1>
        <p className="text-xs text-slate-600 mt-1">Track upcoming RBI policy decisions, US Fed interest rates, CPI inflation releases & earnings reports.</p>
      </div>

      {/* Events Timeline Table */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 font-bold text-slate-900 text-sm bg-slate-50">
          Upcoming Macro Economic Events
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-mono border-b border-slate-200">
              <tr>
                <th className="p-4">Event Date & Time</th>
                <th className="p-4">Country</th>
                <th className="p-4">Macro Event Title</th>
                <th className="p-4">Impact Rating</th>
                <th className="p-4">Actual</th>
                <th className="p-4">Forecast</th>
                <th className="p-4">Previous</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-700 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> {evt.event_date}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {evt.country === 'IN' ? '🇮🇳 India' : '🇺🇸 United States'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 text-sm">{evt.event_title}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      evt.impact === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {evt.impact} IMPACT
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900">{evt.actual || '-'}</td>
                  <td className="p-4 font-mono text-slate-600 font-medium">{evt.forecast || '-'}</td>
                  <td className="p-4 font-mono text-slate-500">{evt.previous || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CalendarPage;

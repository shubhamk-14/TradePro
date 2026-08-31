import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Linkedin, Globe, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', { name, email, subject, message });
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to submit message:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900">Get in Touch with TradePro Desk</h1>
        <p className="text-xs text-slate-600 mt-1">Have questions about courses, premium membership, or institutional strategy advisory? Reach out to us directly.</p>
      </div>

      {/* Grid: Contact Form (7 Cols) + Quick Channels (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-xl font-black text-slate-900">Send Us a Direct Message</h2>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <span>Thank you! Your message has been transmitted to Shubham and our analyst desk.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Subject</label>
              <input
                type="text"
                required
                placeholder="Course Enrollment / Institutional Query"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Message Detail</label>
              <textarea
                rows="4"
                required
                placeholder="Write your message details here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>Submit Inquiry</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Communication Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-900">Direct Support Channels</h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Official Support Email</span>
                  <a href="mailto:support@tradivora.com" className="text-emerald-600 hover:underline">support@tradivora.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Desk Phone & WhatsApp</span>
                  <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                    +91 00000 00000
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Head Office Location</span>
                  <span className="text-slate-600">Financial District, Mumbai / Delhi NCR, India</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Chat Button */}
            <a
              href="https://wa.me/910000000000?text=Hi%20Shubham,%20I%20have%20a%20query%20regarding%20TradePro"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Support (+91 00000 00000)</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactPage;

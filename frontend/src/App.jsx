import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TickerTape from './components/TickerTape';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LiveMarketsPage from './pages/LiveMarketsPage';
import LiveChartsPage from './pages/LiveChartsPage';
import MarketNewsPage from './pages/MarketNewsPage';
import StrategiesPage from './pages/StrategiesPage';
import BlogPage from './pages/BlogPage';
import CoursesPage from './pages/CoursesPage';
import WatchlistPage from './pages/WatchlistPage';
import PortfolioPage from './pages/PortfolioPage';
import JournalPage from './pages/JournalPage';
import CalculatorsPage from './pages/CalculatorsPage';
import CalendarPage from './pages/CalendarPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import OptionChainPage from './pages/OptionChainPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans relative">
        <TickerTape />
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/markets" element={<LiveMarketsPage />} />
            <Route path="/charts" element={<LiveChartsPage />} />
            <Route path="/news" element={<MarketNewsPage />} />
            <Route path="/strategies" element={<StrategiesPage />} />
            <Route path="/option-chain" element={<OptionChainPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

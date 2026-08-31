import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MarketContext = createContext();

const initialFallbackMarkets = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', asset_class: 'index', price: 24550.80, change: 142.30, percent_change: 0.58, high: 24610, low: 24420, volume: '450M', market_status: 'OPEN' },
  { symbol: 'BANKNIFTY', name: 'Nifty Bank Index', asset_class: 'index', price: 52410.50, change: -180.20, percent_change: -0.34, high: 52700, low: 52300, volume: '280M', market_status: 'OPEN' },
  { symbol: 'BSE:SENSEX', name: 'BSE Sensex Index', asset_class: 'index', price: 80620.40, change: 390.10, percent_change: 0.49, high: 80800, low: 80200, volume: '320M', market_status: 'OPEN' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', asset_class: 'stock', price: 2980.40, change: 35.60, percent_change: 1.21, high: 2995, low: 2940, volume: '4.8M', market_status: 'OPEN' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', asset_class: 'stock', price: 4210.00, change: -15.40, percent_change: -0.36, high: 4240, low: 4190, volume: '2.1M', market_status: 'OPEN' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', asset_class: 'stock', price: 1645.20, change: 18.30, percent_change: 1.12, high: 1655, low: 1625, volume: '8.4M', market_status: 'OPEN' },
  { symbol: 'INFY', name: 'Infosys Limited', asset_class: 'stock', price: 1840.50, change: 22.10, percent_change: 1.22, high: 1855, low: 1820, volume: '5.2M', market_status: 'OPEN' },
  { symbol: 'BTC/USD', name: 'Bitcoin Spot', asset_class: 'crypto', price: 67840.00, change: 1450.00, percent_change: 2.18, high: 68200, low: 66100, volume: '28.4B', market_status: 'OPEN' },
  { symbol: 'ETH/USD', name: 'Ethereum Spot', asset_class: 'crypto', price: 3520.40, change: 84.20, percent_change: 2.45, high: 3560, low: 3410, volume: '14.2B', market_status: 'OPEN' },
  { symbol: 'GOLD', name: 'Gold Futures (MCX)', asset_class: 'commodity', price: 72450.00, change: 320.00, percent_change: 0.44, high: 72600, low: 72100, volume: '180K', market_status: 'OPEN' },
  { symbol: 'SILVER', name: 'Silver Futures (MCX)', asset_class: 'commodity', price: 88900.00, change: 750.00, percent_change: 0.85, high: 89400, low: 88100, volume: '95K', market_status: 'OPEN' },
  { symbol: 'EUR/INR', name: 'Euro / Indian Rupee', asset_class: 'forex', price: 90.85, change: 0.14, percent_change: 0.15, high: 91.10, low: 90.60, volume: '450K', market_status: 'OPEN' },
];

export const MarketProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(initialFallbackMarkets);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchMarkets = async () => {
    try {
      const res = await axios.get('/api/markets');
      if (res.data && res.data.length > 0) {
        setMarketData(res.data);
      }
    } catch (err) {
      console.warn('Backend market API unavailable, serving live simulated assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(() => {
      // Simulate minor real-time tick price fluctuations
      setMarketData(prev => prev.map(asset => {
        const delta = (Math.random() * 0.4 - 0.2);
        const newPrice = Number((asset.price * (1 + delta / 100)).toFixed(2));
        return {
          ...asset,
          price: newPrice
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={{ marketData, activeCategory, setActiveCategory, loading, fetchMarkets }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);

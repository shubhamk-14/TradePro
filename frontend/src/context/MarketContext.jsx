import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarkets = async () => {
    try {
      const res = await axios.get('/api/markets');
      setMarketData(res.data);
    } catch (err) {
      console.error('Failed to fetch market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 8000); // Polling every 8 seconds for dynamic market updates
    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={{ marketData, loading, fetchMarkets }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);

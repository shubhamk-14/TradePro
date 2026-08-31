import React, { useEffect, useRef } from 'react';

const TradingViewChart = ({ symbol = "BSE:SENSEX", interval = "D", height = "550px" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": interval,
      "timezone": "Asia/Kolkata",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    containerRef.current.appendChild(script);
  }, [symbol, interval]);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden border border-darkBorder bg-[#0B0F19]" style={{ height }}>
      <div ref={containerRef} className="h-full w-full"></div>
    </div>
  );
};

export default TradingViewChart;

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    markets: 'Live Markets',
    charts: 'Workstation',
    news: 'News Wire',
    strategies: 'SMC Playbook',
    optionChain: 'Option Chain',
    courses: 'Courses',
    watchlist: 'Watchlist',
    portfolio: 'Portfolio',
    journal: 'Trading Journal',
    calculators: 'Calculators',
    calendar: 'Calendar',
    community: 'Community',
    about: 'About Founder',
    contact: 'Contact',
    signIn: 'Sign In',
    launchWorkstation: 'Launch Live Workstation',
    exploreSMC: 'Explore SMC Playbooks',
    heroTitle: 'Master Markets with Institutional Precision',
    heroDesc: 'TradePro (Tradivora) is an authentic market terminal engineered for serious option buyers, SMC scalpers, and swing traders.',
    handcraftedBy: 'Handcrafted by Shubham',
  },
  hi: {
    home: 'होम',
    markets: 'लाइव मार्केट',
    charts: 'वर्कस्टेशन',
    news: 'न्यूज़ समाचार',
    strategies: 'SMC स्ट्रेटेजी',
    optionChain: 'ऑप्शन चेन Matrix',
    courses: 'कोर्सेज',
    watchlist: 'वॉचलिस्ट',
    portfolio: 'पोर्टफोलियो',
    journal: 'ट्रेडिंग जर्नल',
    calculators: 'कैलकुलेटर',
    calendar: 'कैलेंडर',
    community: 'कम्युनिटी',
    about: 'संस्थापक (शुभम)',
    contact: 'संपर्क करें',
    signIn: 'साइन इन',
    launchWorkstation: 'लाइव टर्मिनल शुरू करें',
    exploreSMC: 'SMC स्ट्रेटेजी देखें',
    heroTitle: 'सटीक मार्केट एनालिसिस और SMC ट्रेडिंग',
    heroDesc: 'ट्रेड प्रो (Tradivora) भारतीय और वैश्विक ट्रेडर्स के लिए बनाया गया लाइव मार्केट टर्मिनल है।',
    handcraftedBy: 'शुभम द्वारा निर्मित',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

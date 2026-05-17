import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const DEFAULT_PRESETS = [
  { id: 'p1', title: 'Coffee', baseAmount: 15000, icon: '☕' },
  { id: 'p2', title: 'Snack', baseAmount: 5000, icon: '🍪' },
  { id: 'p3', title: 'Transport', baseAmount: 12000, icon: '🚗' },
  { id: 'p4', title: 'Shopping', baseAmount: 50000, icon: '🛒' }
];

export const AppProvider = ({ children }) => {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('ls_budget');
    return saved ? parseInt(saved, 10) : null;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ls_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [presets, setPresets] = useState(() => {
    const saved = localStorage.getItem('ls_presets');
    return saved ? JSON.parse(saved) : DEFAULT_PRESETS;
  });

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (budget !== null) localStorage.setItem('ls_budget', budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('ls_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ls_presets', JSON.stringify(presets));
  }, [presets]);

  const addTransaction = (amount, title, quantity = 1) => {
    const newTx = {
      id: uuidv4(),
      amount,
      title,
      quantity,
      timestamp: Date.now()
    };
    setTransactions([newTx, ...transactions]);
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      budget, setBudget,
      transactions, addTransaction, removeTransaction,
      presets, setPresets,
      activeTab, setActiveTab
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

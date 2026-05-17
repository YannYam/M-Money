import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import BudgetSetup from './components/home/BudgetSetup';
import SafeToSpend from './components/home/SafeToSpend';
import QuickTapGrid from './components/home/QuickTapGrid';
import SmartInput from './components/home/SmartInput';
import TransactionList from './components/shared/TransactionList';
import DailyStats from './components/stats/DailyStats';
import MonthlyStats from './components/stats/MonthlyStats';
import Settings from './components/settings/Settings';
import Layout from './components/layout/Layout';

import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
};

const MainView = () => {
  const { budget, activeTab, transactions, removeTransaction } = useAppContext();

  if (!budget) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="budget" initial="initial" animate="animate" exit="exit" variants={pageVariants}>
          <BudgetSetup />
        </motion.div>
      </AnimatePresence>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyStats />;
      case 'monthly':
        return <MonthlyStats />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="pb-6">
            <SafeToSpend />
            <SmartInput />
            <QuickTapGrid />
            <div className="mt-2">
              <div className="px-6 py-2 text-sm font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                Recent Hops
              </div>
              <TransactionList 
                transactions={transactions} 
                onUndo={removeTransaction}
                limit={5}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainView />
    </AppProvider>
  );
}

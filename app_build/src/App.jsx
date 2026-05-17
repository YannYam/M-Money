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

const MainView = () => {
  const { budget, activeTab, transactions, removeTransaction } = useAppContext();

  if (!budget) {
    return <BudgetSetup />;
  }

  if (activeTab === 'daily') {
    return (
      <Layout>
        <DailyStats />
      </Layout>
    );
  }

  if (activeTab === 'monthly') {
    return (
      <Layout>
        <MonthlyStats />
      </Layout>
    );
  }

  if (activeTab === 'settings') {
    return (
      <Layout>
        <Settings />
      </Layout>
    );
  }

  return (
    <Layout>
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

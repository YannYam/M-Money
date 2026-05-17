import React from 'react';
import { useAppContext } from '../../context/AppContext';
import TransactionList from '../shared/TransactionList';
import { formatCurrency } from '../../utils/helpers';
import { getYear, getMonth, getDaysInMonth, isThisMonth } from 'date-fns';

export default function MonthlyStats() {
  const { transactions } = useAppContext();

  // Group by month
  const grouped = transactions.reduce((acc, tx) => {
    const d = new Date(tx.timestamp);
    const key = `${getYear(d)}-${getMonth(d)}`;
    if (!acc[key]) acc[key] = { date: d, total: 0, txs: [] };
    acc[key].total += (tx.amount * (tx.quantity || 1));
    acc[key].txs.push(tx);
    return acc;
  }, {});

  const months = Object.values(grouped).sort((a, b) => b.date - a.date);
  const thisMonthGroup = months.find(m => isThisMonth(m.date)) || { total: 0, txs: [], date: new Date() };

  const daysInMonth = getDaysInMonth(thisMonthGroup.date);
  const currentDay = isThisMonth(thisMonthGroup.date) ? new Date().getDate() : daysInMonth;
  const dailyAverage = thisMonthGroup.total / currentDay;

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-2">This Month</h2>
        <div className="text-4xl font-black">{formatCurrency(thisMonthGroup.total)}</div>
        
        <div className="mt-6 flex justify-center gap-8">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Daily Avg</div>
            <div className="font-semibold">{formatCurrency(dailyAverage)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Transactions</div>
            <div className="font-semibold">{thisMonthGroup.txs.length}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="px-6 py-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
          All Month Activity
        </div>
        <TransactionList transactions={thisMonthGroup.txs} />
      </div>
    </div>
  );
}

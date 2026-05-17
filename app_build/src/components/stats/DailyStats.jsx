import React from 'react';
import { useAppContext } from '../../context/AppContext';
import TransactionList from '../shared/TransactionList';
import { formatCurrency } from '../../utils/helpers';
import { isToday, getYear, getMonth, getDate } from 'date-fns';

export default function DailyStats() {
  const { transactions } = useAppContext();

  // Group by day
  const grouped = transactions.reduce((acc, tx) => {
    const d = new Date(tx.timestamp);
    const key = `${getYear(d)}-${getMonth(d)}-${getDate(d)}`;
    if (!acc[key]) acc[key] = { date: d, total: 0, txs: [] };
    acc[key].total += (tx.amount * (tx.quantity || 1));
    acc[key].txs.push(tx);
    return acc;
  }, {});

  const days = Object.values(grouped).sort((a, b) => b.date - a.date);
  const todayGroup = days.find(d => isToday(d.date)) || { total: 0, txs: [] };

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-2">Spent Today</h2>
        <div className="text-4xl font-black">{formatCurrency(todayGroup.total)}</div>
      </div>
      
      <div className="mt-4">
        <div className="px-6 py-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
          Today's Activity
        </div>
        <TransactionList transactions={todayGroup.txs} />
      </div>
      
      <div className="mt-4">
        <div className="px-6 py-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
          Previous Days
        </div>
        {days.filter(d => !isToday(d.date)).slice(0, 5).map(day => (
          <div key={day.date.toISOString()} className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <div className="font-semibold text-slate-800">
              {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(day.date)}
            </div>
            <div className="font-bold text-slate-500">
              {formatCurrency(day.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    if (!acc[key]) acc[key] = { date: d, totalSpent: 0, totalIncome: 0, txs: [] };
    const amt = tx.amount * (tx.quantity || 1);
    if (tx.type === 'income') acc[key].totalIncome += amt;
    else acc[key].totalSpent += amt;
    acc[key].txs.push(tx);
    return acc;
  }, {});

  const days = Object.values(grouped).sort((a, b) => b.date - a.date);
  const todayGroup = days.find(d => isToday(d.date)) || { totalSpent: 0, totalIncome: 0, txs: [] };

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-2">Spent Today</h2>
        <div className="text-4xl font-black">{formatCurrency(todayGroup.totalSpent)}</div>
        {todayGroup.totalIncome > 0 && (
          <div className="text-emerald-400 font-semibold mt-2">
            + {formatCurrency(todayGroup.totalIncome)} earned
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-6">
        {days.map(day => {
          const isCurrentDay = isToday(day.date);
          const dayName = isCurrentDay 
            ? "Today's Activity" 
            : new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(day.date);
            
          return (
            <div key={day.date.toISOString()}>
              <div className="px-6 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{dayName}</span>
                {!isCurrentDay && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-800 block">{formatCurrency(day.totalSpent)}</span>
                    {day.totalIncome > 0 && <span className="text-xs font-bold text-emerald-500 block">+{formatCurrency(day.totalIncome)}</span>}
                  </div>
                )}
              </div>
              <TransactionList transactions={day.txs} />
            </div>
          );
        })}
        {days.length === 0 && (
          <div className="text-center text-slate-400 py-8">No daily activity yet.</div>
        )}
      </div>
    </div>
  );
}

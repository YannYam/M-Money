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
    if (!acc[key]) acc[key] = { date: d, total: 0, income: 0, txs: [] };
    
    if (tx.type === 'income') {
      acc[key].income += (tx.amount * (tx.quantity || 1));
    } else {
      acc[key].total += (tx.amount * (tx.quantity || 1));
    }
    
    acc[key].txs.push(tx);
    return acc;
  }, {});

  const days = Object.values(grouped).sort((a, b) => b.date - a.date);
  const todayGroup = days.find(d => isToday(d.date)) || { total: 0, income: 0, txs: [] };

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-2">Spent Today</h2>
        <div className="text-4xl font-black">{formatCurrency(todayGroup.total)}</div>
        {todayGroup.income > 0 && (
          <div className="text-sm font-medium text-green-400 mt-2">+{formatCurrency(todayGroup.income)} Income</div>
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
                <div className="flex gap-3">
                  {day.income > 0 && <span className="text-sm font-bold text-green-500">+{formatCurrency(day.income)}</span>}
                  {!isCurrentDay && <span className="text-sm font-bold text-slate-800">{formatCurrency(day.total)}</span>}
                </div>
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

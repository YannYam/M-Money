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
    if (!acc[key]) acc[key] = { date: d, totalSpent: 0, totalIncome: 0, txs: [] };
    const amt = tx.amount * (tx.quantity || 1);
    if (tx.type === 'income') acc[key].totalIncome += amt;
    else acc[key].totalSpent += amt;
    acc[key].txs.push(tx);
    return acc;
  }, {});

  const months = Object.values(grouped).sort((a, b) => b.date - a.date);
  const thisMonthGroup = months.find(m => isThisMonth(m.date)) || { totalSpent: 0, totalIncome: 0, txs: [], date: new Date() };

  const daysInMonth = getDaysInMonth(thisMonthGroup.date);
  const currentDay = isThisMonth(thisMonthGroup.date) ? new Date().getDate() : daysInMonth;
  const dailyAverage = thisMonthGroup.totalSpent / currentDay;

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-2">Spent This Month</h2>
        <div className="text-4xl font-black">{formatCurrency(thisMonthGroup.totalSpent)}</div>
        {thisMonthGroup.totalIncome > 0 && (
          <div className="text-emerald-400 font-semibold mt-2">
            + {formatCurrency(thisMonthGroup.totalIncome)} earned
          </div>
        )}
        
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
      
      <div className="mt-4 space-y-6">
        {months.map(month => {
          const isCurrentMonth = isThisMonth(month.date);
          const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(month.date);
          
          return (
            <div key={month.date.toISOString()}>
              <div className="px-6 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{monthName}</span>
                {!isCurrentMonth && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-800 block">{formatCurrency(month.totalSpent)}</span>
                    {month.totalIncome > 0 && <span className="text-xs font-bold text-emerald-500 block">+{formatCurrency(month.totalIncome)}</span>}
                  </div>
                )}
              </div>
              <TransactionList transactions={month.txs} />
            </div>
          );
        })}
        {months.length === 0 && (
          <div className="text-center text-slate-400 py-8">No monthly activity yet.</div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { getMonth, getYear } from 'date-fns';

export default function SafeToSpend() {
  const { budget, transactions } = useAppContext();

  const now = new Date();
  const currentMonthTx = transactions.filter(t => {
    const d = new Date(t.timestamp);
    return getMonth(d) === getMonth(now) && getYear(d) === getYear(now);
  });

  const expensesThisMonth = currentMonthTx
    .filter(t => t.type !== 'income')
    .reduce((sum, t) => sum + (t.amount * (t.quantity || 1)), 0);
  const incomeThisMonth = currentMonthTx
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount * (t.quantity || 1)), 0);
  const remaining = (budget || 0) + incomeThisMonth - expensesThisMonth;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-slate-500 text-sm uppercase tracking-widest font-semibold mb-2">Safe to Spend</h2>
      <div className={`text-5xl font-black tracking-tight ${remaining < 0 ? 'text-red-500' : 'text-slate-800'}`}>
        {formatCurrency(remaining)}
      </div>
      <p className="text-slate-400 mt-3 text-sm flex gap-4 justify-center">
        <span>{formatCurrency(expensesThisMonth)} spent</span>
        {incomeThisMonth > 0 && <span className="text-green-500">+{formatCurrency(incomeThisMonth)} income</span>}
      </p>
    </div>
  );
}
